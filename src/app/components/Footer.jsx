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
   FOOTER
══════════════════════════════════════ */
function Footer() {
  return (
    <footer id="contact" style={{ background: "#1a2340", color: "rgba(255,255,255,0.65)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "60px 24px 0" }}>
        <Reveal direction="up">
          <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1.3fr", gap: 48, paddingBottom: 48, borderBottom: "1px solid rgba(255,255,255,0.1)" }} className="footer-grid">
            {/* Brand + contact */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <div style={{ width: 36, height: 36, background: "#0f4c8f", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Raleway,sans-serif", fontWeight: 800, fontSize: 11, color: "#fff" }}>MROC</div>
                <div>
                  <div style={{ fontFamily: "Raleway,sans-serif", fontWeight: 800, fontSize: "1rem", color: "#fff" }}>MROC</div>
                  <div style={{ fontSize: "0.58rem", color: "rgba(255,255,255,0.45)", letterSpacing: 0.5 }}>My Resource on Cloud</div>
                </div>
              </div>
              <p style={{ fontSize: 13, lineHeight: 1.75, color: "rgba(255,255,255,0.55)", marginBottom: 20 }}>
                Our Portfolio offers world-class services in IT consulting, SAP S/4HANA, Cloud, Project Consulting and Management, Strategic Planning, and Critical Enterprise ICT Infrastructure Development.
              </p>
              {[["📍", "Canada ON, Toronto - 2026"], ["📞", "USA +1 (123) 456-789"], ["📞", "Canada +1 (123) 456789"], ["📞", "London +44 123456789"], ["📞", "Australia +61 1 2 3456789"], ["✉", "corporate@mrocsolutions.com"]].map(([icon, text]) => (
                <div key={text} style={{ display: "flex", gap: 8, fontSize: 13, color: "rgba(255,255,255,0.55)", marginBottom: 7, alignItems: "flex-start" }}>
                  <span>{icon}</span><span>{text}</span>
                </div>
              ))}
              <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
                {[["Fb", "#"], ["in", "https://linkedin.com"], ["Tw", "#"], ["Yt", "#"], ["Ig", "#"]].map(([l, h]) => (
                  <a key={l} href={h} target="_blank" rel="noreferrer" style={{ width: 32, height: 32, border: "1px solid rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.55)", fontSize: 11, fontWeight: 700, textDecoration: "none", transition: "all 0.15s" }}
                    onMouseEnter={e => { e.target.style.background = "#0f4c8f"; e.target.style.borderColor = "#0f4c8f"; e.target.style.color = "#fff"; }}
                    onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.borderColor = "rgba(255,255,255,0.2)"; e.target.style.color = "rgba(255,255,255,0.55)"; }}
                  >{l}</a>
                ))}
              </div>
            </div>

            {/* Services */}
            <div>
              <h5 style={footerColHead}>Services</h5>
              {["SAP S/4HANA Services", "SAP Business Technology Platform", "Data and Analytics", "Business Advisory", "Finance", "Cloud", "Application Management Services", "Quality Engineering"].map(s => (
                <a key={s} href="#services" style={footerLink}>{s}</a>
              ))}
            </div>

            {/* Industries */}
            <div>
              <h5 style={footerColHead}>Industries</h5>
              {["Consumer Products", "Manufacturing, Logistics, Energy and Utilities", "Technology, Media and Telecommunication", "Healthcare, Public Sector and Defense"].map(i => (
                <a key={i} href="#industries" style={footerLink}>{i}</a>
              ))}
            </div>

            {/* About */}
            <div>
              <h5 style={footerColHead}>About Us</h5>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", lineHeight: 1.7, marginBottom: 16 }}>
                MROC delivers strategic SAP consulting, cloud transformation, and enterprise application services to clients across 15+ countries.
              </p>
              {["About MROC", "Career Opportunities", "Insights & Blogs", "Success Stories", "Contact Us"].map(l => (
                <a key={l} href="#about" style={footerLink}>{l}</a>
              ))}
            </div>
          </div>
        </Reveal>

        <div style={{ padding: "20px 0", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <p style={{ fontSize: 12.5, color: "rgba(255,255,255,0.35)" }}>© {new Date().getFullYear()} MROC — My Resource on Cloud. All rights reserved.</p>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.25)" }}>Global Technology Solutions</p>
        </div>
      </div>
    </footer>
  );
}


const footerColHead = { fontFamily: "Raleway,sans-serif", fontSize: 12, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: "#fff", marginBottom: 16, paddingBottom: 10, borderBottom: "2px solid #0f4c8f", display: "inline-block" };
const footerLink = { display: "block", fontSize: 13, color: "rgba(255,255,255,0.55)", textDecoration: "none", padding: "5px 0", transition: "color 0.15s, padding-left 0.15s", borderBottom: "1px solid rgba(255,255,255,0.05)" };





export default Footer