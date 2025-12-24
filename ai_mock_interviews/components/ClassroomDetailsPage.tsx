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

export default function ClassroomDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const classroomId = params?.id as string;

  const [classroom, setClassroom] = useState<Classroom | null>(null);
  const [assignments, setAssignments] = useState<ClassroomAssignment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!classroomId) return;

      try {
        setIsLoading(true);
        const classroomData = await getClassroom(classroomId);
        setClassroom(classroomData);

        if (classroomData) {
          const assignmentsData = await getClassroomAssignments(classroomId);
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
  }, [classroomId]);

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
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-8 py-12 text-white">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-2">{classroom.name}</h1>
                <p className="text-blue-100 text-lg mb-4">{classroom.subject}</p>
                {classroom.description && (
                  <p className="text-blue-50">{classroom.description}</p>
                )}
              </div>
              <Button
                variant="outline"
                className="text-white border-white hover:bg-white/10"
                size="icon"
              >
                <MoreVertical className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-8 border-t border-gray-200">
            <div>
              <p className="text-xs text-gray-600 font-semibold uppercase tracking-wider">
                Class Code
              </p>
              <p className="text-lg font-bold text-gray-900 mt-2 font-mono">
                {classroom.code}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-600 font-semibold uppercase tracking-wider">
                Instructor
              </p>
              <p className="text-lg font-bold text-gray-900 mt-2">
                {classroom.instructorName}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-600 font-semibold uppercase tracking-wider">
                Students
              </p>
              <p className="text-lg font-bold text-gray-900 mt-2">
                {classroom.studentIds?.length || 0}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-600 font-semibold uppercase tracking-wider">
                Status
              </p>
              <p className="text-lg font-bold text-gray-900 mt-2 capitalize">
                {classroom.status}
              </p>
            </div>
          </div>
        </div>

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
                      onClick={() => {
                        // TODO: Navigate to interview
                        toast.success("Redirecting to interview...");
                      }}
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
              navigator.clipboard.writeText(classroom.code);
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
