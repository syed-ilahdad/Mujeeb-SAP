"USE CLIENT"

import { useState, useEffect } from "react";

const slides = [
  {
    tag: "Omnichannel Commerce",
    title: "Integrate Your Physical\nand Digital Stores",
    sub: "MROC delivers cutting-edge SAP solutions that unify your commerce channels and create seamless customer experiences across every touchpoint.",
    img: "/office.jpg",
    accent: "#3b82f6",
  },
  {
    tag: "Global Partnerships",
    title: "Trusted by Businesses\nWorldwide",
    sub: "From Fortune 500 enterprises to fast-growing mid-market companies, MROC brings SAP expertise that scales with your ambitions.",
    img: "/meet.jpg",
    accent: "#60a5fa",
  },
  {
    tag: "Data & Analytics",
    title: "Transition to a\nData-Driven Enterprise",
    sub: "Unlock the full potential of your data with SAP Datasphere — real-time analytics, predictive intelligence, and cloud-native management.",
    img: "/digitalshop.jpg",
    accent: "#93c5fd",
  },
  {
    tag: "Strategic Consulting",
    title: "The Partner That\nLeaders Trust",
    sub: "MROC combines deep SAP consulting expertise with a client-first approach — guiding you from strategy to implementation and beyond.",
    img: "/sapdatadiven.jpg",
    accent: "#7dd3fc",
  },
];

