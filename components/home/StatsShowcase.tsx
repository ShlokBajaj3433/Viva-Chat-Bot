"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

const numberFormatter = new Intl.NumberFormat("en-US");

export type HighlightStat = {
  value: number;
  suffix?: string;
  label: string;
  duration?: number;
};

type StatsShowcaseProps = {
  stats: HighlightStat[];
};

const StatsShowcase = ({ stats }: StatsShowcaseProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [displayValues, setDisplayValues] = useState<number[]>(() =>
    stats.map(() => 0)
  );
  const hasAnimated = useRef(false);

  const maxDuration = useMemo(
    () => Math.max(1200, ...stats.map((stat) => stat.duration ?? 0)),
    [stats]
  );

  useEffect(() => {
    setDisplayValues(stats.map(() => 0));
    hasAnimated.current = false;
  }, [stats]);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || hasAnimated.current) return;

    hasAnimated.current = true;
    const startTime = performance.now();
    let animationFrame = 0;

    const animate = (now: number) => {
      const elapsed = now - startTime;

      setDisplayValues((prev) =>
        prev.map((_, index) => {
          const target = stats[index]?.value ?? 0;
          const duration = stats[index]?.duration ?? 1400;
          const progress = Math.min(elapsed / duration, 1);
          return Math.round(target * easeOutCubic(progress));
        })
      );

      if (elapsed < maxDuration) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [isVisible, stats, maxDuration]);

  return (
    <div
      ref={containerRef}
      className="grid grid-cols-2 gap-6 text-center md:grid-cols-4"
    >
      {stats.map((stat, index) => (
        <div
          key={stat.label}
          className="rounded-2xl border border-slate-200 bg-white/70 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
        >
          <p className="mb-2 text-3xl font-semibold text-slate-900 md:text-4xl">
            {numberFormatter.format(displayValues[index] ?? 0)}
            <span className="text-blue-500">{stat.suffix ?? ""}</span>
          </p>
          <p className="text-sm font-medium text-slate-600">{stat.label}</p>
        </div>
      ))}
    </div>
  );
};

export default StatsShowcase;
