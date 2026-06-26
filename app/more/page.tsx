"use client";
import { useState } from "react";
import Link from "next/link";

const AI_APPS = [
  { name: "ChatGPT", emoji: "🤖", color: "#10A37F", url: "https://chat.openai.com" },
  { name: "Claude", emoji: "🟠", color: "#D97706", url: "https://claude.ai" },
  { name: "Gemini", emoji: "✨", color: "#4285F4", url: "https://gemini.google.com" },
  { name: "Perplexity", emoji: "🔍", color: "#8B5CF6", url: "https://www.perplexity.ai" },
  { name: "Copilot", emoji: "💙", color: "#0078D4", url: "https://copilot.microsoft.com" },
  { name: "Meta AI", emoji: "🌐", color: "#1877F2", url: "https://www.meta.ai" },
];

export default function MorePage() {
  const [exported, setExported] = useState(false);
  const [clipboardMsg, setClipboardMsg] = useState("");
  const [deleted, setDeleted] = useState(false);
  const [showAIPicker, setShowAIPicker] = useState(false);
  const [showFallbackText, setShowFallbackText] = useState<string | null>(null);

  const exportPDF = async () => {
    const { default: jsPDF } = await import("jspdf");
    const doc = new jsPDF();
    const today = new Date().toLocaleDateString("en-IE");

    doc.setFontSize(20);
    doc.setTextColor(20, 184, 166);
    doc.text("Peptide Tracker — Cycle Report", 20, 20);

    doc.setFontSize(10);
    doc.setTextColor(100, 116, 139);
    doc.text(`Generated: ${today}`, 20, 30);

    // Active cycle
    const cyclesRaw = localStorage.getItem("pt_cycles");
    if (cyclesRaw) {
      const cycles = JSON.parse(cyclesRaw);
      const active = cycles.find((c: { active: boolean }) => c.active);
      if (active) {
        doc.setFontSize(14);
        doc.setTextColor(241, 245, 249);
        doc.text("Active Cycle:", 20, 45);
        doc.setFontSize(12);
        doc.text(`Name: ${active.name}`, 20, 55);
        doc.text(`Compounds: ${active.compounds.join(", ")}`, 20, 63);
        doc.text(`Start: ${active.startDate}   End: ${active.endDate}`, 20, 71);
      }
    }

    // Last 7 days scores
    doc.setFontSize(14);
    doc.setTextColor(241, 245, 249);
    doc.text("Feel Scores — Last 7 Days:", 20, 90);
    doc.setFontSize(10);
    let y = 100;
    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = `pt_scores_${d.toISOString().split("T")[0]}`;
      const raw = localStorage.getItem(key);
      if (raw) {
        const s = JSON.parse(raw);
        doc.setTextColor(100, 116, 139);
        doc.text(`${s.date}: Energy ${s.energy}/10  Sleep ${s.sleep}/10  Mood ${s.mood}/10  Recovery ${s.recovery}/10`, 20, y);
        y += 8;
      }
    }

    doc.setFontSize(9);
    doc.setTextColor(100, 116, 139);
    doc.text("For research and tracking purposes only. Not medical advice.", 20, 280);

    doc.save(`peptide-tracker-report-${today.replace(/\//g, "-")}.pdf`);
    setExported(true);
    setTimeout(() => setExported(false), 2500);
  };

  const buildCycleText = () => {
    try {
      const lines: string[] = ["My current peptide/HRT cycle data:"];
      const cyclesRaw = localStorage.getItem("pt_cycles");
      if (cyclesRaw) {
        const cycles = JSON.parse(cyclesRaw);
        const active = cycles.find((c: { active: boolean }) => c.active);
        if (active) {
          lines.push(`\nActive Cycle: ${active.name}`);
          lines.push(`Compounds: ${active.compounds.join(", ")}`);
          const start = new Date(active.startDate);
          const now = new Date();
          const day = Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
          lines.push(`Cycle Day: ${day}`);
        }
      }
      lines.push("\nFeel scores last 7 days:");
      for (let i = 0; i < 7; i++) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const key = `pt_scores_${d.toISOString().split("T")[0]}`;
        const raw = localStorage.getItem(key);
        if (raw) {
          const s = JSON.parse(raw);
          lines.push(`${s.date}: Energy ${s.energy}/10, Sleep ${s.sleep}/10, Mood ${s.mood}/10, Recovery ${s.recovery}/10`);
        }
      }
      const weightsRaw = localStorage.getItem("pt_weights");
      if (weightsRaw) {
        const ws = JSON.parse(weightsRaw).slice(-7);
        if (ws.length) {
          lines.push("\nWeight log (last 7 entries):");
          ws.reverse().forEach((w: {date: string; weight: number; unit: string}) => {
            lines.push(`${w.date}: ${w.weight}${w.unit}`);
          });
        }
      }
      lines.push("\nPlease analyse this data and share research insights. Frame everything as research context only.");
      if (lines.length <= 1) {
        return "No cycle data found. Start a cycle in the Tracker tab first.";
      }
      return lines.join("\n");
    } catch {
      return "No cycle data found. Start a cycle in the Tracker tab first.";
    }
  };

  const openWithAI = (app: typeof AI_APPS[0]) => {
    try {
      const text = buildCycleText();
      navigator.clipboard.writeText(text).then(() => {
        setShowAIPicker(false);
        setClipboardMsg(`Data copied! ${app.name} opening — paste your data into the chat.`);
        setTimeout(() => setClipboardMsg(""), 4000);
        window.open(app.url, "_blank");
      }).catch(() => {
        setShowFallbackText(text);
      });
    } catch {
      setShowFallbackText(buildCycleText());
    }
  };

  const shareNative = () => {
    const text = buildCycleText();
    if (navigator.share) {
      navigator.share({ title: "My Cycle Data", text }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text).then(() => {
        setClipboardMsg("Copied! Paste into any AI app.");
        setTimeout(() => setClipboardMsg(""), 3500);
      });
    }
    setShowAIPicker(false);
  };

  const deleteAllData = () => {
    if (!confirm("Delete ALL your Peptide Tracker data? This cannot be undone.")) return;
    const keys = Object.keys(localStorage).filter((k) => k.startsWith("pt_"));
    keys.forEach((k) => localStorage.removeItem(k));
    setDeleted(true);
    setTimeout(() => setDeleted(false), 2500);
  };

  const menuItems = [
    { emoji: "🧮", label: "Reconstitution Calculator", href: "/calculator" },
    { emoji: "🛒", label: "Shop", href: "/shop" },
  ];

  return (
    <div className="page">
      <h1 className="section-title">More</h1>

      {/* Navigation */}
      <div className="card" style={{ marginBottom: 16 }}>
        {menuItems.map((item, i) => (
          <Link key={item.href} href={item.href} style={{ textDecoration: "none" }}>
            <div style={{
              display: "flex", alignItems: "center", gap: 14, padding: "14px 0",
              borderBottom: i < menuItems.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
              cursor: "pointer"
            }}>
              <span style={{ fontSize: 22 }}>{item.emoji}</span>
              <span style={{ fontSize: 16, fontWeight: 600, color: "#F1F5F9" }}>{item.label}</span>
              <span style={{ marginLeft: "auto", color: "#374151" }}>›</span>
            </div>
          </Link>
        ))}
      </div>

      {/* Brand */}
      <div className="card" style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 13, color: "#64748B", fontWeight: 500, marginBottom: 12 }}>BRAND</div>
        <a href="https://irishpeptides.ie" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", display: "block", marginBottom: 10 }}>
          <button className="btn-secondary">🌿 irishpeptides.ie</button>
        </a>
        <a href="https://instagram.com/irishpeptides.ie" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", display: "block" }}>
          <button className="btn-secondary">📱 @irishpeptides.ie on Instagram</button>
        </a>
      </div>

      {/* Export */}
      <div className="card" style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 13, color: "#64748B", fontWeight: 500, marginBottom: 12 }}>EXPORT</div>
        <button className="btn-secondary" onClick={exportPDF} style={{ marginBottom: 10 }}>
          {exported ? "✓ PDF Downloaded!" : "📄 Export Cycle Data (PDF)"}
        </button>
        <button className="btn-secondary" onClick={() => setShowAIPicker(true)}>
          🤖 Send to AI App
        </button>
        {clipboardMsg && (
          <div style={{ marginTop: 10, fontSize: 13, color: "#14B8A6", background: "rgba(20,184,166,0.08)", padding: "10px 12px", borderRadius: 8, lineHeight: 1.5 }}>
            {clipboardMsg}
          </div>
        )}
      </div>

      {/* Privacy */}
      <div className="card" style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 13, color: "#64748B", fontWeight: 500, marginBottom: 12 }}>PRIVACY</div>
        <div style={{ fontSize: 14, color: "#94A3B8", lineHeight: 1.6, marginBottom: 12 }}>
          🔒 All data stored on your device only. We never see your data.
        </div>
        <a href="https://irishpeptides.ie/privacy-policy.html" target="_blank" rel="noopener noreferrer" style={{ display: "block", marginBottom: 16, fontSize: 14, color: "#14B8A6", fontWeight: 600, textDecoration: "none" }}>
          Privacy Policy →
        </a>
        <button className="btn-danger" onClick={deleteAllData}>
          {deleted ? "✓ All Data Deleted" : "🗑️ Delete All Data"}
        </button>
      </div>

      {/* App Info */}
      <div style={{ textAlign: "center", padding: "16px 0", color: "#374151" }}>
        <div style={{ fontSize: 13 }}>PepTracker v1.0.0</div>
        <div style={{ fontSize: 12, marginTop: 4 }}>For research and tracking purposes only. Not medical advice.</div>
        <div style={{ fontSize: 12, marginTop: 2 }}>Powered by irishpeptides.ie</div>
      </div>

      {/* Clipboard Fallback Modal */}
      {showFallbackText && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", zIndex: 200,
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          padding: 20
        }}>
          <div style={{
            background: "#1C1C1C", borderRadius: 16, padding: 24, width: "100%", maxWidth: 480,
            border: "1px solid rgba(255,255,255,0.07)", display: "flex", flexDirection: "column", gap: 16
          }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: "#F1F5F9" }}>Copy your data manually</div>
            <div style={{ fontSize: 13, color: "#64748B" }}>Tap to select all, then copy and paste into your AI app.</div>
            <label style={{ fontSize: 12, color: "#14B8A6" }}>Tap to select all</label>
            <textarea
              readOnly
              value={showFallbackText}
              onClick={e => (e.target as HTMLTextAreaElement).select()}
              style={{
                width: "100%", minHeight: 160, background: "#161616", color: "#F1F5F9",
                border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, padding: 12,
                fontSize: 12, lineHeight: 1.6, resize: "none", fontFamily: "monospace"
              }}
            />
            <button onClick={() => setShowFallbackText(null)} style={{
              background: "rgba(20,184,166,0.1)", border: "1px solid rgba(20,184,166,0.3)",
              borderRadius: 12, padding: "14px", cursor: "pointer", color: "#14B8A6",
              fontSize: 14, fontWeight: 600, width: "100%"
            }}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* AI Picker Modal */}
      {showAIPicker && (
        <div onClick={() => setShowAIPicker(false)} style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", zIndex: 100,
          display: "flex", alignItems: "flex-end", justifyContent: "center"
        }}>
          <div onClick={e => e.stopPropagation()} style={{
            background: "#1C1C1C", borderRadius: "20px 20px 0 0", padding: "24px 20px 40px",
            width: "100%", maxWidth: 480, border: "1px solid rgba(255,255,255,0.07)"
          }}>
            <div style={{ textAlign: "center", marginBottom: 6 }}>
              <div style={{ width: 40, height: 4, background: "#334155", borderRadius: 2, margin: "0 auto 20px" }} />
            </div>
            <div style={{ fontSize: 15, fontWeight: 700, color: "#F1F5F9", marginBottom: 4 }}>Send to AI App</div>
            <div style={{ fontSize: 13, color: "#64748B", marginBottom: 20 }}>
              Your cycle data copies to clipboard — paste it into the chat to get research insights.
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 }}>
              {AI_APPS.map(app => (
                <button key={app.name} onClick={() => openWithAI(app)} style={{
                  background: "#161616", border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: 12, padding: "14px 12px", cursor: "pointer",
                  display: "flex", alignItems: "center", gap: 10, textAlign: "left"
                }}>
                  <span style={{ fontSize: 24 }}>{app.emoji}</span>
                  <span style={{ fontSize: 14, fontWeight: 600, color: "#F1F5F9" }}>{app.name}</span>
                </button>
              ))}
            </div>
            <button onClick={shareNative} style={{
              width: "100%", background: "rgba(20,184,166,0.1)", border: "1px solid rgba(20,184,166,0.3)",
              borderRadius: 12, padding: "14px", cursor: "pointer", color: "#14B8A6",
              fontSize: 14, fontWeight: 600
            }}>
              📤 Other App (Share Sheet)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
