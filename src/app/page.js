'use client';
import { useState, useEffect, useRef } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Industries from "./components/Industries";
import Insights from "./components/Insights";
import Footer from "./components/Footer";

/* ══════════════════════════════════════
   ROOT APP + GLOBAL CSS
══════════════════════════════════════ */
const globalCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;600;700;800&family=Open+Sans:wght@300;400;500;600&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { font-family: 'Open Sans', sans-serif; color: #1f2937; background: #fff; line-height: 1.6; overflow-x: hidden; font-size: 15px; }
  h1,h2,h3,h4,h5,h6 { font-family: 'Raleway', sans-serif; }
  a { text-decoration: none; color: inherit; }

  @keyframes slideUp { from { opacity:0; transform:translateY(22px); } to { opacity:1; transform:translateY(0); } }
  @keyframes ddFade { from { opacity:0; transform:translateY(6px); } to { opacity:1; transform:translateY(0); } }

  /* Responsive */
  @media (max-width: 960px) {
    .desktop-nav { display: none !important; }
    .hamburger { display: flex !important; }
  }
  @media (max-width: 768px) {
    .about-grid { grid-template-columns: 1fr !important; gap: 36px !important; }
    .ind-grid { grid-template-columns: repeat(2,1fr) !important; }
    .ins-grid { grid-template-columns: repeat(2,1fr) !important; }
    .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 32px !important; }
    .svc-row { grid-template-columns: 1fr !important; }
  }
  @media (max-width: 500px) {
    .ind-grid { grid-template-columns: 1fr !important; }
    .ins-grid { grid-template-columns: 1fr !important; }
    .footer-grid { grid-template-columns: 1fr !important; }
  }
`;

export default function App() {
  return (
    <>
      <style>{globalCSS}</style>

      <Navbar />
      <Hero />
      <About />
      <Services />
      <Industries />
      <Insights />
      <Footer />
    </>
  );
}
