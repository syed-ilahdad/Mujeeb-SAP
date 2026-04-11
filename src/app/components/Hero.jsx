import { useState, useEffect } from "react";

/* ══════════════════════════════════════
   HERO SLIDER
══════════════════════════════════════ */
const slides = [
  {
    title: "Integrate Your Physical and Digital Stores with MROC",
    sub: "MROC delivers cutting-edge SAP solutions that unify your commerce channels and create seamless customer experiences across all touchpoints.",
    bg: "linear-gradient(rgba(5,20,45,0.6), rgba(5,20,45,0.6)), url('/office.jpg')"
  },
  {
    title: "Trusted by Large and Small Businesses Worldwide",
    sub: "From Fortune 500 enterprises to fast-growing mid-market companies, MROC brings SAP expertise that scales with your ambitions.",
    bg: "linear-gradient(rgba(5,20,45,0.6), rgba(5,20,45,0.6)), url('/meet.jpg')"
  },
  {
    title: "Transition to a Data-Driven Enterprise with SAP Datasphere",
    sub: "Unlock the full potential of your data with real-time analytics, predictive intelligence, and cloud-native data management.",
    bg: "linear-gradient(rgba(5,20,45,0.6), rgba(5,20,45,0.6)), url('/digitalshop.jpg')"
  },
  {
    title: "The Company That Leaders Trust to Help Them Grow and Thrive",
    sub: "MROC combines deep SAP consulting expertise with a client-first approach — guiding you from strategy to implementation and beyond.",
    bg: "linear-gradient(rgba(5,20,45,0.6), rgba(5,20,45,0.6)), url('/sapdatadiven.jpg')"
  }
];

function Hero() {
  const [cur, setCur] = useState(0);
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setCur(c => (c + 1) % slides.length);
      setAnimKey(k => k + 1);
    }, 6000);
    return () => clearInterval(t);
  }, []);

  const go = (i) => {
    setCur(i);
    setAnimKey(k => k + 1);
  };

  return (
    <section id="home" style={{ paddingTop: 70 }}>
      <div style={{ position: "relative", height: 560, overflow: "hidden" }}>

        {slides.map((s, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: s.bg,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              display: "flex",
              alignItems: "center",
              opacity: i === cur ? 1 : 0,
              transition: "opacity 0.9s ease"
            }}
          >
            <div style={{ position: "relative", zIndex: 2, maxWidth: 1200, margin: "0 auto", padding: "0 24px", width: "100%" }}>
              {i === cur && (
                <div key={animKey}>
                  <div style={{ fontFamily: "Raleway,sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "rgba(255,255,255,0.6)", marginBottom: 18, animation: "slideUp 0.5s ease both" }}>
                    My Resource on Cloud
                  </div>

                  <h1 style={{ fontFamily: "Raleway,sans-serif", fontSize: "clamp(1.9rem,3.8vw,2.9rem)", fontWeight: 800, color: "#fff", maxWidth: 680, lineHeight: 1.2, marginBottom: 20, animation: "slideUp 0.6s 0.1s ease both" }}>
                    {s.title}
                  </h1>

                  <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.78)", maxWidth: 540, lineHeight: 1.75, marginBottom: 32, fontWeight: 300, animation: "slideUp 0.6s 0.2s ease both" }}>
                    {s.sub}
                  </p>

                  <div style={{ display: "flex", gap: 12, flexWrap: "wrap", animation: "slideUp 0.6s 0.3s ease both" }}>
                    <a href="#about" style={heroBtn("#0f4c8f")}>Read More</a>
                    <a href="#contact" style={heroOutlineBtn}>Contact Us</a>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Controls */}
        <div style={{ position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)", zIndex: 10, display: "flex", alignItems: "center", gap: 18 }}>
          <button onClick={() => go((cur - 1 + slides.length) % slides.length)} style={arrowBtn}>&#8249;</button>

          <div style={{ display: "flex", gap: 8 }}>
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                style={{
                  width: i === cur ? 24 : 8,
                  height: 8,
                  borderRadius: i === cur ? 4 : "50%",
                  background: i === cur ? "#fff" : "rgba(255,255,255,0.38)",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  transition: "all 0.3s"
                }}
              />
            ))}
          </div>

          <button onClick={() => go((cur + 1) % slides.length)} style={arrowBtn}>&#8250;</button>
        </div>
      </div>
    </section>
  );
}

const heroBtn = (bg) => ({
  display: "inline-block",
  background: bg,
  color: "#fff",
  padding: "12px 28px",
  fontFamily: "Raleway,sans-serif",
  fontWeight: 700,
  fontSize: 13,
  letterSpacing: 0.5,
  border: "none",
  cursor: "pointer",
  textDecoration: "none"
});

const heroOutlineBtn = {
  display: "inline-block",
  background: "transparent",
  color: "#fff",
  padding: "11px 27px",
  fontFamily: "Raleway,sans-serif",
  fontWeight: 700,
  fontSize: 13,
  letterSpacing: 0.5,
  border: "2px solid rgba(255,255,255,0.6)",
  cursor: "pointer",
  textDecoration: "none"
};

const arrowBtn = {
  background: "rgba(255,255,255,0.18)",
  border: "1px solid rgba(255,255,255,0.35)",
  color: "#fff",
  width: 40,
  height: 40,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  fontSize: "1.2rem",
  transition: "background 0.2s"
};

export default Hero;