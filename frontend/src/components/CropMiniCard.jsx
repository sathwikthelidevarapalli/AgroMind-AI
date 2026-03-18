import React from "react";
import Card from "./ui/Card";
import { FaArrowTrendUp, FaArrowTrendDown, FaMinus } from "react-icons/fa6";

const riskBadge = {
  Low: "bg-green-100 text-green-700",
  Medium: "bg-yellow-100 text-yellow-700",
  High: "bg-red-100 text-red-700",
};

const demandBadge = {
  High: "bg-green-100 text-green-700",
  Medium: "bg-yellow-100 text-yellow-700",
  Low: "bg-red-100 text-red-700",
};

export default function CropMiniCard({ crop, rank }) {
  return (
    <Card className="flex flex-col gap-3 p-4 transition hover:-translate-y-1">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Rank {rank}</p>
          <h4 className="text-lg font-semibold text-slate-900 dark:text-white">{crop.crop}</h4>
        </div>
        <span className="text-sm font-semibold text-primary">{crop.suitability_score}%</span>
      </div>
      <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-200">
          Yield: {crop.expected_yield ? `${Math.round(crop.expected_yield)} kg/ha` : "N/A"}
        </span>
        <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700 dark:bg-green-900/30 dark:text-green-200">
          Profit: {crop.estimated_profit ? `₹${Math.round(crop.estimated_profit)}` : "N/A"}
        </span>
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${riskBadge[crop.risk_level] || riskBadge.Medium}`}>
          Agricultural Risk: {crop.risk_level || "Medium"}
        </span>
      </div>
      <div className="flex items-center gap-2 text-xs text-primary">
        <FaArrowTrendUp /> Composite score {crop.final_score}%
      </div>

      <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3 text-xs shadow-inner dark:border-slate-800 dark:bg-slate-900/60">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-primary">Market Intelligence Insight</p>
        <div className="grid grid-cols-2 gap-2 text-slate-700 dark:text-slate-200">
          <div>
            <p className="text-[11px] text-slate-500">Price / quintal</p>
            <p className="font-semibold">{crop.market_price ? `₹${crop.market_price}` : "N/A"}</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge cls={demandBadge[crop.demand] || demandBadge.Medium} label={crop.demand || "Demand"} />
            <Trend trend={crop.trend} />
          </div>
          <div className="col-span-2 flex items-center gap-2">
            <p className="text-[11px] text-slate-500">Market Risk</p>
            <Badge cls={riskBadge[crop.market_risk] || riskBadge[crop.risk_level] || riskBadge.Medium} label={crop.market_risk || crop.risk_level || "Risk"} />
          </div>
        </div>
      </div>
    </Card>
  );
}

function Badge({ cls, label }) {
  return <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold ${cls}`}>{label}</span>;
}

function Trend({ trend }) {
  const tone = {
    Up: { icon: <FaArrowTrendUp className="text-green-600" />, label: "Up" },
    Down: { icon: <FaArrowTrendDown className="text-red-600" />, label: "Down" },
    Stable: { icon: <FaMinus className="text-slate-500" />, label: "Stable" },
  }[trend] || { icon: <FaMinus className="text-slate-400" />, label: "Stable" };
  return <span className="inline-flex items-center gap-1 rounded-full bg-white px-2 py-1 font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-200">{tone.icon} {tone.label}</span>;
}
