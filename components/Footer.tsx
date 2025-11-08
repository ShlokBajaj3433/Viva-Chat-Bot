"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Mail,
  Phone,
  MapPin,
  Twitter,
  Github,
  Linkedin,
  Youtube,
  Facebook,
  Instagram,
  Star,
  Send,
  CheckCircle,
  MessageSquare,
} from "lucide-react";
import { submitProjectFeedback } from "@/lib/actions/general.action";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const [feedbackForm, setFeedbackForm] = useState({
    name: "",
    email: "",
    rating: 0,
    category: "",
    experience: "",
    improvements: "",
    features: "",
    recommend: "",
    comments: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFeedbackForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRatingClick = (rating: number) => {
    setFeedbackForm((prev) => ({ ...prev, rating }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Submit feedback to Firebase
      const result = await submitProjectFeedback({
        name: feedbackForm.name,
        email: feedbackForm.email || undefined,
        rating: feedbackForm.rating,
        category: feedbackForm.category,
        experience: feedbackForm.experience,
        improvements: feedbackForm.improvements || undefined,
        features: feedbackForm.features || undefined,
        recommend: feedbackForm.recommend,
        comments: feedbackForm.comments || undefined,
      });

      if (result.success) {
        setIsSubmitted(true);
        setFeedbackForm({
          name: "",
          email: "",
          rating: 0,
          category: "",
          experience: "",
          improvements: "",
          features: "",
          recommend: "",
          comments: "",
        });

        // Reset success message after 5 seconds
        setTimeout(() => {
          setIsSubmitted(false);
        }, 5000);
      } else {
        alert(result.message || "Failed to submit feedback. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const footerLinks = {
    product: [
      { name: "Features", href: "/features" },
      { name: "About", href: "/about" },
      { name: "Pricing", href: "/pricing" },
      { name: "FAQ", href: "/faq" },
    ],
    support: [
      { name: "Contact Us", href: "/contact" },
      { name: "Help Center", href: "/help" },
      { name: "Documentation", href: "/docs" },
      { name: "Status", href: "/status" },
    ],
    company: [
      { name: "About Us", href: "/about" },
      { name: "Careers", href: "/careers" },
      { name: "Blog", href: "/blog" },
      { name: "Press", href: "/press" },
    ],
    legal: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Cookie Policy", href: "/cookies" },
      { name: "GDPR", href: "/gdpr" },
    ],
  };

  const socialLinks = [
    {
      name: "Twitter",
      icon: Twitter,
      href: "https://twitter.com/mituniversity",
    },
    {
      name: "Facebook",
      icon: Facebook,
      href: "https://www.facebook.com/mitadtpune",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: "https://www.linkedin.com/school/mit-adt-university",
    },
    { name: "GitHub", icon: Github, href: "https://github.com/vivachat" },
    {
      name: "Instagram",
      icon: Instagram,
      href: "https://www.instagram.com/mitadtuniversity",
    },
    {
      name: "YouTube",
      icon: Youtube,
      href: "https://www.youtube.com/@mitadtuniversity",
    },
  ];

  const contactInfo = [
    {
      icon: Mail,
      text: "info@mituniversity.edu.in",
      href: "mailto:info@mituniversity.edu.in",
    },
    { icon: Phone, text: "+91 20 3051 8000", href: "tel:+912030518000" },
    {
      icon: MapPin,
      text: "Rajbaug, Loni Kalbhor, Pune, Maharashtra 412201, India",
      href: "https://maps.app.goo.gl/mitadtuniversity",
    },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Image
                src="/vchatLogo.png"
                alt="VivaChat"
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <span className="text-xl font-bold">
                Viva<span className="text-blue-400">Chat</span>
              </span>
            </Link>

            <div className="mb-4">
              <p className="text-blue-400 font-semibold text-sm mb-1">
                Powered by
              </p>
              <p className="text-white font-bold text-lg">MIT ADT University</p>
              <p className="text-gray-400 text-xs">Pune, Maharashtra, India</p>
            </div>

            <p className="text-gray-300 mb-6 max-w-md text-sm">
              Empowering students with AI-driven viva practice sessions to boost
              confidence and improve academic performance through interactive
              learning experiences.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              {contactInfo.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <div key={index} className="flex items-center space-x-3">
                    <IconComponent className="w-4 h-4 text-blue-400 flex-shrink-0" />
                    {item.href.startsWith("#") ? (
                      <span className="text-gray-300 text-sm">{item.text}</span>
                    ) : (
                      <a
                        href={item.href}
                        className="text-gray-300 hover:text-white text-sm transition-colors duration-200"
                      >
                        {item.text}
                      </a>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Product</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Detailed Feedback Form Section */}
      <div className="border-t border-gray-800 bg-gray-850">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-3">
              <MessageSquare className="w-8 h-8 text-blue-400 mr-3" />
              <h3 className="text-2xl font-bold">Share Your Feedback</h3>
            </div>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Help us improve VivaChat! Your detailed feedback is invaluable in
              making this platform better for all students.
            </p>
          </div>

          {isSubmitted ? (
            <div className="max-w-2xl mx-auto bg-green-900/30 border border-green-500 rounded-lg p-8 text-center">
              <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
              <h4 className="text-xl font-semibold text-green-400 mb-2">
                Thank You!
              </h4>
              <p className="text-gray-300">
                Your feedback has been submitted successfully. We appreciate
                your time and input!
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Your Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={feedbackForm.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address <span className="text-gray-500"></span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={feedbackForm.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="your.email@example.com"
                  />
                </div>

                {/* Rating */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Overall Rating <span className="text-red-400">*</span>
                  </label>
                  <div className="flex items-center space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => handleRatingClick(star)}
                        onMouseEnter={() => setHoveredRating(star)}
                        onMouseLeave={() => setHoveredRating(0)}
                        className="transition-transform hover:scale-110"
                      >
                        <Star
                          className={`w-10 h-10 ${
                            star <= (hoveredRating || feedbackForm.rating)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-600"
                          }`}
                        />
                      </button>
                    ))}
                    <span className="ml-4 text-gray-300">
                      {feedbackForm.rating > 0
                        ? `${feedbackForm.rating} / 5`
                        : "Select rating"}
                    </span>
                  </div>
                </div>

                {/* Feedback Category */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Feedback Category <span className="text-red-400">*</span>
                  </label>
                  <select
                    name="category"
                    value={feedbackForm.category}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select a category</option>
                    <option value="ui-ux">User Interface & Experience</option>
                    <option value="ai-quality">AI Question Quality</option>
                    <option value="feedback-accuracy">Feedback Accuracy</option>
                    <option value="performance">Performance & Speed</option>
                    <option value="features">Features & Functionality</option>
                    <option value="technical">Technical Issues</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Overall Experience */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Describe Your Overall Experience{" "}
                    <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    name="experience"
                    value={feedbackForm.experience}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Tell us about your experience using VivaChat..."
                  />
                </div>

                {/* What Could Be Improved */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    What Could Be Improved?
                  </label>
                  <textarea
                    name="improvements"
                    value={feedbackForm.improvements}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Share specific areas where we can improve..."
                  />
                </div>

                {/* Favorite Features */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    What Features Did You Like Most?
                  </label>
                  <textarea
                    name="features"
                    value={feedbackForm.features}
                    onChange={handleInputChange}
                    rows={2}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Tell us what features you enjoyed the most..."
                  />
                </div>

                {/* Would Recommend */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Would You Recommend VivaChat?{" "}
                    <span className="text-red-400">*</span>
                  </label>
                  <select
                    name="recommend"
                    value={feedbackForm.recommend}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select an option</option>
                    <option value="definitely">Definitely Yes</option>
                    <option value="probably">Probably </option>
                    <option value="not-sure">Not Sure</option>
                  </select>
                </div>

                {/* Additional Comments */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Additional Comments or Suggestions
                  </label>
                  <textarea
                    name="comments"
                    value={feedbackForm.comments}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Any other feedback, suggestions, or ideas you'd like to share..."
                  />
                </div>

                {/* Submit Button */}
                <div className="md:col-span-2">
                  <button
                    type="submit"
                    disabled={isSubmitting || feedbackForm.rating === 0}
                    className="w-full md:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors duration-200 flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Submit Feedback
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg font-semibold mb-2">Stay Updated</h3>
              <p className="text-gray-300">
                Get the latest updates and tips for viva preparation
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-64"
              />
              <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-300 text-sm">
                © {currentYear} VivaChat. All rights reserved.
              </p>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                    aria-label={social.name}
                  >
                    <IconComponent className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
