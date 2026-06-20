"use client";
import { useState, useEffect } from "react";
import { compounds } from "@/lib/compounds";

interface Cycle {
  id: string;
  name: string;
  compounds: string[];
  startDate: string;
  endDate: string;
  active: boolean;
}

export default function TrackerPage() {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [cycleName, setCycleName] = useState("");
  const [selectedCompounds, setSelectedCompounds] = useState<string[]>([]);
  const [startDate, setStartDate] = useState(new Date().toISOString().split("T")[0]);
  const [endDate, setEndDate] = useState("");
  const [compSearch, setCompSearch] = useState("");

  useEffect(() => {
    const raw = localStorage.getItem("pt_cycles");
    if (raw) setCycles(JSON.parse(raw));
  }, []);

  const saveCycles = (updated: Cycle[]) => {
    setCycles(updated);
    localStorage.setItem("pt_cycles", JSON.stringify(updated));
  };

  const createCycle = () => {
    if (!cycleName || selectedCompounds.length === 0 || !startDate || !endDate) return;
    const newCycles = cycles.map((c) => ({ ...c, active: false }));
    newCycles.push({
      id: Date.now().toString(),
      name: cycleName,
      compounds: selectedCompounds,
      startDate,
      endDate,
      active: true,
    });
    saveCycles(newCycles);
    setShowForm(false);
    setCycleName("");
    setSelectedCompounds([]);
    setStartDate(new Date().toISOString().split("T")[0]);
    setEndDate("");
  };

  const endCycle = (id: string) => {
    saveCycles(cycles.map((c) => c.id === id ? { ...c, active: false } : c));
  };

  const deleteCycle = (id: string) => {
    saveCycles(cycles.filter((c) => c.id !== id));
  };

  const toggleCompound = (name: string) => {
    setSelectedCompounds((prev) =>
      prev.includes(name) ? prev.filter((c) => c !== name) : [...prev, name]
    );
  };

  const getDayInfo = (cycle: Cycle) => {
    const start = new Date(cycle.startDate);
    const end = new Date(cycle.endDate);
    const now = new Date();
    const day = Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    const total = Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    const progress = Math.min(100, Math.max(0, (day / total) * 100));
    return { day: Math.max(1, day), total: Math.max(1, total), progress };
  };

  const activeCycles = cycles.filter((c) => c.active);
  const pastCycles = cycles.filter((c) => !c.active).slice(-5).reverse();

  const filteredCompounds = compounds.filter((c) =>
    c.name.toLowerCase().includes(compSearch.toLowerCase())
  );

  return (
    <div className="page">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <h1 className="section-title" style={{ margin: 0 }}>Cycle Tracker</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          style={{
            background: "rgba(20,184,166,0.15)",
            border: "1px solid rgba(20,184,166,0.3)",
            color: "#14B8A6",
            padding: "8px 16px",
            borderRadius: 8,
            fontSize: 14,
            fontWeight: 600,
            cursor: "pointer",
            minHeight: 44,
          }}
        >
          {showForm ? "Cancel" : "+ New Cycle"}
        </button>
      </div>

      {/* Create Cycle Form */}
      {showForm && (
        <div className="card" style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, color: "#14B8A6" }}>Create New Cycle</div>

          <label className="label">Cycle Name</label>
          <input className="input" placeholder="e.g. BPC-157 Recovery Cycle" value={cycleName} onChange={(e) => setCycleName(e.target.value)} style={{ marginBottom: 12 }} />

          <label className="label">Start Date</label>
          <input className="input" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} style={{ marginBottom: 12 }} />

          <label className="label">End Date</label>
          <input className="input" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} style={{ marginBottom: 16 }} />

          <label className="label">Select Compounds</label>
          <input className="input" placeholder="Search compounds..." value={compSearch} onChange={(e) => setCompSearch(e.target.value)} style={{ marginBottom: 10 }} />

          <div style={{ maxHeight: 200, overflowY: "auto", marginBottom: 16 }}>
            {filteredCompounds.map((c) => (
              <div
                key={c.name}
                onClick={() => toggleCompound(c.name)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "10px 12px",
                  borderRadius: 8,
                  cursor: "pointer",
                  marginBottom: 4,
                  background: selectedCompounds.includes(c.name) ? "rgba(20,184,166,0.15)" : "rgba(255,255,255,0.03)",
                  border: `1px solid ${selectedCompounds.includes(c.name) ? "rgba(20,184,166,0.4)" : "transparent"}`,
                }}
              >
                <div style={{ width: 20, height: 20, borderRadius: 4, border: `2px solid ${selectedCompounds.includes(c.name) ? "#14B8A6" : "#374151"}`, background: selectedCompounds.includes(c.name) ? "#14B8A6" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {selectedCompounds.includes(c.name) && <span style={{ color: "#0F172A", fontSize: 12, fontWeight: 900 }}>✓</span>}
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 500 }}>{c.name}</div>
                  <div style={{ fontSize: 11, color: "#64748B" }}>{c.typicalCycleDays}d typical cycle</div>
                </div>
              </div>
            ))}
          </div>

          {selectedCompounds.length > 0 && (
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 12, color: "#64748B", marginBottom: 6 }}>Selected:</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                {selectedCompounds.map((c) => (
                  <span key={c} style={{ background: "rgba(20,184,166,0.15)", color: "#14B8A6", padding: "3px 10px", borderRadius: 20, fontSize: 12, fontWeight: 500 }}>{c}</span>
                ))}
              </div>
            </div>
          )}

          <button className="btn-primary" onClick={createCycle} disabled={!cycleName || selectedCompounds.length === 0 || !startDate || !endDate}>
            Start Cycle
          </button>
        </div>
      )}

      {/* Active Cycles */}
      {activeCycles.length > 0 && (
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 13, color: "#64748B", fontWeight: 500, marginBottom: 12 }}>ACTIVE CYCLES</div>
          {activeCycles.map((cycle) => {
            const { day, total, progress } = getDayInfo(cycle);
            return (
              <div key={cycle.id} className="card" style={{ marginBottom: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                  <div>
                    <div style={{ fontSize: 17, fontWeight: 700 }}>{cycle.name}</div>
                    <div style={{ fontSize: 13, color: "#94A3B8", marginTop: 2 }}>
                      Day {day} of {total} &bull; Started {new Date(cycle.startDate).toLocaleDateString("en-IE")}
                    </div>
                  </div>
                  <span className="badge badge-teal">Active</span>
                </div>
                <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 4, height: 8, marginBottom: 12 }}>
                  <div style={{ width: `${progress}%`, height: "100%", background: "#14B8A6", borderRadius: 4 }} />
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
                  {cycle.compounds.map((c) => (
                    <span key={c} style={{ fontSize: 12, background: "rgba(20,184,166,0.1)", color: "#14B8A6", padding: "3px 10px", borderRadius: 20, fontWeight: 500 }}>{c}</span>
                  ))}
                </div>
                <button
                  onClick={() => endCycle(cycle.id)}
                  style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", color: "#EF4444", padding: "10px 16px", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer", minHeight: 44, width: "100%" }}
                >
                  End Cycle
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Past Cycles */}
      {pastCycles.length > 0 && (
        <div>
          <div style={{ fontSize: 13, color: "#64748B", fontWeight: 500, marginBottom: 12 }}>CYCLE HISTORY</div>
          {pastCycles.map((cycle) => (
            <div key={cycle.id} className="card" style={{ marginBottom: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 2 }}>{cycle.name}</div>
                  <div style={{ fontSize: 12, color: "#64748B" }}>
                    {new Date(cycle.startDate).toLocaleDateString("en-IE")} &rarr; {new Date(cycle.endDate).toLocaleDateString("en-IE")}
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 8 }}>
                    {cycle.compounds.map((c) => (
                      <span key={c} style={{ fontSize: 11, background: "rgba(255,255,255,0.05)", color: "#94A3B8", padding: "2px 8px", borderRadius: 20 }}>{c}</span>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => deleteCycle(cycle.id)}
                  style={{ background: "transparent", border: "none", color: "#374151", cursor: "pointer", fontSize: 18, padding: "4px 8px" }}
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeCycles.length === 0 && pastCycles.length === 0 && !showForm && (
        <div style={{ textAlign: "center", padding: "40px 20px", color: "#64748B" }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>📊</div>
          <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8, color: "#94A3B8" }}>No cycles yet</div>
          <div style={{ fontSize: 14 }}>Create your first cycle to start tracking your progress.</div>
        </div>
      )}
    </div>
  );
}
