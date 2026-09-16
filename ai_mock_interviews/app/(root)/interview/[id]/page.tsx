import { redirect } from "next/navigation";

import Agent from "@/components/Agent";

import {
  getFeedbackByInterviewId,
  getInterviewById,
} from "@/lib/actions/general.action";
import { getCurrentUser } from "@/lib/actions/auth.action";

const InterviewDetails = async ({ params }: RouteParams) => {
  const { id } = await params;

  const user = await getCurrentUser();

  const interview = await getInterviewById(id);
  if (!interview) redirect("/");

  const feedback = await getFeedbackByInterviewId({
    interviewId: id,
    userId: user?.id!,
  });

  return (
    <Agent
      userName={user?.name!}
      userId={user?.id}
      interviewId={id}
      type="interview"
      questions={interview.questions}
      feedbackId={feedback?.id}
    />
  );
};

export default InterviewDetails;
