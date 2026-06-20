"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/", emoji: "🏠", label: "Home" },
  { href: "/log", emoji: "📝", label: "Log" },
  { href: "/tracker", emoji: "📊", label: "Tracker" },
  { href: "/photos", emoji: "📷", label: "Photos" },
  { href: "/more", emoji: "⋯", label: "More" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        height: 68,
        background: "#111827",
        borderTop: "1px solid rgba(255,255,255,0.07)",
        display: "flex",
        alignItems: "stretch",
        zIndex: 100,
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      {tabs.map((tab) => {
        const isActive = tab.href === "/" ? pathname === "/" : pathname.startsWith(tab.href);
        return (
          <Link
            key={tab.href}
            href={tab.href}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textDecoration: "none",
              color: isActive ? "#14B8A6" : "#4B5563",
              gap: 2,
              minHeight: 44,
              transition: "color 0.2s",
            }}
          >
            <span style={{ fontSize: tab.emoji === "⋯" ? 22 : 20, lineHeight: 1 }}>{tab.emoji}</span>
            <span style={{ fontSize: 10, fontWeight: isActive ? 700 : 500 }}>{tab.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
