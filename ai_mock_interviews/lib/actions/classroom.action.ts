"use server";

import { db } from "@/firebase/admin";
import crypto from "crypto";

/**
 * Generate a unique 6-character classroom code
 */
function generateClassroomCode(): string {
  return crypto.randomBytes(3).toString("hex").toUpperCase();
}

/**
 * Create a new classroom (instructor action)
 */
export async function createClassroom(params: {
  name: string;
  subject: string;
  description?: string;
  instructorId: string;
  instructorName: string;
  section?: string;
  room?: string;
  color?: string;
}): Promise<Classroom> {
  try {
    const {
      name,
      subject,
      description,
      instructorId,
      instructorName,
      section,
      room,
      color,
    } = params;

    const code = generateClassroomCode();
    const now = new Date().toISOString();

    const classroomData: Classroom = {
      id: "", // Will be set by Firestore
      name,
      code,
      subject,
      description,
      instructorId,
      instructorName,
      studentIds: [],
      createdAt: now,
      updatedAt: now,
      status: "active",
      section,
      room,
      color,
    };

    const docRef = await db.collection("classrooms").add(classroomData);
    classroomData.id = docRef.id;

    return classroomData;
  } catch (error) {
    console.error("Error creating classroom:", error);
    throw new Error("Failed to create classroom");
  }
}

/**
 * Join a classroom using classroom code
 */
export async function joinClassroom(params: {
  classroomCode: string;
  studentId: string;
}): Promise<Classroom> {
  try {
    const { classroomCode, studentId } = params;

    // Find classroom by code
    const snapshot = await db
      .collection("classrooms")
      .where("code", "==", classroomCode.toUpperCase())
      .limit(1)
      .get();

    if (snapshot.empty) {
      throw new Error("Classroom not found. Please check the class code.");
    }

    const classroomDoc = snapshot.docs[0];
    const classroom = classroomDoc.data() as Classroom;

    // Check if student is already enrolled
    if (classroom.studentIds.includes(studentId)) {
      throw new Error("You are already enrolled in this classroom.");
    }

    // Add student to classroom
    const updatedStudentIds = [...classroom.studentIds, studentId];
    const now = new Date().toISOString();

    await classroomDoc.ref.update({
      studentIds: updatedStudentIds,
      updatedAt: now,
    });

    // Create enrollment record
    await db
      .collection("classrooms")
      .doc(classroomDoc.id)
      .collection("enrollments")
      .doc(studentId)
      .set({
        studentId,
        enrolledAt: now,
        status: "active",
      });

    classroom.id = classroomDoc.id;
    classroom.studentIds = updatedStudentIds;
    classroom.updatedAt = now;

    return classroom;
  } catch (error) {
    console.error("Error joining classroom:", error);
    throw error;
  }
}

/**
 * Get all classrooms for a student
 */
export async function getStudentClassrooms(studentId: string): Promise<Classroom[]> {
  try {
    const snapshot = await db
      .collection("classrooms")
      .where("studentIds", "array-contains", studentId)
      .get();

    const classrooms: Classroom[] = [];
    snapshot.forEach((doc) => {
      const data = doc.data() as Classroom;
      data.id = doc.id;
      classrooms.push(data);
    });

    return classrooms.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  } catch (error) {
    console.error("Error fetching student classrooms:", error);
    throw new Error("Failed to fetch classrooms");
  }
}

/**
 * Get classroom details by ID
 */
export async function getClassroom(classroomId: string): Promise<Classroom | null> {
  try {
    const doc = await db.collection("classrooms").doc(classroomId).get();

    if (!doc.exists) {
      return null;
    }

    const classroom = doc.data() as Classroom;
    classroom.id = doc.id;
    return classroom;
  } catch (error) {
    console.error("Error fetching classroom:", error);
    throw new Error("Failed to fetch classroom");
  }
}

/**
 * Create a new assignment for a classroom
 */
