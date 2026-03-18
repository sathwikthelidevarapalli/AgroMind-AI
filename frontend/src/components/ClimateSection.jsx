import React from "react";
import { FaCloudSun, FaLocationArrow, FaThermometerHalf, FaTint } from "react-icons/fa";
import Card from "./ui/Card";
import Button from "./ui/Button";

const fields = [
  { key: "temperature", label: "Temperature (°C)", placeholder: "e.g. 28" },
  { key: "humidity", label: "Humidity (%)", placeholder: "e.g. 70" },
  { key: "rainfall", label: "Rainfall (mm)", placeholder: "e.g. 220" },
  { key: "location", label: "Location", placeholder: "City or district" },
];

export default function ClimateSection({ form, onChange, onFetchWeather, status }) {
  return (
    <Card className="p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">Climate Intelligence</p>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Conditions & location</h3>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-secondary/10 px-3 py-1 text-xs font-semibold text-secondary">
          <FaCloudSun /> Live weather
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {fields.map((f) => (
          <label key={f.key} className="grid gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
            <span className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
              {f.key === "temperature" && <FaThermometerHalf className="text-primary" />}
              {f.key === "humidity" && <FaTint className="text-primary" />}
              {f.key === "rainfall" && <FaCloudSun className="text-primary" />}
              {f.key === "location" && <FaLocationArrow className="text-primary" />}
              {f.label}
            </span>
            <input
              type={f.key === "location" ? "text" : "number"}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              value={form[f.key]}
              placeholder={f.placeholder}
              onChange={(e) => onChange(f.key, e.target.value)}
            />
          </label>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <Button
          label="Weather Auto Detect"
          onClick={onFetchWeather}
          variant="secondary"
          size="sm"
          icon={<FaLocationArrow />}
        />
        <p className="text-xs text-slate-500 dark:text-slate-400">{status}</p>
      </div>
    </Card>
  );
}
