"use client";

import { useState } from "react";
import { X, Plus, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface JoinClassroomModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJoin: (classCode: string) => Promise<void>;
  isLoading?: boolean;
}

export default function JoinClassroomModal({
  isOpen,
  onClose,
  onJoin,
  isLoading = false,
}: JoinClassroomModalProps) {
  const [classCode, setClassCode] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!classCode.trim()) {
      setError("Please enter a classroom code");
      return;
    }

    if (classCode.trim().length !== 6) {
      setError("Classroom code must be 6 characters");
      return;
    }

    try {
      await onJoin(classCode.trim().toUpperCase());
      setClassCode("");
      onClose();
      toast.success("Successfully joined classroom!");
    } catch (err: any) {
      setError(err.message || "Failed to join classroom");
      toast.error(err.message || "Failed to join classroom");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg max-w-md w-full transform transition-all">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Join a Classroom</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <p className="text-sm text-gray-600">
            Enter the classroom code provided by your instructor to join the class.
          </p>

          {/* Code Input */}
          <div>
            <label htmlFor="classCode" className="block text-sm font-medium text-gray-700 mb-2">
              Classroom Code
            </label>
            <div className="relative">
              <Code className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="classCode"
                type="text"
                value={classCode}
                onChange={(e) => {
                  setClassCode(e.target.value.toUpperCase());
                  setError("");
                }}
                placeholder="e.g., ABC123"
                maxLength={6}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg font-mono tracking-widest"
                disabled={isLoading}
              />
            </div>
            {error && (
              <p className="text-sm text-red-600 mt-2 flex items-center gap-1">
                <span className="inline-block w-1 h-1 bg-red-600 rounded-full" />
                {error}
              </p>
            )}
          </div>

          {/* Tips */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-xs font-semibold text-blue-900 uppercase tracking-wider mb-2">
              How to find your code:
            </p>
            <ul className="text-xs text-blue-800 space-y-1">
              <li>• Ask your instructor for the classroom code</li>
              <li>• Check your email or class materials</li>
              <li>• Contact your instructor if you don't have it</li>
            </ul>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading || !classCode.trim()}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              {isLoading ? (
                <>
                  <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Joining...
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 mr-2" />
                  Join Classroom
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
