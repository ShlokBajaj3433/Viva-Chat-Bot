import ClassroomDetailsPage from "@/components/ClassroomDetailsPage";
import { RouteParams } from "@/types";

export default async function Page({ params }: RouteParams) {
  const { id } = await params;

  return <ClassroomDetailsPage />;
}
