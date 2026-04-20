"use client";

import { useState, useEffect, useRef } from "react";

/* ── Design tokens ── */
const T = {
  navy: "#050f24",
  blue: "#0f4c8f",
  indigo: "#1d4ed8",
  sky: "#3b82f6",
  skyLight: "#93c5fd",
  slate900: "#0a1628",
  slate500: "#64748b",
  slate200: "#e2e8f0",
  white: "#ffffff",
};

const menuData = [
  { label: "Home", href: "/" },

  {
    label: "Services",
    groups: [
      {
        title: "S/4HANA Services",
        items: ["S/4HANA Advisory", "S/4 Migration", "Rise with SAP"],
      },
      {
        title: "SAP BTP",
        items: ["App Development", "Automation", "Integration", "AI & ML"],
      },
      {
        title: "Data & Analytics",
        items: [
          "Strategy & Advisory",
          "Analytics & Planning",
          "Data Management",
          "Cloud Warehousing",
        ],
      },
      {
        title: "Business Advisory",
        items: [
          "Process Intelligence",
          "Value Assurance",
          "People & Org",
          "Process Automation",
        ],
      },
      {
        title: "Finance",
        items: ["FP&A", "Finance Analytics", "Central Finance"],
      },
      {
        title: "Cloud",
        items: ["Cloud Advisory", "Data Transition", "Cloud Security"],
      },
      { title: "App Management Services", items: [] },
      { title: "Quality Engineering", items: [] },
    ],
    href: "/services",
  },

  {
    label: "Solutions",
    groups: [
      {
        title: "S/4HANA",
        items: [
          "Config Migration",
          "Code Modernization",
          "Data Transition Platform",
        ],
      },
      {
        title: "Digital Toolkit",
        items: ["RunWay Approach", "RunningStart Methodology"],
      },
      {
        title: "Data Tools",
        items: [
          "Data Quality Toolkit",
          "Governance Blueprint",
          "Migration Accelerator",
        ],
      },
      {
        title: "Finance",
        items: [
          "Finance Performance Mgmt",
          "AP Automation",
          "S/4 Finance Starter",
        ],
      },
    ],
    href: "/solutions",
  },

  {
    label: "Industries",
    groups: [
      {
        title: "",
        items: [
          "Consumer Products",
          "Manufacturing & Logistics",
          "Energy & Utilities",
          "Technology & Media",
          "Telecommunication",
          "Healthcare",
          "Public Sector & Defense",
        ],
      },
    ],
    href: "/industries",
  },

  {
    label: "Insights",
    groups: [
      {
        title: "",
        items: ["Blogs & Articles", "Career Opportunities", "Success Stories"],
      },
    ],
    href: "/insights",
  },

  { label: "About", href: "/about" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExp, setMobileExp] = useState(null);
  const closeTimer = useRef(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const onEnter = (label) => {
    clearTimeout(closeTimer.current);
    setOpenMenu(label);
  };

  const onLeave = () => {
    closeTimer.current = setTimeout(() => setOpenMenu(null), 150);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        @keyframes ddIn { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        @keyframes mobileIn { from{opacity:0;transform:translateX(-10px)} to{opacity:1;transform:translateX(0)} }

        .mroc-nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
          background: rgba(255,255,255,0.97);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid #e2e8f0;
          transition: box-shadow 0.3s ease;
        }
        .mroc-nav.scrolled { box-shadow: 0 4px 32px rgba(5,15,36,0.10); }

        .nav-inner {
          max-width: 1280px; margin: 0 auto;
          padding: 0 24px;
          display: flex; align-items: center; justify-content: space-between;
          height: 76px;
        }

        /* Logo */
        .mroc-logo { display:flex; align-items:center; gap:12px; text-decoration:none; }
        .logo-mark {
          width:46px; height:46px; border-radius:12px;
          background: linear-gradient(135deg, #050f24 0%, #0f4c8f 60%, #3b82f6 100%);
          display:flex; align-items:center; justify-content:center;
          position:relative; overflow:hidden; flex-shrink:0;
          box-shadow: 0 4px 16px rgba(15,76,143,0.35);
        }
        .logo-mark::after {
          content:''; position:absolute; inset:0;
          background: linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 60%);
        }
        .logo-mark svg { position:relative; z-index:1; }
        .logo-text-main {
          font-family:'Playfair Display',serif; font-weight:700; font-size:1.35rem;
          color:#050f24; letter-spacing:-0.3px; line-height:1.1;
        }
        .logo-text-sub {
          font-family:'Plus Jakarta Sans',sans-serif; font-size:9.5px;
          font-weight:600; letter-spacing:2.5px; text-transform:uppercase;
          color:#64748b; line-height:1;
        }

        /* Desktop nav items */
        .desktop-nav { display:flex; align-items:center; list-style:none; margin:0; padding:0; }
        .nav-item { position:relative; }
        .nav-btn {
          background:none; border:none; cursor:pointer;
          font-family:'Plus Jakarta Sans',sans-serif; font-weight:600; font-size:13.5px;
          color:#334155; padding:0 14px; height:76px;
          display:flex; align-items:center; gap:5px;
          text-decoration:none; white-space:nowrap;
          transition: color 0.2s ease;
          position:relative;
        }
        .nav-btn::after {
          content:''; position:absolute; bottom:0; left:14px; right:14px; height:2.5px;
          background: linear-gradient(90deg, #0f4c8f, #3b82f6);
          border-radius:2px 2px 0 0;
          transform:scaleX(0); transform-origin:left;
          transition: transform 0.25s cubic-bezier(.4,0,.2,1);
        }
        .nav-btn:hover { color:#0f4c8f; }
        .nav-btn:hover::after { transform:scaleX(1); }
        .nav-chevron { font-size:9px; transition:transform 0.2s ease; display:inline-block; margin-top:1px; }
        .nav-item:hover .nav-chevron { transform:rotate(180deg); }

        /* Dropdown */
        .dd-panel {
          position:absolute; top:100%; left:0;
          background:#fff; border:1px solid #e2e8f0;
          border-top:2.5px solid #0f4c8f;
          border-radius:0 0 16px 16px;
          box-shadow: 0 20px 60px rgba(5,15,36,0.12);
          padding:24px 28px; min-width:420px;
          display:grid; gap:14px 32px;
          animation: ddIn 0.2s ease;
        }
        .dd-group-title {
          font-family:'Plus Jakarta Sans',sans-serif; font-size:10px;
          font-weight:800; text-transform:uppercase; letter-spacing:1.8px;
          color:#0f4c8f; margin-bottom:8px; padding-bottom:6px;
          border-bottom:1px solid #f1f5f9;
        }
        .dd-link {
          display:block; font-family:'Plus Jakarta Sans',sans-serif;
          font-size:13.5px; font-weight:500; color:#475569;
          padding:5px 0; text-decoration:none; border-bottom:1px solid #f8faff;
          transition: color 0.15s, padding-left 0.15s;
        }
        .dd-link:hover { color:#0f4c8f; padding-left:6px; }

        /* CTA button */
        .nav-cta {
          font-family:'Plus Jakarta Sans',sans-serif; font-weight:700; font-size:12px;
          letter-spacing:1px; text-transform:uppercase; color:#fff;
          background: linear-gradient(135deg, #0f4c8f, #1d4ed8);
          border:none; cursor:pointer; text-decoration:none;
          padding:11px 22px; border-radius:8px; margin-left:8px;
          display:inline-block; white-space:nowrap;
          box-shadow: 0 4px 16px rgba(15,76,143,0.3);
          transition: all 0.25s ease;
        }
        .nav-cta:hover { transform:translateY(-2px); box-shadow:0 8px 24px rgba(15,76,143,0.4); }

        /* Hamburger */
        .hamburger {
          display:none; flex-direction:column; gap:5px;
          background:none; border:none; cursor:pointer; padding:8px; border-radius:8px;
        }
        .hbar {
          display:block; width:24px; height:2.5px; border-radius:2px;
          background:#0a1628; transition: all 0.28s cubic-bezier(.4,0,.2,1);
        }

        /* Mobile overlay */
        .mobile-overlay {
          position:fixed; top:76px; left:0; right:0; bottom:0;
          background:#fff; z-index:999; overflow-y:auto;
          border-top:2.5px solid #0f4c8f;
        }
        .mob-link {
          display:flex; align-items:center; justify-content:space-between;
          padding:15px 24px; font-family:'Plus Jakarta Sans',sans-serif;
          font-weight:700; font-size:13px; letter-spacing:0.5px; text-transform:uppercase;
          color:#0a1628; text-decoration:none; border-bottom:1px solid #f1f5f9;
          background:none; border-left:none; border-right:none; border-top:none;
          cursor:pointer; width:100%; text-align:left;
          animation: mobileIn 0.25s ease both;
          transition: background 0.15s, color 0.15s;
        }
        .mob-link:hover { background:#f8faff; color:#0f4c8f; }
        .mob-sub-item {
          display:block; font-family:'Plus Jakarta Sans',sans-serif;
          font-size:13.5px; font-weight:500; color:#475569;
          padding:8px 0; text-decoration:none; border-bottom:1px solid #f8faff;
          transition: color 0.15s;
        }
        .mob-sub-item:hover { color:#0f4c8f; }

        @media (max-width: 1024px) {
          .desktop-nav { display:none !important; }
          .hamburger { display:flex !important; }
        }
        @media (max-width: 480px) {
          .nav-inner { padding: 0 16px; height: 68px; }
          .logo-mark { width:40px; height:40px; }
          .logo-text-main { font-size:1.15rem; }
        }
      `}</style>

      <nav className={`mroc-nav${scrolled ? " scrolled" : ""}`}>
        <div className="nav-inner">

          {/* ── LOGO ── */}
          <a href="/" className="mroc-logo">
            <div className="logo-mark">
              <svg width="26" height="22" viewBox="0 0 26 22" fill="none">
                <path d="M2 16 Q2 8 8 8 Q9 4 13 4 Q17 4 18 8 Q22 8 24 12 Q24 18 18 18 L8 18 Q2 18 2 16Z" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2"/>
                <path d="M4 20 L8 12 L12 17 L16 10 L20 16 L22 14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                <circle cx="22" cy="14" r="1.5" fill="#93c5fd"/>
              </svg>
            </div>
            <div>
              <div className="logo-text-main">MROC</div>
              <div className="logo-text-sub">My Resource on Cloud</div>
            </div>
          </a>

          {/* ── DESKTOP NAV ── */}
          <ul className="desktop-nav">
            {menuData.map((item) => (
              <li
                key={item.label}
                className="nav-item"
                onMouseEnter={() => item.groups && onEnter(item.label)}
                onMouseLeave={() => item.groups && onLeave()}
              >
                {item.href ? (
                  <a href={item.href} className="nav-btn">
                    {item.label}
                    {item.groups && <span className="nav-chevron">▾</span>}
                  </a>
                ) : (
                  <button className="nav-btn">
                    {item.label}
                    {item.groups && <span className="nav-chevron">▾</span>}
                  </button>
                )}

                {item.groups && openMenu === item.label && (
                  <div
                    className="dd-panel"
                    style={{
                      gridTemplateColumns: `repeat(${Math.min(
                        item.groups.filter(
                          (g) => g.items.length > 0 || g.title
                        ).length,
                        3
                      )},1fr)`,
                    }}
                    onMouseEnter={() => clearTimeout(closeTimer.current)}
                    onMouseLeave={onLeave}
                  >
                    {item.groups.map((g, i) => (
                      <div key={i}>
                        {g.title && (
                          <div className="dd-group-title">{g.title}</div>
                        )}

                        {/* ONLY FUNCTIONALITY CHANGED */}
                        {g.items.map((s) => (
                          <a
                            key={s}
                            href={item.href}
                            className="dd-link"
                          >
                            {s}
                          </a>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </li>
            ))}

            <li>
              <a href="/contact" className="nav-cta">
                Contact Us
              </a>
            </li>
          </ul>

          {/* ── HAMBURGER ── */}
          <button  className="hamburger"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            <span
              className="hbar"
              style={{
                transform: mobileOpen
                  ? "rotate(45deg) translate(5px,6.5px)"
                  : "none",
              }}
            />
            <span
              className="hbar"
              style={{
                opacity: mobileOpen ? 0 : 1,
                transform: mobileOpen ? "scaleX(0)" : "none",
              }}
            />
            <span
              className="hbar"
              style={{
                transform: mobileOpen
                  ? "rotate(-45deg) translate(5px,-6.5px)"
                  : "none",
              }}
            />
          </button>
        </div>
      </nav>

      {/* ── MOBILE MENU ── */}
      {mobileOpen && (
        <div className="mobile-overlay">
          {menuData.map((item, idx) => (
            <div key={item.label}>
              {item.href ? (
                <a
                  href={item.href}
                  className="mob-link"
                  style={{ animationDelay: `${idx * 0.04}s` }}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </a>
              ) : (
                <>
                  <button
                    className="mob-link"
                    style={{ animationDelay: `${idx * 0.04}s` }}
                    onClick={() =>
                      setMobileExp(
                        mobileExp === item.label ? null : item.label
                      )
                    }
                  >
                    {item.label}
                    <span
                      style={{
                        fontSize: 16,
                        fontWeight: 300,
                        transition: "transform 0.2s",
                        transform:
                          mobileExp === item.label
                            ? "rotate(45deg)"
                            : "none",
                        display: "inline-block",
                      }}
                    >
                      +
                    </span>
                  </button>

                  {mobileExp === item.label && (
                    <div
                      style={{
                        background: "#f8faff",
                        padding: "8px 24px 16px 32px",
                        borderBottom: "1px solid #e2e8f0",
                      }}
                    >
                      {item.groups?.map((g, gi) => (
                        <div key={gi} style={{ marginTop: 12 }}>
                          {g.title && (
                            <div
                              style={{
                                fontFamily:
                                  "'Plus Jakarta Sans',sans-serif",
                                fontSize: 10,
                                fontWeight: 800,
                                color: "#0f4c8f",
                                textTransform: "uppercase",
                                letterSpacing: "2px",
                                marginBottom: 6,
                              }}
                            >
                              {g.title}
                            </div>
                          )}

                          {/* ONLY FUNCTIONALITY CHANGED */}
                          {g.items.map((s) => (
                            <a
                              key={s}
                              href={item.href}
                              className="mob-sub-item"
                              onClick={() => setMobileOpen(false)}
                            >
                              {s}
                            </a>
                          ))}
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          ))}

          <div style={{ padding: "24px" }}>
            <a
              href="#contact"
              className="nav-cta"
              style={{
                display: "block",
                textAlign: "center",
                marginLeft: 0,
                padding: "15px",
              }}
              onClick={() => setMobileOpen(false)}
            >
              Contact Us →
            </a>
          </div>
        </div>
      )}
    </>
  );
}