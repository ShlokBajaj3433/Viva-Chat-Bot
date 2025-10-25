"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export interface InterviewConfig {
  subject?: string;
  year?: string;
  topics?: string;
  type?: string;
  role?: string;
  level?: string;
  techstack?: string;
  isTechnical?: boolean;
}

interface InterviewConfigFormProps {
  onStart: (config: InterviewConfig) => void;
  onSkip: () => void;
  isLoading?: boolean;
}

export const InterviewConfigForm = ({
  onStart,
  onSkip,
  isLoading = false,
}: InterviewConfigFormProps) => {
  const [config, setConfig] = useState<InterviewConfig>({
    subject: "",
    year: "",
    topics: "",
    type: "",
    isTechnical: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Filter out empty values
    const filteredConfig = Object.entries(config).reduce(
      (acc, [key, value]) => {
        if (value !== "" && value !== false) {
          acc[key as keyof InterviewConfig] = value;
        }
        return acc;
      },
      {} as InterviewConfig
    );

    onStart(filteredConfig);
  };

  const handleChange = (
    field: keyof InterviewConfig,
    value: string | boolean
  ) => {
    setConfig((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 sm:p-8 bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-2xl border border-blue-100">
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent">
              Interview Configuration
            </h2>
            <p className="text-sm text-blue-600 font-semibold">
              ✨ Customize your experience
            </p>
          </div>
        </div>
        <p className="text-gray-700 leading-relaxed">
          Fill in the details below to customize your interview experience. All
          fields are optional.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Subject/Role */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label
              htmlFor="subject"
              className="text-sm font-semibold text-gray-700 flex items-center"
            >
              <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
              📚 Subject / Course
            </Label>
            <Input
              id="subject"
              type="text"
              placeholder="e.g., Computer Science, Physics"
              value={config.subject}
              onChange={(e) => handleChange("subject", e.target.value)}
              disabled={isLoading}
              className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition-all"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="year"
              className="text-sm font-semibold text-gray-700 flex items-center"
            >
              <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
              🎓 Year / Semester
            </Label>
            <Input
              id="year"
              type="text"
              placeholder="e.g., 3rd Year, Semester 5"
              value={config.year}
              onChange={(e) => handleChange("year", e.target.value)}
              disabled={isLoading}
              className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition-all"
            />
          </div>
        </div>

        {/* Topics */}
        <div className="space-y-2">
          <Label
            htmlFor="topics"
            className="text-sm font-semibold text-gray-700 flex items-center"
          >
            <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
            💡 Topics to Cover
          </Label>
          <Input
            id="topics"
            type="text"
            placeholder="e.g., Data Structures, Algorithms, OOP (comma-separated)"
            value={config.topics}
            onChange={(e) => handleChange("topics", e.target.value)}
            disabled={isLoading}
            className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition-all"
          />
          <p className="text-sm text-blue-600 mt-1 font-medium">
            💬 Separate multiple topics with commas
          </p>
        </div>

        {/* Interview Type */}
        <div className="space-y-2">
          <Label
            htmlFor="type"
            className="text-sm font-semibold text-gray-700 flex items-center"
          >
            <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
            🎯 Interview Type
          </Label>
          <select
            id="type"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-700 font-medium transition-all hover:border-blue-400 cursor-pointer"
            value={config.type}
            onChange={(e) => handleChange("type", e.target.value)}
            disabled={isLoading}
          >
            <option value="">✨ Select type (optional)</option>
            <option value="technical">💻 Technical</option>
            <option value="conceptual">🧠 Conceptual</option>
            <option value="behavioral">🗣️ Behavioral</option>
            <option value="mixed">🎭 Mixed</option>
          </select>
        </div>

        {/* Technical Focus Toggle */}
        <div className="flex items-center space-x-3 p-4 bg-blue-50 border border-blue-100 rounded-lg hover:bg-blue-100 transition-colors">
          <input
            id="isTechnical"
            type="checkbox"
            className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 cursor-pointer"
            checked={config.isTechnical}
            onChange={(e) => handleChange("isTechnical", e.target.checked)}
            disabled={isLoading}
          />
          <Label
            htmlFor="isTechnical"
            className="cursor-pointer font-semibold text-gray-700 flex items-center"
          >
            ⚙️ Prefer technical/practical questions
          </Label>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-6">
          <Button
            type="submit"
            className="flex-1 py-6 text-base font-semibold bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
            disabled={isLoading}
          >
            {isLoading
              ? "🚀 Starting..."
              : "✨ Start Interview with These Settings"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={onSkip}
            disabled={isLoading}
            className="flex-1 py-6 text-base font-semibold border-2 border-gray-300 hover:border-blue-500 hover:bg-blue-50 transition-all"
          >
            ⚡ Skip & Start Interview
          </Button>
        </div>
      </form>

      <div className="mt-6 p-5 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl shadow-sm">
        <p className="text-sm text-blue-900 leading-relaxed">
          <strong className="font-bold text-blue-700">💡 Pro Tip:</strong>{" "}
          Filling in these details helps customize your interview and ensures
          the interviewer doesn't ask redundant questions during the viva.
        </p>
      </div>
    </div>
  );
};
