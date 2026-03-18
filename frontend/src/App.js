import React, { useMemo, useState } from "react";
import clsx from "clsx";
import Navbar from "./layout/Navbar";
import PageContainer from "./layout/PageContainer";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Results from "./pages/Results";
import Loader from "./components/Loader";
import ErrorState from "./components/ErrorState";
import { predictCrop, fetchWeather } from "./services/api";

const initialForm = {
  N: "",
  P: "",
  K: "",
  ph: "",
  temperature: "",
  humidity: "",
  rainfall: "",
  location: "",
};

function App() {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [topCrops, setTopCrops] = useState([]);
  const [featureImportance, setFeatureImportance] = useState([]);
  const [confidence, setConfidence] = useState(null);
  const [weatherStatus, setWeatherStatus] = useState("");
  const [page, setPage] = useState("home");
  const [dark, setDark] = useState(false);

  const layoutClass = useMemo(
    () =>
      clsx(
        dark ? "dark bg-slate-950 text-slate-100" : "bg-base text-slate-900",
        "min-h-screen transition-colors duration-300"
      ),
    [dark]
  );

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleWeather = async (location) => {
    if (!location) {
      setWeatherStatus("Enter a location to fetch weather.");
      return;
    }
    setWeatherStatus("Fetching weather...");
    try {
      const data = await fetchWeather(location);
      setForm((prev) => ({
        ...prev,
        temperature: prev.temperature || (data.temperature ?? ""),
        humidity: prev.humidity || (data.humidity ?? ""),
        rainfall: prev.rainfall || (data.rainfall ?? ""),
      }));
      const parts = [];
      if (data.temperature != null) parts.push(`Temp ${data.temperature}°C`);
      if (data.humidity != null) parts.push(`Humidity ${data.humidity}%`);
      if (data.rainfall != null) parts.push(`Rain ${data.rainfall}mm`);
      setWeatherStatus(`Weather from ${data.location_name || "location"}: ${parts.join(" • ")}`);
    } catch (err) {
      setWeatherStatus("Weather lookup unavailable. You can enter values manually.");
    }
  };

  const handlePredict = async () => {
    setLoading(true);
    setError("");
    try {
      const toNumber = (value) => {
        const num = Number(value);
        return Number.isFinite(num) ? num : null;
      };

      const payload = {
        N: toNumber(form.N),
        P: toNumber(form.P),
        K: toNumber(form.K),
        ph: toNumber(form.ph),
        temperature: toNumber(form.temperature),
        humidity: toNumber(form.humidity),
        rainfall: toNumber(form.rainfall),
        location: form.location || undefined,
      };

      const data = await predictCrop(payload);
      setTopCrops(data.top_crops || []);
      const chartData = Object.entries(data.feature_importance || {}).map(([name, value]) => ({
        name,
        value: Number(value),
      }));
      setFeatureImportance(chartData);
      setConfidence(data.confidence_score ?? null);
      setPage("results");
    } catch (err) {
      const status = err.response?.status;
      if (status === 500) {
        setError("The AI service encountered an issue. Please retry in a moment.");
      } else if (status === 404) {
        setError("Service unavailable. Check API base URL and network.");
      } else {
        setError(err.response?.data?.error || "Unable to process prediction. Check your inputs and try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const resetResults = () => {
    setTopCrops([]);
    setFeatureImportance([]);
    setConfidence(null);
    setPage("dashboard");
  };

  return (
    <div className={layoutClass}>
      <Navbar current={page} onNavigate={setPage} dark={dark} onToggleDark={() => setDark((d) => !d)} onStart={() => setPage("dashboard")} />

      <PageContainer>
        {page === "home" && <Home onPrimary={() => setPage("dashboard")} onSecondary={() => setPage("dashboard")} />}

        {page === "dashboard" && (
          <Dashboard
            form={form}
            onChange={handleChange}
            onPredict={handlePredict}
            onFetchWeather={handleWeather}
            weatherStatus={weatherStatus}
            loading={loading}
            error={error}
          />
        )}

        {page === "results" && (
          <>
            {loading && <Loader label="Analyzing fields..." />}
            {!loading && error && <ErrorState message={error} onRetry={resetResults} />}
            {!loading && !error && (
              <Results
                topCrops={topCrops}
                featureImportance={featureImportance}
                confidence={confidence}
                onReset={resetResults}
              />
            )}
          </>
        )}
      </PageContainer>
    </div>
  );
}

export default App;
