import React from "react";
import {
  Shield,
  Globe,
  Lock,
  FileText,
  Download,
  CheckCircle,
  Scale,
} from "lucide-react";
import Link from "next/link";

const GDPRPage = () => {
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
            <span className="text-white font-medium">GDPR</span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full mb-6">
            <Scale className="w-4 h-4 text-purple-400 mr-2" />
            <span className="text-purple-400 text-sm font-semibold">LEGAL</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            GDPR Compliance
          </h1>
          <p className="text-gray-400 text-sm">
            General Data Protection Regulation
          </p>
          <p className="text-gray-400 text-sm">
            Last Updated: November 8, 2025
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-invert max-w-none">
          {/* Introduction */}
          <div className="bg-gray-800/50 rounded-xl p-8 mb-8 border border-gray-700">
            <h2 className="text-2xl font-bold mb-4 text-blue-400">
              Our Commitment to GDPR
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              VivaChat, operated by MIT ADT University, is committed to
              complying with the General Data Protection Regulation (GDPR),
              which protects the personal data of individuals in the European
              Union (EU) and European Economic Area (EEA).
            </p>
            <p className="text-gray-300 leading-relaxed">
              Even if you're not in the EU/EEA, we extend these same privacy
              rights and protections to all our users worldwide, demonstrating
              our commitment to data privacy and user rights.
            </p>
          </div>

          {/* Data Controller */}
          <div className="bg-gray-800/50 rounded-xl p-8 mb-8 border border-gray-700">
            <div className="flex items-center mb-4">
              <Shield className="w-6 h-6 text-purple-400 mr-3" />
              <h2 className="text-2xl font-bold text-purple-400">
                Data Controller Information
              </h2>
            </div>
            <div className="space-y-2 text-gray-300">
              <p>
                <strong>Organization:</strong> MIT ADT University
              </p>
              <p>
                <strong>Address:</strong> Loni Kalbhor, Pune 412201,
                Maharashtra, India
              </p>
              <p>
                <strong>Email:</strong> shlokpbajaj000@gmail.com /
                gdpr@vivachat.in
              </p>
              <p>
                <strong>Phone:</strong> +91 87889 20685
              </p>
              <p>
                <strong>Data Protection Officer:</strong> Available upon request
              </p>
            </div>
          </div>

          {/* Your Rights */}
          <div className="bg-gray-800/50 rounded-xl p-8 mb-8 border border-gray-700">
            <div className="flex items-center mb-4">
              <CheckCircle className="w-6 h-6 text-green-400 mr-3" />
              <h2 className="text-2xl font-bold text-green-400">
                Your GDPR Rights
              </h2>
            </div>
            <p className="text-gray-300 mb-4">
              Under GDPR, you have the following rights regarding your personal
              data:
            </p>

            <div className="space-y-4">
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300">
                <h3 className="text-lg font-semibold mb-2 text-blue-400">
                  1. Right to Access
                </h3>
                <p className="text-gray-300">
                  You can request a copy of all personal data we hold about you,
                  including how we use it and who we share it with.
                </p>
              </div>{" "}
              <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                <h3 className="text-lg font-semibold mb-2 text-blue-400">
                  2. Right to Rectification
                </h3>
                <p className="text-gray-300">
                  You can request that we correct any inaccurate or incomplete
                  personal data we hold about you.
                </p>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                <h3 className="text-lg font-semibold mb-2 text-blue-400">
                  3. Right to Erasure ("Right to be Forgotten")
                </h3>
                <p className="text-gray-300">
                  You can request that we delete your personal data in certain
                  circumstances, such as when it's no longer necessary or you
                  withdraw consent.
                </p>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                <h3 className="text-lg font-semibold mb-2 text-blue-400">
                  4. Right to Restriction of Processing
                </h3>
                <p className="text-gray-300">
                  You can request that we limit how we use your data in specific
                  situations, such as while verifying accuracy.
                </p>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                <h3 className="text-lg font-semibold mb-2 text-blue-400">
                  5. Right to Data Portability
                </h3>
                <p className="text-gray-300">
                  You can request your data in a structured, machine-readable
                  format to transfer to another service provider.
                </p>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                <h3 className="text-lg font-semibold mb-2 text-blue-400">
                  6. Right to Object
                </h3>
                <p className="text-gray-300">
                  You can object to certain types of processing, including
                  direct marketing and processing based on legitimate interests.
                </p>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                <h3 className="text-lg font-semibold mb-2 text-blue-400">
                  7. Right to Withdraw Consent
                </h3>
                <p className="text-gray-300">
                  Where processing is based on consent, you can withdraw it at
                  any time without affecting prior processing.
                </p>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                <h3 className="text-lg font-semibold mb-2 text-blue-400">
                  8. Right to Lodge a Complaint
                </h3>
                <p className="text-gray-300">
                  You have the right to lodge a complaint with your local data
                  protection authority if you believe we've violated your
                  rights.
                </p>
              </div>
            </div>
          </div>

          {/* Legal Basis */}
          <div className="bg-gray-800/50 rounded-xl p-8 mb-8 border border-gray-700">
            <div className="flex items-center mb-4">
              <FileText className="w-6 h-6 text-orange-400 mr-3" />
              <h2 className="text-2xl font-bold text-orange-400">
                Legal Basis for Processing
              </h2>
            </div>
            <p className="text-gray-300 mb-4">
              We process your personal data based on the following legal
              grounds:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>
                <strong>Contract:</strong> To provide our services as outlined
                in our Terms of Service
              </li>
              <li>
                <strong>Consent:</strong> For marketing communications and
                optional features (you can withdraw anytime)
              </li>
              <li>
                <strong>Legitimate Interests:</strong> To improve our platform,
                prevent fraud, and ensure security
              </li>
              <li>
                <strong>Legal Obligation:</strong> To comply with applicable
                laws and regulations
              </li>
            </ul>
          </div>

          {/* Data Processing */}
          <div className="bg-gray-800/50 rounded-xl p-8 mb-8 border border-gray-700">
            <h2 className="text-2xl font-bold mb-4 text-purple-400">
              How We Process Your Data
            </h2>

            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold mb-2 text-white">
                  Data We Collect
                </h3>
                <ul className="list-disc list-inside space-y-1 text-gray-300">
                  <li>Account information (name, email, password hash)</li>
                  <li>Interview transcripts and responses</li>
                  <li>Performance metrics and feedback</li>
                  <li>Usage data and analytics</li>
                  <li>Device and browser information</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2 text-white">
                  Purpose of Processing
                </h3>
                <ul className="list-disc list-inside space-y-1 text-gray-300">
                  <li>Provide AI-powered interview preparation services</li>
                  <li>Generate personalized feedback and analytics</li>
                  <li>Improve our AI models and platform</li>
                  <li>Send service communications</li>
                  <li>Ensure platform security and prevent fraud</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2 text-white">
                  Data Retention
                </h3>
                <p className="text-gray-300 mb-2">
                  We retain your data only as long as necessary:
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-300">
                  <li>
                    Active accounts: Data retained while account is active
                  </li>
                  <li>
                    Inactive accounts: Data deleted after 3 years of inactivity
                  </li>
                  <li>
                    Deleted accounts: Data erased within 30 days (except legal
                    requirements)
                  </li>
                  <li>Analytics data: Anonymized after 26 months</li>
                </ul>
              </div>
            </div>
          </div>

          {/* International Transfers */}
          <div className="bg-gray-800/50 rounded-xl p-8 mb-8 border border-gray-700">
            <div className="flex items-center mb-4">
              <Globe className="w-6 h-6 text-blue-400 mr-3" />
              <h2 className="text-2xl font-bold text-blue-400">
                International Data Transfers
              </h2>
            </div>
            <p className="text-gray-300 leading-relaxed mb-4">
              Your data may be transferred and processed outside the EU/EEA,
              particularly to India where our servers are located and to the USA
              for AI processing (Google services).
            </p>
            <p className="text-gray-300 leading-relaxed mb-4">
              We ensure appropriate safeguards are in place:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>
                Standard Contractual Clauses (SCCs) with service providers
              </li>
              <li>EU-U.S. Data Privacy Framework compliance (Google)</li>
              <li>Encryption in transit and at rest</li>
              <li>Regular security audits and compliance reviews</li>
            </ul>
          </div>

          {/* Security Measures */}
          <div className="bg-gray-800/50 rounded-xl p-8 mb-8 border border-gray-700">
            <div className="flex items-center mb-4">
              <Lock className="w-6 h-6 text-green-400 mr-3" />
              <h2 className="text-2xl font-bold text-green-400">
                Security Measures
              </h2>
            </div>
            <p className="text-gray-300 mb-4">
              We implement comprehensive security measures:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>End-to-end encryption (TLS/SSL)</li>
              <li>Encrypted data storage</li>
              <li>Regular security audits and penetration testing</li>
              <li>Access controls and authentication</li>
              <li>Employee training on data protection</li>
              <li>Incident response procedures</li>
              <li>Regular backups and disaster recovery</li>
            </ul>
          </div>

          {/* Exercising Rights */}
          <div className="bg-gray-800/50 rounded-xl p-8 mb-8 border border-gray-700">
            <h2 className="text-2xl font-bold mb-4 text-purple-400">
              How to Exercise Your Rights
            </h2>
            <p className="text-gray-300 mb-4">
              To exercise any of your GDPR rights, you can:
            </p>
            <div className="space-y-4">
              <div className="bg-blue-900/20 border border-blue-500/50 rounded-lg p-4">
                <p className="text-blue-300 font-semibold mb-2">📧 Email Us</p>
                <p className="text-gray-300">
                  Send your request to: gdpr@vivachat.in
                </p>
              </div>
              <div className="bg-purple-900/20 border border-purple-500/50 rounded-lg p-4">
                <p className="text-purple-300 font-semibold mb-2">
                  👤 Profile Settings
                </p>
                <p className="text-gray-300">
                  Access, update, or delete your data from your profile page
                </p>
              </div>
              <div className="bg-green-900/20 border border-green-500/50 rounded-lg p-4">
                <p className="text-green-300 font-semibold mb-2">
                  📝 Written Request
                </p>
                <p className="text-gray-300">
                  Mail to: MIT ADT University, Loni Kalbhor, Pune 412201, India
                </p>
              </div>
            </div>
            <p className="text-gray-400 mt-4 text-sm">
              We will respond to your request within 30 days. If we need more
              time, we'll inform you and explain why.
            </p>
          </div>

          {/* Data Breach */}
          <div className="bg-gray-800/50 rounded-xl p-8 mb-8 border border-gray-700">
            <h2 className="text-2xl font-bold mb-4 text-red-400">
              Data Breach Notification
            </h2>
            <p className="text-gray-300 leading-relaxed">
              In the unlikely event of a data breach that poses a risk to your
              rights and freedoms, we will notify you and the relevant
              supervisory authority within 72 hours of becoming aware of the
              breach, as required by GDPR Article 33.
            </p>
          </div>

          {/* Contact DPO */}
          <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-2xl p-8 border border-gray-700 text-center">
            <div className="flex items-center justify-center mb-4">
              <Download className="w-8 h-8 text-blue-400 mr-3" />
              <h2 className="text-2xl font-bold">
                Contact Our Data Protection Team
              </h2>
            </div>
            <p className="text-gray-300 mb-6">
              For any GDPR-related questions or to exercise your rights:
            </p>
            <div className="space-y-2 text-gray-300 mb-6">
              <p>
                <strong>GDPR Email:</strong> gdpr@vivachat.in
              </p>
              <p>
                <strong>Privacy Email:</strong> shlokpbajaj000@gmail.com
              </p>
              <p>
                <strong>Address:</strong> MIT ADT University, Loni Kalbhor, Pune
                412201, India
              </p>
              <p>
                <strong>Phone:</strong> +91 87889 20685
              </p>
            </div>
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-3 rounded-lg transition-all inline-flex items-center">
              <Download className="w-5 h-5 mr-2" />
              Download Your Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GDPRPage;
