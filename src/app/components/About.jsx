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
  const o = { up:"translateY(30px)", down:"translateY(-30px)", left:"translateX(-30px)", right:"translateX(30px)" };
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "none" : o[direction],
      transition: `opacity 0.7s cubic-bezier(.4,0,.2,1) ${delay}s, transform 0.7s cubic-bezier(.4,0,.2,1) ${delay}s`,
      willChange: "opacity, transform",
    }}>{children}</div>
  );
}

function Counter({ target, suffix = "+" }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || !window.IntersectionObserver) { setVal(target); return; }
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        let step = 0, steps = 60;
        const t = setInterval(() => {
          step++;
          if (step >= steps) { setVal(target); clearInterval(t); }
          else setVal(Math.floor((step / steps) * target));
        }, 1400 / steps);
        obs.unobserve(el);
      }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.unobserve(el);
  }, [target]);
  return <span ref={ref}>{val}{suffix}</span>;
}

const pillars = [
  { icon: "🎯", title: "Strategic Advisory", text: "Deep expertise translating your business goals into SAP roadmaps." },
  { icon: "⚙️", title: "Implementation", text: "End-to-end SAP deployment with agile methodologies and best practices." },
  { icon: "☁️", title: "Cloud Migration", text: "Seamless transition to cloud-native SAP environments at your pace." },
  { icon: "🔄", title: "Managed Services", text: "Ongoing application management ensuring peak operational performance." },
];

