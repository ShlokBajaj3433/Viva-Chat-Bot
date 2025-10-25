import Image from "next/image";
import {
  Mic,
  Brain,
  BarChart3,
  Clock,
  Shield,
  Users,
  BookOpen,
  Target,
  Zap,
  Award,
  MessageSquare,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const FeaturesPage = () => {
  const mainFeatures = [
    {
      icon: Brain,
      title: "AI-Powered Question Generation",
      description:
        "Our advanced AI creates personalized questions based on your subject, academic year, and specific topics. Get questions that match your curriculum and difficulty level.",
      benefits: [
        "Subject-specific question banks",
        "Difficulty adjustment based on year",
        "Topic-focused practice sessions",
        "Continuous learning algorithm",
      ],
      image: "/tech.svg",
    },
    {
      icon: Mic,
      title: "Voice-Interactive Sessions",
      description:
        "Practice with natural voice conversations. Our AI interviewer responds to your answers in real-time, creating an authentic viva experience.",
      benefits: [
        "Natural speech recognition",
        "Real-time voice responses",
        "Accent-adaptive technology",
        "Background noise filtering",
      ],
      image: "/ai-avatar.png",
    },
    {
      icon: BarChart3,
      title: "Detailed Performance Analytics",
      description:
        "Get comprehensive feedback on your performance with detailed analytics, scoring, and personalized improvement recommendations.",
      benefits: [
        "Performance scoring across categories",
        "Strengths and weakness analysis",
        "Progress tracking over time",
        "Personalized improvement plans",
      ],
      image: "/robot.png",
    },
  ];

  const additionalFeatures = [
    {
      icon: Clock,
      title: "24/7 Availability",
      description: "Practice anytime, anywhere with our cloud-based platform.",
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description:
        "Enterprise-grade security keeps your data safe and private.",
    },
    {
      icon: Users,
      title: "Multi-User Support",
      description: "Create separate profiles for different subjects and years.",
    },
    {
      icon: BookOpen,
      title: "Extensive Subject Coverage",
      description: "Support for 50+ subjects across various academic levels.",
    },
    {
      icon: Target,
      title: "Adaptive Learning",
      description: "AI adapts to your learning pace and knowledge level.",
    },
    {
      icon: Zap,
      title: "Instant Feedback",
      description: "Get immediate feedback after each practice session.",
    },
    {
      icon: Award,
      title: "Progress Certification",
      description: "Earn certificates as you complete learning milestones.",
    },
    {
      icon: MessageSquare,
      title: "Smart Conversations",
      description: "Context-aware AI that maintains natural conversation flow.",
    },
    {
      icon: Settings,
      title: "Customizable Settings",
      description: "Adjust session length, difficulty, and question types.",
    },
  ];

  const subjects = [
    "Network Security",
    "Data Structures",
    "Machine Learning",
    "Database Systems",
    "Operating Systems",
    "Computer Networks",
    "Software Engineering",
    "Web Development",
    "Mobile App Development",
    "Cloud Computing",
    "Artificial Intelligence",
    "Cybersecurity",
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
    "Economics",
    "Management",
    "Digital Marketing",
    "Project Management",
    "Psychology",
    "Sociology",
  ];

  const howItWorks = [
    {
      step: "1",
      title: "Choose Your Subject",
      description:
        "Select your subject, academic year, and specific topics you want to practice.",
    },
    {
      step: "2",
      title: "Start AI Interview",
      description:
        "Begin your voice-interactive session with our AI interviewer.",
    },
    {
      step: "3",
      title: "Get Instant Feedback",
      description:
        "Receive detailed feedback and improvement suggestions after each session.",
    },
    {
      step: "4",
      title: "Track Progress",
      description:
        "Monitor your improvement over time with comprehensive analytics.",
    },
  ];

  return (
    <div className="min-h-screen bg-white animate-fade-in">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Comprehensive Features for
            <span className="block text-yellow-300">Academic Excellence</span>
          </h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto mb-8">
            Discover all the powerful features that make VivaChat the ultimate
            platform for viva practice and academic preparation.
          </p>
          <Link href="/sign-up">
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-blue-600 hover:bg-gray-100"
            >
              Try All Features Free
            </Button>
          </Link>
        </div>
      </section>

      {/* Main Features */}
      {mainFeatures.map((feature, index) => {
        const IconComponent = feature.icon;
        return (
          <section
            key={index}
            className={`py-16 px-4 sm:px-6 lg:px-8 ${
              index % 2 === 1 ? "bg-gray-50" : "bg-white"
            } animate-fade-in`}
          >
            <div className="max-w-7xl mx-auto">
              <div
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
                }`}
              >
                <div className={index % 2 === 1 ? "lg:col-start-2" : ""}>
                  <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6 group-hover:animate-bounce transition-all duration-200">
                    <IconComponent className="w-8 h-8 text-blue-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    {feature.title}
                  </h2>
                  <p className="text-lg text-gray-600 mb-6">
                    {feature.description}
                  </p>
                  <ul className="space-y-3">
                    {feature.benefits.map((benefit, benefitIndex) => (
                      <li
                        key={benefitIndex}
                        className="flex items-center text-gray-700 group hover:bg-blue-50 rounded px-2 py-1 transition-all duration-200"
                      >
                        <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={index % 2 === 1 ? "lg:col-start-1" : ""}>
                  <div className="relative">
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      width={500}
                      height={400}
                      className="rounded-lg shadow-xl animate-fade-in"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* Additional Features Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white animate-fade-in">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">More Powerful Features</h2>
            <p className="text-xl text-gray-300">
              Discover additional capabilities that enhance your learning
              experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {additionalFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 hover:scale-105 transition-all duration-300 group shadow-sm hover:shadow-lg"
                >
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4 group-hover:animate-bounce">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white animate-fade-in">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600">
              Get started with VivaChat in just four simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((step, index) => (
              <div
                key={index}
                className="text-center hover:scale-105 transition-transform duration-200"
              >
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 mx-auto animate-fade-in">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Supported Subjects */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-50 animate-fade-in">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Supported Subjects
            </h2>
            <p className="text-lg text-gray-600">
              Practice vivas across a wide range of academic subjects
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {subjects.map((subject, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow-sm text-center hover:shadow-md hover:scale-105 transition-all duration-200"
              >
                <span className="text-sm font-medium text-gray-700">
                  {subject}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-600 to-blue-600 text-white animate-fade-in">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Experience All Features Today
          </h2>
          <p className="text-xl opacity-90 mb-8">
            Join thousands of students who are already using VivaChat to improve
            their academic performance and boost their confidence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/sign-up">
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-blue-600 hover:bg-gray-100 w-full sm:w-auto"
              >
                Start Free Trial
              </Button>
            </Link>
            <Link href="/about">
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-blue-600 w-full sm:w-auto"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeaturesPage;
