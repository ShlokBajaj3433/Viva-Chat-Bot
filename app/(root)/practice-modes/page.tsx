"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Clock,
  Users,
  Brain,
  Target,
  Zap,
  Trophy,
  BookOpen,
  Play,
  Star,
  Timer,
  Mic,
  Video,
  FileText,
  Lightbulb,
  Award,
  TrendingUp,
  Shield,
  Database,
  Globe,
  Cpu,
  Calculator,
  Atom,
  DollarSign,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const PracticeModesPage = () => {
  const router = useRouter();

  const handleStartPractice = (mode: (typeof practiceModes)[0]) => {
    // Store practice mode configuration in sessionStorage
    const practiceConfig = {
      subject: mode.name,
      type: mode.id,
      isTechnical: true,
      year: "2024",
      topics: mode.subjects.join(", "),
      duration: mode.duration,
      questions: mode.questions,
      difficulty: mode.difficulty,
    };

    sessionStorage.setItem(
      "prefilledInterview",
      JSON.stringify(practiceConfig)
    );
    router.push("/interview");
  };

  const practiceModes = [
    {
      id: "quick-practice",
      name: "Quick Practice",
      icon: Zap,
      description: "Fast 5-10 minute sessions for quick skill checks",
      duration: "5-10 min",
      difficulty: "All Levels",
      questions: "5-8",
      features: ["Instant feedback", "Quick results", "Mobile friendly"],
      color: "bg-yellow-500",
      gradient: "from-yellow-500 to-orange-500",
      popular: true,
      subjects: ["All subjects available"],
      bestFor: "Daily practice, quick reviews, skill assessment",
    },
    {
      id: "comprehensive-viva",
      name: "Comprehensive Viva",
      icon: Brain,
      description: "In-depth 20-30 minute sessions covering complete topics",
      duration: "20-30 min",
      difficulty: "Intermediate to Advanced",
      questions: "15-25",
      features: [
        "Detailed analysis",
        "Topic deep-dive",
        "Performance tracking",
      ],
      color: "bg-blue-500",
      gradient: "from-blue-500 to-indigo-500",
      popular: false,
      subjects: ["Major subjects with comprehensive coverage"],
      bestFor: "Exam preparation, thorough understanding, skill mastery",
    },
    {
      id: "timed-challenge",
      name: "Timed Challenge",
      icon: Timer,
      description: "High-pressure practice with strict time limits",
      duration: "15-20 min",
      difficulty: "All Levels",
      questions: "12-18",
      features: ["Time pressure", "Leaderboard", "Competitive scoring"],
      color: "bg-red-500",
      gradient: "from-red-500 to-pink-500",
      popular: false,
      subjects: ["Popular subjects with time-based scoring"],
      bestFor: "Exam simulation, time management, competitive practice",
    },
    {
      id: "voice-interview",
      name: "Voice Interview",
      icon: Mic,
      description: "Practice speaking and verbal communication skills",
      duration: "10-25 min",
      difficulty: "All Levels",
      questions: "8-15",
      features: [
        "Voice recognition",
        "Speech analysis",
        "Pronunciation feedback",
      ],
      color: "bg-green-500",
      gradient: "from-green-500 to-emerald-500",
      popular: true,
      subjects: ["Language and communication focused"],
      bestFor: "Oral exams, presentation skills, confidence building",
    },
    {
      id: "adaptive-learning",
      name: "Adaptive Learning",
      icon: Target,
      description: "AI adjusts difficulty based on your performance",
      duration: "15-35 min",
      difficulty: "Adaptive",
      questions: "10-20",
      features: ["AI adaptation", "Personalized path", "Weakness targeting"],
      color: "bg-purple-500",
      gradient: "from-purple-500 to-violet-500",
      popular: false,
      subjects: ["All subjects with intelligent adaptation"],
      bestFor: "Personalized learning, skill gaps, progressive improvement",
    },
  ];

  const getDifficultyColor = (difficulty: string) => {
    if (difficulty === "All Levels") return "text-blue-600 bg-blue-100";
    if (difficulty === "Adaptive") return "text-purple-600 bg-purple-100";
    if (difficulty.includes("Intermediate"))
      return "text-orange-600 bg-orange-100";
    return "text-green-600 bg-green-100";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 text-white overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center justify-center px-4 py-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-full text-sm font-semibold mb-6">
            <Zap className="w-4 h-4 mr-2" />
            AI-Powered Practice Modes
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 px-2">
            Choose Your Practice Mode
          </h1>
          <p className="text-base sm:text-lg md:text-xl opacity-90 max-w-3xl mx-auto mb-6 md:mb-8 px-4">
            Different learning styles, different practice modes. Find the
            perfect way to prepare for your viva with our AI-powered interview
            sessions.
          </p>
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-12 text-center px-4">
            <div className="min-w-[100px]">
              <div className="text-3xl sm:text-4xl font-bold mb-1">6</div>
              <div className="text-sm sm:text-base text-purple-200">
                Practice Modes
              </div>
            </div>
            <div className="min-w-[100px]">
              <div className="text-3xl sm:text-4xl font-bold mb-1">50+</div>
              <div className="text-sm sm:text-base text-purple-200">
                Subjects
              </div>
            </div>
            <div className="min-w-[100px]">
              <div className="text-3xl sm:text-4xl font-bold mb-1">∞</div>
              <div className="text-sm sm:text-base text-purple-200">
                Possibilities
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Modes */}
      <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <div className="inline-flex items-center justify-center px-4 py-2 bg-yellow-100 text-yellow-700 rounded-full text-sm font-semibold mb-4">
              <Star className="w-4 h-4 mr-2" />
              Most Popular
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
              🔥 Student Favorites
            </h2>
            <p className="text-base sm:text-lg text-gray-600 px-4">
              Top-rated practice modes chosen by successful students
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-12 md:mb-16">
            {practiceModes
              .filter((mode) => mode.popular)
              .map((mode) => {
                const IconComponent = mode.icon;
                return (
                  <div key={mode.id} className="relative">
                    <div className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold z-10 shadow-lg">
                      ⭐ Popular
                    </div>
                    <div className="bg-white rounded-xl md:rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 h-full hover:-translate-y-1 border-2 border-transparent hover:border-purple-200">
                      <div
                        className={`h-24 sm:h-32 bg-gradient-to-r ${mode.gradient} flex items-center justify-center relative overflow-hidden`}
                      >
                        <div className="absolute inset-0 bg-black opacity-0 hover:opacity-10 transition-opacity duration-300"></div>
                        <IconComponent className="w-12 h-12 sm:w-16 sm:h-16 text-white relative z-10" />
                      </div>
                      <div className="p-4 sm:p-6">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 gap-2">
                          <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                            {mode.name}
                          </h3>
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(
                              mode.difficulty
                            )} self-start sm:self-auto whitespace-nowrap`}
                          >
                            {mode.difficulty}
                          </span>
                        </div>
                        <p className="text-sm sm:text-base text-gray-600 mb-4">
                          {mode.description}
                        </p>

                        <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4 text-xs sm:text-sm">
                          <div className="text-center">
                            <Clock className="w-3 h-3 sm:w-4 sm:h-4 mx-auto mb-1 text-gray-500" />
                            <div className="font-medium">{mode.duration}</div>
                          </div>
                          <div className="text-center">
                            <FileText className="w-3 h-3 sm:w-4 sm:h-4 mx-auto mb-1 text-gray-500" />
                            <div className="font-medium">
                              {mode.questions} Q's
                            </div>
                          </div>
                          <div className="text-center">
                            <Target className="w-3 h-3 sm:w-4 sm:h-4 mx-auto mb-1 text-gray-500" />
                            <div className="font-medium text-xs">Focused</div>
                          </div>
                        </div>

                        <div className="mb-4">
                          <p className="text-xs sm:text-sm font-medium text-gray-700 mb-2">
                            Key Features:
                          </p>
                          <div className="space-y-1">
                            {mode.features.map((feature, index) => (
                              <div
                                key={index}
                                className="flex items-center text-xs sm:text-sm text-gray-600"
                              >
                                <Star className="w-3 h-3 mr-2 text-yellow-500 flex-shrink-0" />
                                <span>{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="mb-4">
                          <p className="text-xs sm:text-sm font-medium text-gray-700 mb-1">
                            Best For:
                          </p>
                          <p className="text-xs sm:text-sm text-gray-600">
                            {mode.bestFor}
                          </p>
                        </div>

                        <Button
                          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-md hover:shadow-lg transition-all duration-300"
                          size="lg"
                          onClick={() => handleStartPractice(mode)}
                        >
                          <Play className="w-4 h-4 mr-2" />
                          <span className="text-sm sm:text-base font-semibold">
                            Start {mode.name}
                          </span>
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </section>

      {/* All Practice Modes */}
      <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
              All Practice Modes
            </h2>
            <p className="text-base sm:text-lg text-gray-600 px-4">
              Comprehensive collection of practice modes for every learning
              style
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            {practiceModes.map((mode) => {
              const IconComponent = mode.icon;
              return (
                <div
                  key={mode.id}
                  className="bg-white border-2 border-gray-200 rounded-xl p-4 sm:p-6 hover:shadow-lg hover:border-purple-300 transition-all duration-300 hover:-translate-y-0.5"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 gap-3">
                    <div className="flex items-center">
                      <div
                        className={`w-10 h-10 sm:w-12 sm:h-12 ${mode.color} rounded-lg flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0`}
                      >
                        <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1">
                          {mode.name}
                        </h3>
                        <span
                          className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(
                            mode.difficulty
                          )} whitespace-nowrap`}
                        >
                          {mode.difficulty}
                        </span>
                      </div>
                    </div>
                    {mode.popular && (
                      <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded-full self-start sm:self-auto whitespace-nowrap">
                        Popular
                      </span>
                    )}
                  </div>

                  <p className="text-sm sm:text-base text-gray-600 mb-4">
                    {mode.description}
                  </p>

                  <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4 text-xs sm:text-sm text-center">
                    <div>
                      <Clock className="w-3 h-3 sm:w-4 sm:h-4 mx-auto mb-1 text-gray-500" />
                      <div className="font-medium">{mode.duration}</div>
                    </div>
                    <div>
                      <FileText className="w-3 h-3 sm:w-4 sm:h-4 mx-auto mb-1 text-gray-500" />
                      <div className="font-medium">{mode.questions}</div>
                    </div>
                    <div>
                      <Target className="w-3 h-3 sm:w-4 sm:h-4 mx-auto mb-1 text-gray-500" />
                      <div className="font-medium text-xs">Adaptive</div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-xs sm:text-sm font-medium text-gray-700 mb-2">
                      Features:
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {mode.features.map((feature, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-xs rounded-full"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full text-sm sm:text-base border-2 hover:bg-purple-50 hover:border-purple-500 hover:text-purple-700 transition-all duration-300"
                    onClick={() => handleStartPractice(mode)}
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Try {mode.name}
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
              How Practice Modes Work
            </h2>
            <p className="text-base sm:text-lg text-gray-600 px-4">
              Simple steps to start your viva practice journey
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            <div className="text-center bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 shadow-lg">
                <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 text-blue-600 font-bold">
                1
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                Choose Mode
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                Select the practice mode that fits your learning style and goals
              </p>
            </div>
            <div className="text-center bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 shadow-lg">
                <Target className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 text-green-600 font-bold">
                2
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                Set Preferences
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                Customize difficulty, subject focus, and session duration
              </p>
            </div>
            <div className="text-center bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 shadow-lg">
                <Play className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3 text-purple-600 font-bold">
                3
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                Start Practice
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                Begin your AI-powered viva session with real-time feedback
              </p>
            </div>
            <div className="text-center bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 shadow-lg">
                <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3 text-orange-600 font-bold">
                4
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                Track Progress
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                Review performance analytics and improve continuously
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-600 via-teal-600 to-blue-600 text-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center justify-center px-4 py-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-full text-sm font-semibold mb-6">
            <Trophy className="w-4 h-4 mr-2" />
            Ready to Excel?
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 md:mb-4 px-4">
            Ready to Start Practicing?
          </h2>
          <p className="text-base sm:text-lg md:text-xl opacity-90 mb-6 md:mb-8 px-4">
            Choose your preferred practice mode and begin your journey to viva
            excellence
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
            <Link href="/sign-up" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="bg-white text-green-600 hover:bg-gray-100 hover:scale-105 transition-all duration-300 w-full sm:w-auto shadow-xl"
              >
                <Trophy className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                <span className="text-sm sm:text-base font-semibold">
                  Start Free Practice
                </span>
              </Button>
            </Link>
            <Link href="/subjects" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-white text-white hover:bg-white hover:text-green-600 hover:scale-105 transition-all duration-300 w-full sm:w-auto"
              >
                <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                <span className="text-sm sm:text-base font-semibold">
                  Browse Subjects
                </span>
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PracticeModesPage;
