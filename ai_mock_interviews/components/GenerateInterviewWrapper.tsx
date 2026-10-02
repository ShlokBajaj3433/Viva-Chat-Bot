"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Agent from "./Agent";

interface GenerateInterviewWrapperProps {
  userName: string;
  userId?: string;
}

const GenerateInterviewWrapper = ({
  userName,
  userId,
}: GenerateInterviewWrapperProps) => {
  const router = useRouter();
  const [interviewId, setInterviewId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [interviewData, setInterviewData] = useState<any>(null);

  const testMicrophone = async () => {
    try {
      if (typeof window === "undefined" || !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        alert("Microphone access is not supported in this browser. Please use Chrome, Edge, or Firefox.");
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach((track) => track.stop());
      alert("✅ Microphone is working correctly! You can now start the interview.");
    } catch (error) {
      console.error("Microphone test failed:", error);
      alert(
        "❌ Microphone access denied or not available.\n\n" +
        "Please:\n" +
        "1. Click the microphone icon in your browser's address bar\n" +
        "2. Select 'Allow' for microphone access\n" +
        "3. Refresh this page and try again"
      );
    }
  };

  // Load prefilled interview data on component mount
  useEffect(() => {
    console.log("📦 GenerateInterviewWrapper mounted - checking sessionStorage...");
    if (typeof window !== "undefined") {
      console.log("🌐 Current location:", window.location.href);
    }
    const prefilledData = sessionStorage.getItem("prefilledInterview");
    
    if (prefilledData) {
      try {
        const config = JSON.parse(prefilledData);
        console.log("📋 Found prefilled config in sessionStorage:", config);
        
        // Parse topics into array if needed
        const topicsArray = config.topics 
          ? typeof config.topics === "string"
            ? config.topics.split(", ").filter(Boolean)
            : Array.isArray(config.topics) ? config.topics : []
          : [];

        const preparedData = {
          role: config.role || config.subject || "General Interview",
          type: config.type || "assignment-viva",
          level: config.year || "All Levels",
          techstack: topicsArray,
          subject: config.subject || "General",
          year: config.year || "All Years",
          topics: config.topics || "General Topics",
          isTechnical: config.isTechnical !== false, // Default true for assignments
          classroomId: config.classroomId,
          assignmentId: config.assignmentId,
          assignmentTitle: config.assignmentTitle,
        };

        console.log("✅ Prepared interview data:", preparedData);
        setInterviewData(preparedData);
      } catch (parseError) {
        console.error("❌ Error parsing prefilled interview data:", parseError);
        setError("Failed to load assignment config. Using defaults.");
      }
    } else {
      console.log("ℹ️ No prefilled config found - will use defaults");
    }
  }, []);

  const createInterview = async () => {
    if (!userId) {
      setError("Please sign in to create an interview");
      return;
    }

    setIsCreating(true);
    setError(null);

    try {
      console.log("🔄 CREATE_INTERVIEW: Starting interview creation...");

      // Use the interview data that was already loaded from assignment
      let interview = interviewData || {
        role: "General Interview",
        type: "Quick Practice",
        level: "All Levels",
        techstack: [],
        amount: 5,
        userid: userId,
        subject: "General",
        year: "All Years",
        topics: "General Topics",
      };

      // Ensure interview has userid and defaults
      interview.userid = userId;
      interview.amount = interview.amount || 5;

      // Log interview context
      if (interview.classroomId && interview.assignmentId) {
        console.log("📚 Assignment Context:", {
          classroomId: interview.classroomId,
          assignmentId: interview.assignmentId,
          assignmentTitle: interview.assignmentTitle,
        });
      }

      console.log("📋 Interview payload:", interview);

      // Create interview record via API
      const response = await fetch("/api/vapi/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(interview),
      });

      const data = await response.json();
      console.log("📡 API Response:", data);

      if (data.success) {
        console.log("✅ Interview created successfully");

        if (!data.interviewId) {
          setError("Interview created but couldn't load it. Please refresh.");
          return;
        }

        if (typeof window !== "undefined") {
          sessionStorage.removeItem("prefilledInterview");
        }

        router.push(`/interview/${data.interviewId}`);
      } else {
        console.error("❌ API returned success:false", data);
        setError(data.error || data.message || "Failed to create interview. Please try again.");
      }
    } catch (err) {
      console.error("❌ CREATE_INTERVIEW Error:", err);
      setError("An error occurred. Please try again.");
    } finally {
      setIsCreating(false);
    }
  };

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg inline-block">
          <p className="font-semibold">❌ {error}</p>
          <button
            onClick={() => router.push("/")}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  if (!interviewId) {
    return (
      <div className="h-screen w-screen flex items-center justify-center fixed inset-0">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full mx-4">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 text-center">Start Your Interview</h2>
          
          {/* Interview Info Section */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8 text-center">
            <p className="text-sm text-gray-700 mb-2">
              <strong className="text-blue-900">Subject:</strong> {interviewData?.role || "General Interview"}
            </p>
            <p className="text-sm text-gray-700 mb-2">
              <strong className="text-blue-900">Level:</strong> {interviewData?.level || "All Levels"}
            </p>
            <p className="text-sm text-gray-700">
              <strong className="text-blue-900">Topics:</strong> {interviewData?.techstack?.length > 0 ? interviewData.techstack.join(", ") : "General Topics"}
            </p>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8">
            <p className="text-sm text-amber-900">
              💡 <strong>Tip:</strong> Find a quiet place, ensure good lighting, and test your microphone before starting.
            </p>
          </div>

          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
                <span className="font-medium text-blue-900">Microphone Check</span>
              </div>
              <button
                onClick={testMicrophone}
                disabled={isCreating}
                className="px-4 py-2 text-sm font-medium text-blue-600 bg-white border border-blue-300 rounded-lg hover:bg-blue-50 transition-colors disabled:opacity-50"
              >
                Test Microphone
              </button>
            </div>
            <p className="text-xs text-blue-700 mt-2 ml-9">
              Click to verify your microphone works before starting the interview
            </p>
          </div>

          <p className="text-gray-600 mb-8 font-medium text-center">
            Click below to begin your personalized interview session
          </p>
          <div className="flex justify-center">
          <button
            onClick={createInterview}
            disabled={isCreating}
            className="group relative inline-flex items-center justify-center px-10 py-4 text-lg font-bold text-white transition-all duration-300 ease-out rounded-2xl shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 transform hover:scale-105"
          >
            {isCreating ? (
              <span className="flex items-center gap-3">
                <svg
                  className="animate-spin h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span>Creating Interview...</span>
              </span>
            ) : (
              <span className="flex items-center gap-3">
                <span className="text-2xl">🎤</span>
                <span>Start Interview</span>
              </span>
            )}
          </button>
          </div>
        </div>
      </div>
    );
  }

  // Once we have an interview ID, show the Agent component
  return (
    <Agent
      userName={userName}
      userId={userId}
      interviewId={interviewId}
      type="interview"
    />
  );
};

export default GenerateInterviewWrapper;
