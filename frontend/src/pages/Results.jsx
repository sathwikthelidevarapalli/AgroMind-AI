import React from "react";
import CropHeroCard from "../components/CropHeroCard";
import CropMiniCard from "../components/CropMiniCard";
import FeatureImportanceChart from "../components/FeatureImportanceChart";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import ConfidenceMeter from "../components/ConfidenceMeter";
import ErrorState from "../components/ErrorState";
import EmptyState from "../components/EmptyState";

export default function Results({ topCrops, featureImportance, confidence, onReset }) {
  if (!topCrops || topCrops.length === 0) {
    return <EmptyState title="No recommendations yet" body="Run a new prediction to see ranked crops." actionLabel="Back to dashboard" onAction={onReset} />;
  }

  const [first, second, third] = topCrops || [];
  const summary = featureImportance?.length
    ? `${featureImportance[0].name} and ${featureImportance[1]?.name || featureImportance[0].name} contribute most to this prediction.`
    : "Model factors are balanced for this scenario.";

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">Results</p>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Ranked crop recommendations</h2>
        </div>
        <Button label="Run another analysis" onClick={onReset} variant="secondary" />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <CropHeroCard crop={first} />
        </div>
        <Card className="p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">Model confidence</p>
          <div className="mt-3 flex items-center gap-3">
            <ConfidenceMeter score={confidence || 0} />
          </div>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">Confidence reflects how certain the model is for this field scenario.</p>
        </Card>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {second && <CropMiniCard crop={second} rank={2} />}
        {third && <CropMiniCard crop={third} rank={3} />}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <FeatureImportanceChart data={featureImportance} />
        </div>
        <Card className="p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">Why This Recommendation?</p>
          <h3 className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">AI explanation</h3>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{summary}</p>
          <div className="mt-4 space-y-2 text-sm text-slate-500 dark:text-slate-400">
            <p>We combine suitability, expected yield, and profitability into one composite score.</p>
            <p>Risk is color-coded so you can make confident, data-driven planting decisions.</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
