import React from "react";
import Card from "./ui/Card";
import { FaArrowTrendUp, FaArrowTrendDown, FaMinus, FaStar } from "react-icons/fa6";
import { FaLeaf } from "react-icons/fa";

const riskStyles = {
  Low: "bg-green-100 text-green-700",
  Medium: "bg-yellow-100 text-yellow-700",
  High: "bg-red-100 text-red-700",
};

export default function CropHeroCard({ crop }) {
  if (!crop) return null;
  return (
    <Card className="relative overflow-hidden border-l-4 border-accent p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <FaLeaf />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-secondary/10 px-2 py-1 text-[11px] font-semibold text-secondary">
                <FaStar /> Best Recommended Crop This Season
              </span>
            </div>
            <h3 className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">{crop.crop}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Based on soil suitability, market demand, and profitability.</p>
          </div>
        </div>
        <div className="text-right text-sm font-semibold text-primary">{Math.round(crop.suitability_score)}% fit</div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Metric label="Expected Yield" value={crop.expected_yield ? `${Math.round(crop.expected_yield)} kg/ha` : "N/A"} />
        <Metric label="Estimated Profit" value={crop.estimated_profit ? `₹${Math.round(crop.estimated_profit)}` : "N/A"} highlight />
        <Metric
          label="Agricultural Risk"
          value={crop.risk_level || "Medium"}
          badgeClass={riskStyles[crop.risk_level] || riskStyles.Medium}
        />
      </div>

      <div className="mt-5 rounded-2xl border border-slate-100 bg-slate-50/70 p-4 text-sm shadow-inner dark:border-slate-800 dark:bg-slate-900/60">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">Market Intelligence Insight</p>
          <DemandBadge demand={crop.demand} />
        </div>
        <div className="mt-3 grid gap-3 sm:grid-cols-3 text-slate-700 dark:text-slate-200">
          <div>
            <p className="text-xs text-slate-500">Market Price</p>
            <p className="font-semibold">{crop.market_price ? `₹${crop.market_price} / quintal` : "N/A"}</p>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-xs text-slate-500">Trend</p>
            <Trend trend={crop.trend} />
          </div>
          <div className="flex items-center gap-2">
            <p className="text-xs text-slate-500">Market Risk</p>
            <RiskBadge level={crop.market_risk || crop.risk_level} />
          </div>
        </div>
      </div>
    </Card>
  );
}

function Metric({ label, value, highlight = false, badgeClass }) {
  if (badgeClass) {
    return (
      <div className="rounded-2xl border border-slate-100 bg-white/60 p-4 dark:border-slate-800 dark:bg-slate-900/60">
        <p className="text-xs uppercase tracking-wide text-slate-500">{label}</p>
        <span className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${badgeClass}`}>{value}</span>
      </div>
    );
  }
  return (
    <div className="rounded-2xl border border-slate-100 bg-white/60 p-4 dark:border-slate-800 dark:bg-slate-900/60">
      <p className="text-xs uppercase tracking-wide text-slate-500">{label}</p>
      <p className={`mt-2 text-lg font-semibold ${highlight ? "text-primary" : "text-slate-900 dark:text-white"}`}>{value}</p>
    </div>
  );
}

function DemandBadge({ demand }) {
  const palette = {
    High: "bg-green-100 text-green-700",
    Medium: "bg-yellow-100 text-yellow-700",
    Low: "bg-red-100 text-red-700",
  };
  const cls = palette[demand] || palette.Medium;
  return <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${cls}`}>{demand || "Demand"}</span>;
}

function Trend({ trend }) {
  const tone = {
    Up: { icon: <FaArrowTrendUp className="text-green-600" />, label: "Up" },
    Down: { icon: <FaArrowTrendDown className="text-red-600" />, label: "Down" },
    Stable: { icon: <FaMinus className="text-slate-500" />, label: "Stable" },
  }[trend] || { icon: <FaMinus className="text-slate-400" />, label: "Stable" };
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-white px-2 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-200">
      {tone.icon} {tone.label}
    </span>
  );
}

function RiskBadge({ level }) {
  const cls = riskStyles[level] || riskStyles.Medium;
  return <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold ${cls}`}>{level || "Risk"}</span>;
}
