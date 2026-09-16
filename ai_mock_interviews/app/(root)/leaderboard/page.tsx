import {
  Trophy,
  Medal,
  Crown,
  Star,
  TrendingUp,
  Calendar,
  Users,
  Award,
  Target,
  Zap,
  Flame,
  BarChart3,
  Clock,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const LeaderboardPage = () => {
  const topPerformers = [
    {
      rank: 1,
      name: "Alex Chen",
      avatar: "/user-avatar.png",
      score: 2847,
      streak: 28,
      subject: "Machine Learning",
      lastActive: "2 hours ago",
      badges: ["🔥", "💎", "🎯"],
      level: "Expert",
      improvement: "+15%",
    },
    {
      rank: 2,
      name: "Sarah Johnson",
      avatar: "/user-avatar.png",
      score: 2691,
      streak: 22,
      subject: "Data Structures",
      lastActive: "4 hours ago",
      badges: ["⚡", "🏆", "📚"],
      level: "Advanced",
      improvement: "+12%",
    },
    {
      rank: 3,
      name: "Michael Rodriguez",
      avatar: "/user-avatar.png",
      score: 2534,
      streak: 19,
      subject: "Network Security",
      lastActive: "1 day ago",
      badges: ["🛡️", "🌟", "🎪"],
      level: "Advanced",
      improvement: "+8%",
    },
  ];

  const allRankings = [
    ...topPerformers,
    {
      rank: 4,
      name: "Emma Wilson",
      avatar: "/user-avatar.png",
      score: 2398,
      streak: 16,
      subject: "Web Development",
      lastActive: "3 hours ago",
      badges: ["🌐", "⭐", "🚀"],
      level: "Intermediate",
      improvement: "+18%",
    },
    {
      rank: 5,
      name: "David Kim",
      avatar: "/user-avatar.png",
      score: 2267,
      streak: 14,
      subject: "Operating Systems",
      lastActive: "6 hours ago",
      badges: ["💻", "🔧", "⚙️"],
      level: "Intermediate",
      improvement: "+7%",
    },
    {
      rank: 6,
      name: "Lisa Zhang",
      avatar: "/user-avatar.png",
      score: 2156,
      streak: 12,
      subject: "Mathematics",
      lastActive: "1 day ago",
      badges: ["📐", "🧮", "📊"],
      level: "Intermediate",
      improvement: "+9%",
    },
    {
      rank: 7,
      name: "James Brown",
      avatar: "/user-avatar.png",
      score: 2089,
      streak: 11,
      subject: "Physics",
      lastActive: "2 days ago",
      badges: ["⚛️", "🔬", "🌌"],
      level: "Intermediate",
      improvement: "+5%",
    },
    {
      rank: 8,
      name: "Anna Petrov",
      avatar: "/user-avatar.png",
      score: 1987,
      streak: 9,
      subject: "Economics",
      lastActive: "12 hours ago",
      badges: ["💰", "📈", "🏦"],
      level: "Beginner",
      improvement: "+22%",
    },
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />;
      default:
        return <span className="text-lg font-bold text-gray-600">#{rank}</span>;
    }
  };

  const getRankBg = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-r from-yellow-400 to-yellow-500";
      case 2:
        return "bg-gradient-to-r from-gray-300 to-gray-400";
      case 3:
        return "bg-gradient-to-r from-amber-500 to-amber-600";
      default:
        return "bg-white";
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Expert":
        return "text-red-600 bg-red-100";
      case "Advanced":
        return "text-purple-600 bg-purple-100";
      case "Intermediate":
        return "text-blue-600 bg-blue-100";
      case "Beginner":
        return "text-green-600 bg-green-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const categories = [
    { name: "Overall", active: true, icon: Trophy },
    { name: "This Week", active: false, icon: Calendar },
    { name: "This Month", active: false, icon: BarChart3 },
    { name: "Subject Leaders", active: false, icon: BookOpen },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <Trophy className="w-16 h-16 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Global Leaderboard
          </h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto mb-8">
            Compete with students worldwide and track your progress on the
            global viva leaderboard. See where you stand and get motivated to
            reach the top!
          </p>
          <div className="flex justify-center space-x-8 text-center">
            <div>
              <div className="text-3xl font-bold">10,000+</div>
              <div className="text-yellow-200">Active Students</div>
            </div>
            <div>
              <div className="text-3xl font-bold">50+</div>
              <div className="text-yellow-200">Countries</div>
            </div>
            <div>
              <div className="text-3xl font-bold">24/7</div>
              <div className="text-yellow-200">Competition</div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-white border-b">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <button
                  key={category.name}
                  className={`flex items-center px-6 py-3 rounded-lg font-medium transition-colors ${
                    category.active
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  <IconComponent className="w-5 h-5 mr-2" />
                  {category.name}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Top 3 Podium */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              🏆 Top Performers
            </h2>
            <p className="text-lg text-gray-600">
              This month's highest achievers in viva practice
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {topPerformers.map((user, index) => (
              <div
                key={user.rank}
                className={`relative ${
                  index === 0
                    ? "md:order-2 md:scale-110"
                    : index === 1
                    ? "md:order-1"
                    : "md:order-3"
                }`}
              >
                <div
                  className={`${getRankBg(
                    user.rank
                  )} rounded-2xl shadow-lg overflow-hidden text-white`}
                >
                  <div className="p-6 text-center">
                    <div className="relative mb-4">
                      <Image
                        src={user.avatar}
                        alt={user.name}
                        width={80}
                        height={80}
                        className="w-20 h-20 rounded-full mx-auto border-4 border-white shadow-lg"
                      />
                      <div className="absolute -top-2 -right-2">
                        {getRankIcon(user.rank)}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-1">{user.name}</h3>
                    <p className="opacity-90 mb-4">{user.subject}</p>

                    <div className="bg-white/20 rounded-lg p-4 mb-4">
                      <div className="text-2xl font-bold mb-1">
                        {user.score.toLocaleString()}
                      </div>
                      <div className="text-sm opacity-90">Total Score</div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <Flame className="w-4 h-4 mx-auto mb-1" />
                        <div className="font-semibold">{user.streak}</div>
                        <div className="opacity-90">Day Streak</div>
                      </div>
                      <div>
                        <TrendingUp className="w-4 h-4 mx-auto mb-1" />
                        <div className="font-semibold">{user.improvement}</div>
                        <div className="opacity-90">Improvement</div>
                      </div>
                    </div>

                    <div className="mt-4 flex justify-center space-x-1">
                      {user.badges.map((badge, badgeIndex) => (
                        <span key={badgeIndex} className="text-lg">
                          {badge}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Full Rankings Table */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              Complete Rankings
            </h2>
            <Button variant="outline">
              <Target className="w-4 h-4 mr-2" />
              Find My Rank
            </Button>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                      Rank
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                      Student
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                      Score
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                      Streak
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                      Subject
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                      Level
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                      Last Active
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {allRankings.map((user) => (
                    <tr
                      key={user.rank}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {getRankIcon(user.rank)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Image
                            src={user.avatar}
                            alt={user.name}
                            width={40}
                            height={40}
                            className="w-10 h-10 rounded-full mr-3"
                          />
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {user.name}
                            </div>
                            <div className="flex space-x-1 mt-1">
                              {user.badges.map((badge, index) => (
                                <span key={index} className="text-xs">
                                  {badge}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-bold text-gray-900">
                          {user.score.toLocaleString()}
                        </div>
                        <div className="text-xs text-green-600">
                          {user.improvement}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Flame className="w-4 h-4 text-orange-500 mr-1" />
                          <span className="text-sm font-medium">
                            {user.streak}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {user.subject}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${getLevelColor(
                            user.level
                          )}`}
                        >
                          {user.level}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.lastActive}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Button variant="outline" size="lg">
              Load More Rankings
            </Button>
          </div>
        </div>
      </section>

      {/* Achievement Stats */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Community Achievements
            </h2>
            <p className="text-lg text-gray-600">
              Celebrating milestones reached by our global community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <div className="text-2xl font-bold text-gray-900 mb-1">
                10,247
              </div>
              <div className="text-gray-600">Active Students</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <Clock className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <div className="text-2xl font-bold text-gray-900 mb-1">
                892,456
              </div>
              <div className="text-gray-600">Hours Practiced</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <Star className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
              <div className="text-2xl font-bold text-gray-900 mb-1">2,847</div>
              <div className="text-gray-600">Highest Score</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <Flame className="w-12 h-12 text-red-600 mx-auto mb-4" />
              <div className="text-2xl font-bold text-gray-900 mb-1">156</div>
              <div className="text-gray-600">Longest Streak</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Climb the Leaderboard?
          </h2>
          <p className="text-xl opacity-90 mb-8">
            Start practicing today and compete with students from around the
            world
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-purple-600 hover:bg-gray-100"
            >
              <Zap className="w-5 h-5 mr-2" />
              Start Practicing
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-purple-600"
            >
              <Trophy className="w-5 h-5 mr-2" />
              View My Stats
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LeaderboardPage;
