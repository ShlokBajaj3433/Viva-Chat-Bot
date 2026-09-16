import React from "react";
import { Cookie, Settings, Eye, Shield, Scale } from "lucide-react";
import Link from "next/link";

const CookiePolicyPage = () => {
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
            <span className="text-white font-medium">Cookie Policy</span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center px-4 py-2 bg-orange-500/10 border border-orange-500/20 rounded-full mb-6">
            <Scale className="w-4 h-4 text-orange-400 mr-2" />
            <span className="text-orange-400 text-sm font-semibold">LEGAL</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Cookie Policy
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
              What Are Cookies?
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Cookies are small text files that are placed on your device when
              you visit VivaChat. They help us provide you with a better
              experience by remembering your preferences, keeping you signed in,
              and understanding how you use our platform. This Cookie Policy
              explains what cookies we use, why we use them, and how you can
              control them.
            </p>
          </div>

          {/* Types of Cookies */}
          <div className="bg-gray-800/50 rounded-xl p-8 mb-8 border border-gray-700">
            <div className="flex items-center mb-4">
              <Eye className="w-6 h-6 text-purple-400 mr-3" />
              <h2 className="text-2xl font-bold text-purple-400">
                Types of Cookies We Use
              </h2>
            </div>

            <div className="space-y-6">
              {/* Essential Cookies */}
              <div>
                <h3 className="text-xl font-semibold mb-3 text-green-400">
                  1. Essential Cookies (Required)
                </h3>
                <p className="text-gray-300 mb-2">
                  These cookies are necessary for the website to function and
                  cannot be disabled.
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-300">
                  <li>
                    <strong>Authentication:</strong> Keep you signed in to your
                    account
                  </li>
                  <li>
                    <strong>Security:</strong> Protect against unauthorized
                    access and fraud
                  </li>
                  <li>
                    <strong>Session Management:</strong> Maintain your session
                    state
                  </li>
                  <li>
                    <strong>Load Balancing:</strong> Distribute traffic across
                    servers
                  </li>
                </ul>
                <p className="text-sm text-gray-400 mt-2">
                  Duration: Session or up to 1 year
                </p>
              </div>

              {/* Functional Cookies */}
              <div>
                <h3 className="text-xl font-semibold mb-3 text-blue-400">
                  2. Functional Cookies
                </h3>
                <p className="text-gray-300 mb-2">
                  These cookies remember your choices and preferences to provide
                  enhanced functionality.
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-300">
                  <li>
                    <strong>Preferences:</strong> Remember your language and
                    theme settings
                  </li>
                  <li>
                    <strong>User Interface:</strong> Save your dashboard layout
                    preferences
                  </li>
                  <li>
                    <strong>Interview Settings:</strong> Remember your subject
                    and difficulty preferences
                  </li>
                  <li>
                    <strong>Volume Controls:</strong> Save audio settings for
                    voice interviews
                  </li>
                </ul>
                <p className="text-sm text-gray-400 mt-2">
                  Duration: Up to 2 years
                </p>
              </div>

              {/* Analytics Cookies */}
              <div>
                <h3 className="text-xl font-semibold mb-3 text-orange-400">
                  3. Analytics Cookies
                </h3>
                <p className="text-gray-300 mb-2">
                  These cookies help us understand how visitors interact with
                  our platform.
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-300">
                  <li>
                    <strong>Usage Data:</strong> Track pages visited and
                    features used
                  </li>
                  <li>
                    <strong>Performance:</strong> Monitor page load times and
                    errors
                  </li>
                  <li>
                    <strong>User Journey:</strong> Understand how users navigate
                    the platform
                  </li>
                  <li>
                    <strong>A/B Testing:</strong> Test new features and
                    improvements
                  </li>
                </ul>
                <p className="text-sm text-gray-400 mt-2">
                  Duration: Up to 2 years
                </p>
                <p className="text-sm text-blue-400 mt-2">
                  These cookies can be disabled
                </p>
              </div>

              {/* Marketing Cookies */}
              <div>
                <h3 className="text-xl font-semibold mb-3 text-purple-400">
                  4. Marketing Cookies (Optional)
                </h3>
                <p className="text-gray-300 mb-2">
                  These cookies track your browsing to show relevant
                  advertisements.
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-300">
                  <li>
                    <strong>Advertising:</strong> Display relevant ads on other
                    websites
                  </li>
                  <li>
                    <strong>Remarketing:</strong> Show you VivaChat ads after
                    leaving our site
                  </li>
                  <li>
                    <strong>Social Media:</strong> Enable social sharing
                    features
                  </li>
                </ul>
                <p className="text-sm text-gray-400 mt-2">
                  Duration: Up to 1 year
                </p>
                <p className="text-sm text-blue-400 mt-2">
                  These cookies can be disabled
                </p>
              </div>
            </div>
          </div>

          {/* Third-Party Cookies */}
          <div className="bg-gray-800/50 rounded-xl p-8 mb-8 border border-gray-700">
            <h2 className="text-2xl font-bold mb-4 text-blue-400">
              Third-Party Cookies
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              We use trusted third-party services that may set their own
              cookies:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>
                <strong>Firebase (Google):</strong> Authentication and database
                services
              </li>
              <li>
                <strong>Google Analytics:</strong> Website analytics and
                performance monitoring
              </li>
              <li>
                <strong>VAPI:</strong> Voice interview processing
              </li>
              <li>
                <strong>Google AI (Gemini):</strong> AI-powered feedback
                generation
              </li>
            </ul>
            <p className="text-gray-300 leading-relaxed mt-4">
              These third parties have their own privacy policies and cookie
              policies, which we recommend reviewing.
            </p>
          </div>

          {/* Managing Cookies */}
          <div className="bg-gray-800/50 rounded-xl p-8 mb-8 border border-gray-700">
            <div className="flex items-center mb-4">
              <Settings className="w-6 h-6 text-green-400 mr-3" />
              <h2 className="text-2xl font-bold text-green-400">
                How to Control Cookies
              </h2>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-white">
                  Browser Settings
                </h3>
                <p className="text-gray-300 mb-2">
                  Most browsers allow you to control cookies through their
                  settings:
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-300">
                  <li>
                    <strong>Chrome:</strong> Settings → Privacy and Security →
                    Cookies
                  </li>
                  <li>
                    <strong>Firefox:</strong> Settings → Privacy & Security →
                    Cookies and Site Data
                  </li>
                  <li>
                    <strong>Safari:</strong> Preferences → Privacy → Cookies and
                    website data
                  </li>
                  <li>
                    <strong>Edge:</strong> Settings → Cookies and site
                    permissions
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-white">
                  Cookie Preferences
                </h3>
                <p className="text-gray-300 mb-4">
                  You can also manage your cookie preferences directly on our
                  platform:
                </p>
                <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition-colors">
                  Manage Cookie Preferences
                </button>
              </div>

              <div className="bg-yellow-900/20 border border-yellow-500/50 rounded-lg p-4">
                <p className="text-yellow-300 font-semibold mb-2">
                  ⚠️ Important Note:
                </p>
                <p className="text-gray-300">
                  Disabling certain cookies may affect your experience and
                  prevent some features from working properly. Essential cookies
                  cannot be disabled as they are required for the platform to
                  function.
                </p>
              </div>
            </div>
          </div>

          {/* Do Not Track */}
          <div className="bg-gray-800/50 rounded-xl p-8 mb-8 border border-gray-700">
            <h2 className="text-2xl font-bold mb-4 text-purple-400">
              Do Not Track (DNT)
            </h2>
            <p className="text-gray-300 leading-relaxed">
              We respect Do Not Track (DNT) signals sent by your browser. When
              DNT is enabled, we will not set analytics or marketing cookies,
              though essential and functional cookies will still be used to
              maintain platform functionality.
            </p>
          </div>

          {/* Updates to Policy */}
          <div className="bg-gray-800/50 rounded-xl p-8 mb-8 border border-gray-700">
            <h2 className="text-2xl font-bold mb-4 text-orange-400">
              Updates to This Policy
            </h2>
            <p className="text-gray-300 leading-relaxed">
              We may update this Cookie Policy from time to time to reflect
              changes in our practices or for legal reasons. We will notify you
              of significant changes via email or a prominent notice on our
              platform. The "Last Updated" date at the top indicates when this
              policy was last revised.
            </p>
          </div>

          {/* Cookie List */}
          <div className="bg-gray-800/50 rounded-xl p-8 mb-8 border border-gray-700">
            <h2 className="text-2xl font-bold mb-4 text-blue-400">
              Detailed Cookie List
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-gray-700">
                  <tr>
                    <th className="py-3 px-4 text-blue-400">Cookie Name</th>
                    <th className="py-3 px-4 text-blue-400">Purpose</th>
                    <th className="py-3 px-4 text-blue-400">Type</th>
                    <th className="py-3 px-4 text-blue-400">Duration</th>
                  </tr>
                </thead>
                <tbody className="text-gray-300">
                  <tr className="border-b border-gray-800">
                    <td className="py-3 px-4 font-mono text-xs">session_id</td>
                    <td className="py-3 px-4">Maintain user session</td>
                    <td className="py-3 px-4">Essential</td>
                    <td className="py-3 px-4">Session</td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="py-3 px-4 font-mono text-xs">auth_token</td>
                    <td className="py-3 px-4">User authentication</td>
                    <td className="py-3 px-4">Essential</td>
                    <td className="py-3 px-4">7 days</td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="py-3 px-4 font-mono text-xs">user_prefs</td>
                    <td className="py-3 px-4">Store user preferences</td>
                    <td className="py-3 px-4">Functional</td>
                    <td className="py-3 px-4">1 year</td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="py-3 px-4 font-mono text-xs">_ga</td>
                    <td className="py-3 px-4">Google Analytics tracking</td>
                    <td className="py-3 px-4">Analytics</td>
                    <td className="py-3 px-4">2 years</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Contact */}
          <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-2xl p-8 border border-gray-700 text-center">
            <div className="flex items-center justify-center mb-4">
              <Shield className="w-8 h-8 text-blue-400 mr-3" />
              <h2 className="text-2xl font-bold">Questions About Cookies?</h2>
            </div>
            <p className="text-gray-300 mb-6">
              If you have questions about our use of cookies:
            </p>
            <div className="space-y-2 text-gray-300">
              <p>
                <strong>Email:</strong> shlokpbajaj000@gmail.com
              </p>
              <p>
                <strong>Address:</strong> MIT ADT University, Loni Kalbhor, Pune
                412201, India
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicyPage;
