"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, BarChart3, Brain, CheckCircle, Mic } from "lucide-react";

const ICON_MAP = {
  brain: Brain,
  mic: Mic,
  analytics: BarChart3,
} as const;

export type FeatureIconKey = keyof typeof ICON_MAP;

export type FeatureHighlight = {
  id: string;
  title: string;
  description: string;
  icon: FeatureIconKey;
  accentClassName: string;
  points: string[];
  cta?: {
    label: string;
    href: string;
  };
};

type FeatureTabsProps = {
  items: FeatureHighlight[];
};

const FeatureTabs = ({ items }: FeatureTabsProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = useMemo(
    () => items[activeIndex] ?? items[0],
    [items, activeIndex]
  );
  const ActiveIcon = activeItem ? ICON_MAP[activeItem.icon] : undefined;

  if (!items.length || !activeItem) {
    return null;
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
      <div className="flex gap-3 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
        {items.map((item, index) => {
          const Icon = ICON_MAP[item.icon] ?? (CheckCircle as LucideIcon);
          const isActive = index === activeIndex;

          return (
            <button
              key={item.id}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActiveIndex(index)}
              className={`group flex flex-1 items-center gap-3 rounded-2xl border px-4 py-3 text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 md:flex-none ${
                isActive
                  ? "border-blue-200 bg-white shadow-sm"
                  : "border-transparent bg-slate-50 hover:bg-white/80"
              }`}
            >
              <span
                className={`flex h-10 w-10 items-center justify-center rounded-xl text-white transition-transform duration-200 ${
                  isActive ? item.accentClassName : "bg-slate-300"
                } ${isActive ? "scale-100" : "scale-95"}`}
              >
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  {item.title}
                </p>
                <p className="text-xs text-slate-500">{item.description}</p>
              </div>
            </button>
          );
        })}
      </div>

      {activeItem && (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 lg:p-8">
          <header className="flex flex-col gap-4 border-b border-slate-100 pb-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              {ActiveIcon && (
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-xl text-white ${activeItem.accentClassName}`}
                >
                  <ActiveIcon className="h-6 w-6" />
                </span>
              )}
              <div>
                <h3 className="text-xl font-semibold text-slate-900">
                  {activeItem.title}
                </h3>
                <p className="text-sm text-slate-500">
                  {activeItem.description}
                </p>
              </div>
            </div>
          </header>

          <ul className="mt-6 grid gap-3 md:grid-cols-2">
            {activeItem.points.map((point) => (
              <li
                key={point}
                className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50/70 p-3 text-left transition-all duration-200 hover:border-blue-200 hover:bg-white"
              >
                <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-500" />
                <span className="text-sm text-slate-600">{point}</span>
              </li>
            ))}
          </ul>

          {activeItem.cta && (
            <Link
              href={activeItem.cta.href}
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition-all duration-200 hover:gap-3"
            >
              {activeItem.cta.label}
              <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default FeatureTabs;
