import React from "react";
import {
  BookOpen,
  Video,
  MessageCircle,
  FileText,
  Search,
  Lightbulb,
} from "lucide-react";
import Link from "next/link";

const HelpCenterPage = () => {
  const helpCategories = [
    {
      icon: BookOpen,
      title: "Getting Started",
      description: "Learn the basics of using VivaChat",
      articles: [
        "How to create your first interview",
        "Understanding the dashboard",
        "Choosing the right subject",
        "Setting up your profile",
      ],
      color: "blue",
    },
    {
      icon: Video,
      title: "Voice Interviews",
      description: "Master voice-based viva practice",
      articles: [
        "Setting up your microphone",
        "Voice interview best practices",
        "Troubleshooting audio issues",
        "Understanding voice feedback",
      ],
      color: "purple",
    },
    {
      icon: FileText,
      title: "Reports & Feedback",
      description: "Understanding your performance",
      articles: [
        "Reading your feedback report",
        "Understanding scoring system",
        "Downloading PDF reports",
        "Tracking your progress",
      ],
      color: "green",
    },
    {
      icon: Lightbulb,
      title: "Best Practices",
      description: "Tips for effective preparation",
      articles: [
        "How to prepare for technical vivas",
        "Common mistakes to avoid",
        "Improving communication skills",
        "Time management strategies",
      ],
      color: "orange",
    },
  ];

  const quickLinks = [
    { name: "Account Settings", href: "/profile" },
    { name: "Pricing & Plans", href: "/pricing" },
    { name: "FAQ", href: "/faq" },
    { name: "Contact Support", href: "/contact" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            Help Center
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Find guides, tutorials, and resources to help you get the most out
            of VivaChat
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search for help articles..."
              className="w-full pl-12 pr-4 py-4 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Help Categories */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {helpCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <div
                key={index}
                className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-8 border border-gray-700 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-center mb-4">
                  <div
                    className={`bg-${category.color}-500/20 p-3 rounded-lg mr-4`}
                  >
                    <Icon className={`w-8 h-8 text-${category.color}-400`} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">{category.title}</h3>
                    <p className="text-gray-400">{category.description}</p>
                  </div>
                </div>
                <ul className="space-y-3 mt-6">
                  {category.articles.map((article, idx) => (
                    <li key={idx}>
                      <a
                        href="#"
                        className="text-gray-300 hover:text-blue-400 transition-colors flex items-center"
                      >
                        <span className="mr-2">→</span>
                        {article}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Quick Links */}
        <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-2xl p-8 border border-gray-700 mb-16">
          <h2 className="text-2xl font-bold mb-6">Quick Links</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {quickLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="bg-gray-800/50 hover:bg-gray-700 p-4 rounded-lg text-center transition-colors border border-gray-700 hover:border-blue-500"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Video Tutorials Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Video Tutorials
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              "Getting Started Tutorial",
              "Voice Interview Guide",
              "Understanding Feedback",
            ].map((title, index) => (
              <div
                key={index}
                className="bg-gray-800/50 rounded-lg border border-gray-700 overflow-hidden hover:border-blue-500 transition-all"
              >
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-48 flex items-center justify-center">
                  <Video className="w-16 h-16 text-white" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{title}</h3>
                  <p className="text-gray-400 mb-4">
                    Learn how to use VivaChat effectively with our step-by-step
                    video guide.
                  </p>
                  <button className="text-blue-400 hover:text-blue-300 font-semibold">
                    Watch Now →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Support */}
        <div className="text-center bg-gray-800/50 rounded-2xl p-12 border border-gray-700">
          <MessageCircle className="w-16 h-16 mx-auto mb-6 text-blue-400" />
          <h2 className="text-3xl font-bold mb-4">Need More Help?</h2>
          <p className="text-gray-300 mb-6 text-lg">
            Our support team is available 24/7 to assist you
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-3 rounded-lg transition-all"
            >
              Contact Support
            </Link>
            <Link
              href="/faq"
              className="inline-block bg-gray-700 hover:bg-gray-600 text-white font-semibold px-8 py-3 rounded-lg transition-all"
            >
              View FAQ
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenterPage;
