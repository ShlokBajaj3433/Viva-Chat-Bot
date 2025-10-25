import Agent from "@/components/Agent";
import { getCurrentUser } from "@/lib/actions/auth.action";

const Page = async () => {
  const user = await getCurrentUser();

  const displayName = user?.name ?? "Viva learner";

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-3">
            🎤 AI Interview Session
          </h1>
          <p className="text-gray-600 text-lg">
            Get ready for your personalized interview experience
          </p>
        </div>

        {/* Agent Component */}
        <Agent userName={displayName} userId={user?.id} type="generate" />
      </div>
    </div>
  );
};

export default Page;
