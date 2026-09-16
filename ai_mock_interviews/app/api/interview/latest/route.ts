import { db } from "@/firebase/admin";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return Response.json(
      { success: false, error: "User ID is required" },
      { status: 400 }
    );
  }

  try {
    // Get the latest interview for this user
    const interviews = await db
      .collection("interviews")
      .where("userId", "==", userId)
      .orderBy("createdAt", "desc")
      .limit(1)
      .get();

    if (interviews.empty) {
      return Response.json(
        { success: false, error: "No interview found" },
        { status: 404 }
      );
    }

    const latestInterview = interviews.docs[0];

    return Response.json(
      {
        success: true,
        interviewId: latestInterview.id,
        interview: latestInterview.data(),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching latest interview:", error);
    return Response.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}
