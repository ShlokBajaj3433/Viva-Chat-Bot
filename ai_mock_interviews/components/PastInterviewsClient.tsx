"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Calendar,
  Clock,
  BarChart3,
  Play,
  Download,
  Filter,
  Search,
  Trophy,
  FileText,
  TrendingUp,
  Star,
  Bookmark,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import InterviewsList from "@/components/InterviewsList";

interface Interview {
  id: string;
  subject: string;
  date: string;
  duration: string;
  score: number;
  scoreDetail?: {
    obtained: number | null;
    total: number | null;
  };
  status: string;
  grade: string;
  questions: number;
  difficulty: string;
  topics: string[];
  year: string;
  feedback: string;
  type: string;
  feedbackData: any;
  interviewData: any;
}

interface PastInterviewsClientProps {
  pastInterviews: Interview[];
  userId: string;
  totalInterviews: number;
  averageScore: number;
  hoursStudied: number;
  bestScore: number;
}

export default function PastInterviewsClient({
  pastInterviews,
  userId,
  totalInterviews,
  averageScore,
  hoursStudied,
  bestScore,
}: PastInterviewsClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  // Get unique subjects and grades from interviews
  const uniqueSubjects = Array.from(
    new Set(pastInterviews.map((i) => i.subject))
  ).sort();
  const uniqueGrades = Array.from(
    new Set(pastInterviews.map((i) => i.grade))
  ).sort();

  // Filter interviews
  const filteredInterviews = pastInterviews.filter((interview) => {
    const matchesSearch =
      searchQuery === "" ||
      interview.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      interview.date.toLowerCase().includes(searchQuery.toLowerCase()) ||
      interview.score.toString().includes(searchQuery);

    const matchesSubject =
      selectedSubject === "" || interview.subject === selectedSubject;

    const matchesGrade =
      selectedGrade === "" || interview.grade === selectedGrade;

    return matchesSearch && matchesSubject && matchesGrade;
  });

  // Export to CSV
  const handleExport = () => {
    const headers = [
      "Subject",
      "Date",
      "Duration",
      "Score (%)",
      "Marks Obtained",
      "Total Marks",
      "Grade",
      "Questions",
      "Status",
      "Topics",
    ];

    const csvData = filteredInterviews.map((interview) => [
      interview.subject,
      interview.date,
      interview.duration,
      interview.score,
      interview.scoreDetail?.obtained ?? "",
      interview.scoreDetail?.total ?? "",
      interview.grade,
      interview.questions,
      interview.status,
      interview.topics.join("; "),
    ]);

    const csvContent = [
      headers.join(","),
      ...csvData.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `past-interviews-${new Date().toISOString().split("T")[0]}.csv`
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("");
    setSelectedSubject("");
    setSelectedGrade("");
  };

  const hasActiveFilters =
    searchQuery !== "" || selectedSubject !== "" || selectedGrade !== "";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white border-b">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Past Interviews
              </h1>
              <p className="text-gray-600">
                Review your interview history, track progress, and replay
                sessions
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" onClick={handleExport}>
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Overview */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Interviews
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {totalInterviews}
                  </p>
                </div>
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Average Score
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {averageScore}%
                  </p>
                </div>
                <BarChart3 className="w-8 h-8 text-green-600" />
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Hours Practiced
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {hoursStudied}h
                  </p>
                </div>
                <Clock className="w-8 h-8 text-purple-600" />
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Best Score
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {bestScore}%
                  </p>
                </div>
                <Trophy className="w-8 h-8 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="px-4 sm:px-6 lg:px-8 mb-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex flex-col gap-4">
              {/* Search Bar */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search interviews by subject, date, or score..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              {/* Filter Dropdowns - Show/Hide */}
              {showFilters && (
                <div className="flex flex-col md:flex-row gap-4">
                  <select
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                  >
                    <option value="">All Subjects</option>
                    {uniqueSubjects.map((subject) => (
                      <option key={subject} value={subject}>
                        {subject}
                      </option>
                    ))}
                  </select>
                  <select
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={selectedGrade}
                    onChange={(e) => setSelectedGrade(e.target.value)}
                  >
                    <option value="">All Grades</option>
                    {uniqueGrades.map((grade) => (
                      <option key={grade} value={grade}>
                        {grade}
                      </option>
                    ))}
                  </select>
                  {hasActiveFilters && (
                    <Button
                      variant="outline"
                      onClick={clearFilters}
                      className="whitespace-nowrap"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Clear Filters
                    </Button>
                  )}
                </div>
              )}

              {/* Active Filters Display */}
              {hasActiveFilters && (
                <div className="flex flex-wrap gap-2">
                  {searchQuery && (
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">
                      Search: {searchQuery}
                    </span>
                  )}
                  {selectedSubject && (
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">
                      Subject: {selectedSubject}
                    </span>
                  )}
                  {selectedGrade && (
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">
                      Grade: {selectedGrade}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Interviews List */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          {pastInterviews.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No Past Interviews Yet
              </h3>
              <p className="text-gray-600 mb-6">
                Start your first interview to see your history and track your
                progress
              </p>
              <Link href="/interview">
                <Button size="lg">
                  <Play className="w-4 h-4 mr-2" />
                  Start Your First Interview
                </Button>
              </Link>
            </div>
          ) : filteredInterviews.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
              <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No Matching Interviews
              </h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search or filter criteria
              </p>
              <Button onClick={clearFilters}>Clear All Filters</Button>
            </div>
          ) : (
            <InterviewsList interviews={filteredInterviews} userId={userId} />
          )}
        </div>
      </section>

      {/* Performance Insights */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-t">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Your Performance Insights
            </h2>
            <p className="text-lg text-gray-600">
              Track your progress and identify areas for improvement
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <TrendingUp className="w-8 h-8 text-green-600 mr-3" />
                <h3 className="text-lg font-semibold text-gray-900">
                  Trending Up
                </h3>
              </div>
              <p className="text-2xl font-bold text-green-600 mb-1">+18%</p>
              <p className="text-sm text-gray-600">
                Average improvement over last month
              </p>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <Star className="w-8 h-8 text-blue-600 mr-3" />
                <h3 className="text-lg font-semibold text-gray-900">
                  Best Subject
                </h3>
              </div>
              <p className="text-lg font-bold text-blue-600 mb-1">
                {uniqueSubjects[0] || "N/A"}
              </p>
              <p className="text-sm text-gray-600">
                Consistently high performance
              </p>
            </div>

            <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <Bookmark className="w-8 h-8 text-yellow-600 mr-3" />
                <h3 className="text-lg font-semibold text-gray-900">
                  Focus Area
                </h3>
              </div>
              <p className="text-lg font-bold text-yellow-600 mb-1">
                {uniqueSubjects[uniqueSubjects.length - 1] || "N/A"}
              </p>
              <p className="text-sm text-gray-600">Needs more practice</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
