import dayjs from "dayjs";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Star, GraduationCap, ArrowRight, Clock } from "lucide-react";

import { Button } from "./ui/button";
import DisplayTechIcons from "./DisplayTechIcons";

import { cn, getRandomInterviewCover } from "@/lib/utils";
import { getFeedbackByInterviewId } from "@/lib/actions/general.action";

const InterviewCard = async ({
  interviewId,
  userId,
  role,
  type,
  techstack,
  createdAt,
}: InterviewCardProps) => {
  const feedback =
    userId && interviewId
      ? await getFeedbackByInterviewId({
          interviewId,
          userId,
        })
      : null;

  const normalizedType = /mix/gi.test(type) ? "Mixed" : type;

  const badgeStyles =
    {
      Behavioral: "bg-gradient-to-r from-purple-500 to-purple-600 text-white",
      Mixed: "bg-gradient-to-r from-blue-500 to-indigo-600 text-white",
      Technical: "bg-gradient-to-r from-emerald-500 to-teal-600 text-white",
    }[normalizedType] ||
    "bg-gradient-to-r from-blue-500 to-indigo-600 text-white";

  const iconGradient =
    {
      Behavioral: "from-purple-400 to-purple-600",
      Mixed: "from-blue-400 to-indigo-600",
      Technical: "from-emerald-400 to-teal-600",
    }[normalizedType] || "from-blue-400 to-indigo-600";

  const formattedDate = dayjs(
    feedback?.createdAt || createdAt || Date.now()
  ).format("MMM D, YYYY");

  const score = feedback?.totalScore || 0;
  const hasScore = !!feedback?.totalScore;

  // Get performance data
  const grade = feedback?.performanceSummary?.grade;
  const percentage = feedback?.performanceSummary?.percentage;
  const overallPerformance = feedback?.performanceSummary?.overallPerformance;
  const totalQuestions = feedback?.studentInfo?.totalQuestions;

  // Get summary text - prioritize newer format
  let displayText = "";
  if (feedback) {
    if (overallPerformance) {
      displayText = overallPerformance;
    } else if (feedback.finalFeedback?.finalAssessment) {
      displayText = feedback.finalFeedback.finalAssessment;
    } else if (feedback.finalAssessment) {
      displayText = feedback.finalAssessment;
    } else {
      displayText =
        "Interview completed. Click to view detailed feedback and performance analysis.";
    }
  } else {
    displayText =
      "You haven't taken this interview yet. Start now to improve your skills and get detailed feedback.";
  }

  return (
    <div className="group relative w-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative flex flex-col gap-5 p-6">
        {/* Header with Badge */}
        <div className="flex items-start justify-between">
          {/* Icon Logo */}
          <div
            className={cn(
              "flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3",
              iconGradient
            )}
          >
            <GraduationCap className="h-8 w-8 text-white" strokeWidth={2.5} />
          </div>

          {/* Type Badge */}
          <div
            className={cn(
              "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold shadow-md",
              badgeStyles
            )}
          >
            <div className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
            {normalizedType}
          </div>
        </div>

        {/* Interview Title */}
        <div>
          <h3 className="text-xl font-bold capitalize text-gray-900 line-clamp-1">
            {role} Interview
          </h3>

          {/* Date & Score Info */}
          <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4 text-gray-400" />
              <span className="font-medium">{formattedDate}</span>
            </div>

            <div className="flex items-center gap-1.5">
              {hasScore ? (
                <>
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold text-gray-900">
                    {score}/100
                  </span>
                </>
              ) : (
                <>
                  <Clock className="h-4 w-4 text-orange-400" />
                  <span className="font-medium text-orange-600">Pending</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Performance Summary or Feedback */}
        {grade && percentage !== undefined ? (
          <div className="rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 p-3 border border-blue-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-gray-600">
                Performance
              </span>
              <span
                className={cn(
                  "text-sm font-bold px-2 py-0.5 rounded",
                  percentage >= 80
                    ? "bg-green-100 text-green-700"
                    : percentage >= 60
                    ? "bg-blue-100 text-blue-700"
                    : percentage >= 40
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
                )}
              >
                Grade {grade}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="font-semibold text-gray-900">{percentage}%</span>
              {totalQuestions && (
                <span className="text-gray-600">
                  • {totalQuestions} questions
                </span>
              )}
            </div>
          </div>
        ) : null}

        {/* Feedback or Placeholder Text */}
        <p className="line-clamp-2 text-sm leading-relaxed text-gray-600">
          {displayText}
        </p>

        {/* Tech Stack Icons */}
        <div className="border-t border-gray-100 pt-4">
          <DisplayTechIcons techStack={techstack} />
        </div>

        {/* Action Button */}
        <Button
          asChild
          className={cn(
            "group/btn w-full rounded-xl font-semibold shadow-md transition-all duration-300",
            feedback
              ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              : "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
          )}
        >
          <Link
            href={
              feedback
                ? `/interview/${interviewId}/feedback`
                : `/interview/${interviewId}`
            }
          >
            {feedback ? "View Feedback" : "Start Interview"}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
          </Link>
        </Button>
      </div>

      {/* Decorative Corner Element */}
      <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-400/20 blur-2xl transition-opacity duration-300 group-hover:opacity-100 opacity-0" />
    </div>
  );
};

export default InterviewCard;
