"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  BookOpen,
  Users,
  Clock,
  Star,
  TrendingUp,
  Award,
  Play,
  BarChart3,
  Shield,
  Cpu,
  Database,
  Globe,
  Calculator,
  Atom,
  DollarSign,
  Brain,
  Code,
  Zap,
  Layers,
  Smartphone,
  Lightbulb,
  Briefcase,
  Binary,
  Network,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const SubjectsPage = () => {
  const router = useRouter();

  const handleStartInterview = (subject: (typeof popularSubjects)[0]) => {
    // Store subject data in sessionStorage to be used by the interview page
    const interviewConfig = {
      subject: subject.name,
      topics: subject.topics.join(", "),
      type: "mock", // You can change this to "practice" if needed
      isTechnical: true,
      year: "2024",
    };

    sessionStorage.setItem(
      "prefilledInterview",
      JSON.stringify(interviewConfig)
    );
    router.push("/interview");
  };

  const popularSubjects = [
    {
      id: "network-security",
      name: "Network Security",
      icon: Shield,
      description:
        "Master cybersecurity concepts, protocols, and threat analysis",
      level: "Advanced",
      students: 2500,
      avgScore: 87,
      topics: [
        "Firewall Configuration",
        "Encryption",
        "VPN",
        "Intrusion Detection",
        "Security Policies",
      ],
      color: "bg-red-500",
      gradient: "from-red-500 to-red-600",
    },
    {
      id: "data-structures",
      name: "Data Structures & Algorithms",
      icon: Database,
      description: "Learn arrays, linked lists, trees, graphs, and algorithms",
      level: "Intermediate",
      students: 3200,
      avgScore: 82,
      topics: ["Arrays", "Linked Lists", "Trees", "Graphs", "Hash Tables"],
      color: "bg-blue-500",
      gradient: "from-blue-500 to-blue-600",
    },
    {
      id: "machine-learning",
      name: "Machine Learning",
      icon: Brain,
      description: "Explore AI algorithms, neural networks, and data analysis",
      level: "Advanced",
      students: 1800,
      avgScore: 85,
      topics: [
        "Supervised Learning",
        "Neural Networks",
        "Deep Learning",
        "NLP",
        "Computer Vision",
      ],
      color: "bg-purple-500",
      gradient: "from-purple-500 to-purple-600",
    },
    {
      id: "web-development",
      name: "Web Development",
      icon: Globe,
      description: "Modern web technologies, frameworks, and best practices",
      level: "Intermediate",
      students: 4100,
      avgScore: 79,
      topics: ["HTML/CSS", "JavaScript", "React", "Node.js", "REST APIs"],
      color: "bg-green-500",
      gradient: "from-green-500 to-green-600",
    },
    {
      id: "operating-systems",
      name: "Operating Systems",
      icon: Cpu,
      description: "Process management, memory allocation, and system calls",
      level: "Intermediate",
      students: 2800,
      avgScore: 80,
      topics: [
        "Process Management",
        "Memory Management",
        "File Systems",
        "Deadlocks",
        "Scheduling",
      ],
      color: "bg-orange-500",
      gradient: "from-orange-500 to-orange-600",
    },
    {
      id: "database-management",
      name: "Database Management Systems",
      icon: Database,
      description: "SQL, NoSQL, normalization, transactions, and indexing",
      level: "Intermediate",
      students: 2900,
      avgScore: 83,
      topics: [
        "SQL Queries",
        "Normalization",
        "Transactions",
        "Indexing",
        "Database Design",
      ],
      color: "bg-cyan-500",
      gradient: "from-cyan-500 to-cyan-600",
    },
    {
      id: "computer-networks",
      name: "Computer Networks",
      icon: Globe,
      description: "OSI model, TCP/IP, routing protocols, and network design",
      level: "Intermediate",
      students: 2600,
      avgScore: 81,
      topics: [
        "OSI Model",
        "TCP/IP",
        "Routing Protocols",
        "Network Topologies",
        "Subnetting",
      ],
      color: "bg-sky-500",
      gradient: "from-sky-500 to-sky-600",
    },
    {
      id: "software-engineering",
      name: "Software Engineering",
      icon: Cpu,
      description: "SDLC, design patterns, testing, and project management",
      level: "Advanced",
      students: 2400,
      avgScore: 84,
      topics: [
        "SDLC Models",
        "Design Patterns",
        "Testing",
        "Agile",
        "UML Diagrams",
      ],
      color: "bg-violet-500",
      gradient: "from-violet-500 to-violet-600",
    },
    {
      id: "compiler-design",
      name: "Compiler Design",
      icon: Cpu,
      description:
        "Lexical analysis, parsing, code generation, and optimization",
      level: "Advanced",
      students: 1500,
      avgScore: 79,
      topics: [
        "Lexical Analysis",
        "Syntax Analysis",
        "Semantic Analysis",
        "Code Generation",
        "Optimization",
      ],
      color: "bg-rose-500",
      gradient: "from-rose-500 to-rose-600",
    },
    {
      id: "artificial-intelligence",
      name: "Artificial Intelligence",
      icon: Brain,
      description:
        "Search algorithms, knowledge representation, and expert systems",
      level: "Advanced",
      students: 2100,
      avgScore: 86,
      topics: [
        "Search Algorithms",
        "Knowledge Representation",
        "Expert Systems",
        "Planning",
        "Reasoning",
      ],
      color: "bg-fuchsia-500",
      gradient: "from-fuchsia-500 to-fuchsia-600",
    },
    {
      id: "cloud-computing",
      name: "Cloud Computing",
      icon: Globe,
      description: "AWS, Azure, virtualization, and distributed systems",
      level: "Advanced",
      students: 2700,
      avgScore: 85,
      topics: [
        "Virtualization",
        "Cloud Services",
        "AWS",
        "Docker",
        "Microservices",
      ],
      color: "bg-blue-400",
      gradient: "from-blue-400 to-blue-500",
    },
    {
      id: "digital-electronics",
      name: "Digital Electronics",
      icon: Cpu,
      description: "Logic gates, circuits, flip-flops, and digital design",
      level: "Beginner",
      students: 2300,
      avgScore: 77,
      topics: [
        "Logic Gates",
        "Boolean Algebra",
        "Flip-Flops",
        "Counters",
        "Memory Units",
      ],
      color: "bg-emerald-500",
      gradient: "from-emerald-500 to-emerald-600",
    },
    {
      id: "computer-architecture",
      name: "Computer Architecture",
      icon: Cpu,
      description: "CPU design, pipelining, cache memory, and instruction sets",
      level: "Intermediate",
      students: 2200,
      avgScore: 80,
      topics: [
        "CPU Design",
        "Pipelining",
        "Cache Memory",
        "Instruction Sets",
        "Assembly Language",
      ],
      color: "bg-amber-500",
      gradient: "from-amber-500 to-amber-600",
    },
    {
      id: "theory-of-computation",
      name: "Theory of Computation",
      icon: BookOpen,
      description:
        "Automata, formal languages, Turing machines, and complexity",
      level: "Advanced",
      students: 1700,
      avgScore: 82,
      topics: [
        "Finite Automata",
        "Regular Languages",
        "Context-Free Grammars",
        "Turing Machines",
        "Complexity Theory",
      ],
      color: "bg-lime-500",
      gradient: "from-lime-500 to-lime-600",
    },
    {
      id: "internet-of-things",
      name: "Internet of Things (IoT)",
      icon: Globe,
      description:
        "Sensors, embedded systems, IoT protocols, and smart devices",
      level: "Intermediate",
      students: 1900,
      avgScore: 78,
      topics: [
        "IoT Architecture",
        "Sensors",
        "MQTT",
        "Arduino",
        "Raspberry Pi",
      ],
      color: "bg-teal-400",
      gradient: "from-teal-400 to-teal-500",
    },
    {
      id: "blockchain",
      name: "Blockchain Technology",
      icon: Shield,
      description: "Cryptocurrency, distributed ledgers, and smart contracts",
      level: "Advanced",
      students: 1600,
      avgScore: 84,
      topics: [
        "Blockchain Basics",
        "Cryptocurrency",
        "Smart Contracts",
        "Ethereum",
        "Consensus Algorithms",
      ],
      color: "bg-orange-400",
      gradient: "from-orange-400 to-orange-500",
    },
    {
      id: "mathematics",
      name: "Engineering Mathematics",
      icon: Calculator,
      description: "Calculus, linear algebra, discrete math, and statistics",
      level: "Beginner",
      students: 3500,
      avgScore: 75,
      topics: [
        "Calculus",
        "Linear Algebra",
        "Discrete Math",
        "Statistics",
        "Probability",
      ],
      color: "bg-indigo-500",
      gradient: "from-indigo-500 to-indigo-600",
    },
    {
      id: "physics",
      name: "Engineering Physics",
      icon: Atom,
      description: "Classical mechanics, thermodynamics, and quantum physics",
      level: "Intermediate",
      students: 2200,
      avgScore: 78,
      topics: [
        "Mechanics",
        "Thermodynamics",
        "Electromagnetism",
        "Optics",
        "Quantum Physics",
      ],
      color: "bg-teal-500",
      gradient: "from-teal-500 to-teal-600",
    },
    {
      id: "information-security",
      name: "Information Security",
      icon: Shield,
      description: "Cryptography, ethical hacking, and security protocols",
      level: "Advanced",
      students: 2000,
      avgScore: 86,
      topics: [
        "Cryptography",
        "Ethical Hacking",
        "Network Security",
        "Web Security",
        "Penetration Testing",
      ],
      color: "bg-red-600",
      gradient: "from-red-600 to-red-700",
    },
    {
      id: "mobile-app-development",
      name: "Mobile App Development",
      icon: Globe,
      description: "Android, iOS, React Native, and Flutter development",
      level: "Intermediate",
      students: 2800,
      avgScore: 80,
      topics: [
        "Android Development",
        "iOS Development",
        "React Native",
        "Flutter",
        "Mobile UI/UX",
      ],
      color: "bg-pink-500",
      gradient: "from-pink-500 to-pink-600",
    },
    {
      id: "economics",
      name: "Economics",
      icon: DollarSign,
      description: "Microeconomics, macroeconomics, and financial analysis",
      level: "Beginner",
      students: 1900,
      avgScore: 81,
      topics: [
        "Microeconomics",
        "Macroeconomics",
        "Market Structures",
        "Monetary Policy",
        "Trade",
      ],
      color: "bg-yellow-500",
      gradient: "from-yellow-500 to-yellow-600",
    },
    {
      id: "object-oriented-programming",
      name: "Object-Oriented Programming",
      icon: Code,
      description:
        "OOP concepts, inheritance, polymorphism, and design principles",
      level: "Intermediate",
      students: 3400,
      avgScore: 83,
      topics: [
        "Classes & Objects",
        "Inheritance",
        "Polymorphism",
        "Encapsulation",
        "Abstraction",
      ],
      color: "bg-purple-600",
      gradient: "from-purple-600 to-purple-700",
    },
    {
      id: "data-mining",
      name: "Data Mining & Analytics",
      icon: BarChart3,
      description:
        "Data preprocessing, pattern discovery, and predictive analytics",
      level: "Advanced",
      students: 1800,
      avgScore: 84,
      topics: [
        "Data Preprocessing",
        "Classification",
        "Clustering",
        "Association Rules",
        "Pattern Recognition",
      ],
      color: "bg-indigo-600",
      gradient: "from-indigo-600 to-indigo-700",
    },
    {
      id: "computer-graphics",
      name: "Computer Graphics",
      icon: Layers,
      description: "2D/3D graphics, rendering, animation, and OpenGL",
      level: "Advanced",
      students: 1600,
      avgScore: 80,
      topics: [
        "2D Transformations",
        "3D Graphics",
        "Rendering",
        "Animation",
        "OpenGL",
      ],
      color: "bg-cyan-600",
      gradient: "from-cyan-600 to-cyan-700",
    },
    {
      id: "microprocessors",
      name: "Microprocessors & Microcontrollers",
      icon: Cpu,
      description: "8086, ARM, embedded systems, and assembly programming",
      level: "Intermediate",
      students: 2300,
      avgScore: 79,
      topics: [
        "8086 Architecture",
        "ARM Processors",
        "Assembly Language",
        "Interrupts",
        "Interfacing",
      ],
      color: "bg-red-400",
      gradient: "from-red-400 to-red-500",
    },
    {
      id: "distributed-systems",
      name: "Distributed Systems",
      icon: Network,
      description:
        "Distributed computing, consensus algorithms, and fault tolerance",
      level: "Advanced",
      students: 1700,
      avgScore: 85,
      topics: [
        "Distributed Computing",
        "Consensus Algorithms",
        "Replication",
        "Fault Tolerance",
        "Load Balancing",
      ],
      color: "bg-blue-600",
      gradient: "from-blue-600 to-blue-700",
    },
    {
      id: "python-programming",
      name: "Python Programming",
      icon: Code,
      description: "Python fundamentals, data structures, and libraries",
      level: "Beginner",
      students: 4200,
      avgScore: 82,
      topics: [
        "Python Basics",
        "Data Structures",
        "OOP in Python",
        "Libraries",
        "File Handling",
      ],
      color: "bg-yellow-600",
      gradient: "from-yellow-600 to-yellow-700",
    },
    {
      id: "java-programming",
      name: "Java Programming",
      icon: Code,
      description:
        "Core Java, collections, multithreading, and Spring framework",
      level: "Intermediate",
      students: 3800,
      avgScore: 81,
      topics: [
        "Core Java",
        "Collections",
        "Multithreading",
        "Exception Handling",
        "JDBC",
      ],
      color: "bg-orange-600",
      gradient: "from-orange-600 to-orange-700",
    },
    {
      id: "data-science",
      name: "Data Science",
      icon: BarChart3,
      description:
        "Statistical analysis, visualization, and predictive modeling",
      level: "Advanced",
      students: 2600,
      avgScore: 86,
      topics: [
        "Statistical Analysis",
        "Data Visualization",
        "Pandas & NumPy",
        "Predictive Modeling",
        "Big Data",
      ],
      color: "bg-green-600",
      gradient: "from-green-600 to-green-700",
    },
    {
      id: "devops",
      name: "DevOps & CI/CD",
      icon: Zap,
      description: "Jenkins, Docker, Kubernetes, and automation pipelines",
      level: "Advanced",
      students: 2400,
      avgScore: 83,
      topics: [
        "CI/CD Pipelines",
        "Jenkins",
        "Docker",
        "Kubernetes",
        "Infrastructure as Code",
      ],
      color: "bg-slate-600",
      gradient: "from-slate-600 to-slate-700",
    },
    {
      id: "natural-language-processing",
      name: "Natural Language Processing",
      icon: Brain,
      description: "Text processing, sentiment analysis, and language models",
      level: "Advanced",
      students: 1500,
      avgScore: 87,
      topics: [
        "Text Processing",
        "Sentiment Analysis",
        "NER",
        "Language Models",
        "Transformers",
      ],
      color: "bg-violet-600",
      gradient: "from-violet-600 to-violet-700",
    },
    {
      id: "embedded-systems",
      name: "Embedded Systems",
      icon: Cpu,
      description: "Real-time systems, microcontrollers, and IoT applications",
      level: "Intermediate",
      students: 2000,
      avgScore: 79,
      topics: [
        "Real-Time Systems",
        "RTOS",
        "Embedded C",
        "Sensors",
        "Communication Protocols",
      ],
      color: "bg-emerald-600",
      gradient: "from-emerald-600 to-emerald-700",
    },
    {
      id: "image-processing",
      name: "Image Processing",
      icon: Layers,
      description: "Digital image manipulation, filters, and computer vision",
      level: "Advanced",
      students: 1400,
      avgScore: 81,
      topics: [
        "Image Enhancement",
        "Filtering",
        "Edge Detection",
        "Segmentation",
        "Feature Extraction",
      ],
      color: "bg-pink-600",
      gradient: "from-pink-600 to-pink-700",
    },
    {
      id: "system-design",
      name: "System Design",
      icon: Network,
      description: "Scalable architectures, design patterns, and trade-offs",
      level: "Advanced",
      students: 2200,
      avgScore: 88,
      topics: [
        "Scalability",
        "Load Balancing",
        "Caching",
        "Database Design",
        "Microservices",
      ],
      color: "bg-gray-700",
      gradient: "from-gray-700 to-gray-800",
    },
    {
      id: "cyber-security",
      name: "Cyber Security",
      icon: Shield,
      description:
        "Threat detection, incident response, and security frameworks",
      level: "Advanced",
      students: 2100,
      avgScore: 85,
      topics: [
        "Threat Detection",
        "Incident Response",
        "Security Frameworks",
        "Malware Analysis",
        "SIEM",
      ],
      color: "bg-red-700",
      gradient: "from-red-700 to-red-800",
    },
    {
      id: "ui-ux-design",
      name: "UI/UX Design",
      icon: Smartphone,
      description: "User interface design, prototyping, and usability testing",
      level: "Beginner",
      students: 2700,
      avgScore: 80,
      topics: [
        "Design Principles",
        "Wireframing",
        "Prototyping",
        "User Research",
        "Figma",
      ],
      color: "bg-fuchsia-600",
      gradient: "from-fuchsia-600 to-fuchsia-700",
    },
    {
      id: "quantum-computing",
      name: "Quantum Computing",
      icon: Atom,
      description: "Quantum algorithms, qubits, and quantum gates",
      level: "Advanced",
      students: 1200,
      avgScore: 82,
      topics: [
        "Quantum Bits",
        "Quantum Gates",
        "Quantum Algorithms",
        "Superposition",
        "Entanglement",
      ],
      color: "bg-purple-700",
      gradient: "from-purple-700 to-purple-800",
    },
    {
      id: "business-analytics",
      name: "Business Analytics",
      icon: Briefcase,
      description: "Business intelligence, data-driven decisions, and KPIs",
      level: "Intermediate",
      students: 2300,
      avgScore: 78,
      topics: [
        "Business Intelligence",
        "KPI Analysis",
        "Data Warehousing",
        "ETL",
        "Power BI",
      ],
      color: "bg-amber-600",
      gradient: "from-amber-600 to-amber-700",
    },
    {
      id: "robotics",
      name: "Robotics & Automation",
      icon: Cpu,
      description: "Robot kinematics, control systems, and automation",
      level: "Advanced",
      students: 1600,
      avgScore: 83,
      topics: [
        "Kinematics",
        "Control Systems",
        "Path Planning",
        "Sensors",
        "Actuators",
      ],
      color: "bg-lime-600",
      gradient: "from-lime-600 to-lime-700",
    },
    {
      id: "electronics-circuits",
      name: "Electronics & Circuits",
      icon: Zap,
      description: "Analog circuits, digital circuits, and circuit analysis",
      level: "Intermediate",
      students: 2400,
      avgScore: 77,
      topics: [
        "Analog Circuits",
        "Digital Circuits",
        "Op-Amps",
        "Transistors",
        "Circuit Analysis",
      ],
      color: "bg-yellow-700",
      gradient: "from-yellow-700 to-yellow-800",
    },
    {
      id: "algorithm-design",
      name: "Algorithm Design & Analysis",
      icon: Binary,
      description:
        "Algorithm complexity, greedy, dynamic programming, and NP problems",
      level: "Advanced",
      students: 2800,
      avgScore: 85,
      topics: [
        "Complexity Analysis",
        "Greedy Algorithms",
        "Dynamic Programming",
        "Divide & Conquer",
        "NP-Completeness",
      ],
      color: "bg-sky-700",
      gradient: "from-sky-700 to-sky-800",
    },
    {
      id: "business-communication",
      name: "Business Communication",
      icon: Users,
      description: "Professional communication, presentations, and soft skills",
      level: "Beginner",
      students: 3100,
      avgScore: 76,
      topics: [
        "Business Writing",
        "Presentations",
        "Email Etiquette",
        "Negotiation",
        "Leadership",
      ],
      color: "bg-teal-600",
      gradient: "from-teal-600 to-teal-700",
    },
    {
      id: "augmented-reality",
      name: "Augmented Reality & VR",
      icon: Lightbulb,
      description: "AR/VR technologies, 3D modeling, and immersive experiences",
      level: "Advanced",
      students: 1400,
      avgScore: 84,
      topics: [
        "AR Fundamentals",
        "VR Development",
        "Unity 3D",
        "Spatial Computing",
        "Gesture Recognition",
      ],
      color: "bg-rose-600",
      gradient: "from-rose-600 to-rose-700",
    },
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "text-green-600 bg-green-100";
      case "Intermediate":
        return "text-blue-600 bg-blue-100";
      case "Advanced":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const topSubjects = popularSubjects.slice(0, 3);
  const otherSubjects = popularSubjects.slice(3);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Master Popular Subjects
          </h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto mb-8">
            Practice with AI-powered viva sessions for the most in-demand
            academic subjects. Join thousands of students already excelling in
            their studies.
          </p>
          <div className="flex justify-center space-x-8 text-center">
            <div>
              <div className="text-3xl font-bold">50+</div>
              <div className="text-indigo-200">Subjects</div>
            </div>
            <div>
              <div className="text-3xl font-bold">10K+</div>
              <div className="text-indigo-200">Students</div>
            </div>
            <div>
              <div className="text-3xl font-bold">95%</div>
              <div className="text-indigo-200">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Top Trending Subjects */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              🔥 Most Popular This Month
            </h2>
            <p className="text-lg text-gray-600">
              Top subjects chosen by students worldwide
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {topSubjects.map((subject, index) => {
              const IconComponent = subject.icon;
              return (
                <div key={subject.id} className="relative">
                  {index === 0 && (
                    <div className="absolute -top-3 -right-3 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-bold z-10">
                      #1 Popular
                    </div>
                  )}
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    <div
                      className={`h-32 bg-gradient-to-r ${subject.gradient} flex items-center justify-center`}
                    >
                      <IconComponent className="w-16 h-16 text-white" />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xl font-bold text-gray-900">
                          {subject.name}
                        </h3>
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${getLevelColor(
                            subject.level
                          )}`}
                        >
                          {subject.level}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-4">
                        {subject.description}
                      </p>

                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          {subject.students.toLocaleString()} students
                        </div>
                        <div className="flex items-center">
                          <BarChart3 className="w-4 h-4 mr-1" />
                          {subject.avgScore}% avg score
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm font-medium text-gray-700 mb-2">
                          Key Topics:
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {subject.topics
                            .slice(0, 3)
                            .map((topic, topicIndex) => (
                              <span
                                key={topicIndex}
                                className="px-2 py-1 bg-gray-100 text-xs rounded-full"
                              >
                                {topic}
                              </span>
                            ))}
                          {subject.topics.length > 3 && (
                            <span className="px-2 py-1 bg-gray-100 text-xs rounded-full">
                              +{subject.topics.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>

                      <Button
                        className="w-full"
                        size="lg"
                        onClick={() => handleStartInterview(subject)}
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Start Practice
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* All Subjects Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              All Available Subjects
            </h2>
            <p className="text-lg text-gray-600">
              Choose from our comprehensive collection of academic subjects
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {otherSubjects.map((subject) => {
              const IconComponent = subject.icon;
              return (
                <div
                  key={subject.id}
                  className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-300"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className={`w-12 h-12 ${subject.color} rounded-lg flex items-center justify-center`}
                    >
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${getLevelColor(
                        subject.level
                      )}`}
                    >
                      {subject.level}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {subject.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {subject.description}
                  </p>

                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <span>{subject.students.toLocaleString()} students</span>
                    <span>{subject.avgScore}% avg</span>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => handleStartInterview(subject)}
                  >
                    <BookOpen className="w-4 h-4 mr-2" />
                    Practice Now
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-900">85%</div>
              <div className="text-gray-600">Average Improvement</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Clock className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-900">15min</div>
              <div className="text-gray-600">Average Session</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Star className="w-8 h-8 text-yellow-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-900">4.9/5</div>
              <div className="text-gray-600">Student Rating</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Award className="w-8 h-8 text-purple-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-900">92%</div>
              <div className="text-gray-600">Pass Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Excel in Your Subject?
          </h2>
          <p className="text-xl opacity-90 mb-8">
            Join thousands of students who have improved their grades with our
            AI-powered viva practice
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/sign-up">
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-blue-600 hover:bg-gray-100"
              >
                Start Free Practice
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-blue-600"
              >
                Request New Subject
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SubjectsPage;
