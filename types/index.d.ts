interface Feedback {
  id: string;
  interviewId: string;
  totalScore: number;
  categoryScores: Array<{
    name: string;
    score: number;
    comment: string;
  }>;
  strengths: string[];
  areasForImprovement: string[];
  finalAssessment: string;
  createdAt: string;
  // New comprehensive structure fields
  studentInfo?: any;
  questionEvaluations?: Array<{
    questionNumber: number;
    question: string;
    studentAnswer: string;
    evaluation: string;
    marksAwarded: number;
    maxMarks: number;
  }>;
  performanceSummary?: {
    totalMarks: number;
    marksObtained: number;
    percentage: number;
    grade: string;
    overallPerformance: string;
  };
  communicationInsights?: any;
  finalFeedback?: {
    strengths: string[];
    areasForImprovement: string[];
    recommendation: string;
    finalAssessment: string;
  };
}

interface Interview {
  id: string;
  role: string;
  level: string;
  questions: string[];
  techstack: string[];
  createdAt: string;
  userId: string;
  type: string;
  finalized: boolean;
  // Additional fields for viva interviews
  subject?: string;
  year?: string;
  topics?: string;
  bookmarked?: boolean;
}

interface CreateFeedbackParams {
  interviewId: string;
  userId: string;
  transcript: { role: string; content: string }[];
  feedbackId?: string;
}

interface User {
  name: string;
  email: string;
  id: string;
}

interface InterviewCardProps {
  interviewId?: string;
  userId?: string;
  role: string; // This now contains the subject name
  type: string;
  techstack: string[];
  createdAt?: string;
  subject?: string;
  year?: string;
  topics?: string;
}

interface AgentProps {
  userName: string;
  userId?: string;
  interviewId?: string;
  feedbackId?: string;
  type: "generate" | "interview";
  questions?: string[];
}

interface RouteParams {
  params: Promise<Record<string, string>>;
  searchParams: Promise<Record<string, string>>;
}

interface GetFeedbackByInterviewIdParams {
  interviewId: string;
  userId: string;
}

interface GetLatestInterviewsParams {
  userId: string;
  limit?: number;
}

interface SignInParams {
  email: string;
  idToken: string;
}

interface SignUpParams {
  uid: string;
  name: string;
  email: string;
  password: string;
}

type FormType = "sign-in" | "sign-up";

interface InterviewFormProps {
  interviewId: string;
  role: string;
  level: string;
  type: string;
  techstack: string[];
  amount: number;
}

interface TechIconProps {
  techStack: string[];
}
