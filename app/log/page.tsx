"use client";
import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { compounds, getCategoryLabel } from "@/lib/compounds";
import DisclaimerBanner from "@/components/DisclaimerBanner";

interface WeightEntry {
  date: string;
  weight: number;
  unit: string;
}

type Category = "all" | "peptide" | "mens_hrt" | "womens_hrt" | "sarm" | "stack";

interface LogEntry {
  id: string;
  compound: string;
  dose: string;
  frequency: string;
  site: string;
  date: string;
  time: string;
}

interface FeelScore {
  energy: number;
  sleep: number;
  mood: number;
  recovery: number;
  date: string;
}

function WeightChart({ entries }: { entries: WeightEntry[] }) {
  if (entries.length < 2) return null;
  const sorted = [...entries].reverse(); // oldest first
  const vals = sorted.map(e => e.weight);
  const min = Math.min(...vals) - 1;
  const max = Math.max(...vals) + 1;
  const W = 300, H = 70;
  const pts = sorted.map((e, i) => {
    const x = (i / (sorted.length - 1)) * W;
    const y = H - ((e.weight - min) / (max - min)) * H;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");
  const latest = sorted[sorted.length - 1];
  const prev = sorted[sorted.length - 2];
  const diff = latest && prev ? (latest.weight - prev.weight) : 0;
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <span style={{ fontSize: 12, color: "#64748B" }}>Last {sorted.length} entries</span>
        <span style={{ fontSize: 13, fontWeight: 700, color: diff < 0 ? "#14B8A6" : diff > 0 ? "#EF4444" : "#64748B" }}>
          {diff !== 0 ? (diff > 0 ? "+" : "") + diff.toFixed(1) + " " + latest.unit : "—"}
        </span>
      </div>
      <svg width="100%" height={H} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" style={{ overflow: "visible" }}>
        <polyline points={pts} fill="none" stroke="#14B8A6" strokeWidth="2.5" strokeLinejoin="round" />
        {sorted.map((e, i) => {
          const x = (i / (sorted.length - 1)) * W;
          const y = H - ((e.weight - min) / (max - min)) * H;
          return <circle key={e.date} cx={x.toFixed(1)} cy={y.toFixed(1)} r="4" fill="#14B8A6" stroke="#1C1C1C" strokeWidth="2" />;
        })}
      </svg>
    </div>
  );
}

function LogPageInner() {
  const searchParams = useSearchParams();
  const [tab, setTab] = useState<"dose" | "feel" | "weight">("dose");
  const [category, setCategory] = useState<Category>("all");
  const [search, setSearch] = useState("");
  const [selectedCompound, setSelectedCompound] = useState("");
  const [dose, setDose] = useState("");
  const [frequency, setFrequency] = useState("Daily");
  const [site, setSite] = useState("");
  const [logSaved, setLogSaved] = useState(false);

  const today = new Date().toISOString().split("T")[0];
  const [scores, setScores] = useState({ energy: 5, sleep: 5, mood: 5, recovery: 5 });
  const [scoresSaved, setScoresSaved] = useState(false);

  const [weightValue, setWeightValue] = useState("");
  const [weightUnit, setWeightUnit] = useState("kg");
  const [weightSaved, setWeightSaved] = useState(false);
  const [recentWeights, setRecentWeights] = useState<WeightEntry[]>([]);

  const loadWeights = useCallback(() => {
    const raw = localStorage.getItem("pt_weights");
    if (raw) setRecentWeights(JSON.parse(raw).slice(-7).reverse());
  }, []);

  useEffect(() => {
    const existing = localStorage.getItem(`pt_scores_${today}`);
    if (existing) {
      const parsed: FeelScore = JSON.parse(existing);
      setScores({ energy: parsed.energy, sleep: parsed.sleep, mood: parsed.mood, recovery: parsed.recovery });
    }
    loadWeights();
    const t = searchParams.get("tab");
    if (t === "weight") setTab("weight");
  }, [today, loadWeights, searchParams]);

  const filteredCompounds = compounds.filter((c) => {
    const matchCat = category === "all" || c.category === category;
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const saveLog = () => {
    if (!selectedCompound || !dose) return;
    const logs: LogEntry[] = JSON.parse(localStorage.getItem("pt_logs") || "[]");
    const entry: LogEntry = {
      id: Date.now().toString(),
      compound: selectedCompound,
      dose,
      frequency,
      site,
      date: today,
      time: new Date().toLocaleTimeString("en-IE", { hour: "2-digit", minute: "2-digit" }),
    };
    logs.push(entry);
    localStorage.setItem("pt_logs", JSON.stringify(logs));
    setLogSaved(true);
    setSelectedCompound("");
    setDose("");
    setSite("");
    setTimeout(() => setLogSaved(false), 2500);
  };

  const saveScores = () => {
    const data: FeelScore = { ...scores, date: today };
    localStorage.setItem(`pt_scores_${today}`, JSON.stringify(data));
    setScoresSaved(true);
    setTimeout(() => setScoresSaved(false), 2500);
  };

  const saveWeight = () => {
    const val = parseFloat(weightValue);
    if (!val || val < 20 || val > 400) return;
    const raw = localStorage.getItem("pt_weights");
    const entries: WeightEntry[] = raw ? JSON.parse(raw) : [];
    entries.push({ date: today, weight: val, unit: weightUnit });
    localStorage.setItem("pt_weights", JSON.stringify(entries));
    setWeightSaved(true);
    setWeightValue("");
    loadWeights();
    setTimeout(() => setWeightSaved(false), 2500);
  };

  const deleteWeight = (date: string) => {
    const raw = localStorage.getItem("pt_weights");
    if (!raw) return;
    const entries: WeightEntry[] = JSON.parse(raw).filter((w: WeightEntry) => w.date !== date);
    localStorage.setItem("pt_weights", JSON.stringify(entries));
    loadWeights();
  };

  const scoreLabels = [
    { key: "energy" as const, label: "Energy", emoji: "⚡" },
    { key: "sleep" as const, label: "Sleep Quality", emoji: "😴" },
    { key: "mood" as const, label: "Mood", emoji: "😊" },
    { key: "recovery" as const, label: "Recovery", emoji: "💪" },
  ];

  return (
    <div className="page">
      <h1 className="section-title">Daily Log</h1>
      <DisclaimerBanner />

      {/* Tab bar */}
      <div style={{ display: "flex", gap: 6, marginBottom: 16, background: "rgba(255,255,255,0.03)", borderRadius: 10, padding: 4 }}>
        {([["dose", "💊 Dose"], ["feel", "📊 Feel"], ["weight", "⚖️ Weight"]] as [typeof tab, string][]).map(([t, label]) => (
          <button key={t} onClick={() => setTab(t)} style={{
            flex: 1, padding: "9px 4px", borderRadius: 8, border: "none",
            background: tab === t ? "rgba(20,184,166,0.2)" : "transparent",
            color: tab === t ? "#14B8A6" : "#64748B",
            fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all 0.15s",
          }}>{label}</button>
        ))}
      </div>

      {/* ── DOSE TAB ── */}
      {tab === "dose" && (
      <div className="card" style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, color: "#14B8A6" }}>💊 Compound Log</div>

        {/* Category Filter */}
        <div style={{ display: "flex", gap: 5, marginBottom: 12, flexWrap: "wrap" }}>
          {(["all", "peptide", "sarm", "stack", "mens_hrt", "womens_hrt"] as Category[]).map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              style={{
                padding: "5px 11px",
                borderRadius: 20,
                border: "1px solid",
                borderColor: category === cat ? "#14B8A6" : "rgba(255,255,255,0.1)",
                background: category === cat ? "rgba(20,184,166,0.15)" : "transparent",
                color: category === cat ? "#14B8A6" : "#94A3B8",
                fontSize: 12,
                fontWeight: 500,
                cursor: "pointer",
                minHeight: 34,
              }}
            >
              {cat === "all" ? "All" : getCategoryLabel(cat)}
            </button>
          ))}
        </div>

        {/* Search */}
        <input
          className="input"
          placeholder="Search compounds..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ marginBottom: 12 }}
        />

        {/* Compound Select */}
        <label className="label">Select Compound</label>
        <select
          className="input"
          value={selectedCompound}
          onChange={(e) => setSelectedCompound(e.target.value)}
          style={{ marginBottom: 12 }}
        >
          <option value="">-- Select compound --</option>
          {filteredCompounds.map((c) => (
            <option key={c.name} value={c.name}>{c.name} ({getCategoryLabel(c.category)})</option>
          ))}
        </select>

        {/* Selected compound info */}
        {selectedCompound && (() => {
          const comp = compounds.find((c) => c.name === selectedCompound);
          return comp ? (
            <div style={{ background: "rgba(20,184,166,0.05)", border: "1px solid rgba(20,184,166,0.15)", borderRadius: 8, padding: 12, marginBottom: 12, fontSize: 13, color: "#94A3B8" }}>
              <span style={{ color: "#14B8A6", fontWeight: 600 }}>Research context: </span>{comp.researchContext}
              <div style={{ marginTop: 8 }}>Common doses: {comp.commonDoses.join(", ")}</div>
            </div>
          ) : null;
        })()}

        {/* Dose */}
        <label className="label">Dose</label>
        <input
          className="input"
          placeholder="e.g. 250mcg, 100mg"
          value={dose}
          onChange={(e) => setDose(e.target.value)}
          style={{ marginBottom: 12 }}
        />

        {/* Frequency */}
        <label className="label">Frequency</label>
        <select className="input" value={frequency} onChange={(e) => setFrequency(e.target.value)} style={{ marginBottom: 12 }}>
          {["Daily", "EOD (Every Other Day)", "E3D (Every 3 Days)", "Twice Weekly", "Weekly"].map((f) => (
            <option key={f} value={f}>{f}</option>
          ))}
        </select>

        {/* Injection Site */}
        <label className="label">Injection Site (optional)</label>
        <input
          className="input"
          placeholder="e.g. Abdomen, Thigh, Deltoid"
          value={site}
          onChange={(e) => setSite(e.target.value)}
          style={{ marginBottom: 16 }}
        />

        <button className="btn-primary" onClick={saveLog} disabled={!selectedCompound || !dose}>
          {logSaved ? "✓ Saved!" : "Save Log Entry"}
        </button>
      </div>
      )}

      {/* ── FEEL TAB ── */}
      {tab === "feel" && (
      <div className="card" style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, color: "#14B8A6" }}>📊 Feel Scores — Today</div>

        {scoreLabels.map(({ key, label, emoji }) => (
          <div key={key} style={{ marginBottom: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <div style={{ fontSize: 15, fontWeight: 600 }}>{emoji} {label}</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: scores[key] >= 7 ? "#14B8A6" : scores[key] >= 4 ? "#FBBF24" : "#EF4444" }}>
                {scores[key]}
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 11, color: "#64748B", minWidth: 30 }}>Poor</span>
              <input
                type="range" min={1} max={10} value={scores[key]}
                onChange={(e) => setScores((prev) => ({ ...prev, [key]: Number(e.target.value) }))}
                style={{ flex: 1, accentColor: "#14B8A6" }}
              />
              <span style={{ fontSize: 11, color: "#64748B", minWidth: 44, textAlign: "right" }}>Excellent</span>
            </div>
          </div>
        ))}

        <button className="btn-primary" onClick={saveScores}>
          {scoresSaved ? "✓ Scores Saved!" : "Save Feel Scores"}
        </button>
      </div>
      )}

      {/* ── WEIGHT TAB ── */}
      {tab === "weight" && (
      <div>
        <div className="card" style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, color: "#14B8A6" }}>⚖️ Weight Check-in</div>

          <label className="label">Today&apos;s Weight</label>
          <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
            <input
              className="input"
              type="number"
              step="0.1"
              placeholder="e.g. 82.5"
              value={weightValue}
              onChange={(e) => setWeightValue(e.target.value)}
              style={{ flex: 1 }}
            />
            <select
              className="input"
              value={weightUnit}
              onChange={(e) => setWeightUnit(e.target.value)}
              style={{ width: 80 }}
            >
              <option value="kg">kg</option>
              <option value="lbs">lbs</option>
            </select>
          </div>

          <button className="btn-primary" onClick={saveWeight} disabled={!weightValue}>
            {weightSaved ? "✓ Weight Saved!" : "Save Weight"}
          </button>
        </div>

        {recentWeights.length > 0 && (
          <div className="card" style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 13, color: "#64748B", fontWeight: 600, letterSpacing: "0.06em", marginBottom: 12 }}>RECENT HISTORY</div>
            <WeightChart entries={recentWeights} />
            {recentWeights.map((w, i) => {
              const prev = recentWeights[i + 1];
              const diff = prev ? (w.weight - prev.weight) : null;
              return (
                <div key={w.date} style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "10px 0",
                  borderBottom: i < recentWeights.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none"
                }}>
                  <div style={{ fontSize: 14, color: "#94A3B8" }}>
                    {new Date(w.date).toLocaleDateString("en-IE", { weekday: "short", day: "numeric", month: "short" })}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    {diff !== null && (
                      <span style={{ fontSize: 12, color: diff < 0 ? "#14B8A6" : diff > 0 ? "#EF4444" : "#64748B", fontWeight: 600 }}>
                        {diff > 0 ? "+" : ""}{diff.toFixed(1)}
                      </span>
                    )}
                    <span style={{ fontSize: 16, fontWeight: 700, color: i === 0 ? "#F1F5F9" : "#94A3B8" }}>
                      {w.weight} {w.unit}
                    </span>
                    <button
                      onClick={() => deleteWeight(w.date)}
                      style={{ background: "transparent", border: "none", color: "#EF4444", cursor: "pointer", fontSize: 16, padding: "4px 8px", flexShrink: 0 }}
                    >✕</button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      )}
    </div>
  );
}

export default function LogPage() {
  return (
    <Suspense fallback={<div className="page" />}>
      <LogPageInner />
    </Suspense>
  );
}
