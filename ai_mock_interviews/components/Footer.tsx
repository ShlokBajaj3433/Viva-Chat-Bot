"use client";
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
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

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
