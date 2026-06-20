"use client";
import { useState, useEffect } from "react";
import { compounds, getCategoryLabel } from "@/lib/compounds";
import DisclaimerBanner from "@/components/DisclaimerBanner";

type Category = "all" | "peptide" | "mens_hrt" | "womens_hrt";

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

export default function LogPage() {
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

  useEffect(() => {
    const existing = localStorage.getItem(`pt_scores_${today}`);
    if (existing) {
      const parsed: FeelScore = JSON.parse(existing);
      setScores({ energy: parsed.energy, sleep: parsed.sleep, mood: parsed.mood, recovery: parsed.recovery });
    }
  }, [today]);

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

      {/* Compound Log Section */}
      <div className="card" style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, color: "#14B8A6" }}>💊 Compound Log</div>

        {/* Category Filter */}
        <div style={{ display: "flex", gap: 6, marginBottom: 12, flexWrap: "wrap" }}>
          {(["all", "peptide", "mens_hrt", "womens_hrt"] as Category[]).map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              style={{
                padding: "6px 12px",
                borderRadius: 20,
                border: "1px solid",
                borderColor: category === cat ? "#14B8A6" : "rgba(255,255,255,0.1)",
                background: category === cat ? "rgba(20,184,166,0.15)" : "transparent",
                color: category === cat ? "#14B8A6" : "#94A3B8",
                fontSize: 13,
                fontWeight: 500,
                cursor: "pointer",
                minHeight: 36,
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

      {/* Feel Scores Section */}
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
                type="range"
                min={1}
                max={10}
                value={scores[key]}
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
    </div>
  );
}
