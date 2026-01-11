"use client";

import { useState } from "react";
import Link from "next/link";
import { Users, BookOpen, ChevronRight, User } from "lucide-react";
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
  const classCode = classroom.code || (classroom as any).classCode || "";
  // Priority: teacherName (from backend) > instructorName > fallbacks
  const instructorName =
    (classroom as any).teacherName ||
    classroom.instructorName ||
    (classroom as any).teacher_name ||
    (classroom as any)?.teacher?.name ||
    "";
  const subject = classroom.subject || (classroom as any).grade || "—";
  const codeKey = classCode || "A";
  const colorClass = getColorClass(codeKey.charCodeAt(0) % CLASSROOM_COLORS.length);

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
              <div className="flex flex-wrap items-center gap-2 text-sm text-white/90">
                {instructorName && (
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-white backdrop-blur-sm text-base font-semibold">
                    <User className="w-4 h-4" />
                    <span className="leading-none">{instructorName}</span>
                  </span>
                )}
                <span className="opacity-90 text-xs">{subject}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="bg-white p-6">
        {/* Room & Section Info */}
        <div className="grid grid-cols-2 gap-4 mb-3 pb-3 border-b border-gray-100">
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
          <div className="mb-3 pb-3 border-b border-gray-100">
            <p className="text-xs text-gray-600 font-semibold uppercase tracking-wider mb-1">
              Description
            </p>
            <p className="text-sm text-gray-700 line-clamp-2">
              {classroom.description}
            </p>
          </div>
        )}

        {/* Action Button */}
        <Button
          className="w-full mt-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
          size="sm"
        >
          <span className="flex-1">Enter Classroom</span>
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