export default function About() {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,800;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');

        .about-grid { display:grid; grid-template-columns:1fr 1fr; gap:72px; align-items:start; }
        .about-pillars { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
        .pillar-card {
          padding:22px 20px; border-radius:14px;
          background:#fff; border:1px solid #e2e8f0;
          transition: all 0.28s ease;
        }
        .pillar-card:hover { transform:translateY(-4px); box-shadow:0 16px 40px rgba(15,76,143,0.10); border-color:#bfdbfe; }

        .stat-card {
          padding:28px 16px; text-align:center; border-radius:16px;
          background:#fff; border:1px solid #e2e8f0;
          box-shadow:0 2px 12px rgba(0,0,0,0.04);
          transition: all 0.28s ease;
        }
        .stat-card:hover { transform:translateY(-5px); box-shadow:0 20px 40px rgba(15,76,143,0.12); }

        .tag-chip {
          font-family:'Plus Jakarta Sans',sans-serif; font-size:12px; font-weight:600;
          color:#0f4c8f; border:1.5px solid #bfdbfe; border-radius:100px;
          padding:5px 16px; background:#eff6ff; cursor:default;
          transition: all 0.2s ease;
        }
        .tag-chip:hover { background:#0f4c8f; color:#fff; border-color:#0f4c8f; }

        .read-btn {
          display:inline-flex; align-items:center; gap:8px;
          background:linear-gradient(135deg,#0f4c8f,#1d4ed8); color:#fff;
          padding:13px 28px; border-radius:10px; border:none; cursor:pointer;
          font-family:'Plus Jakarta Sans',sans-serif; font-weight:700; font-size:13px;
          letter-spacing:0.5px; transition:all 0.25s ease;
          box-shadow:0 6px 20px rgba(15,76,143,0.28);
        }
        .read-btn:hover { transform:translateY(-2px); box-shadow:0 12px 30px rgba(15,76,143,0.38); }

        @media(max-width:900px) { .about-grid{grid-template-columns:1fr !important;gap:48px !important;} }
        @media(max-width:560px) { .about-pillars{grid-template-columns:1fr !important;} }
      `}</style>

      <section id="about" style={{ padding:"100px 0", background:"#f8faff", position:"relative", overflow:"hidden" }}>

        {/* Dot grid */}
        <div aria-hidden style={{ position:"absolute",inset:0,backgroundImage:"radial-gradient(circle,#c8d8f0 1px,transparent 1px)",backgroundSize:"30px 30px",opacity:0.38,pointerEvents:"none" }} />
        {/* Glow orb */}
        <div aria-hidden style={{ position:"absolute",top:-150,right:-100,width:500,height:500,borderRadius:"50%",background:"radial-gradient(circle,rgba(59,130,246,0.07),transparent 70%)",pointerEvents:"none" }} />

        <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 24px", position:"relative" }}>
          <div className="about-grid">

            {/* ── LEFT: Text content ── */}
            <div>
              <Reveal>
                <div style={{ display:"flex",alignItems:"center",gap:10,marginBottom:18 }}>
                  <div style={{ width:28,height:2.5,background:"#0f4c8f",borderRadius:2 }} />
                  <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:11,fontWeight:800,letterSpacing:"3px",textTransform:"uppercase",color:"#0f4c8f" }}>About MROC</span>
                </div>
              </Reveal>

              <Reveal delay={0.07}>
                <h2 style={{ fontFamily:"'Playfair Display',serif",fontSize:"clamp(2rem,3.5vw,3rem)",fontWeight:800,color:"#050f24",lineHeight:1.15,marginBottom:18 }}>
                  SAP Consulting &{" "}
                  <em style={{ color:"#1d4ed8",fontStyle:"italic" }}>Business Transformation</em>
                </h2>
              </Reveal>

              <Reveal delay={0.12}>
                <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:16,lineHeight:1.85,color:"#475569",marginBottom:18 }}>
                  <strong style={{ color:"#0a1628",fontWeight:700 }}>MROC — My Resource on Cloud</strong> is a globally trusted SAP consulting leader, delivering high-impact technology solutions that create measurable business value across 15+ countries and 8 distinct industries.
                </p>
              </Reveal>

              <Reveal delay={0.16}>
                <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:16,lineHeight:1.85,color:"#475569",marginBottom:18 }}>
                  We partner with enterprises to architect, implement, and continuously optimize SAP ecosystems — ensuring scalability, resilience, and long-term competitive advantage.
                </p>
              </Reveal>

              {expanded && (
                <>
                  <Reveal>
                    <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:16,lineHeight:1.85,color:"#475569",marginBottom:18 }}>
                      Our premium Application Management Services keep your SAP landscape running at peak efficiency post-go-live, so your teams can stay focused on growth and innovation.
                    </p>
                  </Reveal>
                  <Reveal delay={0.06}>
                    <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:16,lineHeight:1.85,color:"#475569",marginBottom:18 }}>
                      From Fortune 500 enterprises to agile mid-market companies, we tailor every engagement to your specific context — delivering outcomes, not just solutions.
                    </p>
                  </Reveal>
                </>
              )}

              {/* Tags */}
              <Reveal delay={0.2}>
                <div style={{ display:"flex",flexWrap:"wrap",gap:10,marginBottom:28,marginTop:8 }}>
                  {["SAP S/4HANA","Cloud Migration","AMS","Data Analytics","Business Advisory","Quality Engineering"].map(t => (
                    <span key={t} className="tag-chip">{t}</span>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={0.24}>
                <button className="read-btn" onClick={() => setExpanded(e => !e)}>
                  {expanded ? "Show Less" : "Read More"}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: expanded ? "rotate(90deg)" : "none", transition: "transform 0.2s" }}>
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>
              </Reveal>
            </div>

            {/* ── RIGHT: Visual + Stats ── */}
            <div>
              {/* Hero visual panel */}
              <Reveal delay={0.1} direction="right">
                <div style={{
                  width:"100%", aspectRatio:"16/10", borderRadius:22,
                  background:"linear-gradient(135deg, #050f24 0%, #0f2d5e 50%, #1d4ed8 100%)",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  marginBottom:24, position:"relative", overflow:"hidden",
                  boxShadow:"0 28px 72px rgba(5,15,36,0.25)",
                }}>
                  {/* Background rings */}
                  {[200,300,400].map(s => <div key={s} aria-hidden style={{ position:"absolute",width:s,height:s,borderRadius:"50%",border:"1px solid rgba(255,255,255,0.06)" }} />)}

                  {/* Content */}
                  <div style={{ textAlign:"center",position:"relative",zIndex:2 }}>
                    <div style={{ fontFamily:"'Playfair Display',serif",fontSize:"clamp(2.5rem,5vw,4rem)",fontWeight:700,color:"rgba(255,255,255,0.92)",letterSpacing:8,marginBottom:8 }}>MROC</div>
                    <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:10,fontWeight:700,letterSpacing:"3px",textTransform:"uppercase",color:"rgba(255,255,255,0.4)" }}>My Resource on Cloud</div>
                    {/* Decorative underline */}
                    <div style={{ width:60,height:2.5,background:"linear-gradient(90deg,#3b82f6,#60a5fa)",borderRadius:2,margin:"16px auto 0" }} />
                  </div>

                  {/* Corner accent */}
                  <div aria-hidden style={{ position:"absolute",bottom:-30,right:-30,width:120,height:120,borderRadius:"50%",background:"rgba(59,130,246,0.15)",filter:"blur(30px)" }} />
                </div>
              </Reveal>

              {/* Stats row */}
              <Reveal delay={0.18} direction="right">
                <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14,marginBottom:24 }}>
                  {[
                    { n:15, suffix:"+", label:"Countries", icon:"🌍" },
                    { n:200, suffix:"+", label:"Clients", icon:"🤝" },
                    { n:8, suffix:"", label:"Industries", icon:"🏭" },
                  ].map(({ n,suffix,label,icon }) => (
                    <div key={label} className="stat-card">
                      <div style={{ fontSize:"1.3rem",marginBottom:6 }}>{icon}</div>
                      <div style={{ fontFamily:"'Playfair Display',serif",fontSize:"2rem",fontWeight:700,color:"#0f4c8f",lineHeight:1,marginBottom:6 }}>
                        <Counter target={n} suffix={suffix} />
                      </div>
                      <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:10,fontWeight:700,letterSpacing:"1.5px",textTransform:"uppercase",color:"#94a3b8" }}>{label}</div>
                    </div>
                  ))}
                </div>
              </Reveal>

              {/* Pillars */}
              <Reveal delay={0.22} direction="right">
                <div className="about-pillars">
                  {pillars.map(({ icon,title,text }) => (
                    <div key={title} className="pillar-card">
                      <div style={{ fontSize:"1.5rem",marginBottom:10 }}>{icon}</div>
                      <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:700,fontSize:14,color:"#0a1628",marginBottom:6 }}>{title}</div>
                      <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:13,color:"#64748b",lineHeight:1.65 }}>{text}</div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}