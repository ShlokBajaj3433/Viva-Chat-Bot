import React from "react";
import { CheckCircle, X, Zap, Crown, Rocket, ArrowRight } from "lucide-react";
import Link from "next/link";

const PricingPage = () => {
  const plans = [
    {
      name: "Free",
      price: "₹0",
      period: "forever",
      description: "Perfect for getting started with viva preparation",
      icon: Zap,
      color: "blue",
      features: [
        "5 practice interviews per month",
        "Basic AI feedback",
        "10 subjects access",
        "Text-based interviews",
        "Basic performance analytics",
        "Community support",
      ],
      limitations: [
        "No voice interviews",
        "Limited advanced analytics",
        "No priority support",
      ],
      buttonText: "Get Started",
      popular: false,
    },
    {
      name: "Pro",
      price: "₹299",
      period: "per month",
      description: "Best for serious students preparing for vivas",
      icon: Crown,
      color: "purple",
      features: [
        "Unlimited practice interviews",
        "Advanced AI feedback with detailed analysis",
        "All 43+ engineering subjects",
        "Voice & text interviews",
        "Advanced performance analytics",
        "PDF report downloads",
        "Bookmark favorite sessions",
        "Priority email support",
        "Custom question difficulty",
        "Progress tracking dashboard",
      ],
      limitations: [],
      buttonText: "Upgrade to Pro",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "contact us",
      description: "For institutions and organizations",
      icon: Rocket,
      color: "orange",
      features: [
        "Everything in Pro",
        "Custom branding",
        "Dedicated account manager",
        "API access",
        "Custom integration",
        "Bulk user management",
        "Advanced reporting & analytics",
        "SSO authentication",
        "24/7 priority support",
        "Custom AI model training",
        "White-label solution",
      ],
      limitations: [],
      buttonText: "Contact Sales",
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Start practicing for free or upgrade to unlock advanced features and
            unlimited access
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {plans.map((plan) => {
            const Icon = plan.icon;
            return (
              <div
                key={plan.name}
                className={`relative rounded-2xl border-2 ${
                  plan.popular
                    ? "border-purple-500 bg-gradient-to-b from-purple-900/20 to-gray-800/50 scale-105"
                    : "border-gray-700 bg-gray-800/50"
                } p-8 transition-all hover:scale-105 hover:shadow-2xl`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                )}

                <div className="text-center mb-6">
                  <Icon
                    className={`w-12 h-12 mx-auto mb-4 text-${plan.color}-400`}
                  />
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-gray-400 text-sm mb-4">
                    {plan.description}
                  </p>
                  <div className="mb-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.price !== "Custom" && (
                      <span className="text-gray-400 ml-2">
                        / {plan.period}
                      </span>
                    )}
                  </div>
                  <Link href="/sign-up">
                    <button
                      className={`w-full py-3 rounded-lg font-semibold transition-all flex items-center justify-center group ${
                        plan.popular
                          ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg shadow-purple-500/25"
                          : "bg-gray-700 hover:bg-gray-600"
                      }`}
                    >
                      {plan.buttonText}
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </Link>
                </div>

                <div className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </div>
                  ))}
                  {plan.limitations.map((limitation, index) => (
                    <div key={index} className="flex items-start">
                      <X className="w-5 h-5 text-red-400 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-500 text-sm">
                        {limitation}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
              <h3 className="text-xl font-semibold mb-2">
                Can I upgrade or downgrade my plan anytime?
              </h3>
              <p className="text-gray-300">
                Yes! You can upgrade or downgrade your plan at any time. Changes
                will be reflected immediately, and we'll prorate the charges
                accordingly.
              </p>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
              <h3 className="text-xl font-semibold mb-2">
                Is there a student discount available?
              </h3>
              <p className="text-gray-300">
                Yes! Students with a valid .edu email address can get 20% off on
                Pro plans. Contact us for the discount code.
              </p>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
              <h3 className="text-xl font-semibold mb-2">
                What payment methods do you accept?
              </h3>
              <p className="text-gray-300">
                We accept all major credit cards, debit cards, UPI, net banking,
                and digital wallets through our secure payment gateway.
              </p>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
              <h3 className="text-xl font-semibold mb-2">
                Do you offer refunds?
              </h3>
              <p className="text-gray-300">
                Yes, we offer a 7-day money-back guarantee for all paid plans.
                If you're not satisfied, contact us for a full refund.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
