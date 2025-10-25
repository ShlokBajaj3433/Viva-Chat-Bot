import Link from "next/link";
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
} from "lucide-react";
import { Button } from "@/components/ui/button";

const PracticeModesPage = () => {
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
    {
      id: "group-practice",
      name: "Group Practice",
      icon: Users,
      description: "Practice with peers in collaborative sessions",
      duration: "20-40 min",
      difficulty: "All Levels",
      questions: "15-30",
      features: ["Multiplayer", "Peer interaction", "Group discussions"],
      color: "bg-indigo-500",
      gradient: "from-indigo-500 to-blue-500",
      popular: false,
      subjects: ["Selected subjects with group compatibility"],
      bestFor: "Collaborative learning, peer support, team preparation",
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
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Choose Your Practice Mode
          </h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto mb-8">
            Different learning styles, different practice modes. Find the
            perfect way to prepare for your viva with our AI-powered interview
            sessions.
          </p>
          <div className="flex justify-center space-x-8 text-center">
            <div>
              <div className="text-3xl font-bold">6</div>
              <div className="text-purple-200">Practice Modes</div>
            </div>
            <div>
              <div className="text-3xl font-bold">50+</div>
              <div className="text-purple-200">Subjects</div>
            </div>
            <div>
              <div className="text-3xl font-bold">∞</div>
              <div className="text-purple-200">Possibilities</div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Modes */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              🔥 Most Popular Modes
            </h2>
            <p className="text-lg text-gray-600">
              Student favorites for effective viva preparation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {practiceModes
              .filter((mode) => mode.popular)
              .map((mode) => {
                const IconComponent = mode.icon;
                return (
                  <div key={mode.id} className="relative">
                    <div className="absolute -top-3 -right-3 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-bold z-10">
                      Popular
                    </div>
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full">
                      <div
                        className={`h-32 bg-gradient-to-r ${mode.gradient} flex items-center justify-center`}
                      >
                        <IconComponent className="w-16 h-16 text-white" />
                      </div>
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-xl font-bold text-gray-900">
                            {mode.name}
                          </h3>
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(
                              mode.difficulty
                            )}`}
                          >
                            {mode.difficulty}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-4">{mode.description}</p>

                        <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                          <div className="text-center">
                            <Clock className="w-4 h-4 mx-auto mb-1 text-gray-500" />
                            <div className="font-medium">{mode.duration}</div>
                          </div>
                          <div className="text-center">
                            <FileText className="w-4 h-4 mx-auto mb-1 text-gray-500" />
                            <div className="font-medium">
                              {mode.questions} Q's
                            </div>
                          </div>
                          <div className="text-center">
                            <Target className="w-4 h-4 mx-auto mb-1 text-gray-500" />
                            <div className="font-medium text-xs">Focused</div>
                          </div>
                        </div>

                        <div className="mb-4">
                          <p className="text-sm font-medium text-gray-700 mb-2">
                            Key Features:
                          </p>
                          <div className="space-y-1">
                            {mode.features.map((feature, index) => (
                              <div
                                key={index}
                                className="flex items-center text-sm text-gray-600"
                              >
                                <Star className="w-3 h-3 mr-2 text-yellow-500" />
                                {feature}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="mb-4">
                          <p className="text-sm font-medium text-gray-700 mb-1">
                            Best For:
                          </p>
                          <p className="text-sm text-gray-600">
                            {mode.bestFor}
                          </p>
                        </div>

                        <Button className="w-full" size="lg">
                          <Play className="w-4 h-4 mr-2" />
                          Start {mode.name}
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
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              All Practice Modes
            </h2>
            <p className="text-lg text-gray-600">
              Comprehensive collection of practice modes for every learning
              style
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {practiceModes.map((mode) => {
              const IconComponent = mode.icon;
              return (
                <div
                  key={mode.id}
                  className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <div
                        className={`w-12 h-12 ${mode.color} rounded-lg flex items-center justify-center mr-4`}
                      >
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {mode.name}
                        </h3>
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(
                            mode.difficulty
                          )}`}
                        >
                          {mode.difficulty}
                        </span>
                      </div>
                    </div>
                    {mode.popular && (
                      <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded-full">
                        Popular
                      </span>
                    )}
                  </div>

                  <p className="text-gray-600 mb-4">{mode.description}</p>

                  <div className="grid grid-cols-3 gap-4 mb-4 text-sm text-center">
                    <div>
                      <Clock className="w-4 h-4 mx-auto mb-1 text-gray-500" />
                      <div className="font-medium">{mode.duration}</div>
                    </div>
                    <div>
                      <FileText className="w-4 h-4 mx-auto mb-1 text-gray-500" />
                      <div className="font-medium">{mode.questions}</div>
                    </div>
                    <div>
                      <Target className="w-4 h-4 mx-auto mb-1 text-gray-500" />
                      <div className="font-medium text-xs">Adaptive</div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">
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

                  <Button variant="outline" className="w-full">
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
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How Practice Modes Work
            </h2>
            <p className="text-lg text-gray-600">
              Simple steps to start your viva practice journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                1. Choose Mode
              </h3>
              <p className="text-gray-600">
                Select the practice mode that fits your learning style and goals
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                2. Set Preferences
              </h3>
              <p className="text-gray-600">
                Customize difficulty, subject focus, and session duration
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Play className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                3. Start Practice
              </h3>
              <p className="text-gray-600">
                Begin your AI-powered viva session with real-time feedback
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                4. Track Progress
              </h3>
              <p className="text-gray-600">
                Review performance analytics and improve continuously
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-600 to-teal-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Start Practicing?
          </h2>
          <p className="text-xl opacity-90 mb-8">
            Choose your preferred practice mode and begin your journey to viva
            excellence
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/sign-up">
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-green-600 hover:bg-gray-100"
              >
                <Trophy className="w-5 h-5 mr-2" />
                Start Free Practice
              </Button>
            </Link>
            <Link href="/subjects">
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-green-600"
              >
                <BookOpen className="w-5 h-5 mr-2" />
                Browse Subjects
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PracticeModesPage;
