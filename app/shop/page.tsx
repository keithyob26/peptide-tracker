"use client";

export default function ShopPage() {
  return (
    <div className="page">
      <div style={{ textAlign: "center", padding: "48px 20px" }}>
        <div style={{ fontSize: 56, marginBottom: 20 }}>🛒</div>
        <h1 style={{ fontSize: 26, fontWeight: 800, marginBottom: 16, color: "#F1F5F9" }}>Shop</h1>
        <p style={{ fontSize: 15, color: "#64748B", lineHeight: 1.7, marginBottom: 28, maxWidth: 320, margin: "0 auto 28px" }}>
          Coming soon — peptide research supplies and protocols. Powered by irishpeptides.ie
        </p>
        <a href="https://irishpeptides.ie" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
          <button className="btn-primary">Visit irishpeptides.ie &rarr;</button>
        </a>
      </div>
    </div>
  );
}
