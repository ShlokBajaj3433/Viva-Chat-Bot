import React from "react";
import {
  Newspaper,
  Calendar,
  User,
  Clock,
  ArrowRight,
  BookOpen,
} from "lucide-react";
import Link from "next/link";

const BlogPage = () => {
  const blogPosts = [
    {
      title: "10 Tips to Ace Your Technical Viva",
      author: "Dr. Priya Sharma",
      date: "November 5, 2025",
      readTime: "8 min read",
      category: "Tips & Tricks",
      excerpt:
        "Learn the essential strategies and techniques that will help you perform confidently in your technical viva examinations.",
      image: "gradient-blue",
    },
    {
      title: "How AI is Revolutionizing Interview Preparation",
      author: "Rahul Verma",
      date: "November 1, 2025",
      readTime: "6 min read",
      category: "Technology",
      excerpt:
        "Explore how artificial intelligence is transforming the way students prepare for interviews and viva examinations.",
      image: "gradient-purple",
    },
    {
      title: "Understanding the Viva Evaluation Process",
      author: "Prof. Amit Patel",
      date: "October 28, 2025",
      readTime: "10 min read",
      category: "Education",
      excerpt:
        "A comprehensive guide to understanding how professors evaluate students during viva voce examinations.",
      image: "gradient-green",
    },
    {
      title: "Common Mistakes Students Make During Vivas",
      author: "Sneha Reddy",
      date: "October 25, 2025",
      readTime: "7 min read",
      category: "Tips & Tricks",
      excerpt:
        "Identify and avoid the most common pitfalls that students encounter during their viva examinations.",
      image: "gradient-orange",
    },
    {
      title: "Preparing for Network Security Viva Questions",
      author: "Dr. Vikram Singh",
      date: "October 20, 2025",
      readTime: "12 min read",
      category: "Subject Guide",
      excerpt:
        "An in-depth guide covering the most frequently asked questions in network security viva examinations.",
      image: "gradient-red",
    },
    {
      title: "The Psychology of Confident Communication",
      author: "Dr. Meera Joshi",
      date: "October 15, 2025",
      readTime: "9 min read",
      category: "Personal Development",
      excerpt:
        "Master the art of confident communication and leave a lasting impression during your viva presentations.",
      image: "gradient-pink",
    },
  ];

  const categories = [
    "All Posts",
    "Tips & Tricks",
    "Technology",
    "Education",
    "Subject Guides",
    "Personal Development",
  ];

  const gradients: Record<string, string> = {
    "gradient-blue": "from-blue-600 to-blue-800",
    "gradient-purple": "from-purple-600 to-purple-800",
    "gradient-green": "from-green-600 to-green-800",
    "gradient-orange": "from-orange-600 to-orange-800",
    "gradient-red": "from-red-600 to-red-800",
    "gradient-pink": "from-pink-600 to-pink-800",
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <Newspaper className="w-16 h-16 mx-auto mb-6 text-blue-400" />
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            VivaChat Blog
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Tips, insights, and resources to help you excel in your viva
            preparation
          </p>
        </div>
        {/* Categories Filter */}
        <div className="mb-12 flex flex-wrap justify-center gap-3">
          {categories.map((category, index) => (
            <button
              key={index}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                index === 0
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-blue-500/25"
                  : "bg-gray-800/50 hover:bg-gray-700 border border-gray-700 hover:border-blue-500/50"
              }`}
            >
              {category}
            </button>
          ))}
        </div>{" "}
        {/* Featured Post */}
        <div className="mb-16 bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-2xl border border-gray-700 overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            <div
              className={`bg-gradient-to-br ${gradients["gradient-blue"]} h-64 md:h-auto flex items-center justify-center`}
            >
              <Newspaper className="w-24 h-24 text-white opacity-50" />
            </div>
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <span className="bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-semibold inline-block mb-4 w-fit">
                Featured
              </span>
              <h2 className="text-3xl font-bold mb-4">{blogPosts[0].title}</h2>
              <p className="text-gray-300 mb-4">{blogPosts[0].excerpt}</p>
              <div className="flex items-center gap-4 text-sm text-gray-400 mb-6">
                <span className="flex items-center">
                  <User className="w-4 h-4 mr-1" />
                  {blogPosts[0].author}
                </span>
                <span className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {blogPosts[0].date}
                </span>
                <span className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {blogPosts[0].readTime}
                </span>
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition-colors flex items-center w-fit">
                Read More
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          </div>
        </div>
        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {blogPosts.slice(1).map((post, index) => (
            <div
              key={index}
              className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 overflow-hidden group"
            >
              <div
                className={`bg-gradient-to-br ${
                  gradients[post.image]
                } h-48 flex items-center justify-center`}
              >
                <Newspaper className="w-16 h-16 text-white opacity-50 group-hover:scale-110 transition-transform" />
              </div>
              <div className="p-6">
                <span className="text-blue-400 text-sm font-semibold">
                  {post.category}
                </span>
                <h3 className="text-xl font-bold my-3 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-3 text-xs text-gray-400 mb-4">
                  <span className="flex items-center">
                    <User className="w-3 h-3 mr-1" />
                    {post.author}
                  </span>
                  <span className="flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {post.readTime}
                  </span>
                </div>
                <button className="text-blue-400 hover:text-blue-300 font-semibold text-sm flex items-center">
                  Read More
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
        {/* Newsletter Subscription */}
        <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-2xl p-12 border border-gray-700 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Get the latest blog posts, tips, and updates delivered directly to
            your inbox
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
