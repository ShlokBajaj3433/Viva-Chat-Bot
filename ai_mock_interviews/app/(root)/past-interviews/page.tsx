import { getCurrentUser } from "@/lib/actions/auth.action";
import {
  getInterviewsByUserId,
  getFeedbackByInterviewId,
} from "@/lib/actions/general.action";
import { redirect } from "next/navigation";
import PastInterviewsClient from "@/components/PastInterviewsClient";

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
      let marksObtained: number | null = null;
      let totalMarks: number | null = null;

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
            marksObtained =
              feedbackAny.performanceSummary.marksObtained ?? marksObtained;
            totalMarks =
              feedbackAny.performanceSummary.totalMarks ?? totalMarks;
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
                marksObtained =
                  feedbackData.performanceSummary.marksObtained ??
                  marksObtained;
                totalMarks =
                  feedbackData.performanceSummary.totalMarks ?? totalMarks;
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
            marksObtained = Math.round(avgScore);
            totalMarks = 100;
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
        scoreDetail: {
          obtained: marksObtained,
          total: totalMarks,
        },
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
    <PastInterviewsClient
      pastInterviews={pastInterviews}
      userId={user.id}
      totalInterviews={totalInterviews}
      averageScore={averageScore}
      hoursStudied={hoursStudied}
      bestScore={bestScore}
    />
  );
};

export default PastInterviewsPage;
