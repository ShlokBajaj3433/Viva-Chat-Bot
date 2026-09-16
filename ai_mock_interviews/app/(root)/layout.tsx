import { ReactNode } from "react";
import { redirect } from "next/navigation";

import { isAuthenticated } from "@/lib/actions/auth.action";
import LayoutClient from "@/components/LayoutClient";
import "../globals.css";

const Layout = async ({ children }: { children: ReactNode }) => {
  const isUserAuthenticated = await isAuthenticated();
  if (!isUserAuthenticated) redirect("/sign-in");

  return <LayoutClient>{children}</LayoutClient>;
};

export default Layout;
