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
   SERVICES
══════════════════════════════════════ */
const servicesData = [
  { title: "Enterprise Resource Planning", icon: "⚡", color: "#1565c0", short: "Embarking on ERP initiation or migrating to SAP S/4HANA Cloud — an award-winning ERP solution embedded with AI and analytics. SAP S/4HANA Cloud helps your business run anywhere, in real time.", full: "Elevate your operational framework with an all-encompassing, modular solution enriched with cutting-edge AI and analytics. Forge the path to success with SAP S/4HANA Cloud ERP — adhering to industry best practices while empowering you to pioneer your own transformative breakthroughs. Migrate to cloud ERP through RISE with SAP at a pace that safeguards your existing ERP investment." },
  { title: "Financial Management", icon: "💰", color: "#00695c", short: "Experience comprehensive financial management leveraging SAP technology — covering financial planning and analysis, accounting, financial close, tax management, treasury, and quote-to-cash.", full: "Our solutions integrate real-time planning, analysis, budgeting, and forecasting with embedded self-service business intelligence. Machine learning powers faster, more accurate forecasting — unveiling risks and opportunities proactively. Granular profitability tools provide unparalleled visibility into financial performance across business segments." },
  { title: "Spend Management", icon: "🛒", color: "#6a1c9a", short: "Streamline and optimize your organization's spending with comprehensive solutions leveraging SAP Ariba, Fieldglass, and Concur — automating and controlling all facets of spending.", full: "Gain full control over direct and indirect spend with SAP Ariba. Revolutionize external workforce management with SAP Fieldglass. Simplify travel and expense with SAP Concur — offering end-to-end visibility and control, policy compliance, and improved employee productivity." },
  { title: "Business Technology Platform", icon: "🔧", color: "#bf360c", short: "Empower your digital transformation with SAP BTP — covering application development, automation, data and analytics, integration, extended planning, and artificial intelligence.", full: "Accelerate digital initiatives by rapidly building custom applications with SAP's low-code and no-code tools. Unlock the full potential of your data with real-time analytics and predictive modeling. Facilitate seamless connectivity across disparate systems and automate repetitive tasks with AI and machine learning capabilities." },
  { title: "Business Network", icon: "🌐", color: "#0277bd", short: "Empower your supply chain with SAP Business Network — unlocking transparency, resiliency, and sustainability by connecting people, processes, and systems across enterprises.", full: "Break down silos and connect seamlessly with suppliers, partners, and customers for end-to-end supply chain visibility. Track and trace products from source to destination with real-time insights. Build resilient supply chains and drive sustainability by tracking carbon emissions and energy usage." },
  { title: "Supply Chain Management", icon: "🏭", color: "#2e7d32", short: "Elevate supply chain capabilities with SAP solutions for risk-resilient, agile, and sustainable operations spanning planning, logistics, manufacturing, and enterprise asset management.", full: "Make informed, responsive planning decisions with real-time business and operational data integration. Deliver reliable logistics with warehouse management, transportation, and fulfillment optimization. Maximize uptime with enterprise asset management and intelligent asset health prediction." },
];

function Services() {
  const [open, setOpen] = useState(null);
  return (
    <section id="services" style={{ padding: "72px 0", background: "#f7f8fa" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <span style={secTag}>What We Do</span>
            <h2 style={{ ...secH2, textAlign: "center" }}>Diverse Solutions and Services Portfolio</h2>
            <p style={{ fontSize: "1rem", color: "#0f4c8f", fontWeight: 600 }}>Elevate your business with AI-powered SAP-based solutions</p>
          </div>
        </Reveal>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {servicesData.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.05} direction={i % 2 === 0 ? "left" : "right"}>
              <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", background: "#fff", border: "1px solid #e2e6ed", marginBottom: -1, transition: "box-shadow 0.2s", cursor: "pointer" }}
                onClick={() => setOpen(open === i ? null : i)}
                onMouseEnter={e => e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.08)"}
                onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
                className="svc-row"
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "28px 20px", borderRight: "1px solid #e2e6ed" }}>
                  <div style={{ width: 72, height: 72, borderRadius: "50%", background: s.color + "18", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2rem" }}>{s.icon}</div>
                </div>
                <div style={{ padding: "28px 32px" }}>
                  <h5 style={{ fontFamily: "Raleway,sans-serif", fontSize: "1.05rem", fontWeight: 800, color: "#0f1c36", marginBottom: 10 }}>{s.title}</h5>
                  <p style={{ fontSize: 14, color: "#4b5563", lineHeight: 1.75, marginBottom: 10 }}>{s.short}</p>
                  <div style={{ fontSize: 14, color: "#374151", lineHeight: 1.75, marginBottom: open === i ? 10 : 0, maxHeight: open === i ? 200 : 0, overflow: "hidden", opacity: open === i ? 1 : 0, transition: "max-height 0.4s ease, opacity 0.35s ease" }}>{s.full}</div>
                  <button style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "Raleway,sans-serif", fontWeight: 700, fontSize: 12.5, color: s.color, padding: 0, letterSpacing: 0.5 }}>
                    {open === i ? "Show Less ↑" : "Read More →"}
                  </button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services