import React from "react";
import {
  Briefcase,
  MapPin,
  Clock,
  Users,
  Heart,
  Rocket,
  Target,
} from "lucide-react";
import Link from "next/link";

const CareersPage = () => {
  const openings = [
    {
      title: "Senior Full-Stack Developer",
      department: "Engineering",
      location: "Remote / Pune, India",
      type: "Full-time",
      description:
        "Build and scale our AI-powered interview platform using Next.js, React, and Firebase.",
      requirements: [
        "5+ years experience",
        "React/Next.js expertise",
        "Firebase/Cloud experience",
      ],
    },
    {
      title: "AI/ML Engineer",
      department: "AI Research",
      location: "Remote / Pune, India",
      type: "Full-time",
      description:
        "Develop and improve our AI feedback systems using advanced NLP and machine learning techniques.",
      requirements: [
        "Python/TensorFlow",
        "NLP experience",
        "3+ years ML experience",
      ],
    },
    {
      title: "Product Designer (UI/UX)",
      department: "Design",
      location: "Remote / Pune, India",
      type: "Full-time",
      description:
        "Design intuitive and engaging user experiences for students preparing for technical interviews.",
      requirements: [
        "Figma proficiency",
        "3+ years UX design",
        "Portfolio required",
      ],
    },
    {
      title: "DevOps Engineer",
      department: "Infrastructure",
      location: "Remote / Pune, India",
      type: "Full-time",
      description:
        "Manage and optimize our cloud infrastructure, CI/CD pipelines, and deployment processes.",
      requirements: [
        "AWS/GCP experience",
        "Docker/Kubernetes",
        "Terraform knowledge",
      ],
    },
    {
      title: "Content Writer (Technical)",
      department: "Content",
      location: "Remote",
      type: "Contract",
      description:
        "Create technical content, interview questions, and educational materials for engineering students.",
      requirements: [
        "Engineering background",
        "Excellent writing skills",
        "Technical expertise",
      ],
    },
    {
      title: "Customer Success Manager",
      department: "Support",
      location: "Pune, India",
      type: "Full-time",
      description:
        "Help our users succeed with VivaChat and provide exceptional customer support.",
      requirements: [
        "Customer service experience",
        "Technical aptitude",
        "Excellent communication",
      ],
    },
  ];

  const benefits = [
    {
      icon: Heart,
      title: "Health & Wellness",
      description: "Comprehensive health insurance for you and your family",
    },
    {
      icon: Rocket,
      title: "Growth Opportunities",
      description: "Learning budget and career development programs",
    },
    {
      icon: Users,
      title: "Flexible Work",
      description: "Remote-first culture with flexible working hours",
    },
    {
      icon: Clock,
      title: "Work-Life Balance",
      description: "Generous PTO and work-life balance initiatives",
    },
  ];

  const values = [
    {
      title: "Innovation",
      description:
        "We constantly push boundaries to create better learning experiences",
    },
    {
      title: "Student-First",
      description: "Every decision is made with our users' success in mind",
    },
    {
      title: "Collaboration",
      description: "We believe in teamwork and open communication",
    },
    {
      title: "Excellence",
      description: "We strive for excellence in everything we build",
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
            <span className="text-white font-medium">Careers</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center px-4 py-2 bg-orange-500/10 border border-orange-500/20 rounded-full mb-6">
            <Target className="w-4 h-4 text-orange-400 mr-2" />
            <span className="text-orange-400 text-sm font-semibold">
              WE'RE HIRING
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Join Our Team
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Help us revolutionize how students prepare for technical interviews
          </p>
        </div>

        {/* Company Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 hover:border-blue-500 transition-all text-center"
              >
                <h3 className="text-xl font-bold mb-3 text-blue-400">
                  {value.title}
                </h3>
                <p className="text-gray-300">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div className="mb-16 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-2xl p-12 border border-gray-700">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Join VivaChat?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="text-center">
                  <div className="bg-blue-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-blue-400" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{benefit.title}</h3>
                  <p className="text-gray-300 text-sm">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Open Positions */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            Open Positions
          </h2>
          <div className="space-y-6">
            {openings.map((job, index) => (
              <div
                key={index}
                className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-8 border border-gray-700 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{job.title}</h3>
                    <div className="flex flex-wrap gap-3 text-sm text-gray-400">
                      <span className="flex items-center">
                        <Briefcase className="w-4 h-4 mr-1" />
                        {job.department}
                      </span>
                      <span className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {job.location}
                      </span>
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {job.type}
                      </span>
                    </div>
                  </div>
                  <button className="mt-4 md:mt-0 bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg font-semibold transition-colors">
                    Apply Now
                  </button>
                </div>
                <p className="text-gray-300 mb-4">{job.description}</p>
                <div className="flex flex-wrap gap-2">
                  {job.requirements.map((req, idx) => (
                    <span
                      key={idx}
                      className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm"
                    >
                      {req}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Application CTA */}
        <div className="text-center bg-gray-800/50 rounded-2xl p-12 border border-gray-700">
          <h2 className="text-3xl font-bold mb-4">Don't See a Perfect Fit?</h2>
          <p className="text-gray-300 mb-6 text-lg">
            We're always looking for talented people. Send us your resume and
            let's talk!
          </p>
          <a
            href="mailto:careers@vivachat.in"
            className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-3 rounded-lg transition-all"
          >
            Send Your Resume
          </a>
        </div>
      </div>
    </div>
  );
};

export default CareersPage;
