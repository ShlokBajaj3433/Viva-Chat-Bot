import Agent from "@/components/Agent";
import { getCurrentUser } from "@/lib/actions/auth.action";

const Page = async () => {
  const user = await getCurrentUser();

  const displayName = user?.name ?? "Viva learner";

  return (
    <>
      <h3>Interview generation</h3>

      <Agent userName={displayName} userId={user?.id} type="generate" />
    </>
  );
};

export default Page;
