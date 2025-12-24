"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  User,
  Bookmark,
  TrendingUp,
  Clock,
  BookOpen,
  LogOut,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import ClassroomCard from "@/components/ClassroomCard";
import UpcomingAssignments from "@/components/UpcomingAssignments";
import VivaStatusDashboard from "@/components/VivaStatusDashboard";
import QuickActionsPanel from "@/components/QuickActionsPanel";
import JoinClassroomModal from "@/components/JoinClassroomModal";
import { getCurrentUser } from "@/lib/actions/auth.action";

import {
  getStudentClassrooms,
  getStudentUpcomingAssignments,
  getStudentProgress,
  joinClassroom,
} from "@/lib/actions/classroom.action";

interface DashboardStats {
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
}

export default function StudentDashboardClient() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [classrooms, setClassrooms] = useState<Classroom[]>([]);
  const [assignments, setAssignments] = useState<(ClassroomAssignment & { classroomName: string })[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [isJoining, setIsJoining] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<ClassroomAssignment & { classroomName: string } | null>(null);

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        // Get current user
        const currentUser = await getCurrentUser();
        if (!currentUser) {
          router.push("/sign-in");
          return;
        }
        setUser(currentUser);

        // Fetch classrooms
        const classroomsData = await getStudentClassrooms(currentUser.id);
        setClassrooms(classroomsData);

        // Fetch assignments
        const assignmentsData = await getStudentUpcomingAssignments(
          currentUser.id
        );
        setAssignments(assignmentsData);

        // Fetch progress stats
        const progressData = await getStudentProgress(currentUser.id);
        setStats(progressData);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        toast.error("Failed to load dashboard data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [router]);

  const handleJoinClassroom = async (classCode: string) => {
    if (!user) return;

    try {
      setIsJoining(true);
      const newClassroom = await joinClassroom({
        classroomCode: classCode,
        studentId: user.id,
      });

      // Update classrooms list
      setClassrooms((prev) => [newClassroom, ...prev]);

      toast.success(`Successfully joined ${newClassroom.name}!`);
      setIsJoinModalOpen(false);
    } catch (error: any) {
      toast.error(error.message || "Failed to join classroom");
      throw error;
    } finally {
      setIsJoining(false);
    }
  };

  const handleStartViva = async (
    assignment: ClassroomAssignment & { classroomName: string }
  ) => {
    setSelectedAssignment(assignment);
    // TODO: Open viva configuration modal or redirect to interview setup
    // For now, navigate to the viva generation page
    if (assignment.vivaConfig) {
      const params = new URLSearchParams({
        classroom: assignment.classroomId,
        assignment: assignment.id,
        role: assignment.vivaConfig.role,
        level: assignment.vivaConfig.level,
        techstack: assignment.vivaConfig.techStack?.join(",") || "",
      });
      router.push(`/interview?${params.toString()}`);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
            <p className="mt-4 text-gray-600">Loading your dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">
                Welcome, {user?.name?.split(" ")[0]}! 👋
              </h1>
              <p className="text-gray-600 mt-1">
                Track your classroom progress and viva interviews in one place
              </p>
            </div>
            <Button
              variant="outline"
              className="text-gray-700 hover:text-red-600"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8 pb-32">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-600 text-sm font-medium uppercase tracking-wider">
                  Classrooms
                </p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {classrooms.length}
                </p>
              </div>
              <BookOpen className="w-10 h-10 text-blue-200" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-600 text-sm font-medium uppercase tracking-wider">
                  Completed
                </p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {stats?.completedAssignments || 0}
                </p>
              </div>
              <Bookmark className="w-10 h-10 text-green-200" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-orange-500">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-600 text-sm font-medium uppercase tracking-wider">
                  Pending
                </p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {stats?.pendingAssignments || 0}
                </p>
              </div>
              <Clock className="w-10 h-10 text-orange-200" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-500">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-600 text-sm font-medium uppercase tracking-wider">
                  Avg. Score
                </p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {stats?.averageScore?.toFixed(1) || "—"}%
                </p>
              </div>
              <TrendingUp className="w-10 h-10 text-purple-200" />
            </div>
          </div>
        </div>

        {/* Main Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Enrolled Classrooms */}
          <div className="lg:col-span-3">
            <div className="mb-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">
                Enrolled Classrooms
              </h2>
              <Button
                onClick={() => setIsJoinModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Bookmark className="w-4 h-4 mr-2" />
                Join Classroom
              </Button>
            </div>

            {classrooms.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {classrooms.map((classroom) => (
                  <ClassroomCard
                    key={classroom.id}
                    classroom={classroom}
                    onClick={() => {
                      // TODO: Navigate to classroom details page
                      router.push(`/classroom/${classroom.id}`);
                    }}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow p-12 text-center">
                <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600 text-lg font-medium">
                  No classrooms yet
                </p>
                <p className="text-gray-500 mt-1 mb-6">
                  Join a classroom using the code from your instructor to get started
                </p>
                <Button
                  onClick={() => setIsJoinModalOpen(true)}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Bookmark className="w-4 h-4 mr-2" />
                  Join Your First Classroom
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Assignments and Status */}
        <div className="space-y-8">
          {/* Upcoming Assignments */}
          {assignments.length > 0 && (
            <UpcomingAssignments
              assignments={assignments}
              onStartViva={handleStartViva}
              isLoading={isLoading}
            />
          )}

          {/* Viva Status Dashboard */}
          {stats && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Performance Overview
              </h2>
              <VivaStatusDashboard stats={stats} />
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions Panel */}
      <QuickActionsPanel
        onJoinClassroom={() => setIsJoinModalOpen(true)}
        onStartViva={assignments.length > 0 ? () => {} : undefined}
      />

      {/* Join Classroom Modal */}
      <JoinClassroomModal
        isOpen={isJoinModalOpen}
        onClose={() => setIsJoinModalOpen(false)}
        onJoin={handleJoinClassroom}
        isLoading={isJoining}
      />
    </div>
  );
}
