import React from "react";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import {
  FaRobot,
  FaCoins,
  FaChartLine,
  FaCloudSunRain,
  FaShieldAlt,
  FaSeedling,
  FaArrowRight,
  FaHandsHelping,
  FaChartPie,
  FaLeaf,
  FaShieldAlt as FaShield,
} from "react-icons/fa";

const features = [
  {
    icon: <FaRobot />,
    title: "Intelligent Crop Prediction",
    description: "Advanced Random Forest model analyzes soil nutrients and climate signals to rank outcomes.",
  },
  {
    icon: <FaCoins />,
    title: "Profit-Based Ranking",
    description: "Recommendations are sorted by expected yield, profitability, and composite score.",
  },
  {
    icon: <FaChartLine />,
    title: "Explainable AI",
    description: "Feature importance shows exactly why each crop wins for your field scenario.",
  },
];

const steps = [
  { title: "Enter Soil & Climate Data", body: "Input N, P, K, pH, temperature, humidity, and rainfall." },
  { title: "AI Analyzes Multi-Factor Conditions", body: "Random Forest blends agronomy signals, weather, and profitability." },
  { title: "Get Ranked Crop Recommendations", body: "Review top 3 crops with confidence, profit, and risk insights." },
];

const impactItems = [
  { icon: <FaShield className="text-primary" />, title: "Reduces crop failure risk" },
  { icon: <FaCoins className="text-secondary" />, title: "Increases farmer profitability" },
  { icon: <FaChartPie className="text-primary" />, title: "Supports data-driven agriculture" },
  { icon: <FaLeaf className="text-secondary" />, title: "Encourages sustainable farming practices" },
];

