"use client";
import { useState } from "react";
import DisclaimerBanner from "@/components/DisclaimerBanner";

export default function CalculatorPage() {
  const [compoundName, setCompoundName] = useState("");
  const [vialMg, setVialMg] = useState("");
  const [waterMl, setWaterMl] = useState("");
  const [customDose, setCustomDose] = useState("");

  const vialNum = parseFloat(vialMg);
  const waterNum = parseFloat(waterMl);
  const valid = !isNaN(vialNum) && !isNaN(waterNum) && vialNum > 0 && waterNum > 0;

  const concPerMl = valid ? (vialNum * 1000) / waterNum : 0;
  const concPer01ml = concPerMl / 10;

  const calcDraw = (doseMcg: number) => {
    if (!valid) return { ml: 0, units: 0 };
    const ml = doseMcg / concPerMl;
    const units = ml * 100;
    return { ml: Math.round(ml * 1000) / 1000, units: Math.round(units * 10) / 10 };
  };

  const dose250 = calcDraw(250);
  const dose500 = calcDraw(500);
  const customNum = parseFloat(customDose);
  const customCalc = !isNaN(customNum) && customNum > 0 ? calcDraw(customNum) : null;

  return (
    <div className="page">
      <h1 className="section-title">Reconstitution Calculator</h1>
      <DisclaimerBanner />

      <div className="card" style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, color: "#14B8A6" }}>🧮 Calculator</div>

        <label className="label">Compound Name</label>
        <input className="input" placeholder="e.g. BPC-157, Ipamorelin" value={compoundName} onChange={(e) => setCompoundName(e.target.value)} style={{ marginBottom: 12 }} />

        <label className="label">Vial Size (mg)</label>
        <input className="input" type="number" placeholder="e.g. 5" value={vialMg} onChange={(e) => setVialMg(e.target.value)} style={{ marginBottom: 12 }} />

        <label className="label">Bacteriostatic Water Added (ml)</label>
        <input className="input" type="number" placeholder="e.g. 2" value={waterMl} onChange={(e) => setWaterMl(e.target.value)} style={{ marginBottom: 20 }} />

        {/* Results */}
        {valid && (
          <div>
            <div style={{ background: "rgba(20,184,166,0.08)", border: "1px solid rgba(20,184,166,0.2)", borderRadius: 10, padding: 16, marginBottom: 16 }}>
              <div style={{ fontSize: 13, color: "#64748B", marginBottom: 6 }}>CONCENTRATION</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: "#14B8A6" }}>{Math.round(concPerMl)} mcg/ml</div>
              <div style={{ fontSize: 14, color: "#94A3B8", marginTop: 4 }}>{Math.round(concPer01ml)} mcg per 0.1ml (1 unit)</div>
            </div>

            <div style={{ fontSize: 13, color: "#64748B", fontWeight: 500, marginBottom: 10 }}>DRAW AMOUNTS</div>

            {[
              { label: "250mcg dose", dose: 250, result: dose250 },
              { label: "500mcg dose", dose: 500, result: dose500 },
            ].map(({ label, result }) => (
              <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 14px", background: "rgba(255,255,255,0.03)", borderRadius: 8, marginBottom: 8 }}>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{label}</div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "#F1F5F9" }}>{result.ml} ml</div>
                  <div style={{ fontSize: 12, color: "#14B8A6" }}>{result.units} units</div>
                </div>
              </div>
            ))}

            <div style={{ marginTop: 16 }}>
              <label className="label">Custom Dose (mcg)</label>
              <input className="input" type="number" placeholder="e.g. 300" value={customDose} onChange={(e) => setCustomDose(e.target.value)} style={{ marginBottom: 10 }} />
              {customCalc && (
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 14px", background: "rgba(20,184,166,0.08)", borderRadius: 8, border: "1px solid rgba(20,184,166,0.2)" }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#14B8A6" }}>{customDose}mcg dose</div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 15, fontWeight: 700 }}>{customCalc.ml} ml</div>
                    <div style={{ fontSize: 12, color: "#14B8A6" }}>{customCalc.units} units</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {!valid && vialMg && waterMl && (
          <div style={{ color: "#EF4444", fontSize: 13, textAlign: "center" }}>Please enter valid numbers for vial size and water volume.</div>
        )}
      </div>

      {/* Formula explanation */}
      <div className="card" style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 10, color: "#94A3B8" }}>How it works</div>
        <div style={{ fontSize: 13, color: "#64748B", lineHeight: 1.6 }}>
          <div>Concentration = (Vial mg &times; 1000) &divide; Water ml</div>
          <div style={{ marginTop: 4 }}>Draw volume = Dose mcg &divide; Concentration per ml</div>
          <div style={{ marginTop: 4 }}>Insulin syringe units = Draw ml &times; 100</div>
        </div>
      </div>
    </div>
  );
}
