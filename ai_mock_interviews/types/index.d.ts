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
    educationalReferences?: string[];
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
    recommendedResources?: string[];
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

// ============= CLASSROOM & ASSIGNMENT TYPES =============

interface Classroom {
  id: string;
  name: string;
  code: string; // Unique 6-character code for joining
  subject: string;
  description?: string;
  instructorId: string;
  instructorName: string;
  studentIds: string[];
  createdAt: string;
  updatedAt: string;
  status: "active" | "archived";
  color?: string; // For card background (hex or tailwind class)
  section?: string;
  room?: string;
}

interface ClassroomAssignment {
  id: string;
  classroomId: string;
  title: string;
  description?: string;
  subject: string;
  dueDate: string; // ISO 8601 format
  createdAt: string;
  updatedAt: string;
  status: "active" | "inactive" | "closed";
  assignmentType: "viva" | "quiz" | "project";
  vivaConfig?: {
    role: string;
    level: string;
    techStack: string[];
    questionCount?: number;
    duration?: number; // in minutes
  };
}

interface StudentAssignmentProgress {
  id: string;
  studentId: string;
  assignmentId: string;
  classroomId: string;
  status: "not_started" | "in_progress" | "submitted";
  interviewId?: string;
  feedbackId?: string;
  score?: number;
  feedback?: any;
  startedAt?: string;
  submittedAt?: string;
  createdAt: string;
  updatedAt: string;
}

interface ClassroomEnrollment {
  studentId: string;
  classroomId: string;
  enrolledAt: string;
  status: "active" | "inactive";
}