export default function Hero() {
  const [cur, setCur] = useState(0);
  const [animating, setAnimating] = useState(false);

  const go = (i) => {
    if (animating || i === cur) return;
    setAnimating(true);
    setCur(i);
    setTimeout(() => setAnimating(false), 1000);
  };

  useEffect(() => {
    const t = setInterval(() => go((cur + 1) % slides.length), 6500);
    return () => clearInterval(t);
  }, [cur, animating]);

  const s = slides[cur];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,800;1,400;1,700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');

        @keyframes heroFadeIn  { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes imgScale    { from{transform:scale(1.06)} to{transform:scale(1)} }
        @keyframes progressBar { from{width:0%} to{width:100%} }
        @keyframes dotPulse    { 0%,100%{opacity:1} 50%{opacity:0.4} }

        .hero-section {
          position:relative; overflow:hidden;
          height: calc(100svh - 76px); min-height:520px; max-height:860px;
        }

        .hero-slide {
          position:absolute; inset:0;
          background-size:cover; background-position:center;
          transition: opacity 1s ease;
        }
        .hero-slide.active { animation: imgScale 8s ease forwards; }

        .hero-overlay {
          position:absolute; inset:0;
          background: linear-gradient(110deg, rgba(5,15,36,0.88) 0%, rgba(5,15,36,0.65) 55%, rgba(5,15,36,0.35) 100%);
        }

        .hero-content {
          position:relative; z-index:2;
          max-width:1280px; margin:0 auto; padding:0 24px;
          height:100%; display:flex; flex-direction:column; justify-content:center;
        }

        .hero-tag {
          display:inline-flex; align-items:center; gap:10px; margin-bottom:24px;
          animation: heroFadeIn 0.6s ease both;
        }
        .hero-tag-line { width:32px; height:2px; border-radius:2px; }
        .hero-tag-text {
          font-family:'Plus Jakarta Sans',sans-serif; font-size:12px;
          font-weight:700; letter-spacing:3px; text-transform:uppercase;
        }

        .hero-h1 {
          font-family:'Playfair Display',serif; font-weight:800;
          font-size:clamp(2.4rem,5.5vw,4.2rem);
          color:#fff; line-height:1.1; margin-bottom:24px;
          white-space:pre-line;
          animation: heroFadeIn 0.7s 0.1s ease both; opacity:0;
        }

        .hero-sub {
          font-family:'Plus Jakarta Sans',sans-serif; font-size:clamp(1rem,1.6vw,1.15rem);
          color:rgba(255,255,255,0.72); max-width:540px; line-height:1.8;
          font-weight:400; margin-bottom:40px;
          animation: heroFadeIn 0.7s 0.2s ease both; opacity:0;
        }

        .hero-btns {
          display:flex; gap:14px; flex-wrap:wrap;
          animation: heroFadeIn 0.7s 0.3s ease both; opacity:0;
        }

        .hero-btn-pri {
          display:inline-flex; align-items:center; gap:8px;
          background: linear-gradient(135deg, #0f4c8f, #1d4ed8);
          color:#fff; padding:15px 32px;
          font-family:'Plus Jakarta Sans',sans-serif; font-weight:700;
          font-size:14px; letter-spacing:0.5px;
          text-decoration:none; border-radius:10px;
          box-shadow:0 8px 28px rgba(15,76,143,0.4);
          transition: all 0.25s ease;
        }
        .hero-btn-pri:hover { transform:translateY(-3px); box-shadow:0 14px 36px rgba(15,76,143,0.5); }

        .hero-btn-sec {
          display:inline-flex; align-items:center; gap:8px;
          background:rgba(255,255,255,0.08); backdrop-filter:blur(8px);
          color:#fff; padding:14px 31px;
          font-family:'Plus Jakarta Sans',sans-serif; font-weight:600;
          font-size:14px; letter-spacing:0.5px;
          text-decoration:none; border-radius:10px;
          border:1.5px solid rgba(255,255,255,0.25);
          transition: all 0.25s ease;
        }
        .hero-btn-sec:hover { background:rgba(255,255,255,0.16); border-color:rgba(255,255,255,0.5); transform:translateY(-3px); }

        /* Controls */
        .hero-controls {
          position:absolute; bottom:36px; left:50%; transform:translateX(-50%);
          z-index:10; display:flex; align-items:center; gap:16px;
        }

        .hero-arrow {
          width:44px; height:44px; border-radius:50%;
          background:rgba(255,255,255,0.1); backdrop-filter:blur(8px);
          border:1.5px solid rgba(255,255,255,0.2);
          color:#fff; font-size:1.4rem; cursor:pointer;
          display:flex; align-items:center; justify-content:center;
          transition: all 0.2s ease;
        }
        .hero-arrow:hover { background:rgba(255,255,255,0.22); transform:scale(1.08); }

        .dot {
          border:none; cursor:pointer; padding:0; border-radius:100px;
          transition: all 0.35s ease;
        }

        /* Progress bar */
        .progress-bar {
          position:absolute; bottom:0; left:0; height:3px;
          background:linear-gradient(90deg, #0f4c8f, #3b82f6);
          animation: progressBar 6.5s linear;
        }

        /* Slide counter */
        .slide-counter {
          position:absolute; bottom:44px; right:28px; z-index:10;
          font-family:'Plus Jakarta Sans',sans-serif; font-size:12px;
          font-weight:700; color:rgba(255,255,255,0.35); letter-spacing:2px;
        }

        /* Side decorators */
        .hero-stat-bar {
          position:absolute; right:0; top:50%; transform:translateY(-50%);
          z-index:5; display:flex; flex-direction:column; gap:0;
          border-left:1px solid rgba(255,255,255,0.1);
        }
        .hero-stat {
          padding:20px 28px; text-align:center;
          border-bottom:1px solid rgba(255,255,255,0.08);
        }
        .hero-stat-num { font-family:'Playfair Display',serif; font-size:1.8rem; font-weight:700; color:#fff; }
        .hero-stat-label { font-family:'Plus Jakarta Sans',sans-serif; font-size:10px; font-weight:600; letter-spacing:2px; text-transform:uppercase; color:rgba(255,255,255,0.4); margin-top:3px; }

        @media (max-width: 768px) {
          .hero-section { height:calc(100svh - 68px); }
          .hero-stat-bar { display:none !important; }
          .hero-content { padding:0 20px; }
          .slide-counter { right:16px; }
        }
        @media (max-width: 480px) {
          .hero-btns { flex-direction:column; }
          .hero-btn-pri, .hero-btn-sec { text-align:center; justify-content:center; }
        }
      `}</style>

      <section id="home" style={{ paddingTop: 76 }}>
        <div className="hero-section">

          {/* Slides */}
          {slides.map((sl, i) => (
            <div
              key={i}
              className={`hero-slide${i === cur ? " active" : ""}`}
              style={{
                backgroundImage: `url(${sl.img})`,
                opacity: i === cur ? 1 : 0,
                zIndex: i === cur ? 1 : 0,
              }}
            >
              <div className="hero-overlay" />
            </div>
          ))}

          {/* Content */}
          <div className="hero-content" style={{ zIndex: 3 }}>
            <div key={`tag-${cur}`} className="hero-tag">
              <div className="hero-tag-line" style={{ background: s.accent }} />
              <span className="hero-tag-text" style={{ color: s.accent }}>{s.tag}</span>
            </div>

            <h1 key={`h1-${cur}`} className="hero-h1">{s.title}</h1>

            <p key={`sub-${cur}`} className="hero-sub">{s.sub}</p>

            <div key={`btn-${cur}`} className="hero-btns">
              <a href="#about" className="hero-btn-pri">
                Discover More
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
              <a href="#contact" className="hero-btn-sec">
                Talk to an Expert
              </a>
            </div>
          </div>

          {/* Stats sidebar */}
          <div className="hero-stat-bar">
            {[["15+","Countries"],["200+","Clients"],["8","Industries"]].map(([n,l]) => (
              <div key={l} className="hero-stat">
                <div className="hero-stat-num">{n}</div>
                <div className="hero-stat-label">{l}</div>
              </div>
            ))}
          </div>

          {/* Controls */}
          <div className="hero-controls">
            <button className="hero-arrow" onClick={() => go((cur - 1 + slides.length) % slides.length)} aria-label="Prev">&#8249;</button>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              {slides.map((_, i) => (
                <button key={i} className="dot" onClick={() => go(i)}
                  style={{ width: i === cur ? 28 : 8, height: 8, background: i === cur ? "#fff" : "rgba(255,255,255,0.32)" }}
                  aria-label={`Slide ${i+1}`}
                />
              ))}
            </div>
            <button className="hero-arrow" onClick={() => go((cur + 1) % slides.length)} aria-label="Next">&#8250;</button>
          </div>

          {/* Progress bar */}
          <div key={`prog-${cur}`} className="progress-bar" style={{ zIndex: 10 }} />

          {/* Slide counter */}
          <div className="slide-counter">{String(cur+1).padStart(2,"0")} / {String(slides.length).padStart(2,"0")}</div>
        </div>
      </section>
    </>
  );
}