export default function Home({ onPrimary, onSecondary }) {
  return (
    <div className="space-y-16">
      <section className="relative overflow-hidden rounded-3xl border border-slate-100 bg-gradient-to-br from-emerald-50 via-white to-slate-50 p-8 shadow-soft dark:border-slate-800 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 animate-fadeIn">
        <div className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-10 top-10 h-60 w-60 rounded-full bg-secondary/20 blur-3xl" />
        <div className="relative grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-primary shadow-sm ring-1 ring-primary/10 dark:bg-slate-800/60">
              Funded-grade AgriTech Platform
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl font-bold leading-tight text-slate-900 dark:text-white sm:text-5xl">
                AI-Powered Crop Intelligence for Smarter Farming
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-300">
                Make data-driven crop decisions using soil, climate, profitability, and explainable AI — delivered in a premium, production-ready dashboard.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button label="Start Smart Prediction" onClick={onPrimary} variant="primary" size="lg" icon={<FaArrowRight />} />
              <Button label="View Dashboard" onClick={onSecondary} variant="secondary" size="lg" />
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <Pill icon={<FaCloudSunRain />} title="Weather-aware" subtitle="Real-time climate auto-fill" />
              <Pill icon={<FaShieldAlt />} title="Risk & Profit" subtitle="Confidence, risk, and INR profit" />
              <Pill icon={<FaSeedling />} title="Top 3 crops" subtitle="Ranked, explainable results" />
            </div>
          </div>

          <div className="flex justify-end">
            <Card className="relative w-full max-w-xl overflow-hidden p-6">
              <div className="pointer-events-none absolute -top-16 -right-12 h-56 w-56 rounded-full bg-secondary/10" />
              <div className="pointer-events-none absolute -bottom-20 -left-14 h-64 w-64 rounded-full bg-primary/10" />
              <div className="relative space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-primary">Live preview</p>
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white">AgroMind Insight</h3>
                  </div>
                  <span className="rounded-full bg-secondary/15 px-3 py-1 text-xs font-semibold text-secondary">Operational</span>
                </div>

                <div className="rounded-2xl border border-slate-100 bg-white/70 p-4 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/70">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Rank #1</p>
                      <p className="text-lg font-semibold text-slate-900 dark:text-white">Tomato</p>
                    </div>
                    <div className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">92% fit</div>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-3 text-sm text-slate-600 dark:text-slate-300">
                    <Metric label="Yield" value="5,200 kg/ha" />
                    <Metric label="Profit" value="₹75k" highlight />
                    <Metric label="Risk" value="Low" tone="success" />
                  </div>
                  <div className="mt-4 text-xs text-slate-500">
                    Explainable AI: Rainfall, N, and K drive this outcome.
                  </div>
                </div>

                <div className="grid gap-3 rounded-2xl border border-slate-100 bg-slate-50/80 p-4 text-sm shadow-sm dark:border-slate-800 dark:bg-slate-800/60">
                  <div className="flex items-center justify-between text-slate-700 dark:text-slate-200">
                    <span>AI Confidence</span>
                    <span className="font-semibold text-primary">89%</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-700">
                    <div className="h-2 w-[89%] rounded-full bg-gradient-to-r from-primary to-secondary" />
                  </div>
                  <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
                    <span>Weather sync</span>
                    <span className="text-xs font-semibold text-secondary">LIVE</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="space-y-6 animate-fadeIn">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-primary">Platform advantages</p>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Built for serious AgriTech teams</h2>
          </div>
          <Button label="View Dashboard" variant="secondary" onClick={onSecondary} size="md" />
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="h-full p-5 transition duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                {feature.icon}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">{feature.title}</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{feature.description}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-6 animate-fadeIn">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">Impact & Value</p>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Why AgroMind AI Matters</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {impactItems.map((item) => (
            <Card key={item.title} className="p-4 text-center transition duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                {item.icon}
              </div>
              <p className="mt-3 text-sm font-semibold text-slate-900 dark:text-white">{item.title}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-6 animate-fadeIn">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">How it works</p>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">From soil data to ranked crops</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {steps.map((step, idx) => (
            <Card key={step.title} className="p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                  {idx + 1}
                </div>
                <h3 className="text-base font-semibold text-slate-900 dark:text-white">{step.title}</h3>
              </div>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{step.body}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="animate-fadeIn">
        <Card className="flex flex-col gap-4 rounded-3xl border border-primary/10 bg-gradient-to-r from-white via-emerald-50 to-white p-6 shadow-soft dark:from-slate-900 dark:via-slate-900 dark:to-slate-900">
          <div className="text-sm font-semibold text-primary">Built for Farmers, Advisors, and Smart Agriculture Systems</div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {["Multi-factor AI model", "Real-time weather integration", "Profit and risk intelligence", "Scalable cloud architecture"].map(
              (item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-200">
                  <span className="h-2 w-2 rounded-full bg-secondary" />
                  {item}
                </div>
              )
            )}
          </div>
        </Card>
      </section>

      <section className="animate-fadeIn">
        <div className="rounded-3xl border border-slate-100 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 p-8 text-center shadow-soft dark:border-slate-800 dark:from-primary/20 dark:via-secondary/10 dark:to-primary/20">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Transform Farming with Intelligent Decisions</h3>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">Run the AI analysis to see your top crops, profitability, risk, and market signals — in seconds.</p>
          <div className="mt-6 flex justify-center">
            <Button label="Run AI Analysis" onClick={onPrimary} variant="primary" size="lg" icon={<FaArrowRight />} />
          </div>
        </div>
      </section>
    </div>
  );
}

function Pill({ icon, title, subtitle }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-3 text-sm shadow-sm ring-1 ring-slate-100/60 transition dark:border-slate-800 dark:bg-slate-900">
      <div className="mt-0.5 text-primary">{icon}</div>
      <div>
        <p className="font-semibold text-slate-900 dark:text-white">{title}</p>
        <p className="text-xs text-slate-500 dark:text-slate-400">{subtitle}</p>
      </div>
    </div>
  );
}

function Metric({ label, value, highlight = false, tone = "default" }) {
  const toneClass = {
    default: "text-slate-900 dark:text-white",
    success: "text-green-600 dark:text-green-300",
  }[tone];
  return (
    <div className="rounded-xl bg-slate-50 px-3 py-2 dark:bg-slate-800/60">
      <p className="text-xs text-slate-500">{label}</p>
      <p className={`font-semibold ${highlight ? "text-primary" : toneClass}`}>{value}</p>
    </div>
  );
}
