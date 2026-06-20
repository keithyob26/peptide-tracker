"use client";
import { useState } from "react";

const items = [
  { emoji: "📋", title: "Research Protocol Guides", desc: "Evidence-based cycling protocols for popular peptides" },
  { emoji: "📓", title: "Peptide Tracker Notion Template", desc: "Full tracking system in Notion with dashboards" },
  { emoji: "🎯", title: "Coaching Protocols", desc: "Personalised cycle design and monitoring" },
  { emoji: "🏋️", title: "Gym Split PDFs", desc: "Training programs optimised for peptide cycles" },
];

export default function ShopPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [saved, setSaved] = useState(false);

  const handleNotify = () => {
    if (!email) return;
    const list = JSON.parse(localStorage.getItem("pt_shop_interest") || "[]");
    list.push({ name, email, date: new Date().toISOString() });
    localStorage.setItem("pt_shop_interest", JSON.stringify(list));
    setSaved(true);
    setName("");
    setEmail("");
  };

  return (
    <div className="page">
      {/* Hero */}
      <div style={{ textAlign: "center", padding: "32px 20px", marginBottom: 24 }}>
        <span className="badge badge-teal" style={{ fontSize: 13, marginBottom: 16, display: "inline-block" }}>Coming Soon</span>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>The Shop</h1>
        <p style={{ fontSize: 15, color: "#64748B", lineHeight: 1.6 }}>
          Premium resources to supercharge your research and optimise your protocols.
        </p>
      </div>

      {/* Coming Items */}
      <div style={{ marginBottom: 24 }}>
        {items.map((item) => (
          <div key={item.title} className="card" style={{ marginBottom: 10, display: "flex", gap: 14, alignItems: "flex-start" }}>
            <div style={{ fontSize: 28, flexShrink: 0 }}>{item.emoji}</div>
            <div>
              <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>{item.title}</div>
              <div style={{ fontSize: 13, color: "#64748B" }}>{item.desc}</div>
              <div style={{ marginTop: 6 }}>
                <span className="badge badge-teal" style={{ fontSize: 11 }}>Coming Soon</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Email Interest Capture */}
      <div className="card" style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>Get Early Access</div>
        <div style={{ fontSize: 13, color: "#64748B", marginBottom: 16 }}>Be first to know when new resources drop.</div>

        {saved ? (
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>✓</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#14B8A6" }}>You&apos;re on the list!</div>
            <div style={{ fontSize: 13, color: "#64748B", marginTop: 4 }}>We&apos;ll notify you when the shop opens.</div>
          </div>
        ) : (
          <>
            <label className="label">Name (optional)</label>
            <input className="input" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} style={{ marginBottom: 10 }} />
            <label className="label">Email</label>
            <input className="input" type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} style={{ marginBottom: 12 }} />
            <button className="btn-primary" onClick={handleNotify} disabled={!email}>Notify Me</button>
          </>
        )}
      </div>

      {/* Visit site CTA */}
      <div className="card" style={{ textAlign: "center" }}>
        <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>Current Free Tools</div>
        <div style={{ fontSize: 13, color: "#64748B", marginBottom: 16 }}>11 free research tools available now on irishpeptides.ie</div>
        <a href="https://irishpeptides.ie" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
          <button className="btn-primary">Visit irishpeptides.ie &rarr;</button>
        </a>
      </div>
    </div>
  );
}
