import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import { z } from "zod";

import { db } from "@/firebase/admin";
import { GEMINI_MODEL } from "@/lib/env-validation";

const generateSchema = z.object({
  type: z.string().optional(),
  role: z.string().optional(),
  level: z.string().optional(),
  techstack: z.union([z.string(), z.array(z.string())]).optional(),
  amount: z.number().min(1).max(50).default(10),
  userid: z.string().min(1, "User ID required"),
  subject: z.string().optional(),
  year: z.string().optional(),
  topics: z.string().optional(),
  isTechnical: z.boolean().optional(),
  classroomId: z.string().optional(),
  assignmentId: z.string().optional(),
  assignmentTitle: z.string().optional(),
});

export async function POST(request: Request) {
  const result = generateSchema.safeParse(await request.json());
  if (!result.success) {
    const validationError = result.error.flatten();

    return Response.json(
      {
        success: false,
        error:
          Object.entries(validationError.fieldErrors)
            .flatMap(([field, messages]) =>
              (messages ?? []).map((message) => `${field}: ${message}`)
            )
            .join(" ") ||
          validationError.formErrors.join(" ") ||
          "Invalid interview data",
      },
      { status: 400 }
    );
  }

  const {
    type,
    role,
    level,
    techstack,
    amount = 10,
    userid,
    // new fields for vivas
    subject,
    year,
    topics,
    // optional flag to prefer technical questions
    isTechnical,
  } = result.data;

  const subjectVal = (subject ?? role ?? "General").toString();
  const yearVal = (year ?? level ?? "All Years").toString();
  const topicsVal = (topics ?? (Array.isArray(techstack) ? techstack.join(", ") : techstack) ?? "").toString();
  const technicalPref =
    typeof isTechnical === "boolean"
      ? isTechnical
      : (type ?? "").toString().toLowerCase().includes("technical");

  const prompt = `Prepare ${amount} viva/interview questions for college students.
- Subject/Course: ${subjectVal}
- Year/Semester: ${yearVal}
- Topics to cover: ${topicsVal || "general overview"}
- Question balance: ${type ?? "mixed (conceptual and practical)"}
- Technical focus: ${
    technicalPref
      ? "Prefer technical/practical questions"
      : "Prefer conceptual/behavioural questions"
  }
Instructions:
- Return only a JSON array of strings, e.g. ["Question 1", "Question 2"]
- Avoid characters that may break TTS such as "/" or "*"
- Keep each question concise (one sentence)
`;

  try {
    console.log("🤖 Calling Google AI to generate questions...");
    console.log("API Key present:", !!process.env.GOOGLE_GENERATIVE_AI_API_KEY);
    
    const { text: questions } = await generateText({
      model: google(GEMINI_MODEL),
      prompt,
    });
    
    console.log("✅ Questions generated successfully");

    // robust parsing: try JSON.parse, otherwise extract quoted lines or split by newline
    let parsedQuestions: string[] = [];
    try {
      const maybe = JSON.parse(questions);
      if (Array.isArray(maybe)) parsedQuestions = maybe.map(String);
      else throw new Error("Parsed value is not an array");
    } catch {
      // fallback: extract lines between quotes or split by newline
      const quoteMatch = [...questions.matchAll(/"([^"]+)"/g)].map((m) => m[1]);
      if (quoteMatch.length) {
        parsedQuestions = quoteMatch;
      } else {
        parsedQuestions = questions
          .split(/\r?\n/)
          .map((s) => s.trim())
          .filter((s) => s.length > 0)
          .map((s) => s.replace(/^[\d\.\-\)\s]+/, "").trim());
      }
    }

    const interview = {
      // store subject/year/topics using existing schema fields for compatibility
      role: subjectVal,
      type: type ?? (technicalPref ? "technical" : "conceptual"),
      level: yearVal,
      techstack: topicsVal
        ? topicsVal
            .split(",")
            .map((t: string) => t.trim())
            .filter(Boolean)
        : [],
      questions: parsedQuestions,
      userId: userid,
      finalized: true,
      createdAt: new Date().toISOString(),
      // Store additional fields explicitly for viva interviews
      subject: subjectVal,
      year: yearVal,
      topics: topicsVal,
    };

    const docRef = await db.collection("interviews").add(interview);

    return Response.json(
      { success: true, interviewId: docRef.id, questions: parsedQuestions },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Error in /api/vapi/generate:", error);
    console.error("Error details:", {
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    });
    return Response.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}

export async function GET() {
  return Response.json({ success: true, data: "Thank you!" }, { status: 200 });
}
