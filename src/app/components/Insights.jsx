import { useEffect, useRef, useState } from "react";

function useReveal(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.IntersectionObserver) { setVisible(true); return; }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) { setVisible(true); obs.unobserve(el); }
        });
      },
      { threshold, rootMargin: "0px 0px -40px 0px" }
    );
    obs.observe(el);
    return () => obs.unobserve(el);
  }, [threshold]);
  return [ref, visible];
}

function Reveal({ children, delay = 0, direction = "up" }) {
  const [ref, visible] = useReveal(0.08);
  const offsets = { up: "translateY(28px)", down: "translateY(-28px)", left: "translateX(-28px)", right: "translateX(28px)" };
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : offsets[direction],
        transition: `opacity 0.65s cubic-bezier(.4,0,.2,1) ${delay}s, transform 0.65s cubic-bezier(.4,0,.2,1) ${delay}s`,
        willChange: "opacity, transform",
        height: "100%",
      }}
    >
      {children}
    </div>
  );
}

const insightsData = [
  {
    type: "Whitepaper",
    title: "Retailers Sell Better with Artificial Intelligence",
    cta: "Read More",
    emoji: "📄",
    accent: "#0f4c8f",
    bg: "linear-gradient(135deg, #0f4c8f 0%, #1d4ed8 100%)",
    date: "March 2025",
  },
  {
    type: "Video",
    title: "Why MROC for Your Application Management Services",
    cta: "Watch Now",
    emoji: "▶️",
    accent: "#7c3aed",
    bg: "linear-gradient(135deg, #6d28d9 0%, #7c3aed 100%)",
    date: "February 2025",
  },
  {
    type: "Blog",
    title: "Building Supply Chain Resilience with Flexible Purchase Commitment in S/4HANA",
    cta: "Read More",
    emoji: "✍️",
    accent: "#0369a1",
    bg: "linear-gradient(135deg, #0284c7 0%, #0369a1 100%)",
    date: "January 2025",
  },
  {
    type: "Success Story",
    title: "Fastest SAP S/4HANA Implementation for a Leading Fashion Company",
    cta: "Read More",
    emoji: "🏆",
    accent: "#b45309",
    bg: "linear-gradient(135deg, #d97706 0%, #b45309 100%)",
    date: "December 2024",
  },
  {
    type: "Video",
    title: "READ: Retail Engagement Analysis and Discovery",
    cta: "Watch Now",
    emoji: "🎬",
    accent: "#0f766e",
    bg: "linear-gradient(135deg, #0d9488 0%, #0f766e 100%)",
    date: "November 2024",
  },
  {
    type: "Report",
    title: "MROC Attains Spotlight Status in SAP Store — What It Means",
    cta: "Read More",
    emoji: "⭐",
    accent: "#166534",
    bg: "linear-gradient(135deg, #16a34a 0%, #166534 100%)",
    date: "October 2024",
  },
];

const typeColors = {
  Whitepaper: { bg: "#eff6ff", color: "#1d4ed8" },
  Video: { bg: "#f5f3ff", color: "#6d28d9" },
  Blog: { bg: "#f0f9ff", color: "#0284c7" },
  "Success Story": { bg: "#fffbeb", color: "#b45309" },
  Report: { bg: "#f0fdf4", color: "#166534" },
};

