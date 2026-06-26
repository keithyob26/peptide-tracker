"use client";

export default function ShopPage() {
  return (
    <div className="page">
      <h1 className="section-title">Shop</h1>

      {/* Featured partner */}
      <div className="card" style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 13, color: "#64748B", fontWeight: 500, marginBottom: 14 }}>RESEARCH SUPPLIER</div>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
          <div style={{
            width: 52, height: 52, borderRadius: 12,
            background: "rgba(20,184,166,0.1)", border: "1px solid rgba(20,184,166,0.25)",
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, flexShrink: 0
          }}>💧</div>
          <div>
            <div style={{ fontSize: 17, fontWeight: 700, color: "#F1F5F9" }}>Hydro Health</div>
            <div style={{ fontSize: 13, color: "#14B8A6", marginTop: 2 }}>Dublin, Ireland — Ships Nationwide</div>
          </div>
        </div>
        <p style={{ fontSize: 14, color: "#94A3B8", lineHeight: 1.65, marginBottom: 14 }}>
          Lab-tested research peptides with full Certificate of Analysis on every compound.
          BPC-157, TB-500, Retatrutide, Ipamorelin, Semax, MOTS-C, NAD+, and more.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
          {["COA Verified", "Dublin Based", "Research Only"].map(tag => (
            <span key={tag} style={{
              fontSize: 11, fontWeight: 600,
              background: "rgba(20,184,166,0.08)", border: "1px solid rgba(20,184,166,0.2)",
              color: "#14B8A6", padding: "3px 10px", borderRadius: 20
            }}>{tag}</span>
          ))}
        </div>
        <a href="https://hydrohealth.store/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", display: "block" }}>
          <button className="btn-primary" style={{ width: "100%" }}>Visit Hydro Health &rarr;</button>
        </a>
        <p style={{ fontSize: 11, color: "#475569", textAlign: "center", marginTop: 10 }}>
          Affiliate link — research use only, not for human consumption
        </p>
      </div>

      {/* Story link */}
      <div className="card" style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 13, color: "#64748B", fontWeight: 500, marginBottom: 10 }}>THE STORY</div>
        <p style={{ fontSize: 14, color: "#94A3B8", lineHeight: 1.65, marginBottom: 14 }}>
          How I reconnected with an old colleague after 10 years and ended up building
          Ireland&apos;s most trusted research peptide partnership.
        </p>
        <a href="https://irishpeptides.ie/blog/hydro-health-partnership-ireland.html" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", display: "block" }}>
          <button className="btn-secondary" style={{ width: "100%" }}>Read the full story &rarr;</button>
        </a>
      </div>

      {/* Disclaimer */}
      <div style={{ padding: "14px 16px", background: "rgba(245,158,11,0.05)", border: "1px solid rgba(245,158,11,0.15)", borderRadius: 10, marginBottom: 16 }}>
        <p style={{ fontSize: 12, color: "#78716C", lineHeight: 1.6, margin: 0 }}>
          All products are for laboratory research use only. Not for human consumption.
          Not medical advice. Always consult a qualified healthcare professional.
        </p>
      </div>
    </div>
  );
}