export async function createAssignment(params: {
  classroomId: string;
  title: string;
  subject: string;
  description?: string;
  dueDate: string;
  status: "active" | "inactive" | "closed";
  assignmentType: "viva" | "quiz" | "project";
  vivaConfig?: {
    role: string;
    level: string;
    techStack: string[];
    questionCount?: number;
    duration?: number;
  };
}): Promise<ClassroomAssignment> {
  try {
    const {
      classroomId,
      title,
      subject,
      description,
      dueDate,
      status,
      assignmentType,
      vivaConfig,
    } = params;

    const now = new Date().toISOString();

    const assignmentData: ClassroomAssignment = {
      id: "", // Will be set by Firestore
      classroomId,
      title,
      description,
      subject,
      dueDate,
      createdAt: now,
      updatedAt: now,
      status,
      assignmentType,
      vivaConfig,
    };

    const docRef = await db
      .collection("classrooms")
      .doc(classroomId)
      .collection("assignments")
      .add(assignmentData);

    assignmentData.id = docRef.id;
    return assignmentData;
  } catch (error) {
    console.error("Error creating assignment:", error);
    throw new Error("Failed to create assignment");
  }
}

/**
 * Get assignments for a classroom
 */
export async function getClassroomAssignments(
  classroomId: string
): Promise<ClassroomAssignment[]> {
  try {
    const snapshot = await db
      .collection("classrooms")
      .doc(classroomId)
      .collection("assignments")
      .orderBy("dueDate", "asc")
      .get();

    const assignments: ClassroomAssignment[] = [];
    snapshot.forEach((doc) => {
      const data = doc.data() as ClassroomAssignment;
      data.id = doc.id;
      assignments.push(data);
    });

    return assignments;
  } catch (error) {
    console.error("Error fetching classroom assignments:", error);
    throw new Error("Failed to fetch assignments");
  }
}

/**
 * Get all upcoming assignments for a student across all classrooms
 */
