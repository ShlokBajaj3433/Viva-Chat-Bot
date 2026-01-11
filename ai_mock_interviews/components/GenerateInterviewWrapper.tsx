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

        // Get the interview ID from the database
        // Since the API doesn't return the ID, we need to fetch the latest interview
        console.log("🔍 Fetching latest interview ID...");
        const latestInterviewResponse = await fetch(
          `/api/interview/latest?userId=${userId}`
        );

        if (latestInterviewResponse.ok) {
          const latestData = await latestInterviewResponse.json();
          if (latestData.interviewId) {
            console.log("✅ Got interview ID:", latestData.interviewId);
            
            // Clean up sessionStorage
            if (typeof window !== "undefined") {
              sessionStorage.removeItem("prefilledInterview");
              console.log("🧹 Cleared sessionStorage");
            }

            // Redirect to the interview page with the ID
            const interviewPageUrl = `/interview/${latestData.interviewId}`;
            console.log("🔗 Redirecting to:", interviewPageUrl);
            router.push(interviewPageUrl);
          } else {
            console.error("❌ No interviewId in latest response");
            setError("Interview created but couldn't load it. Please refresh.");
          }
        } else {
          console.error("❌ Failed to fetch latest interview");
          setError("Interview created but couldn't be loaded. Please refresh.");
        }
      } else {
        console.error("❌ API returned success:false", data);
        setError(data.message || "Failed to create interview. Please try again.");
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
