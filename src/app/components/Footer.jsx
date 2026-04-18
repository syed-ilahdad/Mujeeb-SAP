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
  const offsets = { up: "translateY(24px)", down: "translateY(-24px)", left: "translateX(-24px)", right: "translateX(24px)" };
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : offsets[direction],
        transition: `opacity 0.6s cubic-bezier(.4,0,.2,1) ${delay}s, transform 0.6s cubic-bezier(.4,0,.2,1) ${delay}s`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}

const socials = [
  { label: "in", href: "https://linkedin.com", title: "LinkedIn" },
  { label: "Fb", href: "#", title: "Facebook" },
  { label: "Tw", href: "#", title: "Twitter/X" },
  { label: "Yt", href: "#", title: "YouTube" },
  { label: "Ig", href: "#", title: "Instagram" },
];

const contacts = [
  { icon: "📍", text: "Canada ON, Toronto" },
  { icon: "📞", text: "USA +1 (123) 456-7890" },
  { icon: "📞", text: "Canada +1 (123) 456-7890" },
  { icon: "📞", text: "London +44 123 456 789" },
  { icon: "📞", text: "Australia +61 1 2345 6789" },
  { icon: "✉", text: "corporate@mrocsolutions.com" },
];

const services = [
  "SAP S/4HANA Services",
  "SAP Business Technology Platform",
  "Data and Analytics",
  "Business Advisory",
  "Finance Transformation",
  "Cloud Migration",
  "Application Management Services",
  "Quality Engineering",
];

const industries = [
  "Consumer Products",
  "Manufacturing & Logistics",
  "Energy & Utilities",
  "Technology & Media",
  "Telecommunication",
  "Healthcare",
  "Public Sector & Defense",
];

const aboutLinks = [
  "About MROC",
  "Career Opportunities",
  "Insights & Blogs",
  "Success Stories",
  "Contact Us",
];

