"use client";

import { PieChart, TrendingUp, Award, AlertCircle } from "lucide-react";

interface VivaStatusDashboardProps {
  stats: {
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
  };
}

export default function VivaStatusDashboard({
  stats,
}: VivaStatusDashboardProps) {
  const completionPercentage =
    stats.totalAssignments > 0
      ? Math.round((stats.completedAssignments / stats.totalAssignments) * 100)
      : 0;

  const getGradeColor = (score: number) => {
    if (score >= 90) return "text-green-600 bg-green-100";
    if (score >= 80) return "text-blue-600 bg-blue-100";
    if (score >= 70) return "text-yellow-600 bg-yellow-100";
    return "text-red-600 bg-red-100";
  };

  const getGradeLabel = (score: number) => {
    if (score >= 90) return "Excellent";
    if (score >= 80) return "Very Good";
    if (score >= 70) return "Good";
    if (score >= 60) return "Satisfactory";
    return "Needs Improvement";
  };

  return (
    <div className="space-y-6">
      {/* Overall Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Total Assignments */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600 uppercase tracking-wider">
                Total Assignments
              </p>
              <p className="text-3xl font-bold text-blue-900 mt-2">
                {stats.totalAssignments}
              </p>
            </div>
            <AlertCircle className="w-8 h-8 text-blue-400" />
          </div>
        </div>

        {/* Completed */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 border border-green-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-green-600 uppercase tracking-wider">
                Completed
              </p>
              <p className="text-3xl font-bold text-green-900 mt-2">
                {stats.completedAssignments}
              </p>
              <p className="text-xs text-green-700 mt-1">
                {completionPercentage}% complete
              </p>
            </div>
            <Award className="w-8 h-8 text-green-400" />
          </div>
        </div>

        {/* Pending */}
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-6 border border-orange-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-orange-600 uppercase tracking-wider">
                Pending
              </p>
              <p className="text-3xl font-bold text-orange-900 mt-2">
                {stats.pendingAssignments}
              </p>
              <p className="text-xs text-orange-700 mt-1">
                {100 - completionPercentage}% remaining
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-orange-400" />
          </div>
        </div>

        {/* Average Score */}
        <div
          className={`rounded-lg p-6 border ${getGradeColor(stats.averageScore).replace("text-", "border-").replace(" bg-", " bg-").split(" bg-")[0]} ${getGradeColor(stats.averageScore).includes("green") ? "bg-green-100 border-green-200" : getGradeColor(stats.averageScore).includes("blue") ? "bg-blue-100 border-blue-200" : getGradeColor(stats.averageScore).includes("yellow") ? "bg-yellow-100 border-yellow-200" : "bg-red-100 border-red-200"}`}
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-wider">
                Average Score
              </p>
              <p className="text-3xl font-bold mt-2">
                {stats.averageScore.toFixed(1)}%
              </p>
              <p className="text-xs mt-1 font-medium">
                {getGradeLabel(stats.averageScore)}
              </p>
            </div>
            <PieChart className="w-8 h-8" />
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      {stats.totalAssignments > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-semibold text-gray-900">
                Overall Progress
              </h3>
              <span className="text-sm font-bold text-blue-600">
                {completionPercentage}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-500 to-blue-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
          </div>
          <p className="text-xs text-gray-600">
            You have completed {stats.completedAssignments} out of{" "}
            {stats.totalAssignments} assignments
          </p>
        </div>
      )}

      {/* Classwise Breakdown */}
      {stats.progressByClassroom.length > 0 && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h3 className="text-lg font-bold text-gray-900">
              Performance by Classroom
            </h3>
          </div>
          <div className="divide-y divide-gray-200">
            {stats.progressByClassroom.map((classroom) => (
              <div
                key={classroom.classroomId}
                className="px-6 py-4 hover:bg-blue-50 transition-colors"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-medium text-gray-900">
                      {classroom.classroomName}
                    </h4>
                    <p className="text-xs text-gray-600 mt-1">
                      {classroom.completed} of {classroom.total} assignments completed
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900">
                      {classroom.averageScore.toFixed(1)}%
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      Average Score
                    </p>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-indigo-500 to-indigo-600 h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${
                        classroom.total > 0
                          ? (classroom.completed / classroom.total) * 100
                          : 0
                      }%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {stats.totalAssignments === 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 text-center">
          <PieChart className="w-12 h-12 text-blue-300 mx-auto mb-4" />
          <p className="text-gray-600 font-medium">No assignments yet</p>
          <p className="text-gray-500 text-sm mt-1">
            Assignments from your classrooms will appear here. Join a classroom to get started!
          </p>
        </div>
      )}
    </div>
  );
}
