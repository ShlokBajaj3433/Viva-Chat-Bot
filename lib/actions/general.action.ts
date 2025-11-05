"use server";

import { generateObject } from "ai";
import { google } from "@ai-sdk/google";

import { db } from "@/firebase/admin";
import { feedbackSchema } from "@/constants";

export async function createFeedback(params: CreateFeedbackParams) {
  const { interviewId, userId, transcript, feedbackId } = params;

  try {
    // Get interview details for context
    const interviewDoc = await db
      .collection("interviews")
      .doc(interviewId)
      .get();
    const interviewData = interviewDoc.data();

    const formattedTranscript = transcript
      .map(
        (sentence: { role: string; content: string }) =>
          `- ${sentence.role}: ${sentence.content}\n`
      )
      .join("");

    const currentDate = new Date().toISOString();

    const { object } = await generateObject({
      model: google("gemini-2.0-flash-001", {
        structuredOutputs: false,
      }),
      schema: feedbackSchema,
      prompt: `
You are an intelligent Viva Evaluation Assistant responsible for generating a professional viva/interview report based on the conversation transcript.

### Interview Context:
- Subject: ${interviewData?.role || "General"}
- Year/Level: ${interviewData?.level || "N/A"}
- Topics: ${interviewData?.techstack?.join(", ") || "Various Topics"}
- Type: ${interviewData?.type || "Mixed"}
- Total Questions: ${interviewData?.questions?.length || "Multiple"}
- Date: ${currentDate}

### Conversation Transcript:
${formattedTranscript}

---

## 🎓 Your Task: Generate a Comprehensive Viva Report

Analyze the entire conversation and generate a detailed evaluation following this structure:

### 1️⃣ Student & Viva Information
Extract or infer:
- Student name from transcript
- Subject, year, topics from context above
- Viva type and difficulty level
- Total questions asked

### 2️⃣ Question-wise Evaluation
For EACH question in the transcript:
- Identify the question asked by the assistant/interviewer
- Summarize the student's answer (2-3 sentences)
- Provide constructive evaluation (2-3 sentences analyzing correctness, depth, clarity)
- Award marks out of 5 based on:
  * Correctness (0-2 points)
  * Depth of understanding (0-2 points)
  * Clarity and communication (0-1 point)

### 3️⃣ Performance Summary
Calculate:
- Total marks possible (number of questions × 5)
- Marks obtained (sum of all question marks)
- Percentage = (marks obtained / total marks) × 100
- Grade based on percentage:
  * 90-100%: A+ (Outstanding)
  * 80-89%: A (Excellent)
  * 70-79%: B+ (Very Good)
  * 60-69%: B (Good)
  * 50-59%: C (Average)
  * Below 50%: D (Needs Improvement)
- Overall performance summary (3-4 sentences highlighting key strengths and weaknesses)

### 4️⃣ Communication & Behavioural Insights
Analyze and describe:
- **Confidence Level**: Low/Moderate/High with justification
- **Clarity of Explanation**: How well they articulated concepts
- **Problem-Solving Approach**: Logical thinking and methodology
- **Use of Examples**: Did they use practical examples or real-world applications?
- **Engagement Level**: Active participation and curiosity
- **Detailed Analysis**: 4-5 sentences comprehensive behavioral assessment

### 5️⃣ Category Scores (0-100 scale)
Evaluate on:
1. **Communication Skills**: Clarity, articulation, structured responses
2. **Technical Knowledge**: Understanding of key concepts
3. **Problem Solving**: Analytical thinking and solutions
4. **Cultural Fit**: Professionalism and approach
5. **Confidence and Clarity**: Overall confidence and engagement

### 6️⃣ Final Feedback & Recommendation
Provide:
- **Strengths**: 3-5 specific strengths demonstrated
- **Areas for Improvement**: 3-5 specific areas needing work
- **Recommendation**: 3-5 sentences formal recommendation (e.g., ready for next level, needs more preparation, suitable for internship, etc.)
- **Final Assessment**: Overall concluding paragraph (3-4 sentences)

---

## Important Guidelines:
- Be thorough, fair, and constructive
- Don't be overly lenient - point out genuine mistakes
- Provide specific, actionable feedback
- Base all evaluations on actual transcript content
- If student struggled, reflect that in marks and feedback
- If student excelled, acknowledge and celebrate it
- Use professional, academic tone throughout
`,
      system:
        "You are a professional viva examiner and report generator. Your evaluations are thorough, fair, and constructive. You provide detailed analysis based on actual performance.",
    });

    const feedback = {
      interviewId: interviewId,
      userId: userId,

      // New comprehensive structure
      studentInfo: object.studentInfo,
      questionEvaluations: object.questionEvaluations,
      performanceSummary: object.performanceSummary,
      communicationInsights: object.communicationInsights,
      finalFeedback: object.finalFeedback,

      // Backwards compatibility
      totalScore: object.totalScore,
      categoryScores: object.categoryScores,
      strengths: object.finalFeedback.strengths,
      areasForImprovement: object.finalFeedback.areasForImprovement,
      finalAssessment: object.finalFeedback.finalAssessment,

      createdAt: new Date().toISOString(),
    };

    let feedbackRef;

    if (feedbackId) {
      feedbackRef = db.collection("feedback").doc(feedbackId);
    } else {
      feedbackRef = db.collection("feedback").doc();
    }

    await feedbackRef.set(feedback);

    return { success: true, feedbackId: feedbackRef.id };
  } catch (error) {
    console.error("Error saving feedback:", error);
    return { success: false };
  }
}

export async function getInterviewById(id: string): Promise<Interview | null> {
  const interview = await db.collection("interviews").doc(id).get();

  return interview.data() as Interview | null;
}

export async function getFeedbackByInterviewId(
  params: GetFeedbackByInterviewIdParams
): Promise<Feedback | null> {
  const { interviewId, userId } = params;

  const querySnapshot = await db
    .collection("feedback")
    .where("interviewId", "==", interviewId)
    .where("userId", "==", userId)
    .limit(1)
    .get();

  if (querySnapshot.empty) return null;

  const feedbackDoc = querySnapshot.docs[0];
  return { id: feedbackDoc.id, ...feedbackDoc.data() } as Feedback;
}

export async function getLatestInterviews(
  params: GetLatestInterviewsParams
): Promise<Interview[] | null> {
  const { userId, limit = 20 } = params;

  // Simplified query to avoid index requirements
  const interviews = await db
    .collection("interviews")
    .where("finalized", "==", true)
    .limit(limit * 2) // Get more to filter out user's own interviews
    .get();

  // Filter and sort in memory to avoid complex index requirements
  const allInterviews = interviews.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Interview[];

  const filteredInterviews = allInterviews
    .filter((interview: Interview) => interview.userId !== userId)
    .sort(
      (a: Interview, b: Interview) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, limit);

  return filteredInterviews;
}

export async function getInterviewsByUserId(
  userId: string
): Promise<Interview[] | null> {
  const interviews = await db
    .collection("interviews")
    .where("userId", "==", userId)
    .get();

  // Sort in memory to avoid index requirements
  const allInterviews = interviews.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Interview[];

  // Sort by createdAt descending
  return allInterviews.sort(
    (a: Interview, b: Interview) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}