export default function Footer() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600;700&display=swap');

        .footer-link {
          display: block;
          font-family: 'DM Sans', sans-serif;
          font-size: 13.5px;
          color: rgba(255,255,255,0.5);
          text-decoration: none;
          padding: 6px 0;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          transition: color 0.2s ease, padding-left 0.2s ease;
        }
        .footer-link:hover {
          color: #93c5fd;
          padding-left: 6px;
        }

        .social-btn {
          width: 34px;
          height: 34px;
          border: 1px solid rgba(255,255,255,0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255,255,255,0.45);
          font-size: 11px;
          font-weight: 700;
          font-family: 'DM Sans', sans-serif;
          text-decoration: none;
          border-radius: 6px;
          transition: all 0.2s ease;
        }
        .social-btn:hover {
          background: #1d4ed8;
          border-color: #1d4ed8;
          color: #fff;
          transform: translateY(-2px);
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr 1fr;
          gap: 52px;
          padding-bottom: 52px;
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }

        @media (max-width: 960px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 36px !important; }
        }
        @media (max-width: 540px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <footer
        id="contact"
        style={{
          background: "#080f1f",
          color: "rgba(255,255,255,0.55)",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {/* Top accent bar */}
        <div style={{ height: 3, background: "linear-gradient(90deg, #0f4c8f, #3b82f6, #60a5fa, #3b82f6, #0f4c8f)" }} />

        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "64px 28px 0" }}>

          <div className="footer-grid">

            {/* ── Brand + contact ── */}
            <Reveal>
              <div>
                {/* Logo */}
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                  <div
                    style={{
                      width: 42,
                      height: 42,
                      background: "linear-gradient(135deg, #0f4c8f, #1d4ed8)",
                      borderRadius: 10,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "'DM Sans', sans-serif",
                      fontWeight: 800,
                      fontSize: 12,
                      color: "#fff",
                      letterSpacing: 0.5,
                    }}
                  >
                    MROC
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: "'DM Serif Display', serif",
                        fontSize: "1.2rem",
                        color: "#fff",
                        fontWeight: 400,
                      }}
                    >
                      MROC
                    </div>
                    <div
                      style={{
                        fontSize: 10,
                        fontWeight: 500,
                        letterSpacing: 1.5,
                        textTransform: "uppercase",
                        color: "rgba(255,255,255,0.3)",
                      }}
                    >
                      My Resource on Cloud
                    </div>
                  </div>
                </div>

                <p
                  style={{
                    fontSize: 13.5,
                    lineHeight: 1.75,
                    color: "rgba(255,255,255,0.45)",
                    marginBottom: 22,
                    maxWidth: 280,
                  }}
                >
                  World-class services in IT consulting, SAP S/4HANA, Cloud,
                  Project Management, and Enterprise ICT Infrastructure across
                  15+ countries.
                </p>

                {/* Contact list */}
                <div style={{ marginBottom: 22 }}>
                  {contacts.map(({ icon, text }) => (
                    <div
                      key={text}
                      style={{
                        display: "flex",
                        gap: 10,
                        fontSize: 13,
                        color: "rgba(255,255,255,0.45)",
                        marginBottom: 8,
                        alignItems: "flex-start",
                        lineHeight: 1.5,
                      }}
                    >
                      <span style={{ fontSize: 13, flexShrink: 0, marginTop: 1 }}>{icon}</span>
                      <span>{text}</span>
                    </div>
                  ))}
                </div>

                {/* Socials */}
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {socials.map(({ label, href, title }) => (
                    <a
                      key={label}
                      href={href}
                      className="social-btn"
                      title={title}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {label}
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* ── Services ── */}
            <Reveal delay={0.08}>
              <div>
                <h5
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: 2.5,
                    textTransform: "uppercase",
                    color: "#fff",
                    marginBottom: 18,
                    paddingBottom: 12,
                    borderBottom: "2px solid #1d4ed8",
                    display: "inline-block",
                  }}
                >
                  Services
                </h5>
                {services.map((s) => (
                  <a key={s} href="#services" className="footer-link">
                    {s}
                  </a>
                ))}
              </div>
            </Reveal>

            {/* ── Industries ── */}
            <Reveal delay={0.13}>
              <div>
                <h5
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: 2.5,
                    textTransform: "uppercase",
                    color: "#fff",
                    marginBottom: 18,
                    paddingBottom: 12,
                    borderBottom: "2px solid #1d4ed8",
                    display: "inline-block",
                  }}
                >
                  Industries
                </h5>
                {industries.map((i) => (
                  <a key={i} href="#industries" className="footer-link">
                    {i}
                  </a>
                ))}
              </div>
            </Reveal>

            {/* ── About ── */}
            <Reveal delay={0.18}>
              <div>
                <h5
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: 2.5,
                    textTransform: "uppercase",
                    color: "#fff",
                    marginBottom: 18,
                    paddingBottom: 12,
                    borderBottom: "2px solid #1d4ed8",
                    display: "inline-block",
                  }}
                >
                  About Us
                </h5>
                <p
                  style={{
                    fontSize: 13.5,
                    color: "rgba(255,255,255,0.4)",
                    lineHeight: 1.7,
                    marginBottom: 18,
                  }}
                >
                  MROC delivers strategic SAP consulting, cloud transformation,
                  and enterprise application services to clients worldwide.
                </p>
                {aboutLinks.map((l) => (
                  <a key={l} href="#about" className="footer-link">
                    {l}
                  </a>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Bottom bar */}
          <div
            style={{
              padding: "22px 0",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 12,
            }}
          >
            <p style={{ fontSize: 12.5, color: "rgba(255,255,255,0.28)", margin: 0 }}>
              © {new Date().getFullYear()} MROC — My Resource on Cloud. All rights reserved.
            </p>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.2)", margin: 0, letterSpacing: 0.5 }}>
              Global Technology Solutions
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}