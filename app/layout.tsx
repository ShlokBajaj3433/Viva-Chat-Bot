import { Toaster } from "sonner";
import type { Metadata, Viewport } from "next";
import { Mona_Sans } from "next/font/google";

const monaSans = Mona_Sans({
  variable: "--font-mona-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VivaChat - AI-Powered Viva Practice Platform",
  description:
    "Master your vivas with AI-powered practice sessions. Get personalized questions, real-time feedback, and boost your academic confidence with VivaChat.",
  keywords: [
    "viva practice",
    "AI tutor",
    "academic preparation",
    "interview practice",
    "student learning",
    "education technology",
  ],
  authors: [{ name: "VivaChat Team" }],
  openGraph: {
    title: "VivaChat - AI-Powered Viva Practice Platform",
    description: "Master your vivas with AI-powered practice sessions",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@vivachat",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${monaSans.className} antialiased`}>
        <div className="min-h-screen bg-white">{children}</div>
        <Toaster />
      </body>
    </html>
  );
}
