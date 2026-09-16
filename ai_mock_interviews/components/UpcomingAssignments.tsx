"use client";

import { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  PlayCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface UpcomingAssignmentsProps {
  assignments: (ClassroomAssignment & { classroomName: string })[];
  onStartViva: (assignment: ClassroomAssignment & { classroomName: string }) => void;
  isLoading?: boolean;
}

export default function UpcomingAssignments({
  assignments,
  onStartViva,
  isLoading = false,
}: UpcomingAssignmentsProps) {
  const [filter, setFilter] = useState<"all" | "active" | "upcoming">("all");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "submitted":
        return "bg-green-100 text-green-800 border-green-300";
      case "in_progress":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      default:
        return "bg-blue-100 text-blue-800 border-blue-300";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "submitted":
        return <CheckCircle className="w-4 h-4" />;
      case "in_progress":
        return <Clock className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getDaysUntilDue = (dueDate: string) => {
    const due = new Date(dueDate);
    const now = new Date();
    const diffTime = due.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getDueDateColor = (dueDate: string) => {
    const days = getDaysUntilDue(dueDate);
    if (days < 0) return "text-red-600";
    if (days <= 2) return "text-red-500";
    if (days <= 7) return "text-yellow-500";
    return "text-gray-600";
  };

  const formatDueDate = (dueDate: string) => {
    const date = new Date(dueDate);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
          <p className="mt-2 text-gray-600">Loading assignments...</p>
        </div>
      </div>
    );
  }

  if (assignments.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-8">
        <div className="text-center">
          <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600 text-lg font-medium">No upcoming assignments</p>
          <p className="text-gray-500 text-sm mt-1">
            You're all caught up! New assignments will appear here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">Upcoming Assignments</h2>
          <span className="text-2xl font-bold text-blue-600">
            {assignments.length}
          </span>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
              filter === "all"
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-700 border border-gray-300 hover:border-blue-300"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("active")}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
              filter === "active"
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-700 border border-gray-300 hover:border-blue-300"
            }`}
          >
            Active
          </button>
          <button
            onClick={() => setFilter("upcoming")}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
              filter === "upcoming"
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-700 border border-gray-300 hover:border-blue-300"
            }`}
          >
            Due Soon
          </button>
        </div>
      </div>

      {/* Assignments List */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Assignment
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Classroom
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Due Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {assignments.map((assignment) => (
              <tr
                key={assignment.id}
                className="hover:bg-blue-50 transition-colors"
              >
                <td className="px-6 py-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">
                      {assignment.title}
                    </h3>
                    {assignment.description && (
                      <p className="text-xs text-gray-600 mt-1 line-clamp-1">
                        {assignment.description}
                      </p>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {assignment.classroomName}
                </td>
                <td className="px-6 py-4">
                  <div className={`text-sm font-medium ${getDueDateColor(assignment.dueDate)}`}>
                    {formatDueDate(assignment.dueDate)}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {getDaysUntilDue(assignment.dueDate)} days away
                  </div>
                </td>
                <td className="px-6 py-4 text-sm">
                  <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs font-medium">
                    {assignment.assignmentType === "viva"
                      ? "Viva Interview"
                      : assignment.assignmentType}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  {assignment.assignmentType === "viva" ? (
                    <Button
                      onClick={() => onStartViva(assignment)}
                      size="sm"
                      className="bg-green-500 hover:bg-green-600 text-white"
                    >
                      <PlayCircle className="w-4 h-4 mr-1" />
                      Start Viva
                    </Button>
                  ) : (
                    <Button
                      disabled
                      size="sm"
                      variant="outline"
                      className="text-gray-500 cursor-not-allowed"
                    >
                      View
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
