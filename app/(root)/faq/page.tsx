import React from "react";
import { HelpCircle, ChevronDown, Search } from "lucide-react";
import Link from "next/link";

const FAQPage = () => {
  const faqs = [
    {
      category: "Getting Started",
      questions: [
        {
          q: "How do I start my first viva interview?",
          a: "Simply sign up, choose a subject from our 43+ engineering topics, select your difficulty level, and click 'Start Interview'. Our AI will guide you through the entire process.",
        },
        {
          q: "Do I need any special equipment for voice interviews?",
          a: "You only need a working microphone and speakers/headphones. Make sure your browser has microphone permissions enabled for VivaChat.",
        },
        {
          q: "Can I practice without creating an account?",
          a: "No, you need to create a free account to access the platform. This allows us to save your progress and provide personalized feedback.",
        },
      ],
    },
    {
      category: "Features & Functionality",
      questions: [
        {
          q: "What subjects are available for practice?",
          a: "We offer 43+ engineering subjects including Computer Science, Electronics, Mechanical, Civil, Chemical Engineering, and more. Each subject has hundreds of potential questions.",
        },
        {
          q: "How accurate is the AI feedback?",
          a: "Our AI uses Google Gemini 2.0 Flash, providing highly accurate and contextual feedback. It evaluates your answers based on technical accuracy, communication skills, and subject knowledge.",
        },
        {
          q: "Can I download my interview reports?",
          a: "Yes! Pro users can download detailed PDF reports of their interviews, including scores, feedback, and improvement suggestions.",
        },
        {
          q: "What's the difference between text and voice interviews?",
          a: "Text interviews let you type your answers, while voice interviews simulate real viva scenarios using VAPI technology. Voice interviews are available for Pro users.",
        },
      ],
    },
    {
      category: "Account & Billing",
      questions: [
        {
          q: "How do I upgrade to Pro?",
          a: "Go to the Pricing page, select the Pro plan, and complete the payment process. Your account will be upgraded immediately.",
        },
        {
          q: "Can I cancel my subscription anytime?",
          a: "Yes, you can cancel your subscription at any time. You'll continue to have Pro access until the end of your billing period.",
        },
        {
          q: "Is my payment information secure?",
          a: "Absolutely! We use industry-standard encryption and secure payment gateways. We never store your complete payment details.",
        },
        {
          q: "Do you offer institutional licenses?",
          a: "Yes! We offer special Enterprise plans for educational institutions. Contact our sales team for custom pricing and features.",
        },
      ],
    },
    {
      category: "Technical Support",
      questions: [
        {
          q: "My microphone isn't working. What should I do?",
          a: "Check your browser settings and ensure VivaChat has microphone permissions. Try using Chrome or Edge for best compatibility. If issues persist, contact our support team.",
        },
        {
          q: "Can I use VivaChat on mobile devices?",
          a: "Yes! VivaChat is fully responsive and works on tablets and smartphones. However, we recommend using a desktop for the best experience.",
        },
        {
          q: "What browsers are supported?",
          a: "We recommend Chrome, Edge, Firefox, or Safari (latest versions). Voice features work best on Chrome and Edge.",
        },
        {
          q: "How do I report a bug or issue?",
          a: "Use the Contact Us page or feedback form in the footer. Include details about the issue, your browser, and any error messages.",
        },
      ],
    },
    {
      category: "Privacy & Data",
      questions: [
        {
          q: "How is my data used?",
          a: "Your data is used solely to provide and improve our services. We never sell your personal information. Read our Privacy Policy for full details.",
        },
        {
          q: "Are my interview recordings stored?",
          a: "We store transcripts and feedback but not audio recordings. All data is encrypted and stored securely in Firebase.",
        },
        {
          q: "Can I delete my account and data?",
          a: "Yes, you can request account deletion from your Profile page. All your data will be permanently deleted within 30 days.",
        },
        {
          q: "Is VivaChat GDPR compliant?",
          a: "Yes, we are fully GDPR compliant. You have full control over your data and can request access, modification, or deletion at any time.",
        },
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
            <span className="text-white font-medium">FAQ</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-6">
            <HelpCircle className="w-4 h-4 text-blue-400 mr-2" />
            <span className="text-blue-400 text-sm font-semibold">
              HELP CENTER
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8 leading-relaxed">
            Find answers to common questions about VivaChat
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search for answers..."
              className="w-full pl-12 pr-4 py-4 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* FAQ Categories */}
        <div className="max-w-4xl mx-auto space-y-12">
          {faqs.map((category, catIndex) => (
            <div key={catIndex}>
              <h2 className="text-2xl font-bold mb-6 text-blue-400">
                {category.category}
              </h2>
              <div className="space-y-4">
                {category.questions.map((faq, qIndex) => (
                  <details
                    key={qIndex}
                    className="group bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300"
                  >
                    <summary className="flex justify-between items-center cursor-pointer p-6 font-semibold text-lg hover:text-blue-400 transition-colors">
                      <span>{faq.q}</span>
                      <ChevronDown className="w-5 h-5 text-gray-400 group-open:rotate-180 group-open:text-blue-400 transition-all duration-300" />
                    </summary>
                    <div className="px-6 pb-6 text-gray-300 leading-relaxed border-t border-gray-700/50 pt-4">
                      {faq.a}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-16 text-center bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-2xl p-12 border border-gray-700">
          <h2 className="text-3xl font-bold mb-4">Still Have Questions?</h2>
          <p className="text-gray-300 mb-6 text-lg">
            Can't find the answer you're looking for? Our support team is here
            to help!
          </p>
          <a
            href="/contact"
            className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-3 rounded-lg transition-all"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
