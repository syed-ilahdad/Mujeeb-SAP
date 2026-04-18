"USE CLIENT"

import { useEffect, useRef, useState } from "react";

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.IntersectionObserver) { setVisible(true); return; }
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.unobserve(el); }
    }, { threshold: 0.08, rootMargin: "0px 0px -40px 0px" });
    obs.observe(el);
    return () => obs.unobserve(el);
  }, []);
  return [ref, visible];
}

function Reveal({ children, delay = 0, direction = "up", style: s = {} }) {
  const [ref, visible] = useReveal();
  const o = { up:"translateY(30px)", left:"translateX(-30px)", right:"translateX(30px)" };
  return (
    <div ref={ref} style={{
      opacity:visible?1:0, transform:visible?"none":o[direction],
      transition:`opacity 0.7s cubic-bezier(.4,0,.2,1) ${delay}s, transform 0.7s cubic-bezier(.4,0,.2,1) ${delay}s`,
      willChange:"opacity, transform", height:"100%", ...s,
    }}>{children}</div>
  );
}

const industries = [
  { name:"Retail", emoji:"🛍️", accent:"#0f4c8f", accentLight:"#eff6ff", accentBorder:"#bfdbfe",
    desc:"Futuristic retail solutions powered by AI-driven insights, omnichannel integration, and real-time inventory analytics." },
  { name:"Fashion", emoji:"👗", accent:"#7c3aed", accentLight:"#f5f3ff", accentBorder:"#ddd6fe",
    desc:"Speed-to-market solutions for global fashion brands with integrated supply chain and trend-responsive demand planning." },
  { name:"Consumer Products", emoji:"📦", accent:"#0369a1", accentLight:"#f0f9ff", accentBorder:"#bae6fd",
    desc:"End-to-end digital transformation for consumer products companies navigating rapidly shifting market demands." },
  { name:"Manufacturing & Logistics", emoji:"🏭", accent:"#166534", accentLight:"#f0fdf4", accentBorder:"#bbf7d0",
    desc:"Smart factory to connected logistics — transforming operations through innovation, automation, and data visibility." },
  { name:"Technology, Media & Telecom", emoji:"📡", accent:"#b45309", accentLight:"#fffbeb", accentBorder:"#fde68a",
    desc:"Domain expertise and fit-to-standard approaches enabling tech-driven organizations to innovate at scale." },
  { name:"Healthcare, Public Sector & Defense", emoji:"🏥", accent:"#0f766e", accentLight:"#f0fdfa", accentBorder:"#99f6e4",
    desc:"Comprehensive solutions delivering better insights, regulatory compliance, and operational value in critical sectors." },
];

export default function Industries() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');

        .ind-grid {
          display:grid; grid-template-columns:repeat(3,1fr); gap:24px;
          max-width:1100px; margin:0 auto;
        }
        .ind-card {
          border-radius:18px; overflow:hidden; background:#fff;
          border:1px solid #e2e8f0;
          transition:transform 0.3s ease, box-shadow 0.3s ease;
          display:flex; flex-direction:column;
          height:100%;
        }
        .ind-card:hover { transform:translateY(-8px); box-shadow:0 24px 56px rgba(0,0,0,0.10); }

        .ind-learn {
          display:inline-flex; align-items:center; gap:5px;
          font-family:'Plus Jakarta Sans',sans-serif; font-size:12.5px;
          font-weight:700; text-decoration:none;
          transition:gap 0.2s ease;
        }
        .ind-learn:hover { gap:9px !important; }

        @media(max-width:900px) { .ind-grid{grid-template-columns:repeat(2,1fr) !important;} }
        @media(max-width:540px) { .ind-grid{grid-template-columns:1fr !important;} }
      `}</style>

      <section id="industries" style={{ padding:"100px 0", background:"#fff", position:"relative", overflow:"hidden" }}>

        <div aria-hidden style={{ position:"absolute",inset:0,backgroundImage:"radial-gradient(circle,#e2e8f0 1px,transparent 1px)",backgroundSize:"30px 30px",opacity:0.3,pointerEvents:"none" }} />

        <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 24px", position:"relative" }}>

          {/* Header */}
          <Reveal style={{ height:"auto" }}>
            <div style={{ textAlign:"center", marginBottom:64 }}>
              <div style={{ display:"inline-flex",alignItems:"center",gap:10,marginBottom:18 }}>
                <div style={{ width:28,height:2.5,background:"#0f4c8f",borderRadius:2 }} />
                <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:11,fontWeight:800,letterSpacing:"3px",textTransform:"uppercase",color:"#0f4c8f" }}>Industries</span>
                <div style={{ width:28,height:2.5,background:"#0f4c8f",borderRadius:2 }} />
              </div>
              <h2 style={{ fontFamily:"'Playfair Display',serif",fontSize:"clamp(2rem,3.5vw,3rem)",fontWeight:800,color:"#050f24",lineHeight:1.15,marginBottom:16 }}>
                Providing Concrete Value{" "}
                <em style={{ color:"#1d4ed8",fontStyle:"italic" }}>Across Industries</em>
              </h2>
              <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:16,color:"#64748b",maxWidth:520,margin:"0 auto",lineHeight:1.8 }}>
                Innovation, speed, and expertise — tailored for every domain we serve across the globe.
              </p>
            </div>
          </Reveal>

          {/* Cards grid */}
          <div className="ind-grid">
            {industries.map((ind, i) => (
              <div key={ind.name} style={{ display:"flex" }}>
                <Reveal delay={i * 0.06}>
                  <div className="ind-card">
                    {/* Banner */}
                    <div style={{
                      height:152, display:"flex", alignItems:"center", justifyContent:"center",
                      fontSize:"3rem", background:ind.accentLight,
                      position:"relative", flexShrink:0, overflow:"hidden",
                    }}>
                      {ind.emoji}
                      <div aria-hidden style={{ position:"absolute",bottom:0,left:0,right:0,height:3,background:ind.accent,opacity:0.55 }} />
                    </div>

                    {/* Body */}
                    <div style={{ padding:"22px 24px 26px", display:"flex", flexDirection:"column", flexGrow:1 }}>
                      <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:800,fontSize:15.5,color:"#050f24",marginBottom:10,lineHeight:1.3 }}>
                        {ind.name}
                      </div>
                      <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:14,color:"#64748b",lineHeight:1.75,flexGrow:1,marginBottom:18 }}>
                        {ind.desc}
                      </p>
                      <a href="#" className="ind-learn" style={{ color:ind.accent }}>
                        Learn More
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                      </a>
                    </div>
                  </div>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}