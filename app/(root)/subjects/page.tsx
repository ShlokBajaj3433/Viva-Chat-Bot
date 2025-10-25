import Link from "next/link";
import Image from "next/image";
import {
  BookOpen,
  Users,
  Clock,
  Star,
  TrendingUp,
  Award,
  Play,
  BarChart3,
  Shield,
  Cpu,
  Database,
  Globe,
  Calculator,
  Atom,
  DollarSign,
  Brain,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const SubjectsPage = () => {
  const popularSubjects = [
    {
      id: "network-security",
      name: "Network Security",
      icon: Shield,
      description:
        "Master cybersecurity concepts, protocols, and threat analysis",
      level: "Advanced",
      students: 2500,
      avgScore: 87,
      topics: [
        "Firewall Configuration",
        "Encryption",
        "VPN",
        "Intrusion Detection",
        "Security Policies",
      ],
      color: "bg-red-500",
      gradient: "from-red-500 to-red-600",
    },
    {
      id: "data-structures",
      name: "Data Structures",
      icon: Database,
      description: "Learn arrays, linked lists, trees, graphs, and algorithms",
      level: "Intermediate",
      students: 3200,
      avgScore: 82,
      topics: ["Arrays", "Linked Lists", "Trees", "Graphs", "Hash Tables"],
      color: "bg-blue-500",
      gradient: "from-blue-500 to-blue-600",
    },
    {
      id: "machine-learning",
      name: "Machine Learning",
      icon: Brain,
      description: "Explore AI algorithms, neural networks, and data analysis",
      level: "Advanced",
      students: 1800,
      avgScore: 85,
      topics: [
        "Supervised Learning",
        "Neural Networks",
        "Deep Learning",
        "NLP",
        "Computer Vision",
      ],
      color: "bg-purple-500",
      gradient: "from-purple-500 to-purple-600",
    },
    {
      id: "web-development",
      name: "Web Development",
      icon: Globe,
      description: "Modern web technologies, frameworks, and best practices",
      level: "Intermediate",
      students: 4100,
      avgScore: 79,
      topics: ["HTML/CSS", "JavaScript", "React", "Node.js", "REST APIs"],
      color: "bg-green-500",
      gradient: "from-green-500 to-green-600",
    },
    {
      id: "operating-systems",
      name: "Operating Systems",
      icon: Cpu,
      description: "Process management, memory allocation, and system calls",
      level: "Intermediate",
      students: 2800,
      avgScore: 80,
      topics: [
        "Process Management",
        "Memory Management",
        "File Systems",
        "Deadlocks",
        "Scheduling",
      ],
      color: "bg-orange-500",
      gradient: "from-orange-500 to-orange-600",
    },
    {
      id: "mathematics",
      name: "Mathematics",
      icon: Calculator,
      description: "Calculus, linear algebra, discrete math, and statistics",
      level: "Beginner",
      students: 3500,
      avgScore: 75,
      topics: [
        "Calculus",
        "Linear Algebra",
        "Discrete Math",
        "Statistics",
        "Probability",
      ],
      color: "bg-indigo-500",
      gradient: "from-indigo-500 to-indigo-600",
    },
    {
      id: "physics",
      name: "Physics",
      icon: Atom,
      description: "Classical mechanics, thermodynamics, and quantum physics",
      level: "Intermediate",
      students: 2200,
      avgScore: 78,
      topics: [
        "Mechanics",
        "Thermodynamics",
        "Electromagnetism",
        "Optics",
        "Quantum Physics",
      ],
      color: "bg-teal-500",
      gradient: "from-teal-500 to-teal-600",
    },
    {
      id: "economics",
      name: "Economics",
      icon: DollarSign,
      description: "Microeconomics, macroeconomics, and financial analysis",
      level: "Beginner",
      students: 1900,
      avgScore: 81,
      topics: [
        "Microeconomics",
        "Macroeconomics",
        "Market Structures",
        "Monetary Policy",
        "Trade",
      ],
      color: "bg-yellow-500",
      gradient: "from-yellow-500 to-yellow-600",
    },
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "text-green-600 bg-green-100";
      case "Intermediate":
        return "text-blue-600 bg-blue-100";
      case "Advanced":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const topSubjects = popularSubjects.slice(0, 3);
  const otherSubjects = popularSubjects.slice(3);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Master Popular Subjects
          </h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto mb-8">
            Practice with AI-powered viva sessions for the most in-demand
            academic subjects. Join thousands of students already excelling in
            their studies.
          </p>
          <div className="flex justify-center space-x-8 text-center">
            <div>
              <div className="text-3xl font-bold">50+</div>
              <div className="text-indigo-200">Subjects</div>
            </div>
            <div>
              <div className="text-3xl font-bold">10K+</div>
              <div className="text-indigo-200">Students</div>
            </div>
            <div>
              <div className="text-3xl font-bold">95%</div>
              <div className="text-indigo-200">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Top Trending Subjects */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              🔥 Most Popular This Month
            </h2>
            <p className="text-lg text-gray-600">
              Top subjects chosen by students worldwide
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {topSubjects.map((subject, index) => {
              const IconComponent = subject.icon;
              return (
                <div key={subject.id} className="relative">
                  {index === 0 && (
                    <div className="absolute -top-3 -right-3 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-bold z-10">
                      #1 Popular
                    </div>
                  )}
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    <div
                      className={`h-32 bg-gradient-to-r ${subject.gradient} flex items-center justify-center`}
                    >
                      <IconComponent className="w-16 h-16 text-white" />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xl font-bold text-gray-900">
                          {subject.name}
                        </h3>
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${getLevelColor(
                            subject.level
                          )}`}
                        >
                          {subject.level}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-4">
                        {subject.description}
                      </p>

                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          {subject.students.toLocaleString()} students
                        </div>
                        <div className="flex items-center">
                          <BarChart3 className="w-4 h-4 mr-1" />
                          {subject.avgScore}% avg score
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm font-medium text-gray-700 mb-2">
                          Key Topics:
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {subject.topics
                            .slice(0, 3)
                            .map((topic, topicIndex) => (
                              <span
                                key={topicIndex}
                                className="px-2 py-1 bg-gray-100 text-xs rounded-full"
                              >
                                {topic}
                              </span>
                            ))}
                          {subject.topics.length > 3 && (
                            <span className="px-2 py-1 bg-gray-100 text-xs rounded-full">
                              +{subject.topics.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>

                      <Button className="w-full" size="lg">
                        <Play className="w-4 h-4 mr-2" />
                        Start Practice
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* All Subjects Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              All Available Subjects
            </h2>
            <p className="text-lg text-gray-600">
              Choose from our comprehensive collection of academic subjects
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {otherSubjects.map((subject) => {
              const IconComponent = subject.icon;
              return (
                <div
                  key={subject.id}
                  className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-300"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className={`w-12 h-12 ${subject.color} rounded-lg flex items-center justify-center`}
                    >
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${getLevelColor(
                        subject.level
                      )}`}
                    >
                      {subject.level}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {subject.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {subject.description}
                  </p>

                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <span>{subject.students.toLocaleString()} students</span>
                    <span>{subject.avgScore}% avg</span>
                  </div>

                  <Button variant="outline" size="sm" className="w-full">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Practice Now
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-900">85%</div>
              <div className="text-gray-600">Average Improvement</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Clock className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-900">15min</div>
              <div className="text-gray-600">Average Session</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Star className="w-8 h-8 text-yellow-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-900">4.9/5</div>
              <div className="text-gray-600">Student Rating</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Award className="w-8 h-8 text-purple-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-900">92%</div>
              <div className="text-gray-600">Pass Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Excel in Your Subject?
          </h2>
          <p className="text-xl opacity-90 mb-8">
            Join thousands of students who have improved their grades with our
            AI-powered viva practice
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/sign-up">
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-blue-600 hover:bg-gray-100"
              >
                Start Free Practice
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-blue-600"
              >
                Request New Subject
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SubjectsPage;
