import React from "react";
import clsx from "clsx";
import Loader from "../Loader";

const base = "inline-flex items-center justify-center rounded-2xl font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-2";
const variants = {
  primary: "bg-gradient-to-r from-primary to-secondary text-white shadow-soft hover:brightness-105 focus:ring-primary",
  secondary: "bg-white text-primary border border-primary/20 hover:border-primary focus:ring-primary",
  ghost: "text-slate-600 hover:text-primary bg-white/40 border border-transparent dark:text-slate-300 dark:hover:text-white",
};
const sizes = {
  sm: "px-3 py-2 text-sm",
  md: "px-4 py-3 text-sm",
  lg: "px-5 py-3 text-base",
};

export default function Button({ label, variant = "primary", size = "md", onClick, disabled, loading, icon }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={clsx(base, variants[variant], sizes[size], disabled || loading ? "opacity-70 cursor-not-allowed" : "", "glow-btn")}
    >
      {loading && <Loader size="sm" />} {icon && <span className="mr-2">{icon}</span>} {label}
    </button>
  );
}
