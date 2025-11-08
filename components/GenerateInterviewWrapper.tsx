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

  const createInterview = async () => {
    if (!userId) {
      setError("Please sign in to create an interview");
      return;
    }

    setIsCreating(true);
    setError(null);

    try {
      console.log("🔄 Creating interview record in database...");

      // Check for prefilled interview data
      let interviewData: any = {
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

      const prefilledData = sessionStorage.getItem("prefilledInterview");
      if (prefilledData) {
        try {
          const config = JSON.parse(prefilledData);
          // Use prefilled data to create interview with correct subject
          interviewData = {
            role: config.subject || "General Interview",
            type: config.type || "Quick Practice",
            level: config.year || "All Levels",
            techstack: config.topics ? config.topics.split(", ") : [],
            amount: 5,
            userid: userId,
            subject: config.subject || "General",
            year: config.year || "All Years",
            topics: config.topics || "General Topics",
            isTechnical: config.isTechnical || false,
          };
          console.log("✅ Using prefilled interview data:", interviewData);
        } catch (parseError) {
          console.error("Error parsing prefilled interview data:", parseError);
        }
      }

      // Create interview record
      const response = await fetch("/api/vapi/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(interviewData),
      });

      const data = await response.json();

      if (data.success) {
        console.log("✅ Interview created successfully");

        // Get the interview ID from the database
        // Since the API doesn't return the ID, we need to fetch the latest interview
        const latestInterviewResponse = await fetch(
          `/api/interview/latest?userId=${userId}`
        );

        if (latestInterviewResponse.ok) {
          const latestData = await latestInterviewResponse.json();
          if (latestData.interviewId) {
            console.log("✅ Got interview ID:", latestData.interviewId);
            setInterviewId(latestData.interviewId);
          }
        }
      } else {
        setError("Failed to create interview. Please try again.");
      }
    } catch (err) {
      console.error("❌ Error creating interview:", err);
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
      <div className="text-center py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8 inline-block">
          <h2 className="text-2xl font-bold mb-4">Start Your Interview</h2>
          <p className="text-gray-600 mb-6">
            Click below to begin your personalized interview session
          </p>
          <button
            onClick={createInterview}
            disabled={isCreating}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isCreating ? (
              <span className="flex items-center gap-2">
                <svg
                  className="animate-spin h-5 w-5"
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
                Creating Interview...
              </span>
            ) : (
              "🎤 Start Interview"
            )}
          </button>
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
