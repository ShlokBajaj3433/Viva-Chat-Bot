import { redirect } from "next/navigation";
import {
  User,
  Mail,
  Calendar,
  BookOpen,
  BarChart3,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/actions/auth.action";
import { getInterviewsByUserId } from "@/lib/actions/general.action";

const ProfilePage = async () => {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const userInterviews = await getInterviewsByUserId(user.id);
  const totalInterviews = userInterviews?.length || 0;

  const stats = [
    {
      icon: BookOpen,
      label: "Total Sessions",
      value: totalInterviews,
      color: "text-blue-600",
    },
    {
      icon: BarChart3,
      label: "Average Score",
      value: "85%",
      color: "text-green-600",
    },
    {
      icon: Calendar,
      label: "Days Active",
      value: "12",
      color: "text-purple-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center space-x-6">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-blue-600" />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
              <div className="flex items-center space-x-2 text-gray-600 mt-1">
                <Mail className="w-4 h-4" />
                <span>{user.email}</span>
              </div>
              <p className="text-gray-500 mt-2">
                Member since {new Date().toLocaleDateString()}
              </p>
            </div>
            <Button>
              <Settings className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      {stat.label}
                    </p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">
                      {stat.value}
                    </p>
                  </div>
                  <div
                    className={`w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center`}
                  >
                    <IconComponent className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Recent Activity
          </h2>

          {totalInterviews > 0 ? (
            <div className="space-y-4">
              {userInterviews?.slice(0, 5).map((interview, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between border-b border-gray-200 pb-4"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {interview.role}
                      </p>
                      <p className="text-sm text-gray-500">
                        {interview.type} • {interview.level}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">
                      {new Date(interview.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No activity yet
              </h3>
              <p className="text-gray-500 mb-4">
                Start your first viva session to see your activity here
              </p>
              <Button>Start First Session</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
