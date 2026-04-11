import { useState, useEffect, useRef } from "react";



/* ── Reveal wrapper ── */
function Reveal({ children, delay = 0, direction = "up", className = "" }) {
  const [ref, visible] = useReveal(0.12);
  const transforms = { up: "translateY(36px)", down: "translateY(-36px)", left: "translateX(-36px)", right: "translateX(36px)" };
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : transforms[direction],
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}


/* ── Scroll-reveal hook ── */
function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

/* ══════════════════════════════════════
   SHARED STYLES
══════════════════════════════════════ */
const secTag = { fontFamily: "Raleway,sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "#0f4c8f", marginBottom: 10, display: "block" };
const secH2 = { fontFamily: "Raleway,sans-serif", fontSize: "clamp(1.5rem,2.5vw,2rem)", fontWeight: 800, color: "#0f1c36", marginBottom: 10 };
const bodyText = { fontSize: "14.5px", color: "#4b5563", lineHeight: 1.8, marginBottom: 14 };



/* ══════════════════════════════════════
   INSIGHTS
══════════════════════════════════════ */
const insightsData = [
  { type: "WHITEPAPER", title: "Retailers Sell Better with Artificial Intelligence", cta: "Read More", bg: "#1a3a5c", emoji: "📄" },
  { type: "VIDEO", title: "Why MROC for your AMS", cta: "Watch Now", bg: "#1a2340", emoji: "▶" },
  { type: "BLOG", title: "Building Supply Chain Resilience with Flexible Purchase Commitment in S/4HANA", cta: "Read More", bg: "#0d2137", emoji: "✍" },
  { type: "SUCCESS STORY", title: "Fastest SAP S/4HANA Implementation for a Leading Fashion Company", cta: "Read More", bg: "#1c1a3a", emoji: "🏆" },
  { type: "VIDEO", title: "READ Retail Engagement Analysis and Discovery", cta: "Watch Now", bg: "#12203a", emoji: "🎬" },
  { type: "REPORT", title: "MROC Attains Spotlight Status in SAP Store", cta: "Read More", bg: "#0a1628", emoji: "⭐" },
];

function Insights() {
  return (
    <section id="insights" style={{ padding: "72px 0", background: "#f7f8fa" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <span style={secTag}>Insights</span>
            <h2 style={{ ...secH2, textAlign: "center" }}>World of Curated Thoughtful Insights</h2>
            <p style={{ fontSize: "1rem", color: "#0f4c8f", fontWeight: 600 }}>Rich meaningful content spanning Whitepapers, Success Stories, Blogs, Corporate Videos, and more</p>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <div style={{ background: "#fffbeb", borderLeft: "4px solid #f59e0b", padding: "12px 18px", marginBottom: 36, fontSize: 13, color: "#92400e", borderRadius: "0 4px 4px 0" }}>
            <strong style={{ display: "block", marginBottom: 2 }}>⚠️ Placeholder content — buttons not yet linked</strong>
            The "Read More" and "Watch Now" links are placeholders. Connect your actual article/video URLs to activate them.
          </div>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }} className="ins-grid">
          {insightsData.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.07} direction="up">
              <div style={{ background: "#fff", border: "1px solid #e2e6ed", overflow: "hidden", transition: "box-shadow 0.2s, transform 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 8px 28px rgba(0,0,0,0.10)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "none"; }}
              >
                <div style={{ height: 170, display: "flex", alignItems: "center", justifyContent: "center", background: item.bg, fontSize: "2.8rem" }}>{item.emoji}</div>
                <div style={{ padding: "18px 20px" }}>
                  <span style={{ fontFamily: "Raleway,sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "#0f4c8f", display: "block", marginBottom: 8 }}>{item.type}</span>
                  <div style={{ fontFamily: "Raleway,sans-serif", fontSize: "0.92rem", fontWeight: 700, color: "#0f1c36", marginBottom: 14, lineHeight: 1.4 }}>{item.title}</div>
                  <a href="#insights" style={{ fontFamily: "Raleway,sans-serif", fontWeight: 700, fontSize: 12.5, color: "#0f4c8f", textDecoration: "none", letterSpacing: 0.5 }}
                    onMouseEnter={e => e.target.style.textDecoration = "underline"}
                    onMouseLeave={e => e.target.style.textDecoration = "none"}
                  >{item.cta} →</a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Insights