export async function getStudentUpcomingAssignments(
  studentId: string
): Promise<(ClassroomAssignment & { classroomName: string })[]> {
  try {
    const classrooms = await getStudentClassrooms(studentId);
    const now = new Date();
    const upcomingAssignments: (ClassroomAssignment & {
      classroomName: string;
    })[] = [];

    for (const classroom of classrooms) {
      const assignments = await getClassroomAssignments(classroom.id);

      for (const assignment of assignments) {
        const dueDate = new Date(assignment.dueDate);
        // Show assignments that are active and not past due (plus 24 hours grace period)
        if (
          assignment.status === "active" &&
          dueDate.getTime() > now.getTime() - 24 * 60 * 60 * 1000
        ) {
          upcomingAssignments.push({
            ...assignment,
            classroomName: classroom.name,
          });
        }
      }
    }

    return upcomingAssignments.sort(
      (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
    );
  } catch (error) {
    console.error("Error fetching student upcoming assignments:", error);
    throw new Error("Failed to fetch upcoming assignments");
  }
}

/**
 * Start an assignment (create progress record)
 */
export async function startAssignment(params: {
  assignmentId: string;
  classroomId: string;
  studentId: string;
  interviewId: string;
}): Promise<StudentAssignmentProgress> {
  try {
    const { assignmentId, classroomId, studentId, interviewId } = params;
    const now = new Date().toISOString();

    // Check if progress already exists
    const existingSnapshot = await db
      .collection("studentProgress")
      .where("assignmentId", "==", assignmentId)
      .where("studentId", "==", studentId)
      .limit(1)
      .get();

    let progressId: string;

    if (!existingSnapshot.empty) {
      // Update existing progress
      const existingDoc = existingSnapshot.docs[0];
      progressId = existingDoc.id;
      await existingDoc.ref.update({
        status: "in_progress",
        interviewId,
        startedAt: now,
        updatedAt: now,
      });
    } else {
      // Create new progress record
      const progressData: StudentAssignmentProgress = {
        id: "",
        studentId,
        assignmentId,
        classroomId,
        status: "in_progress",
        interviewId,
        startedAt: now,
        createdAt: now,
        updatedAt: now,
      };

      const docRef = await db
        .collection("studentProgress")
        .add(progressData);
      progressId = docRef.id;
      progressData.id = progressId;
      return progressData;
    }

    // Fetch and return the updated record
    const progressDoc = await db
      .collection("studentProgress")
      .doc(progressId)
      .get();

    const progress = progressDoc.data() as StudentAssignmentProgress;
    progress.id = progressDoc.id;
    return progress;
  } catch (error) {
    console.error("Error starting assignment:", error);
    throw new Error("Failed to start assignment");
  }
}

/**
 * Submit an assignment (update status and add feedback)
 */
export async function submitAssignment(params: {
  assignmentId: string;
  studentId: string;
  feedbackId: string;
  score?: number;
}): Promise<StudentAssignmentProgress> {
  try {
    const { assignmentId, studentId, feedbackId, score } = params;
    const now = new Date().toISOString();

    const snapshot = await db
      .collection("studentProgress")
      .where("assignmentId", "==", assignmentId)
      .where("studentId", "==", studentId)
      .limit(1)
      .get();

    if (snapshot.empty) {
      throw new Error("Assignment progress not found");
    }

    const progressDoc = snapshot.docs[0];
    await progressDoc.ref.update({
      status: "submitted",
      feedbackId,
      score,
      submittedAt: now,
      updatedAt: now,
    });

    const updatedData = progressDoc.data() as StudentAssignmentProgress;
    updatedData.id = progressDoc.id;
    updatedData.status = "submitted";
    updatedData.feedbackId = feedbackId;
    updatedData.score = score;
    updatedData.submittedAt = now;
    updatedData.updatedAt = now;

    return updatedData;
  } catch (error) {
    console.error("Error submitting assignment:", error);
    throw new Error("Failed to submit assignment");
  }
}

/**
 * Get student assignment progress
 */
export async function getStudentAssignmentProgress(
  studentId: string,
  assignmentId: string
): Promise<StudentAssignmentProgress | null> {
  try {
    const snapshot = await db
      .collection("studentProgress")
      .where("studentId", "==", studentId)
      .where("assignmentId", "==", assignmentId)
      .limit(1)
      .get();

    if (snapshot.empty) {
      return null;
    }

    const data = snapshot.docs[0].data() as StudentAssignmentProgress;
    data.id = snapshot.docs[0].id;
    return data;
  } catch (error) {
    console.error("Error fetching student assignment progress:", error);
    throw new Error("Failed to fetch assignment progress");
  }
}

/**
 * Get all student progress across classrooms
 */
export async function getStudentProgress(studentId: string): Promise<{
  totalAssignments: number;
  completedAssignments: number;
  pendingAssignments: number;
  averageScore: number;
  progressByClassroom: Array<{
    classroomId: string;
    classroomName: string;
    completed: number;
    total: number;
    averageScore: number;
  }>;
}> {
  try {
    const classrooms = await getStudentClassrooms(studentId);
    const snapshot = await db
      .collection("studentProgress")
      .where("studentId", "==", studentId)
      .get();

    let totalAssignments = 0;
    let completedAssignments = 0;
    let totalScore = 0;
    const classroomMap: { [key: string]: { total: number; completed: number; totalScore: number } } = {};

    snapshot.forEach((doc) => {
      const progress = doc.data() as StudentAssignmentProgress;
      totalAssignments++;

      if (progress.status === "submitted") {
        completedAssignments++;
        if (progress.score) {
          totalScore += progress.score;
        }
      }

      if (!classroomMap[progress.classroomId]) {
        classroomMap[progress.classroomId] = { total: 0, completed: 0, totalScore: 0 };
      }
      classroomMap[progress.classroomId].total++;
      if (progress.status === "submitted") {
        classroomMap[progress.classroomId].completed++;
        if (progress.score) {
          classroomMap[progress.classroomId].totalScore += progress.score;
        }
      }
    });

    const progressByClassroom = classrooms.map((classroom) => ({
      classroomId: classroom.id,
      classroomName: classroom.name,
      completed: classroomMap[classroom.id]?.completed || 0,
      total: classroomMap[classroom.id]?.total || 0,
      averageScore:
        classroomMap[classroom.id]?.completed > 0
          ? Math.round(
              (classroomMap[classroom.id].totalScore /
                classroomMap[classroom.id].completed) *
                100
            ) / 100
          : 0,
    }));

    const averageScore =
      completedAssignments > 0
        ? Math.round((totalScore / completedAssignments) * 100) / 100
        : 0;

    return {
      totalAssignments,
      completedAssignments,
      pendingAssignments: totalAssignments - completedAssignments,
      averageScore,
      progressByClassroom,
    };
  } catch (error) {
    console.error("Error fetching student progress:", error);
    throw new Error("Failed to fetch student progress");
  }
}
