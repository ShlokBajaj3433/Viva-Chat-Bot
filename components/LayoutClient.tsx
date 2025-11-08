"use client";

import { ReactNode, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const LayoutClient = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();

  // Check if current path is an interview detail page (not feedback or other pages)
  // Match /interview/[id] but NOT /interview/[id]/feedback or /interview (without id)
  const isInterviewPage = pathname
    ? /^\/interview\/[^/]+$/.test(pathname)
    : false;

  // Scroll to top and prevent scrolling on interview pages
  useEffect(() => {
    if (isInterviewPage) {
      // Scroll to top when entering interview page
      window.scrollTo({ top: 0, behavior: "instant" });

      // Prevent scrolling
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      // Re-enable scrolling on other pages
      document.body.style.overflow = "unset";
      document.documentElement.style.overflow = "unset";
    }

    // Cleanup function
    return () => {
      document.body.style.overflow = "unset";
      document.documentElement.style.overflow = "unset";
    };
  }, [isInterviewPage]);

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
      {!isInterviewPage && <Navbar />}
      <main
        className={`flex-1 w-full ${!isInterviewPage ? "py-10" : ""} ${
          isInterviewPage ? "overflow-hidden h-screen" : ""
        }`}
      >
        {children}
      </main>
      {!isInterviewPage && <Footer />}
    </div>
  );
};

export default LayoutClient;
