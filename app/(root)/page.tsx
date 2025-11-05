import Link from "next/link";
import Image from "next/image";
import {
  BookOpen,
  Users,
  Target,
  ArrowRight,
  Play,
  CheckCircle,
  GraduationCap,
  Clock,
  Trophy,
  BarChart3,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import InterviewCard from "@/components/InterviewCard";
import FeatureTabs, { FeatureHighlight } from "@/components/home/FeatureTabs";
import StatsShowcase, { HighlightStat } from "@/components/home/StatsShowcase";

import { getCurrentUser } from "@/lib/actions/auth.action";
import {
  getInterviewsByUserId,
  getLatestInterviews,
} from "@/lib/actions/general.action";

async function Home() {
  const user = await getCurrentUser();

  const [userInterviews, allInterview] = await Promise.all([
    user?.id ? getInterviewsByUserId(user.id) : Promise.resolve([]),
    user?.id ? getLatestInterviews({ userId: user.id }) : Promise.resolve([]),
  ]);

  const hasPastInterviews = userInterviews && userInterviews.length > 0;
  const hasUpcomingInterviews = allInterview && allInterview.length > 0;

  const stats: HighlightStat[] = [
    { value: 10000, suffix: "+", label: "Students coached" },
    { value: 50, suffix: "+", label: "Subjects covered" },
    { value: 95, suffix: "%", label: "Success rate" },
    { value: 24, suffix: "/7", label: "Practice access" },
  ];

  const featureHighlights: FeatureHighlight[] = [
    {
      id: "ai-questions",
      title: "AI-Powered Question Engine",
      description:
        "Generate viva questions in seconds based on syllabus, difficulty, and past sessions.",
      icon: "brain",
      accentClassName: "bg-blue-500",
      points: [
        "Adapts to your academic level on every attempt",
        "Mixes theory and scenario-based prompts",
        "Instant follow-up questions when you need more challenge",
        "Save custom question sets for revision",
      ],
      cta: {
        label: "Explore practice modes",
        href: "/practice-modes",
      },
    },
    {
      id: "voice-practice",
      title: "Voice-Led Viva Practice",
      description:
        "Simulate live viva environments with conversational AI feedback and pacing cues.",
      icon: "mic",
      accentClassName: "bg-indigo-500",
      points: [
        "Natural voice prompts with adjustable speaking speed",
        "Real-time nudges when answers need more depth",
        "Moments of silence detection to mimic examiner behaviour",
        "Export transcripts for mentor review",
      ],
      cta: {
        label: "Start a live session",
        href: "/interview",
      },
    },
    {
      id: "deep-analytics",
      title: "Deep Performance Analytics",
      description:
        "Understand strengths, filler words, and knowledge gaps with every completed viva.",
      icon: "analytics",
      accentClassName: "bg-purple-500",
      points: [
        "Auto-generated improvement plan after each round",
        "Topic coverage heatmaps across subjects",
        "Confidence score tracking over time",
        "Peer benchmarking on the leaderboard",
      ],
      cta: {
        label: "Review past interviews",
        href: "/past-interviews",
      },
    },
  ];

  const benefits = [
    {
      title: "Adaptive question routing",
      detail:
        "Let the AI tailor probing questions based on how confidently you answer.",
    },
    {
      title: "Voice-to-text transcripts",
      detail:
        "Capture every response automatically to revise faster and share with mentors.",
    },
    {
      title: "Granular feedback loops",
      detail:
        "Spot filler words, hesitation zones, and theory gaps in one dashboard.",
    },
    {
      title: "Flexible scheduling",
      detail:
        "Practice in short bursts or long mocks with timers that mirror viva conditions.",
    },
    {
      title: "Progress tracking",
      detail:
        "See improvement trends across weeks and unlock new question banks.",
    },
    {
      title: "Confidence boosters",
      detail: "Get positive reinforcement and expert tips after every session.",
    },
  ];

  const pageContainer = "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8";

  const trustedBrands = [
    { name: "Amazon", logo: "/covers/amazon.png" },
    { name: "Facebook", logo: "/covers/facebook.png" },
    { name: "Spotify", logo: "/covers/spotify.png" },
    { name: "Pinterest", logo: "/covers/pinterest.png" },
    { name: "Tiktok", logo: "/covers/tiktok.png" },
  ];

  return (
    <div className="bg-slate-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden pb-24 pt-16">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute left-1/3 top-0 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-blue-200/40 blur-3xl" />
          <div className="absolute right-[-10%] top-1/2 h-[380px] w-[380px] -translate-y-1/2 rounded-full bg-purple-200/40 blur-3xl" />
        </div>
        <div className={`${pageContainer}`}>
          <div className="grid items-center gap-16 lg:grid-cols-[minmax(0,1fr)_420px]">
            <div className="space-y-10">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm font-medium text-blue-700 shadow-sm backdrop-blur">
                <CheckCircle className="h-4 w-4 text-blue-500" />
                <span>Level up every viva attempt</span>
              </div>

              <div className="space-y-5">
                <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                  Master your viva with{" "}
                  <span className="text-blue-600">AI coaching</span>
                </h1>
                <p className="max-w-xl text-lg text-slate-600">
                  Get interview-ready with adaptive practice sessions, tailored
                  challenges, and instant analytics that build your confidence
                  for every viva.
                </p>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                {user ? (
                  <Button
                    asChild
                    size="lg"
                    className="bg-blue-600 shadow-md transition-transform duration-200 hover:scale-105 hover:bg-blue-700"
                  >
                    <Link href="/interview">
                      <Play className="mr-2 h-5 w-5 animate-bounce" />
                      Start viva practice
                    </Link>
                  </Button>
                ) : (
                  <Button
                    asChild
                    size="lg"
                    className="bg-blue-600 shadow-md transition-transform duration-200 hover:scale-105 hover:bg-blue-700"
                  >
                    <Link href="/sign-up">Get started free</Link>
                  </Button>
                )}

                <Button
                  variant="outline"
                  size="lg"
                  asChild
                  className="group transition-transform duration-200 hover:scale-105"
                >
                  <Link href="/features">
                    Learn more
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {benefits.map((benefit) => (
                  <div
                    key={benefit.title}
                    className="flex items-start gap-3 rounded-2xl border border-transparent bg-white/80 p-3 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:bg-white"
                  >
                    <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        {benefit.title}
                      </p>
                      <p className="text-xs text-slate-500">{benefit.detail}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-3xl border border-blue-100 bg-white/70 p-4 shadow-sm backdrop-blur">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Trusted by learners from
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-4 sm:gap-6">
                  {trustedBrands.map((brand) => (
                    <div
                      key={brand.name}
                      className="flex items-center gap-2 text-sm font-medium text-slate-600"
                    >
                      <Image
                        src={brand.logo}
                        alt={`${brand.name} logo`}
                        width={40}
                        height={40}
                        className="h-8 w-8 object-contain sm:h-10 sm:w-10"
                      />
                      <span>{brand.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[420px]">
                <div className="absolute -inset-6 rounded-[32px] bg-gradient-to-br from-blue-200/60 via-white to-purple-200/60 blur-2xl" />
                <div className="relative overflow-hidden rounded-[28px] bg-white shadow-2xl ring-1 ring-slate-100">
                  <Image
                    src="/robot.png"
                    alt="AI viva assistant"
                    width={520}
                    height={520}
                    className="w-full rounded-[24px] object-contain"
                    priority
                  />

                  <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-lg backdrop-blur">
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                          <BarChart3 className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-900">
                            Personalized analytics
                          </p>
                          <p className="text-xs text-slate-500">
                            Smart feedback summaries after every session
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                          <Users className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-900">
                            Peer benchmarking
                          </p>
                          <p className="text-xs text-slate-500">
                            Track confidence trends with your cohort
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="pb-16">
        <div className={`${pageContainer}`}>
          <div className="rounded-3xl border border-slate-200 bg-white/80 p-10 shadow-sm backdrop-blur">
            <StatsShowcase stats={stats} />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className={`${pageContainer} space-y-12`}>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-slate-900">
              Why learners stick with VivaChat
            </h2>
            <p className="mt-3 text-lg text-slate-600">
              Unlock immersive viva simulations, live feedback, and analytics
              that keep you improving with every answer.
            </p>
          </div>

          <FeatureTabs items={featureHighlights} />
        </div>
      </section>

      {/* Viva-Specific Features */}
      <section className="bg-slate-100 py-20">
        <div className={`${pageContainer}`}>
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              Explore viva features
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-lg text-gray-600">
              Discover specialized tools and resources designed to help you
              excel in viva examinations.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <Link href="/subjects" className="group">
              <div className="h-full rounded-2xl bg-white p-6 shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-md">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500 text-white transition-transform duration-200 group-hover:-translate-y-1 group-hover:scale-110">
                  <GraduationCap className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Popular subjects
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  Explore 50+ subjects with comprehensive practice sessions.
                </p>
              </div>
            </Link>

            <Link href="/practice-modes" className="group">
              <div className="h-full rounded-2xl bg-white p-6 shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-md">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-green-500 text-white transition-transform duration-200 group-hover:-translate-y-1 group-hover:scale-110">
                  <Target className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Practice modes
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  Choose from 6 different modes tailored to your learning style.
                </p>
              </div>
            </Link>

            <Link href="/past-interviews" className="group">
              <div className="h-full rounded-2xl bg-white p-6 shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-md">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500 text-white transition-transform duration-200 group-hover:-translate-y-1 group-hover:scale-110">
                  <Clock className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Past interviews
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  Review your interview history and track progress over time.
                </p>
              </div>
            </Link>

            <Link href="/leaderboard" className="group">
              <div className="h-full rounded-2xl bg-white p-6 shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-md">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500 text-white transition-transform duration-200 group-hover:-translate-y-1 group-hover:scale-110">
                  <Trophy className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Leaderboard
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  Compete with students worldwide and climb the global rankings.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {user && (
        <>
          {/* User's Interviews Section */}
          <section className="bg-gray-50 py-20">
            <div className={`${pageContainer}`}>
              <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-3xl font-bold text-gray-900">
                  Your viva sessions
                </h2>
                <Button asChild>
                  <Link href="/interview">
                    <Play className="mr-2 h-4 w-4" />
                    New session
                  </Link>
                </Button>
              </div>

              <div className="interviews-section">
                {hasPastInterviews ? (
                  userInterviews?.map((interview) => (
                    <InterviewCard
                      key={interview.id}
                      userId={user?.id}
                      interviewId={interview.id}
                      role={interview.role}
                      type={interview.type}
                      techstack={interview.techstack}
                      createdAt={interview.createdAt}
                    />
                  ))
                ) : (
                  <div className="rounded-3xl bg-white/80 p-10 text-center shadow-sm">
                    <BookOpen className="mx-auto mb-4 h-16 w-16 text-gray-400" />
                    <h3 className="text-xl font-semibold text-gray-900">
                      No viva sessions yet
                    </h3>
                    <p className="mt-2 text-gray-600">
                      Start your first AI-powered viva practice session.
                    </p>
                    <div className="mt-6">
                      <Button asChild>
                        <Link href="/interview">Start first session</Link>
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        </>
      )}

      {/* CTA Section */}
      <section className="bg-blue-600 py-20 text-white">
        <div className={`${pageContainer} text-center`}>
          <h2 className="text-3xl font-bold sm:text-4xl">
            Ready to ace your next viva?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg opacity-90">
            Join thousands of students who have improved their confidence and
            academic performance with VivaChat.
          </p>

          {!user && (
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-blue-600 hover:bg-gray-100"
              >
                <Link href="/sign-up">Start free trial</Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-blue-600"
              >
                <Link href="/about">Learn more</Link>
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Home;
