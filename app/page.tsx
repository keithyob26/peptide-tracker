"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import DisclaimerBanner from "@/components/DisclaimerBanner";

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

interface WeightEntry {
  date: string;
  weight: number;
  unit: string;
}

interface LogEntry {
  id: string;
  compound: string;
  dose: string;
  frequency: string;
  site: string;
  date: string;
  time: string;
}

function Ring({
  value,
  max = 10,
  size = 72,
  stroke = 7,
  color,
  label,
  sub,
}: {
  value: number;
  max?: number;
  size?: number;
  stroke?: number;
  color: string;
  label: string;
  sub?: string;
}) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const pct = Math.min(1, Math.max(0, value / max));
  const dash = circ;
  const offset = circ * (1 - pct);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
      <div style={{ position: "relative", width: size, height: size }}>
        <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={stroke} />
          <circle
            cx={size / 2} cy={size / 2} r={r} fill="none"
            stroke={color} strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={dash}
            strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 0.6s ease" }}
          />
        </svg>
        <div style={{
          position: "absolute", inset: 0, display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", gap: 0
        }}>
          <span style={{ fontSize: 16, fontWeight: 800, color: "#F1F5F9", lineHeight: 1 }}>{value}</span>
          {sub && <span style={{ fontSize: 9, color: "#64748B", lineHeight: 1.2 }}>{sub}</span>}
        </div>
      </div>
      <span style={{ fontSize: 11, color: "#64748B", fontWeight: 500, textAlign: "center" }}>{label}</span>
    </div>
  );
}

function BigRing({ value, max = 10, size = 130, stroke = 11, color }: {
  value: number | null; max?: number; size?: number; stroke?: number; color: string;
}) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const pct = value !== null ? Math.min(1, Math.max(0, value / max)) : 0;
  const offset = circ * (1 - pct);
  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={stroke} />
        {value !== null && (
          <circle
            cx={size / 2} cy={size / 2} r={r} fill="none"
            stroke={color} strokeWidth={stroke} strokeLinecap="round"
            strokeDasharray={circ} strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 0.8s ease" }}
          />
        )}
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        {value !== null ? (
          <>
            <span style={{ fontSize: 30, fontWeight: 900, color: "#F1F5F9", lineHeight: 1 }}>{value}</span>
            <span style={{ fontSize: 12, color: "#64748B" }}>/10</span>
          </>
        ) : (
          <span style={{ fontSize: 28 }}>—</span>
        )}
      </div>
    </div>
  );
}

