import React from "react";
import { FaLeaf, FaMoon, FaSun } from "react-icons/fa";
import Button from "../components/ui/Button";
import clsx from "clsx";

const tabs = [
  { key: "home", label: "Home" },
  { key: "dashboard", label: "Dashboard" },
  { key: "results", label: "Results" },
];

export default function Navbar({ current, onNavigate, dark, onToggleDark, onStart }) {
  return (
    <nav className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/80 backdrop-blur-md dark:bg-slate-900/80 dark:border-slate-800">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-white shadow-soft">
            <FaLeaf size={20} />
          </div>
          <div>
            <p className="text-sm font-semibold text-primary">AgroMind AI</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Intelligent Crop Platform</p>
          </div>
        </div>

        <div className="hidden items-center gap-2 rounded-2xl bg-slate-100 px-2 py-1 text-sm font-medium dark:bg-slate-800 sm:flex">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => onNavigate(tab.key)}
              className={clsx(
                "rounded-xl px-3 py-2 transition", 
                current === tab.key
                  ? "bg-white shadow-sm text-primary dark:bg-slate-700"
                  : "text-slate-500 hover:text-primary dark:text-slate-400"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onToggleDark}
            className="flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 transition hover:border-primary hover:text-primary dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
            aria-label="Toggle dark mode"
          >
            {dark ? <FaSun /> : <FaMoon />}
          </button>
          <Button label="Start" onClick={onStart} variant="primary" size="sm" />
        </div>
      </div>
    </nav>
  );
}
