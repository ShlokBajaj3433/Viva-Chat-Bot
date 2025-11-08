import React from "react";
import { Shield, Eye, Lock, Database, Scale } from "lucide-react";
import Link from "next/link";

const PrivacyPolicyPage = () => {
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
            <span className="text-white font-medium">Privacy Policy</span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-6">
            <Scale className="w-4 h-4 text-blue-400 mr-2" />
            <span className="text-blue-400 text-sm font-semibold">LEGAL</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Privacy Policy
          </h1>
          <p className="text-gray-400 text-sm">
            Last Updated: November 8, 2025
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-invert max-w-none">
          {/* Introduction */}
          <div className="bg-gray-800/50 rounded-xl p-8 mb-8 border border-gray-700">
            <h2 className="text-2xl font-bold mb-4 text-blue-400">
              Introduction
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Welcome to VivaChat, a product developed by MIT ADT University. We
              are committed to protecting your privacy and ensuring the security
              of your personal information. This Privacy Policy explains how we
              collect, use, disclose, and safeguard your information when you
              use our AI-powered interview preparation platform.
            </p>
          </div>

          {/* Information We Collect */}
          <div className="bg-gray-800/50 rounded-xl p-8 mb-8 border border-gray-700">
            <div className="flex items-center mb-4">
              <Database className="w-6 h-6 text-purple-400 mr-3" />
              <h2 className="text-2xl font-bold text-purple-400">
                Information We Collect
              </h2>
            </div>

            <h3 className="text-xl font-semibold mb-3 text-white">
              Personal Information
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-300 mb-6">
              <li>Name and email address (for account creation)</li>
              <li>Profile information you choose to provide</li>
              <li>Educational institution and course details</li>
              <li>Authentication credentials (securely encrypted)</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 text-white">
              Usage Data
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-300 mb-6">
              <li>Interview transcripts and responses</li>
              <li>Performance metrics and feedback scores</li>
              <li>Subject preferences and practice history</li>
              <li>Device information and browser type</li>
              <li>IP address and access times</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 text-white">
              Voice Data
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>
                Voice recordings during voice interviews (temporarily processed,
                not permanently stored)
              </li>
              <li>Transcripts generated from voice interviews</li>
            </ul>
          </div>

          {/* How We Use Your Information */}
          <div className="bg-gray-800/50 rounded-xl p-8 mb-8 border border-gray-700">
            <div className="flex items-center mb-4">
              <Eye className="w-6 h-6 text-green-400 mr-3" />
              <h2 className="text-2xl font-bold text-green-400">
                How We Use Your Information
              </h2>
            </div>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>
                Provide and maintain our AI-powered interview preparation
                services
              </li>
              <li>Generate personalized feedback and performance analytics</li>
              <li>Improve our AI models and platform functionality</li>
              <li>Send important service updates and notifications</li>
              <li>Respond to your inquiries and support requests</li>
              <li>Analyze usage patterns to enhance user experience</li>
              <li>Comply with legal obligations and prevent fraud</li>
            </ul>
          </div>

          {/* Data Security */}
          <div className="bg-gray-800/50 rounded-xl p-8 mb-8 border border-gray-700">
            <div className="flex items-center mb-4">
              <Lock className="w-6 h-6 text-orange-400 mr-3" />
              <h2 className="text-2xl font-bold text-orange-400">
                Data Security
              </h2>
            </div>
            <p className="text-gray-300 leading-relaxed mb-4">
              We implement industry-standard security measures to protect your
              data:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>End-to-end encryption for data transmission</li>
              <li>Secure Firebase cloud storage with access controls</li>
              <li>Regular security audits and updates</li>
              <li>Employee access restricted on need-to-know basis</li>
              <li>Secure authentication using industry best practices</li>
            </ul>
          </div>

          {/* Data Sharing */}
          <div className="bg-gray-800/50 rounded-xl p-8 mb-8 border border-gray-700">
            <h2 className="text-2xl font-bold mb-4 text-blue-400">
              Data Sharing and Disclosure
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              We do not sell your personal information. We may share your data
              only in these circumstances:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>
                <strong>Service Providers:</strong> With trusted third-party
                services (Google AI, Firebase, VAPI) that help us operate our
                platform
              </li>
              <li>
                <strong>Legal Requirements:</strong> When required by law or to
                protect our rights
              </li>
              <li>
                <strong>Your Institution:</strong> With your educational
                institution if you're using an institutional account
              </li>
              <li>
                <strong>With Your Consent:</strong> When you explicitly
                authorize us to share specific information
              </li>
            </ul>
          </div>

          {/* Your Rights */}
          <div className="bg-gray-800/50 rounded-xl p-8 mb-8 border border-gray-700">
            <h2 className="text-2xl font-bold mb-4 text-purple-400">
              Your Rights
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              You have the following rights regarding your personal data:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>
                <strong>Access:</strong> Request copies of your personal data
              </li>
              <li>
                <strong>Correction:</strong> Update or correct inaccurate
                information
              </li>
              <li>
                <strong>Deletion:</strong> Request deletion of your account and
                data
              </li>
              <li>
                <strong>Export:</strong> Download your data in a portable format
              </li>
              <li>
                <strong>Opt-out:</strong> Unsubscribe from marketing
                communications
              </li>
              <li>
                <strong>Object:</strong> Object to certain types of data
                processing
              </li>
            </ul>
          </div>

          {/* Cookies */}
          <div className="bg-gray-800/50 rounded-xl p-8 mb-8 border border-gray-700">
            <h2 className="text-2xl font-bold mb-4 text-green-400">
              Cookies and Tracking
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              We use cookies and similar technologies to enhance your
              experience:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>Essential cookies for authentication and security</li>
              <li>Functional cookies to remember your preferences</li>
              <li>Analytics cookies to understand usage patterns</li>
              <li>You can control cookie settings through your browser</li>
            </ul>
          </div>

          {/* Children's Privacy */}
          <div className="bg-gray-800/50 rounded-xl p-8 mb-8 border border-gray-700">
            <h2 className="text-2xl font-bold mb-4 text-orange-400">
              Children's Privacy
            </h2>
            <p className="text-gray-300 leading-relaxed">
              VivaChat is designed for students in higher education (typically
              18+). We do not knowingly collect information from children under
              13. If we discover such data has been collected, we will delete it
              promptly.
            </p>
          </div>

          {/* Changes to Policy */}
          <div className="bg-gray-800/50 rounded-xl p-8 mb-8 border border-gray-700">
            <h2 className="text-2xl font-bold mb-4 text-blue-400">
              Changes to This Policy
            </h2>
            <p className="text-gray-300 leading-relaxed">
              We may update this Privacy Policy periodically. We will notify you
              of significant changes via email or through the platform. Your
              continued use after such modifications constitutes acceptance of
              the updated policy.
            </p>
          </div>

          {/* Contact */}
          <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-2xl p-8 border border-gray-700 text-center">
            <h2 className="text-2xl font-bold mb-4">
              Questions About Privacy?
            </h2>
            <p className="text-gray-300 mb-6">
              If you have questions or concerns about our privacy practices,
              please contact us:
            </p>
            <div className="space-y-2 text-gray-300">
              <p>
                <strong>Email:</strong> shlokpbajaj000@gmail.com
              </p>
              <p>
                <strong>Address:</strong> MIT ADT University, Loni Kalbhor, Pune
                412201, India
              </p>
              <p>
                <strong>Phone:</strong> +91 87889 20685
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
