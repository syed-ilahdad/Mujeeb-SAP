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




/* ── Animated counter ── */
function Counter({ target }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const done = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !done.current) {
        done.current = true;
        let v = 0; const step = target / 60;
        const t = setInterval(() => {
          v += step; if (v >= target) { setVal(target); clearInterval(t); } else setVal(Math.floor(v));
        }, 20);
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);
  return <span ref={ref}>{val}</span>;
}




/* ══════════════════════════════════════
   ABOUT
══════════════════════════════════════ */
function About() {
  const [expanded, setExpanded] = useState(false);
  return (
    <section id="about" style={{ padding: "72px 0", background: "#fff" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "start" }} className="about-grid">
          {/* Left */}
          <div>
            <Reveal delay={0}>
              <span style={secTag}>About MROC</span>
              <h2 style={secH2}>SAP Consulting, Implementation, Services &amp; Business Applications</h2>
              <p style={{ fontSize: "1rem", color: "#0f4c8f", fontWeight: 600, marginBottom: 22 }}>Revolutionize Your Enterprise through our SAP Solutions and Services</p>
            </Reveal>
            <Reveal delay={0.1}>
              <p style={bodyText}>MROC — My Resource on Cloud — stands as a distinguished leader in SAP consulting and implementation services, offering unparalleled expertise in delivering cutting-edge SAP software solutions that drive substantial business value. Our commitment extends beyond mere service provision — guiding clients through the meticulous development of their SAP S/4HANA business cases and roadmaps.</p>
            </Reveal>
            <Reveal delay={0.15}>
              <p style={bodyText}>At MROC, we take pride in our role as trusted partners steering SAP implementation projects to successful fruition. Our seasoned team excels in delivering high-value add-on intellectual property (IP) solutions, ensuring clients not only meet but exceed their strategic objectives.</p>
            </Reveal>
            {expanded && (
              <>
                <Reveal delay={0}>
                  <p style={bodyText}>As part of our unwavering dedication to client success, we offer premium SAP Application Management Services, ushering in an era of seamless and efficient post-implementation support.</p>
                </Reveal>
                <Reveal delay={0.05}>
                  <p style={bodyText}>With a focus on innovation, quality, and client satisfaction, MROC epitomizes excellence in the SAP consulting landscape. Our multifaceted approach encompasses strategic guidance, bespoke solutions, and ongoing support.</p>
                </Reveal>
              </>
            )}
            <Reveal delay={0.2}>
              <button onClick={() => setExpanded(!expanded)} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "Raleway,sans-serif", fontWeight: 700, fontSize: 13, color: "#0f4c8f", padding: 0, display: "flex", alignItems: "center", gap: 5, marginTop: 4, letterSpacing: 0.5 }}>
                {expanded ? "Show Less ↑" : "Read More →"}
              </button>
            </Reveal>
          </div>

          {/* Right - counters */}
          <div>
            <Reveal delay={0.1} direction="left">
              <div style={{ width: "100%", aspectRatio: "4/3", background: "linear-gradient(135deg,#1a2340,#1565c0)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 28, position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
                <span style={{ fontFamily: "Raleway,sans-serif", fontSize: "2.8rem", fontWeight: 800, color: "rgba(255,255,255,0.12)", letterSpacing: 6, position: "relative", zIndex: 1 }}>MROC</span>
              </div>
            </Reveal>
            <Reveal delay={0.2} direction="left">
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", border: "1px solid #e2e6ed" }}>
                {[{ n: 15, l: "Countries" }, { n: 200, l: "Customers" }, { n: 8, l: "Industries" }].map(({ n, l }, i) => (
                  <div key={l} style={{ padding: "26px 16px", textAlign: "center", borderRight: i < 2 ? "1px solid #e2e6ed" : "none" }}>
                    <div style={{ fontFamily: "Raleway,sans-serif", fontSize: "2.1rem", fontWeight: 800, color: "#0f4c8f", lineHeight: 1 }}>
                      <Counter target={n} /><span style={{ fontSize: "1.3rem" }}>+</span>
                    </div>
                    <div style={{ fontSize: 11, color: "#6b7280", marginTop: 6, textTransform: "uppercase", letterSpacing: 1, fontWeight: 600 }}>{l}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About