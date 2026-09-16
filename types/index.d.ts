interface StudentInfo {
  studentName: string;
  subject: string;
  year: string;
  topics: string;
  vivaType: string;
  difficultyLevel: string;
  dateTime: string;
  totalQuestions: number;
}

interface QuestionEvaluation {
  questionNumber: number;
  question: string;
  studentAnswer: string;
  evaluation: string;
  marksAwarded: number;
  maxMarks: number;
}

interface PerformanceSummary {
  totalMarks: number;
  marksObtained: number;
  percentage: number;
  grade: string;
  overallPerformance: string;
}

interface CommunicationInsights {
  confidenceLevel: string;
  clarityOfExplanation: string;
  problemSolvingApproach: string;
  useOfExamples: string;
  engagementLevel: string;
  detailedAnalysis: string;
}

interface CategoryScore {
  name: string;
  score: number;
  comment: string;
}

interface FinalFeedback {
  strengths: string[];
  areasForImprovement: string[];
  recommendation: string;
  finalAssessment: string;
}

interface Feedback {
  id: string;
  interviewId: string;
  userId: string;
  studentInfo: StudentInfo;
  questionEvaluations: QuestionEvaluation[];
  performanceSummary: PerformanceSummary;
  communicationInsights: CommunicationInsights;
  finalFeedback: FinalFeedback;
  categoryScores: CategoryScore[];
  totalScore: number;
  strengths: string[];
  areasForImprovement: string[];
  finalAssessment: string;
  createdAt: string;
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
  subject?: string;
  year?: string;
  topics?: string;
  bookmarked?: boolean;
  coverImage?: string;
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
  role: string;
  type: string;
  techstack: string[];
  createdAt?: string;
  subject?: string;
  year?: string;
  topics?: string;
}

interface AgentProps {
  userName: string;
  userId: string;
  interviewId: string;
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

interface ProjectFeedback {
  id?: string;
  name: string;
  email?: string;
  rating: number;
  category: string;
  experience: string;
  improvements?: string;
  features?: string;
  recommend: string;
  comments?: string;
  submittedAt: string;
  status: string;
}

interface InterviewConfig {
  subject?: string;
  year?: string;
  topics?: string;
  type?: string;
  role?: string;
  level?: string;
  techstack?: string;
  isTechnical?: boolean;
  numberOfQuestions?: number;
  timeLimit?: number;
  difficulty?: string;
  focusArea?: string;
}