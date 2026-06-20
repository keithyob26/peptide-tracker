"use client";
import { useEffect, useState } from "react";
import DisclaimerBanner from "@/components/DisclaimerBanner";
import Link from "next/link";

interface Cycle {
  id: string;
  name: string;
  compounds: string[];
  startDate: string;
  endDate: string;
  active: boolean;
}

interface FeelScore {
  energy: number;
  sleep: number;
  mood: number;
  recovery: number;
  date: string;
}

export default function HomePage() {
  const [activeCycle, setActiveCycle] = useState<Cycle | null>(null);
  const [todayScore, setTodayScore] = useState<FeelScore | null>(null);
  const [cycleDay, setCycleDay] = useState(0);
  const [totalDays, setTotalDays] = useState(0);

  useEffect(() => {
    // Load active cycle
    const cyclesRaw = localStorage.getItem("pt_cycles");
    if (cyclesRaw) {
      const cycles: Cycle[] = JSON.parse(cyclesRaw);
      const active = cycles.find((c) => c.active);
      if (active) {
        setActiveCycle(active);
        const start = new Date(active.startDate);
        const end = new Date(active.endDate);
        const now = new Date();
        const dayNum = Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
        const total = Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
        setCycleDay(Math.max(1, dayNum));
        setTotalDays(Math.max(1, total));
      }
    }

    // Load today's feel score
    const today = new Date().toISOString().split("T")[0];
    const scoreRaw = localStorage.getItem(`pt_scores_${today}`);
    if (scoreRaw) {
      setTodayScore(JSON.parse(scoreRaw));
    }
  }, []);

  const progress = totalDays > 0 ? Math.min(100, (cycleDay / totalDays) * 100) : 0;
  const avgScore = todayScore
    ? Math.round((todayScore.energy + todayScore.sleep + todayScore.mood + todayScore.recovery) / 4 * 10) / 10
    : null;

  return (
    <div className="page">
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 13, color: "#14B8A6", fontWeight: 600, marginBottom: 4 }}>
          PEPTIDE TRACKER
        </div>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: "#F1F5F9", margin: 0 }}>
          Dashboard
        </h1>
        <div style={{ fontSize: 14, color: "#64748B", marginTop: 4 }}>
          {new Date().toLocaleDateString("en-IE", { weekday: "long", day: "numeric", month: "long" })}
        </div>
      </div>

      {/* Active Cycle Card */}
      {activeCycle ? (
        <div className="card" style={{ marginBottom: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <div style={{ fontSize: 13, color: "#64748B", fontWeight: 500 }}>ACTIVE CYCLE</div>
            <span className="badge badge-teal">Live</span>
          </div>
          <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>{activeCycle.name}</div>
          <div style={{ fontSize: 14, color: "#94A3B8", marginBottom: 12 }}>
            Day {cycleDay} of {totalDays}
          </div>
          {/* Progress bar */}
          <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 4, height: 8, marginBottom: 12 }}>
            <div style={{ width: `${progress}%`, height: "100%", background: "#14B8A6", borderRadius: 4, transition: "width 0.5s" }} />
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {activeCycle.compounds.map((c) => (
              <span key={c} style={{ fontSize: 12, background: "rgba(20,184,166,0.1)", color: "#14B8A6", padding: "3px 10px", borderRadius: 20, fontWeight: 500 }}>
                {c}
              </span>
            ))}
          </div>
        </div>
      ) : (
        <div className="card" style={{ marginBottom: 16, textAlign: "center", padding: "32px 16px" }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>💊</div>
          <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>No Active Cycle</div>
          <div style={{ fontSize: 14, color: "#64748B", marginBottom: 16 }}>
            Start tracking your peptide or HRT cycle to see your progress here.
          </div>
          <Link href="/tracker" style={{ textDecoration: "none" }}>
            <button className="btn-primary">Create Your First Cycle</button>
          </Link>
        </div>
      )}

      {/* Today's Feel Score */}
      <div className="card" style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 13, color: "#64748B", fontWeight: 500, marginBottom: 12 }}>TODAY&apos;S FEEL SCORE</div>
        {todayScore ? (
          <div>
            <div style={{ fontSize: 36, fontWeight: 800, color: "#14B8A6", marginBottom: 8 }}>{avgScore}/10</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {[
                { label: "Energy", value: todayScore.energy },
                { label: "Sleep", value: todayScore.sleep },
                { label: "Mood", value: todayScore.mood },
                { label: "Recovery", value: todayScore.recovery },
              ].map((item) => (
                <div key={item.label} style={{ background: "rgba(255,255,255,0.03)", borderRadius: 8, padding: "10px 12px" }}>
                  <div style={{ fontSize: 12, color: "#64748B", marginBottom: 2 }}>{item.label}</div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: item.value >= 7 ? "#14B8A6" : item.value >= 4 ? "#FBBF24" : "#EF4444" }}>
                    {item.value}/10
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "16px 0" }}>
            <div style={{ fontSize: 14, color: "#64748B", marginBottom: 12 }}>No scores logged yet today</div>
            <Link href="/log" style={{ textDecoration: "none" }}>
              <button className="btn-primary">Log Today&apos;s Scores</button>
            </Link>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 13, color: "#64748B", fontWeight: 500, marginBottom: 12 }}>QUICK ACTIONS</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {[
            { label: "Log Today", emoji: "📝", href: "/log" },
            { label: "View Progress", emoji: "📊", href: "/tracker" },
            { label: "Calculator", emoji: "🧮", href: "/calculator" },
            { label: "Progress Photos", emoji: "📷", href: "/photos" },
          ].map((action) => (
            <Link key={action.label} href={action.href} style={{ textDecoration: "none" }}>
              <div className="card" style={{ textAlign: "center", padding: "20px 12px", cursor: "pointer", transition: "border-color 0.2s", borderColor: "rgba(20,184,166,0.15)" }}>
                <div style={{ fontSize: 28, marginBottom: 6 }}>{action.emoji}</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#F1F5F9" }}>{action.label}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Brand Links */}
      <div className="card" style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 13, color: "#64748B", fontWeight: 500, marginBottom: 12 }}>POWERED BY</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <a href="https://irishpeptides.ie" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0" }}>
              <div style={{ width: 36, height: 36, background: "rgba(20,184,166,0.15)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🌿</div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 600, color: "#14B8A6" }}>irishpeptides.ie</div>
                <div style={{ fontSize: 12, color: "#64748B" }}>Free research tools &amp; guides</div>
              </div>
            </div>
          </a>
          <a href="https://instagram.com/irishwellnessresearch" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0" }}>
              <div style={{ width: 36, height: 36, background: "rgba(168,85,247,0.15)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>📱</div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 600, color: "#C084FC" }}>@irishwellnessresearch</div>
                <div style={{ fontSize: 12, color: "#64748B" }}>Follow on Instagram</div>
              </div>
            </div>
          </a>
        </div>
      </div>

      <DisclaimerBanner />
    </div>
  );
}
