"USE CLIENT"

import { useState, useEffect, useRef } from "react";

function useReveal(threshold = 0.08) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.IntersectionObserver) { setVisible(true); return; }
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.unobserve(el); }
    }, { threshold, rootMargin: "0px 0px -40px 0px" });
    obs.observe(el);
    return () => obs.unobserve(el);
  }, [threshold]);
  return [ref, visible];
}

function Reveal({ children, delay = 0, direction = "up" }) {
  const [ref, visible] = useReveal();
  const o = { up:"translateY(30px)", left:"translateX(-30px)", right:"translateX(30px)" };
  return (
    <div ref={ref} style={{
      opacity: visible?1:0,
      transform: visible?"none":o[direction],
      transition:`opacity 0.7s cubic-bezier(.4,0,.2,1) ${delay}s, transform 0.7s cubic-bezier(.4,0,.2,1) ${delay}s`,
      willChange:"opacity, transform",
    }}>{children}</div>
  );
}

const servicesData = [
  { title:"Enterprise Resource Planning", icon:"⚡", accent:"#3b82f6", accentBg:"rgba(59,130,246,0.12)",
    short:"Embarking on ERP initiation or migrating to SAP S/4HANA Cloud — award-winning ERP embedded with AI and real-time analytics. SAP S/4HANA Cloud helps your business run anywhere, at any scale.",
    full:"Elevate your operations with an all-encompassing modular solution enriched with AI and analytics. Achieve SAP S/4HANA Cloud ERP success while adhering to industry best practices. Migrate via RISE with SAP at a pace that safeguards your existing ERP investment and people." },
  { title:"Financial Management", icon:"💰", accent:"#10b981", accentBg:"rgba(16,185,129,0.12)",
    short:"Comprehensive financial management leveraging SAP — covering FP&A, accounting, financial close, tax management, treasury, and quote-to-cash, all in a single integrated platform.",
    full:"Integrate real-time planning, budgeting, and forecasting with embedded self-service BI. Machine learning powers faster, more accurate forecasting — surfacing risks and opportunities proactively. Granular profitability tools provide unparalleled visibility across all business segments." },
  { title:"Spend Management", icon:"🛒", accent:"#a855f7", accentBg:"rgba(168,85,247,0.12)",
    short:"Streamline your organization's spending with SAP Ariba, Fieldglass, and Concur — automating and controlling all facets of direct, indirect, and services spend.",
    full:"Gain full control over spend with SAP Ariba. Revolutionize external workforce management with SAP Fieldglass. Simplify travel and expense with SAP Concur — delivering end-to-end visibility, policy compliance, and improved employee productivity across the board." },
  { title:"Business Technology Platform", icon:"🔧", accent:"#f59e0b", accentBg:"rgba(245,158,11,0.12)",
    short:"Empower digital transformation with SAP BTP — application development, automation, data analytics, integration, extended planning, and AI capabilities unified in one platform.",
    full:"Accelerate digital initiatives with SAP's low-code and no-code tools. Unlock full data potential with real-time analytics and predictive modeling. Facilitate seamless connectivity across disparate systems and automate repetitive tasks with AI and machine learning." },
  { title:"Business Network", icon:"🌐", accent:"#06b6d4", accentBg:"rgba(6,182,212,0.12)",
    short:"Unlock supply chain transparency, resiliency, and sustainability with SAP Business Network — connecting people, processes, and systems across enterprises globally.",
    full:"Break down silos and connect with suppliers, partners, and customers for end-to-end supply chain visibility. Track and trace products from source to destination in real time. Build resilient, sustainable supply chains by tracking carbon emissions and energy usage." },
  { title:"Supply Chain Management", icon:"🏭", accent:"#22c55e", accentBg:"rgba(34,197,94,0.12)",
    short:"Elevate supply chain capabilities with SAP solutions spanning planning, logistics, manufacturing, and enterprise asset management for risk-resilient, agile operations.",
    full:"Make informed planning decisions with real-time business and operational data. Deliver reliable logistics with warehouse management, transportation, and fulfillment optimization. Maximize uptime with enterprise asset management and intelligent health prediction." },
];

