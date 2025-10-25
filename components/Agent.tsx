"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { vapi } from "@/lib/vapi.sdk";
import { interviewer } from "@/constants";
import { createFeedback } from "@/lib/actions/general.action";

enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}

interface SavedMessage {
  role: "user" | "system" | "assistant";
  content: string;
}

type VapiErrorInfo = {
  message?: string;
  status?: number;
  code?: string;
  details?: unknown;
  stack?: string;
};

type WorkflowStartResult =
  | { ok: true }
  | {
      ok: false;
      reason: "missing-workflow-id" | "start-error" | "start-returned-null";
      error?: VapiErrorInfo;
    };

const extractVapiErrorInfo = (raw: unknown): VapiErrorInfo => {
  if (!raw) {
    return {};
  }

  if (raw instanceof Error) {
    return {
      message: raw.message,
      stack: raw.stack,
    };
  }

  if (typeof raw === "string") {
    return {
      message: raw,
    };
  }

  if (typeof raw === "object") {
    const errorObject = raw as Record<string, unknown>;

    const nested =
      (typeof errorObject.error === "object" && errorObject.error) ||
      (typeof errorObject.response === "object" && errorObject.response) ||
      (typeof errorObject.data === "object" && errorObject.data) ||
      errorObject;

    const nestedRecord = nested as Record<string, unknown>;

    const message =
      (nestedRecord?.message as string | undefined) ??
      (nestedRecord?.error as string | undefined) ??
      (errorObject?.message as string | undefined);

    const status =
      (nestedRecord?.status as number | undefined) ??
      (nestedRecord?.statusCode as number | undefined) ??
      (errorObject?.status as number | undefined);

    const code =
      (nestedRecord?.code as string | undefined) ??
      (nestedRecord?.error as string | undefined) ??
      (nestedRecord?.name as string | undefined);

    const details =
      nestedRecord?.details ??
      nestedRecord?.errors ??
      nestedRecord?.context ??
      nestedRecord?.data ??
      errorObject?.details ??
      errorObject?.errors;

    const stack =
      (nestedRecord?.stack as string | undefined) ??
      (errorObject?.stack as string | undefined);

    return {
      message,
      status: typeof status === "number" ? status : undefined,
      code: typeof code === "string" ? code : undefined,
      details,
      stack,
    };
  }

  return {};
};

