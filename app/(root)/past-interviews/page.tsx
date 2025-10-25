import Link from "next/link";
import {
  Calendar,
  Clock,
  BarChart3,
  Play,
  Download,
  Eye,
  Award,
  TrendingUp,
  ChevronRight,
  Filter,
  Search,
  Star,
  Trophy,
  FileText,
  Bookmark,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const PastInterviewsPage = () => {
  const pastInterviews = [
    {
      id: "interview-001",
      subject: "Network Security",
      date: "2024-01-15",
      duration: "18 minutes",
      score: 87,
      status: "Completed",
      grade: "A",
      questions: 15,
      difficulty: "Advanced",
      topics: ["Firewall Configuration", "VPN Security", "Threat Analysis"],
      feedback: "Excellent understanding of security protocols",
      improvement: "+12%",
    },
    {
      id: "interview-002",
      subject: "Data Structures",
      date: "2024-01-12",
      duration: "22 minutes",
      score: 92,
      status: "Completed",
      grade: "A+",
      questions: 18,
      difficulty: "Intermediate",
      topics: ["Binary Trees", "Hash Tables", "Graph Algorithms"],
      feedback: "Outstanding performance in algorithm analysis",
      improvement: "+8%",
    },
    {
      id: "interview-003",
      subject: "Machine Learning",
      date: "2024-01-10",
      duration: "25 minutes",
      score: 78,
      status: "Completed",
      grade: "B+",
      questions: 20,
      difficulty: "Advanced",
      topics: ["Neural Networks", "Deep Learning", "Model Optimization"],
      feedback: "Good grasp of concepts, practice implementation more",
      improvement: "+15%",
    },
    {
      id: "interview-004",
      subject: "Web Development",
      date: "2024-01-08",
      duration: "16 minutes",
      score: 85,
      status: "Completed",
      grade: "A",
      questions: 12,
      difficulty: "Intermediate",
      topics: ["React Hooks", "API Integration", "State Management"],
      feedback: "Strong practical knowledge demonstrated",
      improvement: "+6%",
    },
    {
      id: "interview-005",
      subject: "Operating Systems",
      date: "2024-01-05",
      duration: "20 minutes",
      score: 74,
      status: "Completed",
      grade: "B",
      questions: 16,
      difficulty: "Intermediate",
      topics: [
        "Process Scheduling",
        "Memory Management",
        "Deadlock Prevention",
      ],
      feedback: "Need to strengthen theoretical foundations",
      improvement: "+3%",
    },
    {
      id: "interview-006",
      subject: "Mathematics",
      date: "2024-01-03",
      duration: "15 minutes",
      score: 89,
      status: "Completed",
      grade: "A",
      questions: 14,
      difficulty: "Beginner",
      topics: ["Calculus", "Linear Algebra", "Statistics"],
      feedback: "Excellent problem-solving approach",
      improvement: "+10%",
    },
  ];

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600 bg-green-100";
    if (score >= 80) return "text-blue-600 bg-blue-100";
    if (score >= 70) return "text-yellow-600 bg-yellow-100";
    return "text-red-600 bg-red-100";
  };

  const getGradeColor = (grade: string) => {
    if (grade.startsWith("A")) return "text-green-600 bg-green-100";
    if (grade.startsWith("B")) return "text-blue-600 bg-blue-100";
    if (grade.startsWith("C")) return "text-yellow-600 bg-yellow-100";
    return "text-red-600 bg-red-100";
  };

  const totalInterviews = pastInterviews.length;
  const averageScore = Math.round(
    pastInterviews.reduce((sum, interview) => sum + interview.score, 0) /
      totalInterviews
  );
  const totalHours = pastInterviews.reduce((sum, interview) => {
    const minutes = parseInt(interview.duration.split(" ")[0]);
    return sum + minutes;
  }, 0);
  const hoursStudied = Math.round((totalHours / 60) * 10) / 10;

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
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline">
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
                  <p className="text-2xl font-bold text-gray-900">92%</p>
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
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search interviews by subject, date, or score..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="">All Subjects</option>
                <option value="network-security">Network Security</option>
                <option value="data-structures">Data Structures</option>
                <option value="machine-learning">Machine Learning</option>
              </select>
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="">All Grades</option>
                <option value="A+">A+</option>
                <option value="A">A</option>
                <option value="B+">B+</option>
                <option value="B">B</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Interviews List */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-4">
            {pastInterviews.map((interview) => (
              <div
                key={interview.id}
                className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow duration-200"
              >
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            {interview.subject}
                          </h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {new Date(interview.date).toLocaleDateString()}
                            </div>
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {interview.duration}
                            </div>
                            <div className="flex items-center">
                              <FileText className="w-4 h-4 mr-1" />
                              {interview.questions} questions
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span
                            className={`px-2 py-1 text-sm font-medium rounded-full ${getScoreColor(
                              interview.score
                            )}`}
                          >
                            {interview.score}%
                          </span>
                          <span
                            className={`px-2 py-1 text-sm font-medium rounded-full ${getGradeColor(
                              interview.grade
                            )}`}
                          >
                            {interview.grade}
                          </span>
                        </div>
                      </div>

                      <div className="mb-3">
                        <p className="text-sm font-medium text-gray-700 mb-1">
                          Topics Covered:
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {interview.topics.map((topic, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-gray-100 text-xs rounded-full"
                            >
                              {topic}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600 mb-1">
                            {interview.feedback}
                          </p>
                          <div className="flex items-center text-sm">
                            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                            <span className="text-green-600 font-medium">
                              Improvement: {interview.improvement}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 lg:mt-0 lg:ml-6 flex flex-col sm:flex-row lg:flex-col gap-2">
                      <Button size="sm" className="flex items-center">
                        <Play className="w-4 h-4 mr-2" />
                        Replay
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Report
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          <div className="mt-8 text-center">
            <Button variant="outline" size="lg">
              Load More Interviews
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
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
                Data Structures
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
                Operating Systems
              </p>
              <p className="text-sm text-gray-600">Needs more practice</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PastInterviewsPage;