export default function Services() {
  const [open, setOpen] = useState(null);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');

        .svc-card {
          display:grid; grid-template-columns:120px 1fr;
          border-radius:18px; overflow:hidden;
          background:rgba(255,255,255,0.05);
          border:1px solid rgba(255,255,255,0.08);
          transition: all 0.3s ease; cursor:pointer;
        }
        .svc-card:hover { background:rgba(255,255,255,0.08); border-color:rgba(255,255,255,0.18); transform:translateX(6px); }
        .svc-card:focus-visible { outline:2px solid #3b82f6; outline-offset:2px; }

        .svc-expand-btn {
          display:inline-flex; align-items:center; gap:6px;
          background:none; border:none; cursor:pointer;
          font-family:'Plus Jakarta Sans',sans-serif; font-weight:700; font-size:13px;
          letter-spacing:0.3px; padding:0; transition:gap 0.2s;
        }
        .svc-expand-btn:hover { gap:10px !important; }

        @media(max-width:640px) {
          .svc-card { grid-template-columns:1fr !important; }
          .svc-icon-col { height:100px !important; flex-direction:row !important; gap:12px !important; }
        }
      `}</style>

      <section id="services" style={{
        padding:"100px 0",
        background:"linear-gradient(160deg, #040e24 0%, #0a1e48 40%, #050f24 100%)",
        position:"relative", overflow:"hidden",
      }}>
        {/* Background decorations */}
        <div aria-hidden style={{ position:"absolute",top:-200,right:-100,width:600,height:600,borderRadius:"50%",background:"radial-gradient(circle,rgba(59,130,246,0.06),transparent 70%)",pointerEvents:"none" }} />
        <div aria-hidden style={{ position:"absolute",bottom:-100,left:-100,width:400,height:400,borderRadius:"50%",background:"radial-gradient(circle,rgba(15,76,143,0.08),transparent 70%)",pointerEvents:"none" }} />

        <div style={{ maxWidth:1000, margin:"0 auto", padding:"0 24px", position:"relative" }}>

          {/* ── Header ── */}
          <Reveal>
            <div style={{ textAlign:"center", marginBottom:64 }}>
              <div style={{ display:"inline-flex",alignItems:"center",gap:10,marginBottom:18 }}>
                <div style={{ width:28,height:2.5,background:"#3b82f6",borderRadius:2 }} />
                <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:11,fontWeight:800,letterSpacing:"3px",textTransform:"uppercase",color:"#93c5fd" }}>What We Do</span>
                <div style={{ width:28,height:2.5,background:"#3b82f6",borderRadius:2 }} />
              </div>
              <h2 style={{ fontFamily:"'Playfair Display',serif",fontSize:"clamp(2rem,3.5vw,3rem)",fontWeight:800,color:"#fff",lineHeight:1.15,marginBottom:16 }}>
                Diverse Solutions &{" "}
                <em style={{ color:"#60a5fa",fontStyle:"italic" }}>Services Portfolio</em>
              </h2>
              <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:16,color:"rgba(255,255,255,0.58)",maxWidth:520,margin:"0 auto",lineHeight:1.8 }}>
                AI-powered, SAP-based enterprise solutions built for performance, scale, and long-term value.
              </p>
            </div>
          </Reveal>

          {/* ── Service cards ── */}
          <div style={{ display:"flex",flexDirection:"column",gap:18 }}>
            {servicesData.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.05} direction={i % 2 === 0 ? "left" : "right"}>
                <div
                  className="svc-card"
                  onClick={() => setOpen(open === i ? null : i)}
                  role="button" tabIndex={0} aria-expanded={open === i}
                  onKeyDown={e => e.key === "Enter" && setOpen(open === i ? null : i)}
                >
                  {/* Icon column */}
                  <div className="svc-icon-col" style={{
                    display:"flex", alignItems:"center", justifyContent:"center",
                    background:s.accentBg, borderRight:`2.5px solid ${s.accent}22`,
                    minHeight:130, position:"relative", overflow:"hidden",
                    flexDirection:"column", gap:8,
                  }}>
                    <div aria-hidden style={{ position:"absolute",width:80,height:80,borderRadius:"50%",border:`1px solid ${s.accent}22` }} />
                    <div style={{
                      width:54,height:54,borderRadius:14,
                      background:"rgba(5,15,36,0.6)",
                      display:"flex",alignItems:"center",justifyContent:"center",
                      fontSize:"1.6rem",
                      border:`1px solid ${s.accent}30`,
                      boxShadow:`0 4px 16px ${s.accent}20`,
                      position:"relative",zIndex:1,flexShrink:0,
                    }}>{s.icon}</div>
                    {/* Number */}
                    <span style={{ fontFamily:"'Playfair Display',serif",fontSize:11,fontWeight:700,color:s.accent,opacity:0.5,letterSpacing:1,position:"relative",zIndex:1 }}>
                      {String(i+1).padStart(2,"0")}
                    </span>
                  </div>

                  {/* Content */}
                  <div style={{ padding:"24px 28px" }}>
                    <h5 style={{ fontFamily:"'Playfair Display',serif",fontSize:"1.25rem",fontWeight:700,color:"#fff",marginBottom:10,lineHeight:1.3 }}>
                      {s.title}
                    </h5>
                    <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:14.5,color:"rgba(255,255,255,0.6)",lineHeight:1.78,marginBottom:12 }}>
                      {s.short}
                    </p>
                    {/* Expandable */}
                    <div style={{
                      fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:14.5,
                      color:"rgba(255,255,255,0.5)",lineHeight:1.78,
                      maxHeight: open === i ? 300 : 0,
                      opacity: open === i ? 1 : 0,
                      overflow:"hidden",
                      transition:"max-height 0.45s cubic-bezier(.4,0,.2,1), opacity 0.35s ease",
                      marginBottom: open === i ? 14 : 0,
                    }}>{s.full}</div>

                    <div style={{ height:1,background:"rgba(255,255,255,0.06)",marginBottom:14 }} />

                    <button className="svc-expand-btn" style={{ color:s.accent }} tabIndex={-1}>
                      {open === i ? "Show Less ↑" : "Read More →"}
                    </button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}