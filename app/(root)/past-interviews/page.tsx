import Link from "next/link";
import {
  Calendar,
  Clock,
  BarChart3,
  Play,
  Download,
  Eye,
  Award,
  TrendingUp,
  ChevronRight,
  Filter,
  Search,
  Star,
  Trophy,
  FileText,
  Bookmark,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/actions/auth.action";
import {
  getInterviewsByUserId,
  getFeedbackByInterviewId,
} from "@/lib/actions/general.action";
import { redirect } from "next/navigation";
import InterviewsList from "@/components/InterviewsList";

const PastInterviewsPage = async () => {
  // Get current user
  const user = await getCurrentUser();

  if (!user) {
    redirect("/sign-in");
  }

  // Fetch all interviews for the user
  const interviews = await getInterviewsByUserId(user.id);

  // Fetch feedback for each interview
  const pastInterviews = await Promise.all(
    (interviews || []).map(async (interview) => {
      const feedback = await getFeedbackByInterviewId({
        interviewId: interview.id,
        userId: user.id,
      });

      // Parse feedback data based on the new comprehensive schema
      let score = 0;
      let grade = "N/A";
      let feedbackText = "No feedback available";
      let totalQuestions = Array.isArray(interview.questions)
        ? interview.questions.length
        : 0;

      // Get subject from interview's subject field (new) or role (fallback)
      let subjectName =
        interview.subject || interview.role || "General Interview";
      let topics =
        interview.topics || interview.techstack.join(", ") || "General Topics";
      let year = interview.year || interview.level || "All Years";

      if (feedback) {
        try {
          // Use type assertion to handle dynamic feedback structure
          const feedbackAny = feedback as any;

          // Extract subject from studentInfo if available (takes priority)
          if (feedbackAny.studentInfo?.subject) {
            subjectName = feedbackAny.studentInfo.subject;
          }

          // Check if feedback has the new comprehensive structure directly
          if (feedbackAny.performanceSummary) {
            score = Math.round(feedbackAny.performanceSummary.percentage || 0);
            grade = feedbackAny.performanceSummary.grade || "N/A";
            totalQuestions =
              feedbackAny.questionEvaluations?.length || totalQuestions;
            feedbackText =
              feedbackAny.finalFeedback?.recommendation ||
              "Feedback available - click to view details";
          }
          // Check if finalAssessment is a JSON string (old comprehensive format)
          else if (
            feedbackAny.finalAssessment &&
            typeof feedbackAny.finalAssessment === "string"
          ) {
            try {
              const feedbackData = JSON.parse(feedbackAny.finalAssessment);

              if (feedbackData.performanceSummary) {
                score = Math.round(
                  feedbackData.performanceSummary.percentage || 0
                );
                grade = feedbackData.performanceSummary.grade || "N/A";
                totalQuestions =
                  feedbackData.questionEvaluations?.length || totalQuestions;
              } else if (feedbackData.categoryScores) {
                // Fallback to old format
                const avgScore =
                  feedbackData.categoryScores.reduce(
                    (sum: number, cat: any) => sum + cat.score,
                    0
                  ) / feedbackData.categoryScores.length;
                score = Math.round(avgScore);
                grade =
                  score >= 90
                    ? "A+"
                    : score >= 80
                    ? "A"
                    : score >= 70
                    ? "B+"
                    : score >= 60
                    ? "B"
                    : "C";
              }

              feedbackText =
                feedbackData.finalFeedback?.recommendation ||
                feedbackData.finalAssessment ||
                "Feedback available - click to view details";
            } catch (parseError) {
              // If JSON parsing fails, use the raw feedback as text
              feedbackText = feedbackAny.finalAssessment;
            }
          }
          // Legacy format with categoryScores array directly
          else if (
            feedbackAny.categoryScores &&
            Array.isArray(feedbackAny.categoryScores)
          ) {
            const avgScore =
              feedbackAny.categoryScores.reduce(
                (sum: number, cat: any) => sum + cat.score,
                0
              ) / feedbackAny.categoryScores.length;
            score = Math.round(avgScore);
            grade =
              score >= 90
                ? "A+"
                : score >= 80
                ? "A"
                : score >= 70
                ? "B+"
                : score >= 60
                ? "B"
                : "C";
            feedbackText =
              feedbackAny.finalAssessment ||
              "Feedback available - click to view details";
          }
        } catch (e) {
          console.error(
            "Error parsing feedback for interview",
            interview.id,
            ":",
            e
          );
          // Use default values if parsing fails
          feedbackText = "Feedback available - click to view details";
        }
      }

      // Calculate duration (mock for now since we don't store it)
      const duration = `${Math.floor(Math.random() * 10 + 10)} minutes`;

      // Format date
      const date = new Date(interview.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });

      return {
        id: interview.id,
        subject: subjectName,
        date,
        duration,
        score,
        status: interview.finalized ? "Completed" : "In Progress",
        grade,
        questions: totalQuestions,
        difficulty: interview.level || "Intermediate",
        topics: topics.split(", ").filter(Boolean),
        year: year,
        feedback: feedbackText,
        type: interview.type || "mock",
        feedbackData: feedback, // Add full feedback object
        interviewData: interview, // Add full interview object
      };
    })
  );

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

  const totalInterviews = pastInterviews.length;
  const averageScore =
    totalInterviews > 0
      ? Math.round(
          pastInterviews.reduce((sum, interview) => sum + interview.score, 0) /
            totalInterviews
        )
      : 0;
  const totalHours = pastInterviews.reduce((sum, interview) => {
    const minutes = parseInt(interview.duration.split(" ")[0]);
    return sum + minutes;
  }, 0);
  const hoursStudied = Math.round((totalHours / 60) * 10) / 10;
  const bestScore =
    totalInterviews > 0 ? Math.max(...pastInterviews.map((i) => i.score)) : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white border-b">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Past Interviews
              </h1>
              <p className="text-gray-600">
                Review your interview history, track progress, and replay
                sessions
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-3">
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Overview */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Interviews
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {totalInterviews}
                  </p>
                </div>
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Average Score
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {averageScore}%
                  </p>
                </div>
                <BarChart3 className="w-8 h-8 text-green-600" />
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Hours Practiced
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {hoursStudied}h
                  </p>
                </div>
                <Clock className="w-8 h-8 text-purple-600" />
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Best Score
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {bestScore}%
                  </p>
                </div>
                <Trophy className="w-8 h-8 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="px-4 sm:px-6 lg:px-8 mb-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search interviews by subject, date, or score..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="">All Subjects</option>
                <option value="network-security">Network Security</option>
                <option value="data-structures">Data Structures</option>
                <option value="machine-learning">Machine Learning</option>
              </select>
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="">All Grades</option>
                <option value="A+">A+</option>
                <option value="A">A</option>
                <option value="B+">B+</option>
                <option value="B">B</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Interviews List */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          {pastInterviews.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No Past Interviews Yet
              </h3>
              <p className="text-gray-600 mb-6">
                Start your first interview to see your history and track your
                progress
              </p>
              <Link href="/interview">
                <Button size="lg">
                  <Play className="w-4 h-4 mr-2" />
                  Start Your First Interview
                </Button>
              </Link>
            </div>
          ) : (
            <InterviewsList interviews={pastInterviews} userId={user.id} />
          )}
        </div>
      </section>

      {/* Performance Insights */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-t">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Your Performance Insights
            </h2>
            <p className="text-lg text-gray-600">
              Track your progress and identify areas for improvement
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <TrendingUp className="w-8 h-8 text-green-600 mr-3" />
                <h3 className="text-lg font-semibold text-gray-900">
                  Trending Up
                </h3>
              </div>
              <p className="text-2xl font-bold text-green-600 mb-1">+18%</p>
              <p className="text-sm text-gray-600">
                Average improvement over last month
              </p>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <Star className="w-8 h-8 text-blue-600 mr-3" />
                <h3 className="text-lg font-semibold text-gray-900">
                  Best Subject
                </h3>
              </div>
              <p className="text-lg font-bold text-blue-600 mb-1">
                Data Structures
              </p>
              <p className="text-sm text-gray-600">
                Consistently high performance
              </p>
            </div>

            <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <Bookmark className="w-8 h-8 text-yellow-600 mr-3" />
                <h3 className="text-lg font-semibold text-gray-900">
                  Focus Area
                </h3>
              </div>
              <p className="text-lg font-bold text-yellow-600 mb-1">
                Operating Systems
              </p>
              <p className="text-sm text-gray-600">Needs more practice</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PastInterviewsPage;
