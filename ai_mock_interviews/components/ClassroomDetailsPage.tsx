"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  ArrowLeft,
  Users,
  BookOpen,
  Calendar,
  FileText,
  Download,
  Share2,
  MoreVertical,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import { getClassroom, getClassroomAssignments } from "@/lib/actions/classroom.action";
import { getCurrentUser } from "@/lib/actions/auth.action";

export default function ClassroomDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const classroomId = params?.id as string;

  const [user, setUser] = useState<User | null>(null);
  const [classroom, setClassroom] = useState<Classroom | null>(null);
  const [assignments, setAssignments] = useState<ClassroomAssignment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!classroomId) return;

      try {
        setIsLoading(true);

        const currentUser = await getCurrentUser();
        if (!currentUser) {
          router.push("/sign-in");
          setIsLoading(false);
          return;
        }
        setUser(currentUser);

        const classroomData = await getClassroom(classroomId);
        console.log("Classroom fetched", classroomData);
        setClassroom(classroomData);

        if (classroomData) {
          const assignmentsData = await getClassroomAssignments(classroomId);
          console.log("Assignments fetched", assignmentsData);
          setAssignments(assignmentsData);
        }
      } catch (error) {
        console.error("Error fetching classroom details:", error);
        toast.error("Failed to load classroom details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [classroomId, router]);

  const handleStartAssignment = async (assignment: ClassroomAssignment) => {
    if (assignment.assignmentType?.toLowerCase() !== "viva") {
      toast.info("This assignment is not a viva.");
      return;
    }

    if (!user) {
      toast.error("Please sign in to start the viva.");
      router.push("/sign-in");
      return;
    }

    try {
      const prefilledConfig = {
        subject: assignment.subject || assignment.title || "General Interview",
        type: "assignment-viva",
        isTechnical: true,
        year: assignment.vivaConfig?.level || "All Levels",
        topics: Array.isArray(assignment.vivaConfig?.techStack)
          ? assignment.vivaConfig.techStack.join(", ")
          : "",
        classroomId: assignment.classroomId,
        assignmentId: assignment.id,
        assignmentTitle: assignment.title,
        role: assignment.vivaConfig?.role || "General",
      } as any;

      if (typeof window !== "undefined") {
        sessionStorage.setItem("prefilledInterview", JSON.stringify(prefilledConfig));
      }

      const params = new URLSearchParams({
        classroom: assignment.classroomId,
        assignment: assignment.id,
        source: "assignment",
        role: assignment.vivaConfig?.role || "General",
        level: assignment.vivaConfig?.level || "All Levels",
        techstack: Array.isArray(assignment.vivaConfig?.techStack)
          ? assignment.vivaConfig.techStack.join(",")
          : "",
      });

      const targetUrl = `/interview?${params.toString()}`;
      toast.loading("Starting viva...");
      router.push(targetUrl);

      setTimeout(() => {
        if (typeof window !== "undefined") {
          if (window.location.pathname.startsWith("/interview")) return;
          window.location.assign(targetUrl);
        }
      }, 700);
    } catch (error) {
      console.error("Error starting assignment viva:", error);
      toast.error("Failed to start viva. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
          <p className="mt-4 text-gray-600">Loading classroom...</p>
        </div>
      </div>
    );
  }

  if (!classroom) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 text-lg font-medium">
              Classroom not found
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Priority: teacherName (from backend) > instructorName > fallbacks
  const instructorName =
    (classroom as any).teacherName ||
    classroom.instructorName ||
    (classroom as any).teacher_name ||
    (classroom as any)?.teacher?.name ||
    "—";
  const subject = classroom.subject || (classroom as any).grade || "—";
  const rawInstructorFields = {
    teacherName: (classroom as any)?.teacherName,
    instructorName: (classroom as any)?.instructorName,
    teacher_name: (classroom as any)?.teacher_name,
    teacher: (classroom as any)?.teacher,
    instructor: (classroom as any)?.instructor,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Classroom Header */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-8 py-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_20%_20%,#fff,transparent_35%),radial-gradient(circle_at_80%_0%,#fff,transparent_25%)]" />
            <div className="relative flex flex-col lg:flex-row lg:items-start gap-6">
              <div className="flex-1 space-y-3">
                <h1 className="text-3xl md:text-4xl font-bold leading-tight">{classroom.name}</h1>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 text-white/95 backdrop-blur-sm text-sm font-semibold w-max">
                  {subject}
                </span>
                {classroom.description && (
                  <p className="text-blue-50 max-w-3xl leading-relaxed">{classroom.description}</p>
                )}
              </div>

              <div className="flex items-center gap-3 lg:mt-1">
                {instructorName && instructorName !== "—" && (
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 text-white backdrop-blur-sm text-lg font-semibold shadow-sm">
                    <span className="leading-none">{instructorName}</span>
                  </div>
                )}
                <Button
                  variant="outline"
                  className="text-white border-white hover:bg-white/10"
                  size="icon"
                >
                  <MoreVertical className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {instructorName === "—" && (
          <div className="bg-amber-50 border border-amber-200 text-amber-900 rounded-lg p-4 mb-6 text-sm">
            <p className="font-semibold mb-2">Debug: instructor fields not found</p>
            <pre className="whitespace-pre-wrap break-all text-xs bg-white border border-amber-100 rounded p-3">
{JSON.stringify(rawInstructorFields, null, 2)}
            </pre>
          </div>
        )}

        {/* Assignments Section */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="px-8 py-6 border-b border-gray-200 bg-gray-50">
            <h2 className="text-2xl font-bold text-gray-900">Assignments</h2>
          </div>

          {assignments.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {assignments.map((assignment) => (
                <div
                  key={assignment.id}
                  className="p-6 hover:bg-blue-50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {assignment.title}
                      </h3>
                      {assignment.description && (
                        <p className="text-gray-600 mt-1">
                          {assignment.description}
                        </p>
                      )}
                    </div>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium ml-4 flex-shrink-0">
                      {assignment.assignmentType}
                    </span>
                  </div>

                  <div className="flex items-center gap-6 text-sm text-gray-600 mt-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>
                        Due:{" "}
                        {new Date(assignment.dueDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FileText className="w-4 h-4" />
                      <span>
                        Status:{" "}
                        <span className="font-medium capitalize">
                          {assignment.status}
                        </span>
                      </span>
                    </div>
                  </div>

                  {assignment.vivaConfig && (
                    <div className="mt-4 p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                      <p className="text-xs font-semibold text-indigo-900 uppercase tracking-wider mb-2">
                        Viva Configuration
                      </p>
                      <div className="grid grid-cols-2 gap-2 text-sm text-indigo-900">
                        <div>
                          <span className="font-medium">Role:</span>{" "}
                          {assignment.vivaConfig.role}
                        </div>
                        <div>
                          <span className="font-medium">Level:</span>{" "}
                          {assignment.vivaConfig.level}
                        </div>
                        {assignment.vivaConfig.questionCount && (
                          <div>
                            <span className="font-medium">Questions:</span>{" "}
                            {assignment.vivaConfig.questionCount}
                          </div>
                        )}
                        {assignment.vivaConfig.duration && (
                          <div>
                            <span className="font-medium">Duration:</span>{" "}
                            {assignment.vivaConfig.duration} min
                          </div>
                        )}
                      </div>
                      {assignment.vivaConfig.techStack && (
                        <div className="mt-2">
                          <p className="text-xs font-semibold text-indigo-900 mb-1">
                            Topics:
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {assignment.vivaConfig.techStack.map((tech, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-1 bg-indigo-200 text-indigo-900 rounded text-xs"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {assignment.status === "active" && (
                    <Button
                      className="mt-4 bg-green-600 hover:bg-green-700"
                      onClick={() => handleStartAssignment(assignment)}
                    >
                      <BookOpen className="w-4 h-4 mr-2" />
                      Start Assignment
                    </Button>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center text-gray-600">
              <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="font-medium">No assignments yet</p>
              <p className="text-sm">Check back soon for new assignments</p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-6">
          <Button
            variant="outline"
            onClick={() => {
              navigator.clipboard.writeText(classCode);
              toast.success("Classroom code copied!");
            }}
            className="flex-1"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Share Code
          </Button>
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => {
              // TODO: Download materials
              toast.info("Materials download coming soon");
            }}
          >
            <Download className="w-4 h-4 mr-2" />
            Download Materials
          </Button>
        </div>
      </div>
    </div>
  );
}