const Agent = ({
  userName,
  userId,
  interviewId,
  feedbackId,
  type,
  questions,
}: AgentProps) => {
  const router = useRouter();
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [messages, setMessages] = useState<SavedMessage[]>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [lastMessage, setLastMessage] = useState<string>("");

  useEffect(() => {
    const onCallStart = () => {
      setCallStatus(CallStatus.ACTIVE);
    };

    const onCallEnd = () => {
      setCallStatus(CallStatus.FINISHED);
    };

    const onMessage = (message: Message) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        const newMessage = { role: message.role, content: message.transcript };
        setMessages((prev) => [...prev, newMessage]);
      }
    };

    const onSpeechStart = () => {
      console.log("speech start");
      setIsSpeaking(true);
    };

    const onSpeechEnd = () => {
      console.log("speech end");
      setIsSpeaking(false);
    };

    const onCallStartProgress = (event: unknown) => {
      console.debug("[Vapi] call-start-progress", event);
    };

    const onCallStartFailed = (event: unknown) => {
      console.error("[Vapi] call-start-failed", event);
    };

    const onCallStartSuccess = (event: unknown) => {
      console.debug("[Vapi] call-start-success", event);
    };

    const onError = (error: unknown) => {
      const info = extractVapiErrorInfo(error);
      console.error("[Vapi] error", info, error);
    };

    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);
    vapi.on("message", onMessage);
    vapi.on("speech-start", onSpeechStart);
    vapi.on("speech-end", onSpeechEnd);
    vapi.on("error", onError);
    vapi.on("call-start-progress", onCallStartProgress);
    vapi.on("call-start-failed", onCallStartFailed);
    vapi.on("call-start-success", onCallStartSuccess);

    return () => {
      vapi.off("call-start", onCallStart);
      vapi.off("call-end", onCallEnd);
      vapi.off("message", onMessage);
      vapi.off("speech-start", onSpeechStart);
      vapi.off("speech-end", onSpeechEnd);
      vapi.off("error", onError);
      vapi.off("call-start-progress", onCallStartProgress);
      vapi.off("call-start-failed", onCallStartFailed);
      vapi.off("call-start-success", onCallStartSuccess);
    };
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      setLastMessage(messages[messages.length - 1].content);
    }

    const handleGenerateFeedback = async (messages: SavedMessage[]) => {
      console.log("handleGenerateFeedback");

      const { success, feedbackId: id } = await createFeedback({
        interviewId: interviewId!,
        userId: userId!,
        transcript: messages,
        feedbackId,
      });

      if (success && id) {
        router.push(`/interview/${interviewId}/feedback`);
      } else {
        console.log("Error saving feedback");
        router.push("/");
      }
    };

    if (callStatus === CallStatus.FINISHED) {
      if (type === "generate") {
        router.push("/");
      } else {
        handleGenerateFeedback(messages);
      }
    }
  }, [messages, callStatus, feedbackId, interviewId, router, type, userId]);

  const handleCall = async () => {
    setCallStatus(CallStatus.CONNECTING);

    try {
      const workflowId = process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID?.trim();
      const webToken = process.env.NEXT_PUBLIC_VAPI_WEB_TOKEN?.trim();

      // Validate environment variables
      if (!webToken) {
        console.error("VAPI_WEB_TOKEN is not configured");
        alert(
          "VAPI Web Token is not configured. Please check your environment variables."
        );
        setCallStatus(CallStatus.INACTIVE);
        return;
      }

      const startUsingWorkflow = async (
        variables?: Record<string, unknown>
      ): Promise<WorkflowStartResult> => {
        if (!workflowId) {
          return {
            ok: false as const,
            reason: "missing-workflow-id" as const,
          };
        }

        try {
          console.log("Starting VAPI workflow with:", {
            workflowId,
            variables: Object.keys(variables || {}).reduce((acc, key) => {
              acc[key] = typeof variables![key];
              return acc;
            }, {} as Record<string, string>),
          });

          const call = await vapi.start(
            undefined,
            undefined,
            undefined,
            workflowId,
            variables
              ? {
                  variableValues: variables,
                }
              : undefined
          );

          if (!call) {
            return {
              ok: false as const,
              reason: "start-returned-null" as const,
            };
          }

          console.log("VAPI workflow started successfully");
          return { ok: true as const };
        } catch (error) {
          const errorInfo = extractVapiErrorInfo(error);
          console.error("Failed to start Vapi workflow", {
            error,
            errorInfo,
            workflowId,
            variables,
          });

          // Try to extract more specific error information
          if (error && typeof error === "object") {
            const err = error as any;
            if (err.response) {
              console.error("Response error:", {
                status: err.response.status,
                statusText: err.response.statusText,
                data: err.response.data,
              });
            }
          }

          return {
            ok: false as const,
            reason: "start-error" as const,
            error: errorInfo,
          };
        }
      };

      if (type === "generate") {
        const result = await startUsingWorkflow({
          username: userName,
          userid: userId,
        });

        if (!result.ok) {
          if (result.reason === "missing-workflow-id") {
            console.error("VAPI_WORKFLOW_ID is not configured");
            alert(
              "VAPI Workflow ID is not configured. Please check your environment variables."
            );
          } else {
            let errorMessage = "Unable to start the VAPI workflow. ";

            if (result.error?.status === 400) {
              errorMessage +=
                "The workflow configuration is invalid. Please check:\n" +
                "1. VAPI_WORKFLOW_ID is correct\n" +
                "2. The workflow exists in your VAPI dashboard\n" +
                "3. The workflow variables match what's being sent\n\n";
            } else if (
              result.error?.status === 401 ||
              result.error?.status === 403
            ) {
              errorMessage +=
                "Authentication failed. Please check your VAPI_WEB_TOKEN.\n\n";
            }

            errorMessage +=
              result.error?.message || "Check the browser console for details.";

            console.error("Full error details:", result.error);
            alert(errorMessage);
          }
          setCallStatus(CallStatus.INACTIVE);
        }

        return;
      }

      let formattedQuestions = "";
      if (questions) {
        formattedQuestions = questions
          .map((question) => `- ${question}`)
          .join("\n");
      }

      const result = await startUsingWorkflow({
        questions: formattedQuestions,
        username: userName,
        userid: userId,
        interviewId,
      });

      if (!result.ok) {
        if (result.reason === "missing-workflow-id") {
          console.error("VAPI_WORKFLOW_ID is not configured");
          alert(
            "VAPI Workflow ID is not configured. Please check your environment variables."
          );
          setCallStatus(CallStatus.INACTIVE);
          return;
        }

        let fallbackMessage = "";

        if (result.error?.status === 400) {
          fallbackMessage =
            "The workflow configuration is invalid. Please check:\n" +
            "1. VAPI_WORKFLOW_ID is correct\n" +
            "2. The workflow exists in your VAPI dashboard\n" +
            "3. The workflow variables (questions, username, userid, interviewId) match what the workflow expects\n\n";
        } else if (
          result.error?.status === 401 ||
          result.error?.status === 403
        ) {
          fallbackMessage =
            "Authentication failed. Please check your VAPI_WEB_TOKEN.\n\n";
        }

        fallbackMessage +=
          result.error?.message ??
          (result.reason === "start-returned-null"
            ? "Starting the VAPI workflow returned no call."
            : "Starting the VAPI workflow failed.");

        console.warn(
          "Falling back to the default interviewer due to workflow start failure",
          {
            result,
            variables: {
              questions: formattedQuestions?.substring(0, 100) + "...",
              username: userName,
              userid: userId,
              interviewId,
            },
          }
        );

        alert(fallbackMessage + "\n\nFalling back to the default interviewer.");

        await vapi.start(interviewer, {
          variableValues: {
            questions: formattedQuestions,
          },
        });
      }
    } catch (err) {
      console.error("Error starting VAPI call:", err);
      // print non-enumerable props
      console.error(
        "Error details:",
        JSON.stringify(err, Object.getOwnPropertyNames(err))
      );
      alert("Error starting call. Check console/network for details.");
      setCallStatus(CallStatus.INACTIVE);
    }
  };

  const handleDisconnect = async () => {
    setCallStatus(CallStatus.FINISHED);
    await vapi.stop();
  };

  return (
    <>
      <div className="call-view">
        {/* AI Interviewer Card */}
        <div className="card-interviewer">
          <div className="avatar">
            <Image
              src="/ai-avatar.png"
              alt="profile-image"
              width={65}
              height={54}
              className="object-cover"
            />
            {isSpeaking && <span className="animate-speak" />}
          </div>
          <h3>AI Interviewer</h3>
        </div>

        {/* User Profile Card */}
        <div className="card-border">
          <div className="card-content">
            <Image
              src="/user-avatar.png"
              alt="profile-image"
              width={539}
              height={539}
              className="rounded-full object-cover size-[120px]"
            />
            <h3>{userName}</h3>
          </div>
        </div>
      </div>

      {messages.length > 0 && (
        <div className="transcript-border">
          <div className="transcript">
            <p
              key={lastMessage}
              className={cn(
                "transition-opacity duration-500 opacity-0",
                "animate-fadeIn opacity-100"
              )}
            >
              {lastMessage}
            </p>
          </div>
        </div>
      )}

      <div className="w-full flex justify-center">
        {callStatus !== "ACTIVE" ? (
          <button className="relative btn-call" onClick={() => handleCall()}>
            <span
              className={cn(
                "absolute animate-ping rounded-full opacity-75",
                callStatus !== "CONNECTING" && "hidden"
              )}
            />

            <span className="relative">
              {callStatus === "INACTIVE" || callStatus === "FINISHED"
                ? "Call"
                : ". . ."}
            </span>
          </button>
        ) : (
          <button className="btn-disconnect" onClick={() => handleDisconnect()}>
            End
          </button>
        )}
      </div>
    </>
  );
};

export default Agent;
