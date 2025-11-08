import dayjs from "dayjs";
import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";

import {
  getFeedbackByInterviewId,
  getInterviewById,
} from "@/lib/actions/general.action";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/actions/auth.action";
import DownloadPDFButton from "@/components/DownloadPDFButton";

const Feedback = async ({ params }: RouteParams) => {
  const { id } = await params;
  const user = await getCurrentUser();

  const interview = await getInterviewById(id);
  if (!interview) redirect("/");

  const feedback = await getFeedbackByInterviewId({
    interviewId: id,
    userId: user?.id!,
  });

  // If no feedback exists yet, show a message
  if (!feedback) {
    return (
      <section className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-3">
              📊 Interview Feedback Report
            </h1>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
            <div className="mb-6">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                Generating Your Feedback...
              </h2>
              <p className="text-gray-600">
                Your interview feedback is being generated. This may take a few
                moments. Please refresh this page in a moment.
              </p>
            </div>
            <Link href="/">
              <Button className="mt-4">Return Home</Button>
            </Link>
          </div>
        </div>
      </section>
    );
  }

  // Check if feedback uses new comprehensive structure
  // The new format stores the data directly in the feedback object, not as JSON string
  const isNewFormat = !!feedback?.performanceSummary;

  // For backwards compatibility, try to parse finalAssessment if it exists as a JSON string
  let comprehensiveFeedback: any = null;

  if (isNewFormat) {
    // New format: data is already structured in the feedback object
    comprehensiveFeedback = feedback;
  } else if (
    feedback?.finalAssessment &&
    typeof feedback.finalAssessment === "string"
  ) {
    // Old format: try to parse JSON string (but only if it looks like JSON)
    try {
      if (
        feedback.finalAssessment.trim().startsWith("{") ||
        feedback.finalAssessment.trim().startsWith("[")
      ) {
        comprehensiveFeedback = JSON.parse(feedback.finalAssessment);
      }
    } catch (e) {
      console.error("Error parsing feedback:", e);
      // If parsing fails, it's just a plain text string - that's okay
    }
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-3">
             Interview Feedback Report
          </h1>
          <p className="text-xl text-gray-600 capitalize">
            {interview.role} - {interview.type} Interview
          </p>

          {/* Download PDF Button */}
          <div className="mt-6 flex justify-center">
            <DownloadPDFButton
              feedback={feedback}
              interview={interview}
              isNewFormat={isNewFormat}
            />
          </div>
        </div>

        {/* Performance Summary Card */}
        {isNewFormat && comprehensiveFeedback?.performanceSummary && (
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border-2 border-blue-100">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                <div className="text-5xl font-bold text-blue-600 mb-2">
                  {comprehensiveFeedback.performanceSummary.grade}
                </div>
                <div className="text-sm font-semibold text-gray-600">
                  Final Grade
                </div>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                <div className="text-5xl font-bold text-green-600 mb-2">
                  {comprehensiveFeedback.performanceSummary.percentage}%
                </div>
                <div className="text-sm font-semibold text-gray-600">Score</div>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                <div className="text-5xl font-bold text-purple-600 mb-2">
                  {comprehensiveFeedback.performanceSummary.marksObtained}/
                  {comprehensiveFeedback.performanceSummary.totalMarks}
                </div>
                <div className="text-sm font-semibold text-gray-600">Marks</div>
              </div>
            </div>

            <div className="flex items-center justify-between text-gray-600 text-sm border-t pt-4">
              <div className="flex items-center gap-2">
                <Image
                  src="/calendar.svg"
                  width={20}
                  height={20}
                  alt="calendar"
                />
                <span>
                  {feedback?.createdAt
                    ? dayjs(feedback.createdAt).format("MMM D, YYYY h:mm A")
                    : "N/A"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">
                  {comprehensiveFeedback.studentInfo?.totalQuestions || 0}{" "}
                  Questions
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Old Format Summary */}
        {!isNewFormat && (
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="flex flex-col md:flex-row justify-center gap-8">
              <div className="flex items-center gap-3">
                <Image src="/star.svg" width={28} height={28} alt="star" />
                <div>
                  <p className="text-sm text-gray-600">Overall Score</p>
                  <p className="text-3xl font-bold text-blue-600">
                    {feedback?.totalScore || 0}/100
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Image
                  src="/calendar.svg"
                  width={28}
                  height={28}
                  alt="calendar"
                />
                <div>
                  <p className="text-sm text-gray-600">Interview Date</p>
                  <p className="text-lg font-semibold">
                    {feedback?.createdAt
                      ? dayjs(feedback.createdAt).format("MMM D, YYYY h:mm A")
                      : "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Question-wise Evaluation (New Format) */}
        {isNewFormat && comprehensiveFeedback?.questionEvaluations && (
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              📝 Question-wise Performance
            </h2>
            <div className="space-y-6">
              {comprehensiveFeedback.questionEvaluations.map(
                (q: any, index: number) => (
                  <div
                    key={index}
                    className="border-l-4 border-blue-500 bg-gray-50 p-5 rounded-r-lg"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-semibold text-gray-900 flex-1">
                        Q{q.questionNumber}: {q.question}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-bold ${
                          q.marksAwarded >= q.maxMarks * 0.8
                            ? "bg-green-100 text-green-700"
                            : q.marksAwarded >= q.maxMarks * 0.6
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {q.marksAwarded}/{q.maxMarks}
                      </span>
                    </div>
                    <div className="mb-3">
                      <p className="text-sm font-medium text-gray-600 mb-1">
                        Your Answer:
                      </p>
                      <p className="text-gray-700 italic bg-white p-3 rounded border">
                        "{q.studentAnswer}"
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">
                        Evaluation:
                      </p>
                      <p className="text-gray-800">{q.evaluation}</p>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        )}

        {/* Communication Insights (New Format) */}
        {isNewFormat && comprehensiveFeedback?.communicationInsights && (
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              💬 Communication & Behavioral Analysis
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">
                  Confidence Level
                </h4>
                <p className="text-gray-700">
                  {comprehensiveFeedback.communicationInsights.confidenceLevel}
                </p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-green-900 mb-2">
                  Clarity of Explanation
                </h4>
                <p className="text-gray-700">
                  {
                    comprehensiveFeedback.communicationInsights
                      .clarityOfExplanation
                  }
                </p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <h4 className="font-semibold text-purple-900 mb-2">
                  Problem Solving Approach
                </h4>
                <p className="text-gray-700">
                  {
                    comprehensiveFeedback.communicationInsights
                      .problemSolvingApproach
                  }
                </p>
              </div>
              <div className="p-4 bg-yellow-50 rounded-lg">
                <h4 className="font-semibold text-yellow-900 mb-2">
                  Use of Examples
                </h4>
                <p className="text-gray-700">
                  {comprehensiveFeedback.communicationInsights.useOfExamples}
                </p>
              </div>
            </div>
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">
                Detailed Analysis
              </h4>
              <p className="text-gray-700">
                {comprehensiveFeedback.communicationInsights.detailedAnalysis}
              </p>
            </div>
          </div>
        )}

        {/* Overall Performance (New Format) */}
        {isNewFormat &&
          comprehensiveFeedback?.performanceSummary?.overallPerformance && (
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                🎯 Overall Performance
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                {comprehensiveFeedback.performanceSummary.overallPerformance}
              </p>
            </div>
          )}

        {/* Final Feedback (New Format) */}
        {isNewFormat && comprehensiveFeedback?.finalFeedback && (
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-xl font-bold text-green-600 mb-4 flex items-center gap-2">
                  ✅ Strengths
                </h3>
                <ul className="space-y-2">
                  {comprehensiveFeedback.finalFeedback.strengths.map(
                    (strength: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">•</span>
                        <span className="text-gray-700">{strength}</span>
                      </li>
                    )
                  )}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold text-orange-600 mb-4 flex items-center gap-2">
                  📈 Areas for Improvement
                </h3>
                <ul className="space-y-2">
                  {comprehensiveFeedback.finalFeedback.areasForImprovement.map(
                    (area: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-orange-500 mt-1">•</span>
                        <span className="text-gray-700">{area}</span>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Final Assessment
              </h3>
              <p className="text-gray-700 leading-relaxed text-lg bg-blue-50 p-5 rounded-lg border-l-4 border-blue-500">
                {comprehensiveFeedback.finalFeedback.finalAssessment}
              </p>
            </div>

            {comprehensiveFeedback.finalFeedback.recommendation && (
              <div className="mt-6 bg-gradient-to-r from-indigo-50 to-blue-50 p-5 rounded-lg border border-indigo-200">
                <h3 className="text-xl font-bold text-indigo-900 mb-2">
                  💡 Recommendation
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {comprehensiveFeedback.finalFeedback.recommendation}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Old Format Feedback */}
        {!isNewFormat && (
          <>
            {feedback?.finalAssessment && (
              <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Overall Assessment
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {feedback.finalAssessment}
                </p>
              </div>
            )}

            {feedback?.categoryScores && feedback.categoryScores.length > 0 && (
              <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Interview Breakdown
                </h2>
                <div className="space-y-4">
                  {feedback.categoryScores.map((category, index) => (
                    <div
                      key={index}
                      className="border-l-4 border-blue-500 bg-gray-50 p-5 rounded-r-lg"
                    >
                      <p className="font-bold text-lg text-gray-900 mb-2">
                        {index + 1}. {category.name} ({category.score}/100)
                      </p>
                      <p className="text-gray-700">{category.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {feedback?.strengths && feedback.strengths.length > 0 && (
                <div className="bg-white rounded-2xl shadow-xl p-8">
                  <h3 className="text-xl font-bold text-green-600 mb-4">
                    ✅ Strengths
                  </h3>
                  <ul className="space-y-2">
                    {feedback.strengths.map((strength, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">•</span>
                        <span className="text-gray-700">{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {feedback?.areasForImprovement &&
                feedback.areasForImprovement.length > 0 && (
                  <div className="bg-white rounded-2xl shadow-xl p-8">
                    <h3 className="text-xl font-bold text-orange-600 mb-4">
                      📈 Areas for Improvement
                    </h3>
                    <ul className="space-y-2">
                      {feedback.areasForImprovement.map((area, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-orange-500 mt-1">•</span>
                          <span className="text-gray-700">{area}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
            </div>
          </>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            className="flex-1 bg-white hover:bg-gray-50 text-blue-600 border-2 border-blue-600"
            size="lg"
          >
            <Link
              href="/"
              className="flex w-full justify-center items-center gap-2"
            >
              <span className="text-lg">🏠</span>
              <span className="font-semibold">Back to Dashboard</span>
            </Link>
          </Button>

          <Button
            className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            size="lg"
          >
            <Link
              href={`/interview/${id}`}
              className="flex w-full justify-center items-center gap-2"
            >
              <span className="text-lg">🔄</span>
              <span className="font-semibold">Retake Interview</span>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Feedback;