function TrendChart({ data }: { data: { date: string; avg: number }[] }) {
  if (data.length < 2) return null;
  const vals = data.map(d => d.avg);
  const min = Math.max(0, Math.min(...vals) - 1);
  const max = Math.min(10, Math.max(...vals) + 1);
  const W = 300, H = 50;
  const pts = data.map((d, i) => {
    const x = (i / (data.length - 1)) * W;
    const y = H - ((d.avg - min) / (max - min)) * H;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");
  const latest = vals[vals.length - 1];
  const first = vals[0];
  const trend = latest - first;
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
        <span style={{ fontSize: 11, color: "#64748B" }}>7-day trend</span>
        <span style={{ fontSize: 12, fontWeight: 700, color: trend >= 0 ? "#14B8A6" : "#EF4444" }}>
          {trend >= 0 ? "+" : ""}{trend.toFixed(1)}
        </span>
      </div>
      <svg width="100%" height={H} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
        <defs>
          <linearGradient id="trendGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#14B8A6" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#14B8A6" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon points={`0,${H} ${pts} ${W},${H}`} fill="url(#trendGrad)" />
        <polyline points={pts} fill="none" stroke="#14B8A6" strokeWidth="2" strokeLinejoin="round" />
        {data.map((d, i) => {
          const x = (i / (data.length - 1)) * W;
          const y = H - ((d.avg - min) / (max - min)) * H;
          return <circle key={d.date} cx={x.toFixed(1)} cy={y.toFixed(1)} r="3" fill="#14B8A6" />;
        })}
      </svg>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
        {data.filter((_, i) => i === 0 || i === data.length - 1 || i === Math.floor(data.length / 2)).map(d => (
          <span key={d.date} style={{ fontSize: 10, color: "#374151" }}>
            {new Date(d.date).toLocaleDateString("en-IE", { day: "numeric", month: "short" })}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function HomePage() {
  const [activeCycle, setActiveCycle] = useState<Cycle | null>(null);
  const [todayScore, setTodayScore] = useState<FeelScore | null>(null);
  const [cycleDay, setCycleDay] = useState(0);
  const [totalDays, setTotalDays] = useState(0);
  const [todayLogs, setTodayLogs] = useState<LogEntry[]>([]);
  const [latestWeight, setLatestWeight] = useState<WeightEntry | null>(null);
  const [streak, setStreak] = useState(0);
  const [weekTrend, setWeekTrend] = useState<{ date: string; avg: number }[]>([]);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];

    const cyclesRaw = localStorage.getItem("pt_cycles");
    if (cyclesRaw) {
      const cycles: Cycle[] = JSON.parse(cyclesRaw);
      const active = cycles.find((c) => c.active);
      if (active) {
        setActiveCycle(active);
        const start = new Date(active.startDate);
        const end = new Date(active.endDate);
        const now = new Date();
        setCycleDay(Math.max(1, Math.floor((now.getTime() - start.getTime()) / 86400000) + 1));
        setTotalDays(Math.max(1, Math.floor((end.getTime() - start.getTime()) / 86400000) + 1));
      }
    }

    const scoreRaw = localStorage.getItem(`pt_scores_${today}`);
    if (scoreRaw) setTodayScore(JSON.parse(scoreRaw));

    const logsRaw = localStorage.getItem("pt_logs");
    if (logsRaw) {
      const all: LogEntry[] = JSON.parse(logsRaw);
      setTodayLogs(all.filter((l) => l.date === today));
    }

    const weightsRaw = localStorage.getItem("pt_weights");
    if (weightsRaw) {
      const ws: WeightEntry[] = JSON.parse(weightsRaw);
      if (ws.length) setLatestWeight(ws[ws.length - 1]);
    }

    let s = 0;
    for (let i = 0; i < 30; i++) {
      const d = new Date(); d.setDate(d.getDate() - i);
      const k = `pt_scores_${d.toISOString().split("T")[0]}`;
      if (localStorage.getItem(k)) s++; else break;
    }
    setStreak(s);

    // Load 7-day feel trend
    const trend: { date: string; avg: number }[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(); d.setDate(d.getDate() - i);
      const k = `pt_scores_${d.toISOString().split("T")[0]}`;
      const raw = localStorage.getItem(k);
      if (raw) {
        const s = JSON.parse(raw);
        trend.push({ date: d.toISOString().split("T")[0], avg: Math.round((s.energy + s.sleep + s.mood + s.recovery) / 4 * 10) / 10 });
      }
    }
    setWeekTrend(trend);
  }, []);

  const progress = totalDays > 0 ? Math.min(100, (cycleDay / totalDays) * 100) : 0;
  const avgScore = todayScore
    ? Math.round((todayScore.energy + todayScore.sleep + todayScore.mood + todayScore.recovery) / 4 * 10) / 10
    : null;

  const scoreColor = (v: number) => v >= 7 ? "#14B8A6" : v >= 4 ? "#FBBF24" : "#EF4444";
  const avgColor = avgScore ? scoreColor(avgScore) : "#14B8A6";

  return (
    <div className="page">
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 22, fontWeight: 800, color: "#F1F5F9" }}>
            {new Date().getHours() < 12 ? "Good morning" : new Date().getHours() < 18 ? "Good afternoon" : "Good evening"}
          </div>
          <div style={{ fontSize: 13, color: "#64748B", marginTop: 2 }}>
            {new Date().toLocaleDateString("en-IE", { weekday: "long", day: "numeric", month: "long" })}
          </div>
        </div>
        {streak > 0 && (
          <div style={{ background: "rgba(251,191,36,0.1)", border: "1px solid rgba(251,191,36,0.25)", borderRadius: 20, padding: "6px 12px", display: "flex", alignItems: "center", gap: 4 }}>
            <span style={{ fontSize: 16 }}>🔥</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#FBBF24" }}>{streak}d</span>
          </div>
        )}
      </div>

      {/* Feel Score Card — MFP style */}
      <div className="card" style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 12, color: "#64748B", fontWeight: 600, letterSpacing: "0.06em", marginBottom: 14 }}>TODAY&apos;S FEEL SCORE</div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <BigRing value={avgScore} color={avgColor} />
          <div style={{ flex: 1 }}>
            {todayScore ? (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <Ring value={todayScore.energy} color={scoreColor(todayScore.energy)} label="Energy" sub="⚡" />
                <Ring value={todayScore.sleep} color={scoreColor(todayScore.sleep)} label="Sleep" sub="😴" />
                <Ring value={todayScore.mood} color={scoreColor(todayScore.mood)} label="Mood" sub="😊" />
                <Ring value={todayScore.recovery} color={scoreColor(todayScore.recovery)} label="Recovery" sub="💪" />
              </div>
            ) : (
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 13, color: "#64748B", marginBottom: 10 }}>Not logged today</div>
                <Link href="/log" style={{ textDecoration: "none" }}>
                  <button className="btn-primary" style={{ fontSize: 14, padding: "10px 16px" }}>Log Now</button>
                </Link>
              </div>
            )}
          </div>
        </div>
        {weekTrend.length >= 2 && (
          <div style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid rgba(255,255,255,0.05)" }}>
            <TrendChart data={weekTrend} />
          </div>
        )}
      </div>

      {/* Active Cycle */}
      {activeCycle ? (
        <div className="card" style={{ marginBottom: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <div style={{ fontSize: 12, color: "#64748B", fontWeight: 600, letterSpacing: "0.06em" }}>ACTIVE CYCLE</div>
            <span className="badge badge-teal">Day {cycleDay}/{totalDays}</span>
          </div>
          <div style={{ fontSize: 17, fontWeight: 700, marginBottom: 8 }}>{activeCycle.name}</div>
          <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 6, height: 6, marginBottom: 10, overflow: "hidden" }}>
            <div style={{ width: "100%", height: "100%", background: "linear-gradient(90deg,#14B8A6,#0EA5E9)", borderRadius: 6, transform: `scaleX(${progress / 100})`, transformOrigin: "left", transition: "transform 0.5s" }} />
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
            {activeCycle.compounds.map((c) => (
              <span key={c} style={{ fontSize: 11, background: "rgba(20,184,166,0.1)", color: "#14B8A6", padding: "3px 9px", borderRadius: 20, fontWeight: 500 }}>{c}</span>
            ))}
          </div>
        </div>
      ) : (
        <div className="card" style={{ marginBottom: 14, textAlign: "center", padding: "24px 16px" }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>💊</div>
          <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>No Active Cycle</div>
          <div style={{ fontSize: 13, color: "#64748B", marginBottom: 14 }}>Start tracking to see cycle progress here.</div>
          <Link href="/tracker" style={{ textDecoration: "none" }}>
            <button className="btn-primary" style={{ fontSize: 14, padding: "10px 16px" }}>Start a Cycle</button>
          </Link>
        </div>
      )}

      {/* Today's Diary */}
      <div className="card" style={{ marginBottom: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <div style={{ fontSize: 12, color: "#64748B", fontWeight: 600, letterSpacing: "0.06em" }}>TODAY&apos;S DIARY</div>
          <Link href="/log" style={{ textDecoration: "none", fontSize: 13, color: "#14B8A6", fontWeight: 600 }}>+ Add</Link>
        </div>
        {todayLogs.length > 0 ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {todayLogs.map((l, i) => (
              <div key={l.id} style={{
                display: "flex", alignItems: "center", gap: 10, padding: "9px 0",
                borderBottom: i < todayLogs.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none"
              }}>
                <div style={{ width: 32, height: 32, background: "rgba(20,184,166,0.1)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, flexShrink: 0 }}>💊</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#F1F5F9", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{l.compound}</div>
                  <div style={{ fontSize: 12, color: "#64748B" }}>{l.dose} · {l.frequency}</div>
                </div>
                <div style={{ fontSize: 12, color: "#374151", flexShrink: 0 }}>{l.time}</div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "14px 0", color: "#64748B", fontSize: 13 }}>
            Nothing logged today yet
          </div>
        )}
      </div>

      {/* Weight Check-in */}
      <div className="card" style={{ marginBottom: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 12, color: "#64748B", fontWeight: 600, letterSpacing: "0.06em", marginBottom: 3 }}>WEIGHT</div>
            {latestWeight ? (
              <div style={{ fontSize: 22, fontWeight: 800, color: "#F1F5F9" }}>
                {latestWeight.weight} <span style={{ fontSize: 14, color: "#64748B", fontWeight: 500 }}>{latestWeight.unit}</span>
              </div>
            ) : (
              <div style={{ fontSize: 14, color: "#64748B" }}>Not logged yet</div>
            )}
            {latestWeight && (
              <div style={{ fontSize: 11, color: "#64748B", marginTop: 1 }}>
                {new Date(latestWeight.date).toLocaleDateString("en-IE", { day: "numeric", month: "short" })}
              </div>
            )}
          </div>
          <Link href="/log?tab=weight" style={{ textDecoration: "none" }}>
            <button style={{
              background: "rgba(20,184,166,0.1)", border: "1px solid rgba(20,184,166,0.25)",
              color: "#14B8A6", padding: "10px 16px", borderRadius: 8, fontSize: 13,
              fontWeight: 600, cursor: "pointer", minHeight: 40
            }}>Log Weight</button>
          </Link>
        </div>
      </div>

      {/* Quick Actions — 2x2 grid like MFP */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
        {[
          { label: "Log Today", emoji: "📝", href: "/log", color: "rgba(20,184,166,0.08)", border: "rgba(20,184,166,0.2)" },
          { label: "Cycle Tracker", emoji: "📊", href: "/tracker", color: "rgba(14,165,233,0.08)", border: "rgba(14,165,233,0.2)" },
          { label: "Calculator", emoji: "🧮", href: "/calculator", color: "rgba(168,85,247,0.08)", border: "rgba(168,85,247,0.2)" },
          { label: "Progress Photos", emoji: "📷", href: "/photos", color: "rgba(251,191,36,0.08)", border: "rgba(251,191,36,0.2)" },
        ].map((a) => (
          <Link key={a.label} href={a.href} style={{ textDecoration: "none" }}>
            <div className="card" style={{ textAlign: "center", padding: "18px 10px", cursor: "pointer", background: a.color, borderColor: a.border }}>
              <div style={{ fontSize: 26, marginBottom: 5 }}>{a.emoji}</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#F1F5F9" }}>{a.label}</div>
            </div>
          </Link>
        ))}
      </div>

      {/* Send to AI promo */}
      <Link href="/more" style={{ textDecoration: "none" }}>
        <div className="card" style={{ marginBottom: 14, background: "rgba(16,163,127,0.06)", borderColor: "rgba(16,163,127,0.2)", display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ fontSize: 28 }}>🤖</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#F1F5F9" }}>Sync with Your AI</div>
            <div style={{ fontSize: 12, color: "#64748B", marginTop: 2 }}>Copy cycle data → paste into ChatGPT, Claude, Gemini</div>
          </div>
          <div style={{ color: "#374151", fontSize: 18 }}>›</div>
        </div>
      </Link>

      <DisclaimerBanner />
      <div style={{ textAlign: "center", fontSize: 12, color: "#374151", padding: "8px 0 4px", lineHeight: 1.5 }}>
        PepTracker is a personal research journal. It is not a medical device and does not provide medical advice.
      </div>
    </div>
  );
}
