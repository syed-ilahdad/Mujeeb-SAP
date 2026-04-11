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
   INDUSTRIES
══════════════════════════════════════ */
const industriesData = [
  { name: "Retail", emoji: "🛍️", desc: "Building futuristic solutions for the retail industry", color: "#1565c0" },
  { name: "Fashion", emoji: "👗", desc: "Speed-to-market solutions for global fashion brands", color: "#880e4f" },
  { name: "Consumer Products", emoji: "📦", desc: "Building futuristic solutions for the consumer products industry", color: "#e65100" },
  { name: "Manufacturing, Logistics, Energy & Utilities", emoji: "🏭", desc: "Transforming industries with the power of innovation", color: "#2e7d32" },
  { name: "Technology, Media & Telecommunication", emoji: "📡", desc: "Innovate with domain expertise and a fit-to-standard approach", color: "#6a1c9a" },
  { name: "Healthcare, Public Sector & Defense", emoji: "🏥", desc: "Comprehensive solutions for better insights, outcomes, and value", color: "#0277bd" },
];

function Industries() {
  return (
    <section id="industries" style={{ padding: "72px 0", background: "#fff" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <span style={secTag}>Industries</span>
            <h2 style={{ ...secH2, textAlign: "center" }}>Providing Concrete Value Across Industries</h2>
            <p style={{ fontSize: "1rem", color: "#0f4c8f", fontWeight: 600 }}>Innovation, Speed, and Excellence customized to address unique domain-specific challenges</p>
          </div>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }} className="ind-grid">
          {industriesData.map((ind, i) => (
            <Reveal key={ind.name} delay={i * 0.07} direction="up">
              <div style={{ border: "1px solid #e2e6ed", overflow: "hidden", transition: "box-shadow 0.2s, transform 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 8px 28px rgba(0,0,0,0.10)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "none"; }}
              >
                <div style={{ height: 160, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "3rem", background: ind.color + "14", borderBottom: `3px solid ${ind.color}` }}>{ind.emoji}</div>
                <div style={{ padding: "18px 20px" }}>
                  <div style={{ fontFamily: "Raleway,sans-serif", fontWeight: 700, fontSize: "0.92rem", color: "#0f1c36", marginBottom: 6 }}>{ind.name}</div>
                  <div style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.6 }}>{ind.desc}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}


export default Industries