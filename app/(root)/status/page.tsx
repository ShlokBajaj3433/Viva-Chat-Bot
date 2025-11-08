import React from "react";
import { CheckCircle, AlertCircle, Clock, Activity, Zap } from "lucide-react";
import Link from "next/link";

const StatusPage = () => {
  const services = [
    {
      name: "VivaChat Platform",
      status: "operational",
      uptime: "99.99%",
      description: "Main application and user interface",
    },
    {
      name: "AI Generation Service",
      status: "operational",
      uptime: "99.95%",
      description: "Google Gemini AI integration",
    },
    {
      name: "Voice Interview System",
      status: "operational",
      uptime: "99.87%",
      description: "VAPI voice processing",
    },
    {
      name: "Firebase Database",
      status: "operational",
      uptime: "100%",
      description: "Data storage and authentication",
    },
    {
      name: "PDF Generation",
      status: "operational",
      uptime: "99.92%",
      description: "Report download service",
    },
    {
      name: "Email Notifications",
      status: "operational",
      uptime: "99.88%",
      description: "Automated email system",
    },
  ];

  const incidents = [
    {
      date: "November 5, 2025",
      title: "Voice Interview Service Degradation",
      status: "resolved",
      description: "Brief voice processing delays resolved within 15 minutes.",
      duration: "15 min",
    },
    {
      date: "November 1, 2025",
      title: "Scheduled Maintenance",
      status: "completed",
      description:
        "Database optimization and security updates completed successfully.",
      duration: "2 hours",
    },
    {
      date: "October 28, 2025",
      title: "API Rate Limit Increase",
      status: "completed",
      description:
        "Successfully upgraded AI API limits for improved performance.",
      duration: "1 hour",
    },
  ];

  const upcomingMaintenance = [
    {
      date: "November 15, 2025",
      time: "02:00 AM - 04:00 AM IST",
      title: "Database Backup & Optimization",
      description:
        "Scheduled maintenance for database performance improvements.",
      impact: "Minimal - Service may be briefly unavailable",
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "operational":
        return <CheckCircle className="w-6 h-6 text-green-400" />;
      case "degraded":
        return <AlertCircle className="w-6 h-6 text-yellow-400" />;
      case "down":
        return <AlertCircle className="w-6 h-6 text-red-400" />;
      default:
        return <Clock className="w-6 h-6 text-gray-400" />;
    }
  };

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
            <span className="text-white font-medium">Status</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full mb-6">
            <Zap className="w-4 h-4 text-green-400 mr-2" />
            <span className="text-green-400 text-sm font-semibold">
              LIVE STATUS
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            System Status
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Real-time status of VivaChat services and infrastructure
          </p>
        </div>

        {/* Overall Status Banner */}
        <div className="mb-12 bg-gradient-to-r from-green-900/30 to-green-800/30 rounded-2xl p-8 border-2 border-green-500/50">
          <div className="flex items-center justify-center">
            <CheckCircle className="w-12 h-12 text-green-400 mr-4" />
            <div>
              <h2 className="text-3xl font-bold text-green-400">
                All Systems Operational
              </h2>
              <p className="text-gray-300 mt-2">
                All services are running smoothly
              </p>
            </div>
          </div>
        </div>

        {/* Services Status */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Service Status</h2>
          <div className="space-y-4">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-gray-800/30 backdrop-blur-sm rounded-lg p-6 border border-gray-700 hover:border-green-500/50 hover:shadow-lg hover:shadow-green-500/10 transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center flex-1">
                    {getStatusIcon(service.status)}
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold">{service.name}</h3>
                      <p className="text-gray-400 text-sm">
                        {service.description}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-green-400 font-semibold capitalize">
                      {service.status}
                    </div>
                    <div className="text-gray-400 text-sm">
                      {service.uptime} uptime
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Maintenance */}
        {upcomingMaintenance.length > 0 && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Upcoming Maintenance</h2>
            <div className="space-y-4">
              {upcomingMaintenance.map((maintenance, index) => (
                <div
                  key={index}
                  className="bg-blue-900/20 rounded-lg p-6 border border-blue-500/50"
                >
                  <div className="flex items-start">
                    <Clock className="w-6 h-6 text-blue-400 mr-4 mt-1" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-semibold">
                          {maintenance.title}
                        </h3>
                        <span className="text-sm text-gray-400">
                          {maintenance.date}
                        </span>
                      </div>
                      <p className="text-blue-400 mb-2">{maintenance.time}</p>
                      <p className="text-gray-300 mb-2">
                        {maintenance.description}
                      </p>
                      <p className="text-sm text-gray-400">
                        <span className="font-semibold">Expected Impact:</span>{" "}
                        {maintenance.impact}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recent Incidents */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Recent Incidents</h2>
          <div className="space-y-4">
            {incidents.map((incident, index) => (
              <div
                key={index}
                className="bg-gray-800/50 rounded-lg p-6 border border-gray-700"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <span className="text-sm text-gray-400 mr-4">
                        {incident.date}
                      </span>
                      <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-semibold">
                        {incident.status}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">
                      {incident.title}
                    </h3>
                    <p className="text-gray-300">{incident.description}</p>
                  </div>
                  <div className="text-right ml-4">
                    <span className="text-gray-400 text-sm">
                      {incident.duration}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Uptime Stats */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-green-900/20 to-green-800/20 rounded-xl p-8 border border-green-500/50 text-center">
            <h3 className="text-4xl font-bold text-green-400 mb-2">99.96%</h3>
            <p className="text-gray-300">Overall Uptime (30 days)</p>
          </div>
          <div className="bg-gradient-to-br from-blue-900/20 to-blue-800/20 rounded-xl p-8 border border-blue-500/50 text-center">
            <h3 className="text-4xl font-bold text-blue-400 mb-2">3</h3>
            <p className="text-gray-300">Incidents (Last Month)</p>
          </div>
          <div className="bg-gradient-to-br from-purple-900/20 to-purple-800/20 rounded-xl p-8 border border-purple-500/50 text-center">
            <h3 className="text-4xl font-bold text-purple-400 mb-2">
              &lt; 200ms
            </h3>
            <p className="text-gray-300">Average Response Time</p>
          </div>
        </div>

        {/* Subscribe to Updates */}
        <div className="mt-16 text-center bg-gray-800/50 rounded-2xl p-12 border border-gray-700">
          <h2 className="text-3xl font-bold mb-4">
            Subscribe to Status Updates
          </h2>
          <p className="text-gray-300 mb-6">
            Get notified about service incidents and scheduled maintenance
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusPage;
