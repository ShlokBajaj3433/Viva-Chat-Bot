"use client";

import { useState } from "react";
import { Bookmark } from "lucide-react";
import { toggleBookmark } from "@/lib/actions/general.action";
import { cn } from "@/lib/utils";

interface BookmarkButtonProps {
  interviewId: string;
  userId: string;
  initialBookmarked?: boolean;
  className?: string;
}

export default function BookmarkButton({
  interviewId,
  userId,
  initialBookmarked = false,
  className,
}: BookmarkButtonProps) {
  const [isBookmarked, setIsBookmarked] = useState(initialBookmarked);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setIsLoading(true);

    try {
      const result = await toggleBookmark(interviewId, userId);

      if (result.success && result.bookmarked !== undefined) {
        setIsBookmarked(result.bookmarked);
      }
    } catch (error) {
      console.error("Error toggling bookmark:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleToggle}
      disabled={isLoading}
      className={cn(
        "transition-all duration-200 hover:scale-110 active:scale-95",
        isLoading && "opacity-50 cursor-not-allowed",
        className
      )}
      title={isBookmarked ? "Remove bookmark" : "Add bookmark"}
    >
      <Bookmark
        className={cn(
          "w-5 h-5 transition-colors duration-200",
          isBookmarked
            ? "fill-yellow-500 text-yellow-500"
            : "text-blue-600 hover:text-yellow-500"
        )}
      />
    </button>
  );
}
