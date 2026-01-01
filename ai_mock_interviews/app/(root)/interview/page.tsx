import GenerateInterviewWrapper from "@/components/GenerateInterviewWrapper";
import { getCurrentUser } from "@/lib/actions/auth.action";

const Page = async () => {
  const user = await getCurrentUser();

  const displayName = user?.name ?? "Viva learner";

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      <GenerateInterviewWrapper userName={displayName} userId={user?.id} />
    </div>
  );
};

export default Page;
