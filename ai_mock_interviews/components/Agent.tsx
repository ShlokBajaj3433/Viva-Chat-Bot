"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { vapi } from "@/lib/vapi.sdk";
import { interviewer } from "@/constants";
import { createFeedback } from "@/lib/actions/general.action";
import { InterviewConfigForm, InterviewConfig } from "./InterviewConfigForm";

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
  const [showConfigForm, setShowConfigForm] = useState(false);
  const [interviewConfig, setInterviewConfig] = useState<InterviewConfig>({});
  const [isGeneratingFeedback, setIsGeneratingFeedback] = useState(false);
  const hasRedirectedRef = useRef(false); // Track if we've already redirected
  const [micPermission, setMicPermission] = useState<"unknown" | "granted" | "denied">("unknown");

  const checkMicrophonePermission = async (): Promise<boolean> => {
    try {
      if (typeof window === "undefined" || !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        return false;
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach((track) => track.stop());
      setMicPermission("granted");
      return true;
    } catch (error) {
      console.error("Microphone permission check failed:", error);
      setMicPermission("denied");
      return false;
    }
  };

  const testMicrophone = async () => {
    const hasPermission = await checkMicrophonePermission();
    if (hasPermission) {
      alert("✅ Microphone is working correctly! You can now start the interview.");
    } else {
      alert(
        "❌ Microphone access denied or not available.\n\n" +
        "Please:\n" +
        "1. Click the microphone icon in your browser's address bar\n" +
        "2. Select 'Allow' for microphone access\n" +
        "3. Refresh this page and try again"
      );
    }
  };

  useEffect(() => {
    checkMicrophonePermission();
  }, []);

  console.log(
    "Agent Component Rendered - Type:",
    type,
    "InterviewId:",
    interviewId
  );

  // Check for prefilled interview data from subjects page
  useEffect(() => {
    const prefilledData = sessionStorage.getItem("prefilledInterview");
    if (prefilledData) {
      try {
        const config = JSON.parse(prefilledData);
        setInterviewConfig(config);
        // Clear the data after reading
        sessionStorage.removeItem("prefilledInterview");
      } catch (error) {
        console.error("Error parsing prefilled interview data:", error);
      }
    }
  }, []);

  useEffect(() => {
    const onCallStart = () => {
      console.log("📞 VAPI call started");
      setCallStatus(CallStatus.ACTIVE);
      // Start timer
      const startTime = Date.now();
      setInterviewStartTime(startTime);
      setElapsedTime(0);
      
      timerIntervalRef.current = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    };

    const onCallEnd = () => {
      console.log("📞 VAPI call ended (onCallEnd event)");
      console.log("   - Type:", type);
      console.log("   - InterviewId:", interviewId);
      console.log("   - Messages count:", messages.length);
      setCallStatus(CallStatus.FINISHED);
      // Stop timer
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
      }
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
      
      // Cleanup timer
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      setLastMessage(messages[messages.length - 1].content);
    }
  }, [messages]);

  // Handle automatic redirect when interview ends
  useEffect(() => {
    console.log(
      "🔄 useEffect triggered - CallStatus:",
      callStatus,
      "Type:",
      type,
      "HasRedirected:",
      hasRedirectedRef.current
    );

    // Prevent multiple redirects
    if (hasRedirectedRef.current) {
      console.log("⚠️ Already redirected, skipping...");
      return;
    }

    if (callStatus !== CallStatus.FINISHED) {
      console.log("⏳ Call not finished yet, waiting...");
      return;
    }

    console.log("✅ Call FINISHED detected!");

    const handleGenerateFeedback = async () => {
      console.log("📝 handleGenerateFeedback called");
      console.log("   - Messages count:", messages.length);
      console.log("   - Type:", type);
      console.log("   - InterviewId:", interviewId);
      console.log("   - UserId:", userId);

      // If type is interview and interviewId exists, always redirect to feedback page
      if (type === "interview" && interviewId) {
        console.log("🎯 Interview mode confirmed - generating feedback...");
        setIsGeneratingFeedback(true);
        hasRedirectedRef.current = true; // Mark that we're handling the redirect

        try {
          // Validate that we have meaningful content before generating feedback
          const meaningfulMessages = messages.filter((msg: any) => {
            const content = msg.content?.toLowerCase() || '';
            const isGreeting = /^(hi|hello|hey|good morning|good afternoon|good evening|how are you|what's your name|tell me about yourself|are you ready)/i.test(content.trim());
            return msg.role === 'user' && !isGreeting && content.length > 10;
          }).length;

          console.log(`📊 Meaningful answers: ${meaningfulMessages} (minimum 3 required)`);

          if (meaningfulMessages < 3) {
            console.warn("⚠️ Insufficient answers - redirecting to feedback page to show error");
            setIsGeneratingFeedback(false);
            const redirectUrl = `/interview/${interviewId}/feedback`;
            router.push(redirectUrl);
            return;
          }

          console.log("🔄 Calling createFeedback...");
          const result = await createFeedback({
            interviewId: interviewId!,
            userId: userId!,
            transcript: messages,
            feedbackId,
            duration: elapsedTime, // Pass interview duration
          });

          console.log(
            "✅ createFeedback completed - Success:",
            result.success,
            "FeedbackId:",
            result.feedbackId
          );

          // Check if feedback generation failed due to validation
          if (!result.success && result.error) {
            console.warn("⚠️ Feedback generation failed:", result.error);
          }

          setIsGeneratingFeedback(false);

          // Always redirect to feedback page for interviews
          // The feedback page will handle showing appropriate messages
          const redirectUrl = `/interview/${interviewId}/feedback`;
          console.log("🚀 Redirecting to:", redirectUrl);
          router.push(redirectUrl);
        } catch (error) {
          console.error("❌ Error generating feedback:", error);
          setIsGeneratingFeedback(false);
          // Still redirect to feedback page - it will show appropriate error
          const redirectUrl = `/interview/${interviewId}/feedback`;
          console.log("🚀 Redirecting to (after error):", redirectUrl);
          router.push(redirectUrl);
        }
      } else {
        console.log("⚠️ Not interview mode or missing interviewId");
        console.log("   - Type:", type, "Expected: 'interview'");
        console.log("   - InterviewId:", interviewId);
      }
    };

    if (type === "generate") {
      console.log("🏠 Generate mode detected");
      console.log("   - Messages count:", messages.length);
      console.log("   - InterviewId:", interviewId);

      // If we have an interviewId in generate mode, treat it like an interview
      if (interviewId) {
        console.log(
          "🎤 Generate mode but has InterviewId - treating as interview"
        );
        hasRedirectedRef.current = true;
        handleGenerateFeedback();
      } else {
        console.log(
          "🏠 Generate mode without InterviewId - redirecting to home"
        );
        hasRedirectedRef.current = true;
        router.push("/");
      }
    } else if (type === "interview") {
      console.log("🎤 Interview mode - starting feedback generation");
      handleGenerateFeedback();
    } else {
      console.log("❓ Unknown type:", type);
      // Fallback: if type is undefined or something else, still try to generate feedback
      handleGenerateFeedback();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callStatus, type, interviewId]);

  const handleCall = async (config?: InterviewConfig) => {
    setCallStatus(CallStatus.CONNECTING);

    try {
      if (
        typeof window === "undefined" ||
        !window.isSecureContext ||
        typeof window.RTCPeerConnection === "undefined"
      ) {
        throw new Error(
          "Voice interviews require a browser with WebRTC enabled. Open this app in Chrome or Edge at http://localhost:3000 and allow microphone access."
        );
      }

      const hasMicPermission = await checkMicrophonePermission();
      if (!hasMicPermission) {
        throw new Error(
          "Microphone access is required for voice interviews. Please allow microphone access in your browser settings and try again."
        );
      }

      if (type === "interview" && !interviewId) {
        throw new Error(
          "Interview ID is required for interview mode. Please navigate to the interview page properly."
        );
      }

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

        let onWorkflowStartFailed: ((event: unknown) => void) | undefined;

        try {
          let startFailure: VapiErrorInfo | undefined;
          onWorkflowStartFailed = (event: unknown) => {
            const eventRecord =
              event && typeof event === "object"
                ? (event as Record<string, unknown>)
                : undefined;
            startFailure = extractVapiErrorInfo(eventRecord?.error ?? event);
            if (eventRecord?.errorStack && !startFailure.stack) {
              startFailure.stack = String(eventRecord.errorStack);
            }
          };

          vapi.on("call-start-failed", onWorkflowStartFailed);
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

          vapi.off("call-start-failed", onWorkflowStartFailed);

          if (!call) {
            return {
              ok: false as const,
              reason: "start-returned-null" as const,
              error: startFailure,
            };
          }

          console.log("VAPI workflow started successfully");
          return { ok: true as const };
        } catch (error) {
          if (onWorkflowStartFailed) {
            vapi.off("call-start-failed", onWorkflowStartFailed);
          }
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
        // Build configuration instructions for generate type
        let configInstructions = "";
        if (config && Object.keys(config).length > 0) {
          const providedInfo: string[] = [];
          if (config.subject) providedInfo.push(`Subject: ${config.subject}`);
          if (config.year) providedInfo.push(`Year: ${config.year}`);
          if (config.topics) providedInfo.push(`Topics: ${config.topics}`);
          if (config.type) providedInfo.push(`Interview Type: ${config.type}`);

          if (providedInfo.length > 0) {
            configInstructions =
              "\n\n=== STRICT PRE-CONFIGURED SCOPE ===\n" +
              providedInfo.join("\n") +
              "\n\nRULES:\n" +
              "- Do NOT ask what topic/subject to cover.\n" +
              "- Do NOT change or broaden topics.\n" +
              "- Begin immediately with in-depth viva questions ONLY on the provided subject/topics.\n" +
              "- If user tries to change topics, refuse and continue with the original topics.\n" +
              "=== END SCOPE ===\n";
          }
        }

        const result = await startUsingWorkflow({
          username: userName,
          userid: userId,
          configInstructions, // Pass instructions to skip redundant questions
          ...config, // Include user-provided configuration
        });

        if (!result.ok) {
          if (result.reason === "missing-workflow-id") {
            console.error("VAPI_WORKFLOW_ID is not configured");
            alert(
              "VAPI Workflow ID is not configured. Please check your environment variables or contact support."
            );
          } else {
            let errorMessage = "";

            if (result.error?.status === 400) {
              errorMessage =
                "The workflow configuration is invalid. Please check:\n" +
                "1. VAPI_WORKFLOW_ID is correct\n" +
                "2. The workflow exists in your VAPI dashboard\n" +
                "3. The workflow variables match what's being sent\n\n";
            } else if (
              result.error?.status === 401 ||
              result.error?.status === 403
            ) {
              errorMessage =
                "Authentication failed. Please check your VAPI_WEB_TOKEN.\n\n";
            } else if (result.error?.status === 429) {
              errorMessage =
                "Rate limit exceeded. Please wait a moment and try again.\n\n";
            } else if (result.reason === "start-returned-null") {
              errorMessage =
                "The VAPI workflow did not return a call. This may be a temporary issue.\n\n";
            }

            errorMessage +=
              result.error?.message ??
              "Starting the VAPI workflow failed. Check the browser console for details.";

            console.error("VAPI workflow start failed:", { result, error: result.error });
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

      // Build configuration instructions for the interviewer
      let configInstructions = "";
      if (config && Object.keys(config).length > 0) {
        const parts: string[] = [];
        if (config.subject) parts.push(`Subject/Course: ${config.subject}`);
        if (config.year) parts.push(`Year/Semester: ${config.year}`);
        if (config.topics) parts.push(`Topics to Cover: ${config.topics}`);
        if (config.type) parts.push(`Interview Type: ${config.type}`);
        if (config.isTechnical !== undefined) {
          parts.push(
            `Technical Focus: ${
              config.isTechnical
                ? "Yes - Prefer technical/practical questions"
                : "No - Prefer conceptual questions"
            }`
          );
        }

        if (parts.length > 0) {
          configInstructions =
            "=== STRICT PRE-CONFIGURED SCOPE ===\n" +
            parts.join("\n") +
            "\n\nRULES:\n" +
            "- Do NOT ask what topic/subject to cover.\n" +
            "- Do NOT change or broaden topics.\n" +
            "- Begin immediately with in-depth viva questions ONLY on the provided subject/topics.\n" +
            "- If user tries to change topics, politely refuse and continue on the original topics.\n" +
            "- Keep questions focused and specific; avoid generic questions.\n" +
            "=== END SCOPE ===";
        }
      }

      console.log("📋 Interview Config:", {
        config,
        configInstructions,
        formattedQuestions: formattedQuestions.substring(0, 100),
      });

      // Debug: ensure we are sending exactly the selected subject/topics
      console.log("🔎 Debug - topic payload", {
        sentSubject: config?.subject,
        sentTopics: config?.topics,
        sentType: config?.type,
        sentIsTechnical: config?.isTechnical,
      });

      const result = await startUsingWorkflow({
        username: userName,
        userid: userId,
        configInstructions,
        subject: config?.subject || "",
        year: config?.year || "",
        topics: config?.topics || "",
        type: config?.type || "",
        isTechnical: config?.isTechnical ?? false,
        interviewId,
      });

      if (!result.ok) {
        if (result.reason === "missing-workflow-id") {
          console.error("VAPI_WORKFLOW_ID is not configured");
          alert(
            "VAPI Workflow ID is not configured. Please check your environment variables or contact support."
          );
          setCallStatus(CallStatus.INACTIVE);
          return;
        }

        let errorMessage = "";

        if (result.error?.status === 400) {
          errorMessage =
            "The workflow configuration is invalid. Please check:\n" +
            "1. VAPI_WORKFLOW_ID is correct\n" +
            "2. The workflow exists in your VAPI dashboard\n" +
            "3. The workflow variables match what the workflow expects\n\n";
        } else if (
          result.error?.status === 401 ||
          result.error?.status === 403
        ) {
          errorMessage =
            "Authentication failed. Please check your VAPI_WEB_TOKEN.\n\n";
        } else if (result.error?.status === 429) {
          errorMessage =
            "Rate limit exceeded. Please wait a moment and try again.\n\n";
        } else if (result.reason === "start-returned-null") {
          errorMessage =
            "The VAPI workflow did not return a call. This may be a temporary issue.\n\n";
        }

        errorMessage +=
          result.error?.message ??
          "Starting the VAPI workflow failed. Check the browser console for details.";

        console.error("VAPI workflow start failed:", { result, error: result.error });

        alert(errorMessage);
        setCallStatus(CallStatus.INACTIVE);
        return;
      }
    } catch (err) {
      console.error("Error starting VAPI call:", err);
      const errorMessage = err instanceof Error ? err.message : String(err);
      
      if (errorMessage.includes("Microphone access is required") || 
          errorMessage.includes("permission") || 
          errorMessage.includes("NotAllowedError") ||
          errorMessage.includes("PermissionDeniedError")) {
        alert(
          "Microphone access is required for voice interviews.\n\n" +
          "Please:\n" +
          "1. Click the microphone icon in your browser's address bar\n" +
          "2. Select 'Allow' for microphone access\n" +
          "3. Refresh this page and try again"
        );
      } else if (errorMessage.includes("WebRTC") || errorMessage.includes("RTCPeerConnection")) {
        alert(
          "Voice interviews require a browser with WebRTC support.\n\n" +
          "Please use Chrome, Edge, or Firefox and ensure you're on a secure context (HTTPS or localhost)."
        );
      } else {
        alert(errorMessage || "Error starting call. Check console/network for details.");
      }
      
      setCallStatus(CallStatus.INACTIVE);
    }
  };

  const handleDisconnect = async () => {
    console.log("🛑 handleDisconnect called");
    console.log("   - Current callStatus:", callStatus);
    console.log("   - Type:", type);
    console.log("   - InterviewId:", interviewId);
    console.log("   - Messages count:", messages.length);

    try {
      console.log("🔄 Stopping VAPI call...");
      await vapi.stop();
      console.log("✅ VAPI call stopped successfully");
    } catch (error) {
      console.error("❌ Error stopping VAPI:", error);
    }

    console.log("🔄 Setting callStatus to FINISHED...");
    setCallStatus(CallStatus.FINISHED);
    console.log("✅ CallStatus set to FINISHED");
  };

  const handleConfigStart = (config: InterviewConfig) => {
    setInterviewConfig(config);
    setShowConfigForm(false);
    handleCall(config);
  };

  const handleConfigSkip = () => {
    setShowConfigForm(false);
    handleCall();
  };

  // Show configuration form if call is inactive and form hasn't been dismissed
  if (showConfigForm && callStatus === CallStatus.INACTIVE) {
    return (
      <div className="w-full min-h-[600px] flex items-center justify-center p-4">
        <InterviewConfigForm
          onStart={handleConfigStart}
          onSkip={handleConfigSkip}
          isLoading={false}
          initialConfig={interviewConfig}
        />
      </div>
    );
  }

  return (
    <>
      {isGeneratingFeedback && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md mx-4 text-center shadow-2xl">
            <div className="mb-4">
              <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Generating Your Report 📊
            </h3>
            <p className="text-gray-600 mb-4">
              Our AI is analyzing your interview performance and creating a
              comprehensive feedback report...
            </p>
            <div className="flex items-center justify-center space-x-2 text-sm text-blue-600">
              <span className="animate-pulse">●</span>
              <span
                className="animate-pulse"
                style={{ animationDelay: "0.2s" }}
              >
                ●
              </span>
              <span
                className="animate-pulse"
                style={{ animationDelay: "0.4s" }}
              >
                ●
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Timer Display */}
      {callStatus === CallStatus.ACTIVE && (
        <div className="fixed top-4 right-4 z-40">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-3">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-mono text-lg font-bold">
              {Math.floor(elapsedTime / 60).toString().padStart(2, '0')}:
              {(elapsedTime % 60).toString().padStart(2, '0')}
            </span>
          </div>
        </div>
      )}

      <div className="call-view">
        {/* AI Interviewer Card */}
        <div className="card-interviewer">
          <div className="avatar">
            <Image
              src="/vchatLogo.png"
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
          <div className="flex flex-col items-center gap-4 w-full max-w-md">
            <div className="flex items-center justify-center gap-3 p-3 rounded-lg bg-gray-50 border border-gray-200">
              <svg
                className={cn(
                  "w-5 h-5",
                  micPermission === "granted" && "text-green-600",
                  micPermission === "denied" && "text-red-600",
                  micPermission === "unknown" && "text-gray-400"
                )}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={micPermission === "granted" 
                    ? "M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                    : micPermission === "denied"
                    ? "M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z M10 19l-7-7m0 0l7-7m-7 7h18"
                    : "M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"}
                />
              </svg>
              <span className="text-sm text-gray-600">
                {micPermission === "granted" && "Microphone ready ✓"}
                {micPermission === "denied" && "Microphone access denied - click test button"}
                {micPermission === "unknown" && "Checking microphone..."}
              </span>
              <button
                onClick={testMicrophone}
                disabled={callStatus === "CONNECTING"}
                className="px-3 py-1 text-xs font-medium text-blue-600 hover:text-blue-700 underline disabled:opacity-50"
              >
                Test Mic
              </button>
            </div>
            <button className="relative btn-call" onClick={() => handleCall()}>
              <span
                className={cn(
                  "absolute animate-ping rounded-full opacity-75",
                  callStatus !== "CONNECTING" && "hidden"
                )}
              />

              <span className="relative">
                {callStatus === "INACTIVE" || callStatus === "FINISHED"
                  ? "Start Interview"
                  : ". . ."}
              </span>
            </button>
          </div>
        ) : (
          <button className="btn-disconnect" onClick={() => handleDisconnect()}>
            Finish Interview
          </button>
        )}
      </div>

      {/* Show generating feedback status or View Report button after interview ends */}
      {callStatus === CallStatus.FINISHED &&
        interviewId &&
        type === "interview" && (
          <div className="w-full flex justify-center mt-6">
            {isGeneratingFeedback ? (
              <div className="flex flex-col items-center gap-3">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
                <p className="text-gray-400 text-sm">
                  Generating your feedback report...
                </p>
              </div>
            ) : (
              <button
                onClick={() =>
                  router.push(`/interview/${interviewId}/feedback`)
                }
                className="px-8 py-4 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:from-green-700 hover:to-green-800 transition-all hover:-translate-y-0.5 flex items-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                View Your Report
              </button>
            )}
          </div>
        )}
    </>
  );
};

export default Agent;
