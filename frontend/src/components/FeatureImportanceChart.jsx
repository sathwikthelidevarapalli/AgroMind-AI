import React from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import Card from "./ui/Card";

export default function FeatureImportanceChart({ data }) {
  if (!data || data.length === 0) return null;
  return (
    <Card className="p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">Explainable AI</p>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Why this recommendation?</h3>
        </div>
      </div>
      <div className="h-64 w-full">
        <ResponsiveContainer>
          <BarChart data={data} layout="vertical" margin={{ left: 12 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis type="number" domain={[0, "dataMax"]} tick={{ fontSize: 12 }} />
            <YAxis type="category" dataKey="name" width={110} tick={{ fontSize: 12 }} />
            <Tooltip contentStyle={{ borderRadius: 12, borderColor: "#e2e8f0" }} />
            <Bar dataKey="value" fill="#16a34a" radius={[10, 10, 10, 10]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
