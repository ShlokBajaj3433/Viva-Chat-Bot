"use client";

import { useState } from "react";
import Link from "next/link";
import { Users, BookOpen, MessageSquare, ChevronRight, Archive } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ClassroomCardProps {
  classroom: Classroom;
  onClick?: (classroom: Classroom) => void;
  isClickable?: boolean;
}

const CLASSROOM_COLORS = [
  "from-blue-500 to-blue-600",
  "from-purple-500 to-purple-600",
  "from-pink-500 to-pink-600",
  "from-green-500 to-green-600",
  "from-orange-500 to-orange-600",
  "from-indigo-500 to-indigo-600",
  "from-red-500 to-red-600",
  "from-cyan-500 to-cyan-600",
];

const getColorClass = (index: number): string => {
  return CLASSROOM_COLORS[index % CLASSROOM_COLORS.length];
};

export default function ClassroomCard({
  classroom,
  onClick,
  isClickable = true,
}: ClassroomCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const studentCount = classroom.studentIds?.length || 0;
  const colorClass = getColorClass(classroom.code.charCodeAt(0) % CLASSROOM_COLORS.length);

  const handleClick = () => {
    if (isClickable && onClick) {
      onClick(classroom);
    }
  };

  return (
    <div
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300
        ${isClickable ? "cursor-pointer" : ""}
        ${isHovered && isClickable ? "transform -translate-y-1" : ""}
      `}
    >
      {/* Header with gradient background */}
      <div
        className={`bg-gradient-to-br ${colorClass} p-6 text-white relative overflow-hidden`}
      >
        <div className="absolute top-0 right-0 opacity-10 w-32 h-32 bg-white rounded-full transform translate-x-8 -translate-y-8" />

        <div className="relative z-10">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-1 line-clamp-2">
                {classroom.name}
              </h3>
              <p className="text-white/80 text-sm">{classroom.subject}</p>
            </div>
            {classroom.status === "archived" && (
              <Archive className="w-5 h-5 flex-shrink-0 ml-2" />
            )}
          </div>

          <div className="text-white/90 text-xs font-mono bg-white/20 inline-block px-2 py-1 rounded">
            {classroom.code}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="bg-white p-6">
        {/* Instructor Info */}
        {classroom.instructorName && (
          <div className="mb-4 pb-4 border-b border-gray-200">
            <p className="text-xs text-gray-600 font-semibold uppercase tracking-wider">
              Instructor
            </p>
            <p className="text-sm font-medium text-gray-900 mt-1">
              {classroom.instructorName}
            </p>
          </div>
        )}

        {/* Room & Section Info */}
        <div className="grid grid-cols-2 gap-4 mb-4 pb-4 border-b border-gray-200">
          {classroom.section && (
            <div>
              <p className="text-xs text-gray-600 font-semibold uppercase tracking-wider">
                Section
              </p>
              <p className="text-sm font-medium text-gray-900 mt-1">
                {classroom.section}
              </p>
            </div>
          )}
          {classroom.room && (
            <div>
              <p className="text-xs text-gray-600 font-semibold uppercase tracking-wider">
                Room
              </p>
              <p className="text-sm font-medium text-gray-900 mt-1">
                {classroom.room}
              </p>
            </div>
          )}
        </div>

        {/* Description */}
        {classroom.description && (
          <div className="mb-4 pb-4 border-b border-gray-200">
            <p className="text-xs text-gray-600 font-semibold uppercase tracking-wider mb-1">
              Description
            </p>
            <p className="text-sm text-gray-700 line-clamp-2">
              {classroom.description}
            </p>
          </div>
        )}

        {/* Stats */}
        <div className="flex items-center justify-between text-xs text-gray-600">
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{studentCount} {studentCount === 1 ? "Student" : "Students"}</span>
          </div>
          <div className="flex items-center gap-1">
            <BookOpen className="w-4 h-4" />
            <span>View Details</span>
          </div>
        </div>

        {/* Action Button */}
        <Button
          className="w-full mt-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
          size="sm"
        >
          <span className="flex-1">Enter Classroom</span>
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
