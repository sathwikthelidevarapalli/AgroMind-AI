import React from "react";
import clsx from "clsx";

export default function SkeletonBlock({ className }) {
  return <div className={clsx("animate-pulse rounded-2xl bg-slate-200/70 dark:bg-slate-700/60", className)} />;
}
