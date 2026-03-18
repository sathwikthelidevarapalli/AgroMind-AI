import React, { useMemo, useState } from "react";
import Button from "./ui/Button";
import Loader from "./Loader";
import { FaCloudSunRain, FaMagic } from "react-icons/fa";

const fields = [
  { key: "N", label: "Nitrogen", placeholder: "e.g. 90", required: true },
  { key: "P", label: "Phosphorus", placeholder: "e.g. 40", required: true },
  { key: "K", label: "Potassium", placeholder: "e.g. 60", required: true },
  { key: "ph", label: "pH", placeholder: "e.g. 6.5", required: true },
  { key: "temperature", label: "Temperature (°C)", placeholder: "e.g. 28", required: true },
  { key: "humidity", label: "Humidity (%)", placeholder: "e.g. 70", required: true },
  { key: "rainfall", label: "Rainfall (mm)", placeholder: "e.g. 220", required: true },
  { key: "location", label: "Location", placeholder: "City or district", required: false },
];

export default function PredictionForm({ form, onChange, onSubmit, onFetchWeather, loading, error, weatherStatus }) {
  const [fieldErrors, setFieldErrors] = useState({});

  const validate = () => {
    const errs = {};
    fields.forEach((f) => {
      const value = form[f.key];
      if (f.required && (value === "" || value === null || value === undefined)) {
        errs[f.key] = "Required";
      }
      if (f.required && value !== "" && value !== undefined && value !== null) {
        const num = Number(value);
        if (!Number.isFinite(num)) {
          errs[f.key] = "Enter a valid number";
        }
      }
    });
    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit();
  };

  const disabled = useMemo(() => loading, [loading]);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {fields.map((f) => (
          <label key={f.key} className="flex flex-col gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
            <span className="flex items-center gap-2">
              <span>{f.label}</span>
              {f.required && <span className="text-danger">*</span>}
            </span>
            <input
              type={f.key === "location" ? "text" : "number"}
              inputMode={f.key === "location" ? "text" : "decimal"}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              value={form[f.key]}
              placeholder={f.placeholder}
              onChange={(e) => onChange(f.key, e.target.value)}
            />
            {fieldErrors[f.key] && <span className="text-xs text-danger">{fieldErrors[f.key]}</span>}
          </label>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Button
          label={loading ? "Analyzing..." : "Analyze with AI"}
          icon={<FaMagic />}
          onClick={handleSubmit}
          disabled={disabled}
          loading={loading}
          size="lg"
        />
        <Button
          label="Weather Auto-Fill"
          icon={<FaCloudSunRain />}
          variant="secondary"
          onClick={() => onFetchWeather(form.location)}
          disabled={loading}
        />
        {loading && <Loader label="Calling AI backend..." />}
      </div>

      {weatherStatus && <p className="text-sm text-slate-500 dark:text-slate-400">{weatherStatus}</p>}
      {error && <p className="text-sm text-danger">{error}</p>}
    </form>
  );
}