export default function Insights() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600;700&display=swap');

        .insight-card {
          border-radius: 18px;
          overflow: hidden;
          border: 1px solid rgba(0,0,0,0.06);
          background: #fff;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          cursor: pointer;
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        .insight-card:hover {
          transform: translateY(-7px);
          box-shadow: 0 20px 48px rgba(0,0,0,0.10);
        }
        .insight-cta {
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 700;
          text-decoration: none;
          letter-spacing: 0.3px;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          transition: gap 0.2s ease;
        }
        .insight-cta:hover {
          gap: 8px !important;
        }

        .ins-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          max-width: 1040px;
          margin: 0 auto;
        }

        @media (max-width: 860px) {
          .ins-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 540px) {
          .ins-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <section
        id="insights"
        style={{
          padding: "100px 0",
          background: "#f8faff",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background accent */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: -200,
            left: "50%",
            transform: "translateX(-50%)",
            width: 900,
            height: 500,
            borderRadius: "50%",
            background: "radial-gradient(ellipse, rgba(59,130,246,0.05) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 28px", position: "relative" }}>

          {/* ── Header ── */}
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 18,
                }}
              >
                <div style={{ width: 24, height: 2, background: "#0f4c8f" }} />
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: 3,
                    textTransform: "uppercase",
                    color: "#0f4c8f",
                  }}
                >
                  Insights
                </span>
                <div style={{ width: 24, height: 2, background: "#0f4c8f" }} />
              </div>

              <h2
                style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontSize: "clamp(1.9rem, 3vw, 2.7rem)",
                  fontWeight: 400,
                  color: "#0a1628",
                  lineHeight: 1.2,
                  marginBottom: 14,
                }}
              >
                Latest Insights{" "}
                <em style={{ color: "#2563eb", fontStyle: "italic" }}>
                  & Resources
                </em>
              </h2>

              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 15,
                  color: "#64748b",
                  maxWidth: 500,
                  margin: "0 auto",
                  lineHeight: 1.7,
                }}
              >
                Explore our whitepapers, videos, success stories, and expert
                perspectives.
              </p>
            </div>
          </Reveal>

          {/* ── Cards ── */}
          <div className="ins-grid">
            {insightsData.map((item, i) => {
              const typeStyle = typeColors[item.type] || { bg: "#f1f5f9", color: "#475569" };
              return (
                <div key={item.title} style={{ display: "flex" }}>
                  <Reveal delay={i * 0.06} direction="up">
                    <div className="insight-card">
                      {/* Color banner */}
                      <div
                        style={{
                          height: 130,
                          background: item.bg,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "2.6rem",
                          flexShrink: 0,
                          position: "relative",
                        }}
                      >
                        {item.emoji}
                        {/* Type badge */}
                        <div
                          style={{
                            position: "absolute",
                            top: 14,
                            left: 14,
                            background: "rgba(255,255,255,0.2)",
                            backdropFilter: "blur(8px)",
                            border: "1px solid rgba(255,255,255,0.3)",
                            borderRadius: 100,
                            padding: "3px 10px",
                            fontSize: 10,
                            fontWeight: 700,
                            letterSpacing: 1.5,
                            textTransform: "uppercase",
                            color: "#fff",
                            fontFamily: "'DM Sans', sans-serif",
                          }}
                        >
                          {item.type}
                        </div>
                      </div>

                      {/* Content */}
                      <div
                        style={{
                          padding: "20px 22px 24px",
                          display: "flex",
                          flexDirection: "column",
                          flexGrow: 1,
                        }}
                      >
                        <div
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: 11,
                            fontWeight: 600,
                            letterSpacing: 0.5,
                            color: "#94a3b8",
                            marginBottom: 8,
                          }}
                        >
                          {item.date}
                        </div>

                        <div
                          style={{
                            fontFamily: "'DM Serif Display', serif",
                            fontSize: "1.05rem",
                            fontWeight: 400,
                            color: "#0a1628",
                            lineHeight: 1.45,
                            marginBottom: 16,
                            flexGrow: 1,
                          }}
                        >
                          {item.title}
                        </div>

                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            paddingTop: 14,
                            borderTop: "1px solid #f1f5f9",
                          }}
                        >
                          <a
                            href="#"
                            className="insight-cta"
                            style={{ color: item.accent }}
                          >
                            {item.cta} →
                          </a>
                          <span
                            style={{
                              fontSize: 10,
                              fontWeight: 700,
                              letterSpacing: 1.5,
                              textTransform: "uppercase",
                              color: typeStyle.color,
                              background: typeStyle.bg,
                              padding: "3px 10px",
                              borderRadius: 100,
                              fontFamily: "'DM Sans', sans-serif",
                            }}
                          >
                            {item.type}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}