import React from "react";
import { FileText, AlertCircle, CheckCircle, Scale } from "lucide-react";
import Link from "next/link";

const TermsPage = () => {
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
            <span className="text-white font-medium">Terms of Service</span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full mb-6">
            <Scale className="w-4 h-4 text-green-400 mr-2" />
            <span className="text-green-400 text-sm font-semibold">LEGAL</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Terms of Service
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
              Agreement to Terms
            </h2>
            <p className="text-gray-300 leading-relaxed">
              These Terms of Service ("Terms") govern your access to and use of
              VivaChat, an AI-powered interview preparation platform operated by
              MIT ADT University. By accessing or using VivaChat, you agree to
              be bound by these Terms. If you disagree with any part of these
              terms, you may not access the service.
            </p>
          </div>

          {/* Account Registration */}
          <div className="bg-gray-800/50 rounded-xl p-8 mb-8 border border-gray-700">
            <div className="flex items-center mb-4">
              <CheckCircle className="w-6 h-6 text-green-400 mr-3" />
              <h2 className="text-2xl font-bold text-green-400">
                Account Registration
              </h2>
            </div>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>You must be at least 13 years old to use VivaChat</li>
              <li>
                You must provide accurate and complete registration information
              </li>
              <li>
                You are responsible for maintaining the security of your account
              </li>
              <li>You may not share your account credentials with others</li>
              <li>You must notify us immediately of any unauthorized access</li>
              <li>One account per user; multiple accounts are not permitted</li>
            </ul>
          </div>

          {/* Acceptable Use */}
          <div className="bg-gray-800/50 rounded-xl p-8 mb-8 border border-gray-700">
            <div className="flex items-center mb-4">
              <AlertCircle className="w-6 h-6 text-orange-400 mr-3" />
              <h2 className="text-2xl font-bold text-orange-400">
                Acceptable Use Policy
              </h2>
            </div>
            <p className="text-gray-300 mb-4">You agree NOT to:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>Use the service for any illegal or unauthorized purpose</li>
              <li>Violate any laws in your jurisdiction</li>
              <li>Infringe upon intellectual property rights</li>
              <li>Upload malicious code, viruses, or harmful content</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Interfere with or disrupt the service or servers</li>
              <li>Harass, abuse, or harm other users</li>
              <li>
                Use automated systems to access the service (bots, scrapers)
              </li>
              <li>
                Resell or commercially exploit the service without permission
              </li>
              <li>Reverse engineer or attempt to extract source code</li>
            </ul>
          </div>

          {/* User Content */}
          <div className="bg-gray-800/50 rounded-xl p-8 mb-8 border border-gray-700">
            <h2 className="text-2xl font-bold mb-4 text-purple-400">
              User-Generated Content
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              By submitting content (responses, feedback, comments) to VivaChat:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>You retain ownership of your content</li>
              <li>
                You grant us a license to use, store, and process your content
                to provide services
              </li>
              <li>
                You warrant that your content does not violate any rights or
                laws
              </li>
              <li>We may remove content that violates these Terms</li>
              <li>You're responsible for backing up important content</li>
            </ul>
          </div>

          {/* Intellectual Property */}
          <div className="bg-gray-800/50 rounded-xl p-8 mb-8 border border-gray-700">
            <h2 className="text-2xl font-bold mb-4 text-blue-400">
              Intellectual Property Rights
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              The VivaChat platform, including its design, features, code,
              content, and trademarks, is owned by MIT ADT University and
              protected by copyright, trademark, and other intellectual property
              laws.
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>You may not copy, modify, or distribute our platform</li>
              <li>You may not use our trademarks without permission</li>
              <li>
                Limited license granted solely for personal, non-commercial use
              </li>
              <li>AI-generated feedback remains our intellectual property</li>
            </ul>
          </div>

          {/* Subscriptions and Payments */}
          <div className="bg-gray-800/50 rounded-xl p-8 mb-8 border border-gray-700">
            <h2 className="text-2xl font-bold mb-4 text-green-400">
              Subscriptions and Payments
            </h2>
            <h3 className="text-xl font-semibold mb-3 text-white">
              Free Account
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-300 mb-4">
              <li>Limited interview sessions per month</li>
              <li>Basic features and analytics</li>
              <li>Can be upgraded to Pro anytime</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 text-white">
              Pro Account
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>Subscription billed monthly or annually</li>
              <li>Automatic renewal unless canceled</li>
              <li>Cancellation effective at end of billing period</li>
              <li>7-day money-back guarantee for new subscribers</li>
              <li>No refunds for partial months after guarantee period</li>
              <li>Prices subject to change with 30 days notice</li>
            </ul>
          </div>

          {/* Service Availability */}
          <div className="bg-gray-800/50 rounded-xl p-8 mb-8 border border-gray-700">
            <h2 className="text-2xl font-bold mb-4 text-orange-400">
              Service Availability
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              While we strive for 99.9% uptime:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>We do not guarantee uninterrupted or error-free service</li>
              <li>Scheduled maintenance will be announced in advance</li>
              <li>We may modify or discontinue features with notice</li>
              <li>We reserve the right to refuse service to anyone</li>
            </ul>
          </div>

          {/* Disclaimers */}
          <div className="bg-gray-800/50 rounded-xl p-8 mb-8 border border-gray-700">
            <h2 className="text-2xl font-bold mb-4 text-red-400">
              Disclaimers and Limitations
            </h2>
            <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-4 mb-4">
              <p className="text-gray-300 leading-relaxed font-semibold">
                THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT
                WARRANTIES OF ANY KIND.
              </p>
            </div>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>AI feedback is for educational purposes only</li>
              <li>We do not guarantee specific academic outcomes</li>
              <li>Users are responsible for their own exam preparation</li>
              <li>We are not liable for decisions made based on AI feedback</li>
              <li>Maximum liability limited to fees paid in last 12 months</li>
            </ul>
          </div>

          {/* Termination */}
          <div className="bg-gray-800/50 rounded-xl p-8 mb-8 border border-gray-700">
            <h2 className="text-2xl font-bold mb-4 text-purple-400">
              Termination
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              We may terminate or suspend your account immediately, without
              prior notice:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>For violations of these Terms</li>
              <li>For fraudulent or illegal activity</li>
              <li>For extended periods of inactivity</li>
              <li>At our discretion for any reason</li>
            </ul>
            <p className="text-gray-300 leading-relaxed mt-4">
              You may close your account at any time from your profile settings.
            </p>
          </div>

          {/* Changes to Terms */}
          <div className="bg-gray-800/50 rounded-xl p-8 mb-8 border border-gray-700">
            <h2 className="text-2xl font-bold mb-4 text-blue-400">
              Changes to Terms
            </h2>
            <p className="text-gray-300 leading-relaxed">
              We reserve the right to modify these Terms at any time. We will
              notify users of material changes via email or platform
              notification. Continued use of the service after changes
              constitutes acceptance of the new Terms.
            </p>
          </div>

          {/* Governing Law */}
          <div className="bg-gray-800/50 rounded-xl p-8 mb-8 border border-gray-700">
            <h2 className="text-2xl font-bold mb-4 text-green-400">
              Governing Law
            </h2>
            <p className="text-gray-300 leading-relaxed">
              These Terms shall be governed by and construed in accordance with
              the laws of India. Any disputes shall be subject to the exclusive
              jurisdiction of the courts in Pune, Maharashtra, India.
            </p>
          </div>

          {/* Contact */}
          <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-2xl p-8 border border-gray-700 text-center">
            <h2 className="text-2xl font-bold mb-4">
              Questions About These Terms?
            </h2>
            <p className="text-gray-300 mb-6">
              If you have questions or concerns about these Terms of Service:
            </p>
            <div className="space-y-2 text-gray-300">
              <p>
                <strong>Email:</strong> legal@vivachat.in
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

export default TermsPage;
