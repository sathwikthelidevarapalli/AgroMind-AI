import React from "react";
import clsx from "clsx";

export default function Loader({ label = "Loading", size = "md" }) {
  const dim = size === "sm" ? "h-4 w-4" : "h-5 w-5";
  return (
    <div className="flex items-center gap-2 text-primary">
      <span className={clsx("animate-spin rounded-full border-2 border-primary border-t-transparent", dim)} />
      <span className="text-sm font-medium text-slate-600 dark:text-slate-300">{label}</span>
    </div>
  );
}
