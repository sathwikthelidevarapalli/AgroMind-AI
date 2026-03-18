import React from "react";
import PredictionForm from "../components/PredictionForm";
import Card from "../components/ui/Card";
import { FaShieldAlt, FaChartLine } from "react-icons/fa";

export default function Dashboard({ form, onChange, onPredict, onFetchWeather, weatherStatus, loading, error }) {
  return (
    <div className="space-y-6">
      <Card className="p-5">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-primary">AgroMind AI</p>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Intelligent Crop Recommendation Dashboard</h1>
            <p className="text-sm text-slate-600 dark:text-slate-300">Enter soil and climate signals, then run AI to get ranked crops with explainability.</p>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-secondary/10 px-3 py-1 text-xs font-semibold text-secondary">
            <FaChartLine /> Live model
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <div className="rounded-2xl bg-primary/10 px-4 py-3 text-sm font-semibold text-primary">Fewer inputs → quicker predictions</div>
          <div className="rounded-2xl bg-secondary/10 px-4 py-3 text-sm font-semibold text-secondary">Weather-aware auto-fill</div>
          <div className="flex items-center gap-2 rounded-2xl bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-700 dark:bg-amber-900/30 dark:text-amber-200">
            <FaShieldAlt /> Risk and profit lens included
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <PredictionForm
          form={form}
          onChange={onChange}
          onSubmit={onPredict}
          onFetchWeather={onFetchWeather}
          loading={loading}
          error={error}
          weatherStatus={weatherStatus}
        />
      </Card>
    </div>
  );
}
