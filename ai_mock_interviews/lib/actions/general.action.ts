"use server";

import { generateObject } from "ai";
import { google } from "@ai-sdk/google";

import { db } from "@/firebase/admin";
import { feedbackSchema } from "@/constants";

export async function createFeedback(params: CreateFeedbackParams) {
  const { interviewId, userId, transcript, feedbackId, duration } = params;

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
      model: google("gemini-2.5-flash-lite"),
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
- Student name from transcript (if mentioned)
- Subject, year, topics from context above
- Viva type and difficulty level
- Total SUBJECT-RELATED questions asked (exclude greetings, introductions, and administrative questions)

### 2️⃣ Question-wise Evaluation
**IMPORTANT**: Only evaluate SUBJECT-RELATED questions. EXCLUDE:
- Greeting questions (e.g., "What's your name?", "How are you?")
- Introduction questions (e.g., "Tell me about yourself")
- Administrative questions (e.g., "Are you ready?", "Can you hear me?")
- Small talk and pleasantries

For EACH SUBJECT-RELATED question in the transcript:
- Identify the question asked by the assistant/interviewer
- Summarize the student's answer (2-3 sentences)
- Provide constructive evaluation (2-3 sentences analyzing correctness, depth, clarity)
- Award marks out of 5 based on:
  * Correctness (0-2 points)
  * Depth of understanding (0-2 points)
  * Clarity and communication (0-1 point)
- **Provide Educational References**: For each question, include 1-3 learning resources as strings in this EXACT format:
  * Format: "Platform: Topic - URL - Description"
  * Example: "GeeksforGeeks: Arrays in Data Structures - https://www.geeksforgeeks.org/array-data-structure/ - Comprehensive guide covering array concepts and operations"
  * **Trusted Platforms Only**: GeeksforGeeks (GFG), TutorialsPoint, W3Schools, MDN Web Docs, JavaTpoint, Programiz
  * URLs must be direct topic links (not homepage); include a topic path/slug

### 3️⃣ Performance Summary
Calculate based ONLY on subject-related questions:
- Total marks possible (number of SUBJECT-RELATED questions × 5)
- Marks obtained (sum of all question marks from subject-related questions only)
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
- **Recommended Resources**: 3-5 learning resources as strings in this EXACT format:
  * Format: "Platform: Topic - URL - Reason"
  * Example: "GeeksforGeeks: Object Oriented Programming - https://www.geeksforgeeks.org/object-oriented-programming-oops-concept-in-java/ - Master OOP concepts to improve code structure"
  * **Trusted Platforms Only**: GeeksforGeeks, TutorialsPoint, W3Schools, MDN Web Docs, JavaTpoint, Programiz

---

## Important Guidelines:
- **CRITICALLY IMPORTANT**: Only evaluate and count subject-related questions. Completely ignore:
  * Greetings (e.g., "Hello", "What's your name?", "How are you?")
  * Introductions (e.g., "Tell me about yourself", "Are you ready to begin?")
  * Administrative questions (e.g., "Can you hear me?", "Do you understand?")
  * Small talk and pleasantries
- **Educational References are MANDATORY**: Every question evaluation MUST include 1-3 references from trusted platforms
- **Use Only Trusted Platforms**: GeeksforGeeks (GFG), TutorialsPoint, W3Schools, MDN Web Docs, JavaTpoint, or Programiz
- **Provide Accurate URLs**: URLs must be real, working links to actual resources on these platforms and MUST include a topic path (no homepage links)
- Be thorough, fair, and constructive
- Don't be overly lenient - point out genuine mistakes
- Provide specific, actionable feedback
- Base all evaluations on actual transcript content
- If student struggled, reflect that in marks and feedback
- If student excelled, acknowledge and celebrate it
- Use professional, academic tone throughout
- Focus ONLY on technical/subject knowledge demonstration
`,
      system:
        "You are a professional viva examiner and report generator. Your evaluations are thorough, fair, and constructive. You provide detailed analysis based on actual performance.",
    });

    // Sanitize references to ensure topic URLs (not homepages)
    const extractUrl = (ref: string) => {
      const m = ref.match(/https?:\/\/[^\s]+/);
      return m ? m[0] : "";
    };
    const isTopicUrl = (url: string) => /https?:\/\/[^/]+\/.+/.test(url);
    const sanitizeRefs = (refs?: string[]) => {
      if (!Array.isArray(refs)) return [];
      return refs.filter((ref) => {
        const url = extractUrl(ref);
        return !!url && isTopicUrl(url);
      });
    };

    const sanitizedQuestionEvaluations = Array.isArray(object.questionEvaluations)
      ? object.questionEvaluations.map((q: any) => ({
          ...q,
          educationalReferences: sanitizeRefs(q.educationalReferences),
        }))
      : [];

    const sanitizedFinalFeedback = object.finalFeedback
      ? {
          ...object.finalFeedback,
          recommendedResources: sanitizeRefs(object.finalFeedback.recommendedResources),
        }
      : object.finalFeedback;

    const feedback = {
      interviewId: interviewId,
      userId: userId,
      duration: duration || 0, // Duration in seconds

      // New comprehensive structure
      studentInfo: object.studentInfo,
      questionEvaluations: sanitizedQuestionEvaluations,
      performanceSummary: object.performanceSummary,
      communicationInsights: object.communicationInsights,
      finalFeedback: sanitizedFinalFeedback,

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

export async function toggleBookmark(
  interviewId: string,
  userId: string
): Promise<{ success: boolean; bookmarked?: boolean }> {
  try {
    const interviewRef = db.collection("interviews").doc(interviewId);
    const interviewDoc = await interviewRef.get();

    if (!interviewDoc.exists) {
      return { success: false };
    }

    const interviewData = interviewDoc.data();

    // Verify the interview belongs to the user
    if (interviewData?.userId !== userId) {
      return { success: false };
    }

    const currentBookmarkStatus = interviewData?.bookmarked || false;
    const newBookmarkStatus = !currentBookmarkStatus;

    await interviewRef.update({
      bookmarked: newBookmarkStatus,
    });

    return { success: true, bookmarked: newBookmarkStatus };
  } catch (error) {
    console.error("Error toggling bookmark:", error);
    return { success: false };
  }
}

// export async function submitProjectFeedback(params: {
//   name: string;
//   email?: string;
//   rating: number;
//   category: string;
//   experience: string;
//   improvements?: string;
//   features?: string;
//   recommend: string;
//   comments?: string;
// }): Promise<{ success: boolean; message?: string }> {
//   try {
//     const feedbackData = {
//       ...params,
//       submittedAt: new Date().toISOString(),
//       status: "new", // For admin review
//     };

//     // Add to Firestore 'projectFeedback' collection
//     const feedbackRef = await db
//       .collection("projectFeedback")
//       .add(feedbackData);

//     console.log("Feedback submitted successfully:", feedbackRef.id);

//     return {
//       success: true,
//       message: "Thank you for your feedback! We appreciate your input.",
//     };
//   } catch (error) {
//     console.error("Error submitting feedback:", error);
//     return {
//       success: false,
//       message: "Failed to submit feedback. Please try again later.",
//     };
//   }
// }
