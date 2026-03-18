import React from "react";

export default function ConfidenceMeter({ score = 0 }) {
  const display = Math.round(score);
  const gradient = `conic-gradient(#16a34a ${Math.min(display, 100)}%, #e2e8f0 0)`;
  return (
    <div className="flex items-center gap-3">
      <div
        className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-inner ring-2 ring-slate-100 dark:bg-slate-900 dark:ring-slate-800"
        style={{ backgroundImage: gradient }}
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-sm font-semibold text-primary shadow-sm dark:bg-slate-900">
          {display}%
        </div>
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">AI Confidence</p>
        <p className="text-sm font-semibold text-slate-900 dark:text-white">{display}% confidence</p>
      </div>
    </div>
  );
}
