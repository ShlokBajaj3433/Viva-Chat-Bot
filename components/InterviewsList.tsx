"use client";

import { useState } from "react";
import Link from "next/link";
import { Calendar, Clock, FileText, Play, Eye, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import BookmarkButton from "@/components/BookmarkButton";
import DownloadReportButton from "@/components/DownloadReportButton";

interface Interview {
  id: string;
  subject: string;
  date: string;
  duration: string;
  score: number;
  status: string;
  grade: string;
  questions: number;
  difficulty: string;
  topics: string[];
  year: string;
  feedback: string;
  type: string;
  feedbackData: any;
  interviewData: any;
}

interface InterviewsListProps {
  interviews: Interview[];
  userId: string;
}

export default function InterviewsList({
  interviews,
  userId,
}: InterviewsListProps) {
  const [showBookmarkedOnly, setShowBookmarkedOnly] = useState(false);

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600 bg-green-100";
    if (score >= 80) return "text-blue-600 bg-blue-100";
    if (score >= 70) return "text-yellow-600 bg-yellow-100";
    return "text-red-600 bg-red-100";
  };

  const getGradeColor = (grade: string) => {
    if (grade.startsWith("A")) return "text-green-600 bg-green-100";
    if (grade.startsWith("B")) return "text-blue-600 bg-blue-100";
    if (grade.startsWith("C")) return "text-yellow-600 bg-yellow-100";
    return "text-red-600 bg-red-100";
  };

  const filteredInterviews = showBookmarkedOnly
    ? interviews.filter((interview) => interview.interviewData?.bookmarked)
    : interviews;

  return (
    <>
      {/* Filter Toggle */}
      <div className="mb-6 flex justify-between items-center">
        <p className="text-sm text-gray-600">
          Showing {filteredInterviews.length} of {interviews.length} interviews
        </p>
        <Button
          variant={showBookmarkedOnly ? "default" : "outline"}
          onClick={() => setShowBookmarkedOnly(!showBookmarkedOnly)}
          size="sm"
        >
          <Star
            className={`w-4 h-4 mr-2 ${showBookmarkedOnly ? "fill-white" : ""}`}
          />
          {showBookmarkedOnly ? "Show All" : "Bookmarked Only"}
        </Button>
      </div>

      {/* Interviews List */}
      <div className="space-y-4">
        {filteredInterviews.map((interview) => (
          <div
            key={interview.id}
            className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow duration-200"
          >
            <div className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <BookmarkButton
                          interviewId={interview.id}
                          userId={userId}
                          initialBookmarked={
                            interview.interviewData?.bookmarked || false
                          }
                        />
                        <h3 className="text-xl font-bold text-gray-900">
                          {interview.subject}
                        </h3>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {interview.date}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {interview.duration}
                        </div>
                        <div className="flex items-center">
                          <FileText className="w-4 h-4 mr-1" />
                          {interview.questions} questions
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span
                        className={`px-2 py-1 text-sm font-medium rounded-full ${getScoreColor(
                          interview.score
                        )}`}
                      >
                        {interview.score}%
                      </span>
                      <span
                        className={`px-2 py-1 text-sm font-medium rounded-full ${getGradeColor(
                          interview.grade
                        )}`}
                      >
                        {interview.grade}
                      </span>
                    </div>
                  </div>

                  <div className="mb-3">
                    <p className="text-sm font-medium text-gray-700 mb-1">
                      Topics Covered:
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {interview.topics.length > 0 ? (
                        interview.topics.map((topic, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-gray-100 text-xs rounded-full"
                          >
                            {topic}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs text-gray-500">
                          No specific topics recorded
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1 line-clamp-2">
                        {interview.feedback}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 lg:mt-0 lg:ml-6 flex flex-col sm:flex-row lg:flex-col gap-2">
                  <Link href={`/interview/${interview.id}`}>
                    <Button size="sm" className="flex items-center w-full">
                      <Play className="w-4 h-4 mr-2" />
                      Replay
                    </Button>
                  </Link>
                  <Link href={`/interview/${interview.id}/feedback`}>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex items-center w-full"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Report
                    </Button>
                  </Link>
                  {interview.feedbackData && (
                    <DownloadReportButton
                      interviewId={interview.id}
                      feedback={interview.feedbackData}
                      interview={interview.interviewData}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

        {filteredInterviews.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
            <Star className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No Bookmarked Interviews
            </h3>
            <p className="text-gray-600 mb-6">
              Bookmark your favorite interviews to find them easily later
            </p>
            <Button onClick={() => setShowBookmarkedOnly(false)}>
              Show All Interviews
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
