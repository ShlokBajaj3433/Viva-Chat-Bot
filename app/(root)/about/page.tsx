import Image from "next/image";
import { BookOpen, Users, Target, Award, Clock, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const AboutPage = () => {
  const features = [
    {
      icon: BookOpen,
      title: "Smart Viva Generation",
      description:
        "AI-powered question generation tailored to your subject, year, and specific topics.",
    },
    {
      icon: Users,
      title: "Interactive Sessions",
      description:
        "Real-time voice conversations with AI that simulate actual viva experiences.",
    },
    {
      icon: Target,
      title: "Personalized Learning",
      description:
        "Customized questions based on your academic level and subject specialization.",
    },
    {
      icon: Award,
      title: "Detailed Feedback",
      description:
        "Comprehensive analysis of your performance with strengths and improvement areas.",
    },
    {
      icon: Clock,
      title: "24/7 Availability",
      description: "Practice anytime, anywhere with our cloud-based platform.",
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description:
        "Your data is protected with enterprise-grade security measures.",
    },
  ];

  const stats = [
    { number: "10,000+", label: "Students Helped" },
    { number: "50+", label: "Subjects Covered" },
    { number: "95%", label: "Success Rate" },
    { number: "24/7", label: "Support Available" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              About <span className="text-blue-600">VivaChat</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Empowering students with AI-driven viva practice sessions to boost
              confidence and improve academic performance through interactive
              learning experiences.
            </p>
            <div className="flex justify-center">
              <Image
                src="/ai-avatar.png"
                alt="AI Avatar"
                width={200}
                height={200}
                className="rounded-full shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                We believe that every student deserves access to quality
                practice opportunities that prepare them for real-world academic
                challenges. Our AI-powered platform democratizes access to
                personalized viva practice sessions.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                By combining cutting-edge artificial intelligence with
                educational best practices, we create an environment where
                students can practice, learn, and grow at their own pace.
              </p>
              <Link href="/features">
                <Button size="lg">Explore Features</Button>
              </Link>
            </div>
            <div className="relative">
              <Image
                src="/robot.png"
                alt="AI Technology"
                width={500}
                height={400}
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose VivaChat?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our platform offers comprehensive features designed to enhance
              your learning experience and boost your confidence in academic
              vivas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <IconComponent className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-600">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Trusted by Students Worldwide
            </h2>
            <p className="text-xl text-blue-100">
              Join thousands of students who have improved their academic
              performance with VivaChat
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-blue-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Start Your Viva Practice?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join VivaChat today and take your academic preparation to the next
            level with personalized AI-driven practice sessions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/sign-up">
              <Button size="lg" className="w-full sm:w-auto">
                Get Started Free
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
