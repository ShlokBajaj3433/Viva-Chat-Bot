"use client";

import { useState } from "react";
import {
  Plus,
  PlayCircle,
  Bookmark,
  Settings,
  Bell,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface QuickActionsPanelProps {
  onJoinClassroom: () => void;
  onStartViva?: () => void;
  unreadCount?: number;
}

export default function QuickActionsPanel({
  onJoinClassroom,
  onStartViva,
  unreadCount = 0,
}: QuickActionsPanelProps) {
  const [isMinimized, setIsMinimized] = useState(false);

  return (
    <div
      className={`
        fixed right-4 bottom-4 z-40 transition-all duration-300
        ${isMinimized ? "w-16 h-16" : "w-80"}
      `}
    >
      {!isMinimized && (
        <div className="bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4 text-white">
            <h3 className="font-bold text-lg flex items-center gap-2">
              <Bookmark className="w-5 h-5" />
              Quick Actions
            </h3>
          </div>

          {/* Actions */}
          <div className="p-4 space-y-3">
            {/* Join Classroom */}
            <button
              onClick={onJoinClassroom}
              className="
                w-full flex items-center gap-3 px-4 py-3 rounded-lg
                bg-blue-50 hover:bg-blue-100 border border-blue-200
                transition-all duration-200 group
              "
            >
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-blue-500 text-white group-hover:bg-blue-600">
                  <Plus className="w-5 h-5" />
                </div>
              </div>
              <div className="flex-1 text-left">
                <p className="font-semibold text-gray-900">Join Classroom</p>
                <p className="text-xs text-gray-600">Use a class code</p>
              </div>
            </button>

            {/* Start Viva */}
            {onStartViva && (
              <button
                onClick={onStartViva}
                className="
                  w-full flex items-center gap-3 px-4 py-3 rounded-lg
                  bg-green-50 hover:bg-green-100 border border-green-200
                  transition-all duration-200 group
                "
              >
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-green-500 text-white group-hover:bg-green-600">
                    <PlayCircle className="w-5 h-5" />
                  </div>
                </div>
                <div className="flex-1 text-left">
                  <p className="font-semibold text-gray-900">Start Viva</p>
                  <p className="text-xs text-gray-600">Begin an interview</p>
                </div>
              </button>
            )}

            {/* Divider */}
            <div className="border-t border-gray-200 my-2" />

            {/* Notifications */}
            <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-gray-50">
              <div className="flex-shrink-0">
                <div className="relative">
                  <Bell className="w-5 h-5 text-gray-600" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                      {unreadCount > 9 ? "9+" : unreadCount}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex-1 text-left">
                <p className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Notifications
                </p>
                <p className="text-xs text-gray-600">
                  {unreadCount === 0
                    ? "All caught up"
                    : `${unreadCount} unread`}
                </p>
              </div>
            </div>

            {/* Settings */}
            <button
              className="
                w-full flex items-center gap-3 px-4 py-2 rounded-lg
                text-gray-700 hover:bg-gray-100 transition-colors
                text-sm font-medium
              "
            >
              <Settings className="w-4 h-4" />
              Dashboard Settings
            </button>
          </div>

          {/* Footer */}
          <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 text-xs text-gray-600">
            <p className="flex items-center justify-between">
              <span>Last updated: just now</span>
              <button
                onClick={() => setIsMinimized(true)}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Minimize
              </button>
            </p>
          </div>
        </div>
      )}

      {isMinimized && (
        <button
          onClick={() => setIsMinimized(false)}
          className="
            flex items-center justify-center h-16 w-16
            bg-blue-600 hover:bg-blue-700 text-white rounded-full
            shadow-lg hover:shadow-xl transition-all duration-200
            border-4 border-white
          "
          title="Open Quick Actions"
        >
          <Bookmark className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}
