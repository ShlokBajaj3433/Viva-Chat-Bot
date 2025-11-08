import React from "react";
import { FileText, Download, Calendar, Tag, Radio } from "lucide-react";
import Link from "next/link";

const PressPage = () => {
  const pressReleases = [
    {
      date: "November 1, 2025",
      title: "VivaChat Surpasses 100,000 Student Users Milestone",
      excerpt:
        "MIT ADT University's VivaChat platform reaches major milestone with 100,000+ students using AI-powered interview preparation.",
      category: "Company News",
    },
    {
      date: "October 15, 2025",
      title: "VivaChat Launches Advanced Voice Interview Feature",
      excerpt:
        "New VAPI-powered voice interview system brings realistic viva simulation to engineering students.",
      category: "Product Launch",
    },
    {
      date: "September 20, 2025",
      title: "Partnership with Leading Engineering Colleges Announced",
      excerpt:
        "VivaChat partners with 50+ engineering institutions across India to enhance technical interview preparation.",
      category: "Partnership",
    },
    {
      date: "August 10, 2025",
      title: "VivaChat Receives Excellence in EdTech Innovation Award",
      excerpt:
        "Platform recognized for outstanding contribution to educational technology and student success.",
      category: "Awards",
    },
  ];

  const mediaKit = [
    { name: "Company Logo (PNG)", size: "2.3 MB" },
    { name: "Company Logo (SVG)", size: "156 KB" },
    { name: "Brand Guidelines", size: "8.5 MB" },
    { name: "Product Screenshots", size: "12.4 MB" },
    { name: "Executive Photos", size: "6.2 MB" },
    { name: "Press Release Template", size: "245 KB" },
  ];

  const coverage = [
    {
      outlet: "The Times of India - Education",
      title: "How AI is Transforming Engineering Education",
      date: "October 2025",
    },
    {
      outlet: "EdTech Review",
      title: "Top 10 Interview Preparation Platforms in India",
      date: "September 2025",
    },
    {
      outlet: "Indian Express - Technology",
      title: "MIT ADT's VivaChat: Revolutionizing Viva Preparation",
      date: "August 2025",
    },
    {
      outlet: "YourStory",
      title: "EdTech Startup VivaChat Helps Students Ace Interviews",
      date: "July 2025",
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
            <span className="text-white font-medium">Press</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full mb-6">
            <Radio className="w-4 h-4 text-purple-400 mr-2" />
            <span className="text-purple-400 text-sm font-semibold">
              MEDIA CENTER
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Press & Media
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Latest news, press releases, and media resources
          </p>
        </div>

        {/* Contact Info */}
        <div className="mb-16 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-2xl p-8 border border-gray-700">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Media Inquiries
          </h2>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <p className="text-gray-400 mb-2">Email</p>
              <a
                href="mailto:press@vivachat.in"
                className="text-blue-400 hover:text-blue-300 font-semibold"
              >
                press@vivachat.in
              </a>
            </div>
            <div>
              <p className="text-gray-400 mb-2">Phone</p>
              <a
                href="tel:+912067482999"
                className="text-blue-400 hover:text-blue-300 font-semibold"
              >
                +91 87889 20685
              </a>
            </div>
            <div>
              <p className="text-gray-400 mb-2">Press Contact</p>
              <p className="text-white font-semibold">Public Relations Team</p>
            </div>
          </div>
        </div>

        {/* Press Releases */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Recent Press Releases</h2>
          <div className="space-y-6">
            {pressReleases.map((release, index) => (
              <div
                key={index}
                className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-8 border border-gray-700 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="flex items-center text-sm text-gray-400">
                        <Calendar className="w-4 h-4 mr-2" />
                        {release.date}
                      </span>
                      <span className="flex items-center text-sm">
                        <Tag className="w-4 h-4 mr-2 text-blue-400" />
                        <span className="text-blue-400">
                          {release.category}
                        </span>
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{release.title}</h3>
                    <p className="text-gray-300">{release.excerpt}</p>
                  </div>
                  <button className="mt-4 md:mt-0 md:ml-6 bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg font-semibold transition-colors flex items-center whitespace-nowrap">
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Media Coverage */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Media Coverage</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {coverage.map((article, index) => (
              <div
                key={index}
                className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 hover:border-blue-500 transition-all"
              >
                <p className="text-blue-400 font-semibold mb-2">
                  {article.outlet}
                </p>
                <h3 className="text-xl font-bold mb-2">{article.title}</h3>
                <p className="text-gray-400 text-sm">{article.date}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Media Kit */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Media Kit</h2>
          <div className="bg-gray-800/50 rounded-xl p-8 border border-gray-700">
            <p className="text-gray-300 mb-6">
              Download our media kit for logos, brand assets, and company
              information.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mediaKit.map((item, index) => (
                <button
                  key={index}
                  className="bg-gray-800 hover:bg-gray-700 p-4 rounded-lg border border-gray-700 hover:border-blue-500 transition-all text-left flex items-center justify-between"
                >
                  <div>
                    <p className="font-semibold mb-1">{item.name}</p>
                    <p className="text-sm text-gray-400">{item.size}</p>
                  </div>
                  <Download className="w-5 h-5 text-blue-400" />
                </button>
              ))}
            </div>
            <div className="mt-6 text-center">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-3 rounded-lg transition-all inline-flex items-center">
                <Download className="w-5 h-5 mr-2" />
                Download Complete Media Kit
              </button>
            </div>
          </div>
        </div>

        {/* Company Facts */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Company at a Glance
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-blue-900/20 to-blue-800/20 rounded-xl p-8 border border-blue-500/50 text-center">
              <h3 className="text-4xl font-bold text-blue-400 mb-2">100K+</h3>
              <p className="text-gray-300">Active Users</p>
            </div>
            <div className="bg-gradient-to-br from-purple-900/20 to-purple-800/20 rounded-xl p-8 border border-purple-500/50 text-center">
              <h3 className="text-4xl font-bold text-purple-400 mb-2">43+</h3>
              <p className="text-gray-300">Engineering Subjects</p>
            </div>
            <div className="bg-gradient-to-br from-green-900/20 to-green-800/20 rounded-xl p-8 border border-green-500/50 text-center">
              <h3 className="text-4xl font-bold text-green-400 mb-2">1M+</h3>
              <p className="text-gray-300">Interviews Conducted</p>
            </div>
            <div className="bg-gradient-to-br from-orange-900/20 to-orange-800/20 rounded-xl p-8 border border-orange-500/50 text-center">
              <h3 className="text-4xl font-bold text-orange-400 mb-2">50+</h3>
              <p className="text-gray-300">Partner Institutions</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-gray-800/50 rounded-2xl p-12 border border-gray-700">
          <h2 className="text-3xl font-bold mb-4">Want to Feature VivaChat?</h2>
          <p className="text-gray-300 mb-6 text-lg">
            Get in touch with our press team for interviews, demos, or
            additional information
          </p>
          <a
            href="mailto:press@vivachat.in"
            className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-3 rounded-lg transition-all"
          >
            Contact Press Team
          </a>
        </div>
      </div>
    </div>
  );
};

export default PressPage;
