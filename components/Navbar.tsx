"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Menu,
  X,
  User,
  LogOut,
  Settings,
  BookOpen,
  Phone,
  Home,
  Star,
  GraduationCap,
  History,
  Target,
  Trophy,
} from "lucide-react";
import { getCurrentUser, signOut } from "@/lib/actions/auth.action";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      setUser(null);
      router.push("/sign-in");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Features", href: "/features", icon: Star },
    { name: "Subjects", href: "/subjects", icon: GraduationCap },
    { name: "Practice", href: "/practice-modes", icon: Target },
    { name: "Interviews", href: "/past-interviews", icon: History },
    { name: "Leaderboard", href: "/leaderboard", icon: Trophy },
  ];

  const mobileNavItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "About", href: "/about", icon: BookOpen },
    { name: "Features", href: "/features", icon: Star },
    { name: "Subjects", href: "/subjects", icon: GraduationCap },
    { name: "Practice Modes", href: "/practice-modes", icon: Target },
    { name: "Past Interviews", href: "/past-interviews", icon: History },
    { name: "Leaderboard", href: "/leaderboard", icon: Trophy },
    { name: "Contact", href: "/contact", icon: Phone },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 max-w-[1400px] mx-auto">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-2.5 flex-shrink-0"
          >
            <Image
              src="/VchatLogo.png"
              alt="Viva Chat Bot"
              width={32}
              height={32}
              className="w-8 h-8"
            />
            <span className="text-xl font-bold text-gray-900">
              Viva<span className="text-blue-600">Chat</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center justify-center flex-1 mx-8">
            <div className="flex items-center space-x-4 xl:space-x-6 2xl:space-x-8">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center space-x-1.5 text-gray-600 hover:text-blue-600 transition-all duration-200 whitespace-nowrap text-sm font-medium group"
                  >
                    <IconComponent className="w-4 h-4 flex-shrink-0 group-hover:scale-110 transition-transform" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* User Menu */}
          <div className="hidden lg:flex items-center space-x-3 flex-shrink-0">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-2.5 text-gray-700 hover:text-blue-600 transition-colors duration-200 whitespace-nowrap rounded-lg hover:bg-blue-50 px-3 py-2"
                >
                  <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-md">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-semibold text-sm">{user.name}</span>
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl py-2 border border-gray-100 animate-in fade-in slide-in-from-top-2 duration-200">
                    <Link
                      href="/interview"
                      className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <BookOpen className="w-4 h-4 mr-3" />
                      Start Interview
                    </Link>
                    <Link
                      href="/profile"
                      className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <Settings className="w-4 h-4 mr-3" />
                      Profile Settings
                    </Link>
                    <div className="border-t border-gray-100 my-1"></div>
                    <button
                      onClick={handleSignOut}
                      className="flex items-center w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="w-4 h-4 mr-3" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link href="/sign-in">
                  <Button
                    variant="outline"
                    size="sm"
                    className="whitespace-nowrap border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link href="/sign-up">
                  <Button
                    size="sm"
                    className="whitespace-nowrap bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-md hover:shadow-lg transition-all font-semibold"
                  >
                    Get Started
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200 p-2 rounded-lg"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {mobileNavItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    <IconComponent className="w-5 h-5" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}

              {/* Mobile User Menu */}
              <div className="border-t border-gray-200 pt-4 mt-4">
                {user ? (
                  <div className="space-y-1">
                    <div className="flex items-center space-x-3 px-4 py-3 bg-blue-50 rounded-lg">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-md">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <span className="font-semibold text-gray-900">
                        {user.name}
                      </span>
                    </div>
                    <Link
                      href="/interview"
                      className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                      onClick={() => setIsOpen(false)}
                    >
                      <BookOpen className="w-5 h-5" />
                      <span className="font-medium">Start Interview</span>
                    </Link>
                    <Link
                      href="/profile"
                      className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                      onClick={() => setIsOpen(false)}
                    >
                      <Settings className="w-5 h-5" />
                      <span className="font-medium">Profile Settings</span>
                    </Link>
                    <button
                      onClick={() => {
                        handleSignOut();
                        setIsOpen(false);
                      }}
                      className="flex items-center space-x-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                    >
                      <LogOut className="w-5 h-5" />
                      <span className="font-medium">Sign Out</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3 px-3">
                    <Link href="/sign-in" onClick={() => setIsOpen(false)}>
                      <Button
                        variant="outline"
                        className="w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold"
                      >
                        Sign In
                      </Button>
                    </Link>
                    <Link href="/sign-up" onClick={() => setIsOpen(false)}>
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-md font-semibold">
                        Get Started
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
