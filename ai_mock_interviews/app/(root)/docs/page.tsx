import React from "react";
import {
  Book,
  Code,
  Database,
  Zap,
  Settings,
  Shield,
  FileCode,
} from "lucide-react";
import Link from "next/link";

const DocumentationPage = () => {
  const sections = [
    {
      icon: Book,
      title: "Getting Started",
      description: "Quick start guide and basic concepts",
      topics: [
        "Introduction to VivaChat",
        "Creating your account",
        "First interview walkthrough",
        "Understanding the interface",
      ],
    },
    {
      icon: Zap,
      title: "Features",
      description: "Comprehensive feature documentation",
      topics: [
        "Interview types and modes",
        "AI-powered feedback system",
        "Voice interview capabilities",
        "Performance analytics",
        "Bookmark and favorite features",
        "PDF report generation",
      ],
    },
    {
      icon: Code,
      title: "API Reference",
      description: "For developers and integrations",
      topics: [
        "Authentication endpoints",
        "Interview management API",
        "Feedback retrieval",
        "Webhook integration",
        "Rate limits and quotas",
      ],
    },
    {
      icon: Database,
      title: "Data Management",
      description: "How we handle your data",
      topics: [
        "Data storage and encryption",
        "Export your data",
        "Delete your account",
        "GDPR compliance",
      ],
    },
    {
      icon: Settings,
      title: "Configuration",
      description: "Customize your experience",
      topics: [
        "Profile settings",
        "Interview preferences",
        "Notification settings",
        "Subscription management",
      ],
    },
    {
      icon: Shield,
      title: "Security",
      description: "Security best practices",
      topics: [
        "Account security",
        "Two-factor authentication",
        "Password management",
        "Privacy controls",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Breadcrumb */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-2 text-sm">
            <Link
              href="/"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Home
            </Link>
            <span className="text-gray-600">/</span>
            <span className="text-white font-medium">Documentation</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full mb-6">
            <FileCode className="w-4 h-4 text-purple-400 mr-2" />
            <span className="text-purple-400 text-sm font-semibold">
              DEVELOPERS
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Documentation
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Complete technical documentation for VivaChat platform
          </p>
        </div>

        {/* Quick Navigation */}
        <div className="mb-16 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-2xl p-8 border border-gray-700">
          <h2 className="text-2xl font-bold mb-4">Quick Navigation</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {sections.map((section, index) => (
              <a
                key={index}
                href={`#${section.title.toLowerCase().replace(/\s+/g, "-")}`}
                className="bg-gray-800/50 hover:bg-gray-700 p-4 rounded-lg transition-colors border border-gray-700 hover:border-blue-500 flex items-center"
              >
                <section.icon className="w-6 h-6 text-blue-400 mr-3" />
                <span>{section.title}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Documentation Sections */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <div
                key={index}
                id={section.title.toLowerCase().replace(/\s+/g, "-")}
                className="bg-gray-800/50 rounded-xl p-8 border border-gray-700 hover:border-blue-500 transition-all"
              >
                <div className="flex items-start mb-6">
                  <div className="bg-blue-500/20 p-3 rounded-lg mr-4">
                    <Icon className="w-8 h-8 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{section.title}</h3>
                    <p className="text-gray-400">{section.description}</p>
                  </div>
                </div>
                <ul className="space-y-3">
                  {section.topics.map((topic, idx) => (
                    <li key={idx}>
                      <a
                        href="#"
                        className="text-gray-300 hover:text-blue-400 transition-colors flex items-center group"
                      >
                        <span className="mr-2 group-hover:mr-3 transition-all">
                          →
                        </span>
                        {topic}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Code Example Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8">API Example</h2>
          <div className="bg-gray-800/50 rounded-xl p-8 border border-gray-700">
            <h3 className="text-xl font-semibold mb-4 text-blue-400">
              Creating an Interview Session
            </h3>
            <pre className="bg-gray-900 p-6 rounded-lg overflow-x-auto text-sm">
              <code className="text-green-400">{`// Example: Create a new interview session
const response = await fetch('/api/interview/create', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: JSON.stringify({
    subject: 'Computer Networks',
    difficulty: 'intermediate',
    type: 'technical',
    duration: 30
  })
});

const data = await response.json();
console.log('Interview ID:', data.interviewId);`}</code>
            </pre>
          </div>
        </div>

        {/* Version Info */}
        <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-2xl p-8 border border-gray-700 text-center">
          <h2 className="text-2xl font-bold mb-4">Documentation Version</h2>
          <p className="text-gray-300 mb-2">Current Version: v2.0.0</p>
          <p className="text-gray-400 text-sm">
            Last Updated: November 8, 2025
          </p>
          <div className="mt-6">
            <a
              href="https://github.com/ShlokBajaj3433/Viva-Chat-Bot"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gray-700 hover:bg-gray-600 text-white font-semibold px-6 py-2 rounded-lg transition-all"
            >
              View on GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentationPage;
