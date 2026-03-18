import React from "react";
import { FaFlask, FaTint } from "react-icons/fa";
import Card from "./ui/Card";

const fields = [
  { key: "N", label: "Nitrogen (N)", placeholder: "e.g. 90", icon: <FaFlask /> },
  { key: "P", label: "Phosphorus (P)", placeholder: "e.g. 40", icon: <FaFlask /> },
  { key: "K", label: "Potassium (K)", placeholder: "e.g. 60", icon: <FaFlask /> },
  { key: "ph", label: "pH", placeholder: "e.g. 6.5", icon: <FaTint /> },
];

export default function SoilSection({ form, onChange }) {
  return (
    <Card className="p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">Soil Intelligence</p>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Nutrient profile</h3>
        </div>
        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">Core inputs</span>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {fields.map((f) => (
          <label key={f.key} className="group grid gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
            <span className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
              <span className="text-primary">{f.icon}</span> {f.label}
            </span>
            <input
              type="number"
              inputMode="decimal"
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              value={form[f.key]}
              placeholder={f.placeholder}
              onChange={(e) => onChange(f.key, e.target.value)}
            />
          </label>
        ))}
      </div>
    </Card>
  );
}
