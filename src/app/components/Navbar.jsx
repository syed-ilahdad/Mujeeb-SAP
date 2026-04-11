import { useState, useEffect, useRef } from "react";



/* ══════════════════════════════════════
   NAVBAR
══════════════════════════════════════ */

const menuData = [
  { label: "HOME", href: "#home" },
  {
    label: "SERVICES",
    groups: [
      { title: "S/4HANA Services", items: ["S/4HANA Advisory", "S/4 Migration", "Rise with SAP"] },
      { title: "SAP Business Technology Platform", items: ["Application Development", "Automation", "Integration", "Artificial Intelligence"] },
      { title: "Data & Analytics", items: ["Strategy and Advisory", "Analytics and Planning", "Enterprise Data Management", "Cloud Data Warehousing"] },
      { title: "Business Advisory", items: ["Business Process Intelligence", "Value Assurance", "People & Organization", "Process Automation"] },
      { title: "Finance", items: ["Financial Planning and Analysis", "Finance Analytics", "S/4 Central Finance"] },
      { title: "Cloud", items: ["Cloud Advisory and Optimization", "Data Transition", "Cloud Security"] },
      { title: "Application Management Services", items: [] },
      { title: "Quality Engineering", items: [] },
    ],
  },
  {
    label: "SOLUTIONS",
    groups: [
      { title: "S/4HANA", items: ["Config Migration Platform", "Code Modernization Platform", "Selective Data Transition Platform"] },
      { title: "Digital Transformation Toolkit", items: ["RunWay Approach", "RunningStart Methodology"] },
      { title: "Data & Analytics", items: ["Data Quality and Cleansing Toolkit", "Data Governance Blueprint", "Data Migration Accelerator", "Datasphere Starter Pack"] },
      { title: "Business Advisory", items: ["Value Assurance Framework", "Application Portfolio Rationalizer", "SmartSustain"] },
      { title: "Finance", items: ["Finance Performance Management", "Accounts Payable Automation", "S/4 Finance Starter Pack"] },
    ],
  },
  {
    label: "INDUSTRIES",
    groups: [{ title: "", items: ["Consumer Products", "Manufacturing, Logistics, Energy and Utilities", "Technology, Media and Telecommunication", "Healthcare, Public Sector and Defense"] }],
  },
  {
    label: "INSIGHTS",
    groups: [{ title: "", items: ["Blogs", "Jobs"] }],
  },
  { label: "ABOUT", href: "#about" },
];


function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExp, setMobileExp] = useState(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        background: "#fff",
        borderBottom: "1px solid #e5e7eb",
        boxShadow: scrolled ? "0 2px 16px rgba(0,0,0,0.09)" : "none",
        transition: "box-shadow 0.3s",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 70 }}>
          {/* Logo */}
          <a href="#home" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
            <div style={{ width: 40, height: 40, background: "#0f4c8f", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Raleway,sans-serif", fontWeight: 800, fontSize: 12, color: "#fff", letterSpacing: 0.5 }}>MROC</div>
            <div>
              <div style={{ fontFamily: "Raleway,sans-serif", fontWeight: 800, fontSize: "1.1rem", color: "#0f1c36", lineHeight: 1.1 }}>MROC</div>
              <div style={{ fontSize: "0.58rem", color: "#6b7280", letterSpacing: 0.5 }}>My Resource on Cloud</div>
            </div>
          </a>

          {/* Desktop nav */}
          <ul style={{ display: "flex", alignItems: "center", listStyle: "none", gap: 0, margin: 0, padding: 0 }} className="desktop-nav">
            {menuData.map((item) => (
              <li key={item.label} style={{ position: "relative" }}
                onMouseEnter={() => item.groups && setOpenMenu(item.label)}
                onMouseLeave={() => setOpenMenu(null)}>
                {item.href
                  ? <a href={item.href} style={navBtnStyle}>{item.label}</a>
                  : <button style={navBtnStyle}>{item.label} {item.groups && <span style={{ fontSize: 9 }}>▾</span>}</button>
                }
                {item.groups && openMenu === item.label && (
                  <div style={{
                    position: "absolute", top: "100%", left: 0,
                    background: "#fff", border: "1px solid #e2e6ed",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
                    padding: "20px 24px", minWidth: 500,
                    display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "16px 28px",
                    animation: "ddFade 0.15s ease",
                  }}>
                    {item.groups.map((g, i) => (
                      <div key={i}>
                        {g.title && <div style={{ fontFamily: "Raleway,sans-serif", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.2, color: "#0f4c8f", marginBottom: 6, paddingBottom: 5, borderBottom: "1px solid #e2e6ed" }}>{g.title}</div>}
                        {g.items.map(s => <a key={s} href="#services" style={{ display: "block", fontSize: 13, color: "#374151", padding: "3px 0", textDecoration: "none", transition: "color 0.15s, padding-left 0.15s" }}
                          onMouseEnter={e => { e.target.style.color = "#0f4c8f"; e.target.style.paddingLeft = "4px"; }}
                          onMouseLeave={e => { e.target.style.color = "#374151"; e.target.style.paddingLeft = "0"; }}
                        >{s}</a>)}
                      </div>
                    ))}
                  </div>
                )}
              </li>
            ))}
            <li>
              <a href="#contact" style={{ background: "#0f4c8f", color: "#fff", padding: "9px 20px", fontFamily: "Raleway,sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: 0.5, border: "none", cursor: "pointer", textDecoration: "none", marginLeft: 12, display: "inline-block", transition: "background 0.2s" }}
                onMouseEnter={e => e.target.style.background = "#1565c0"}
                onMouseLeave={e => e.target.style.background = "#0f4c8f"}
              >CONTACT US</a>
            </li>
          </ul>

          {/* Hamburger */}
          <button onClick={() => setMobileOpen(!mobileOpen)} style={{ display: "none", flexDirection: "column", gap: 5, background: "none", border: "none", cursor: "pointer", padding: 6 }} className="hamburger" aria-label="Menu">
            {[0, 1, 2].map(i => <span key={i} style={{ display: "block", width: 22, height: 2, background: "#0f1c36", borderRadius: 1, transition: "all 0.25s", transform: mobileOpen && i === 0 ? "rotate(45deg) translate(5px,5px)" : mobileOpen && i === 2 ? "rotate(-45deg) translate(5px,-5px)" : "none", opacity: mobileOpen && i === 1 ? 0 : 1 }} />)}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div style={{ position: "fixed", top: 70, left: 0, right: 0, bottom: 0, background: "#fff", zIndex: 999, overflowY: "auto", borderTop: "1px solid #e5e7eb" }} className="mobile-menu">
          {menuData.map((item) => (
            <div key={item.label} style={{ borderBottom: "1px solid #f3f4f6" }}>
              {item.href
                ? <a href={item.href} onClick={() => setMobileOpen(false)} style={{ display: "block", padding: "15px 24px", fontFamily: "Raleway,sans-serif", fontWeight: 700, fontSize: 13, color: "#0f1c36", textDecoration: "none", letterSpacing: 0.5 }}>{item.label}</a>
                : <>
                    <button onClick={() => setMobileExp(mobileExp === item.label ? null : item.label)} style={{ width: "100%", background: "none", border: "none", cursor: "pointer", padding: "15px 24px", fontFamily: "Raleway,sans-serif", fontWeight: 700, fontSize: 13, color: "#0f1c36", textAlign: "left", display: "flex", justifyContent: "space-between" }}>
                      {item.label} <span>{mobileExp === item.label ? "−" : "+"}</span>
                    </button>
                    {mobileExp === item.label && (
                      <div style={{ paddingLeft: 24, paddingBottom: 12 }}>
                        {item.groups?.flatMap(g => [
                          g.title && <div key={"h" + g.title} style={{ fontFamily: "Raleway,sans-serif", fontSize: 11, fontWeight: 700, color: "#0f4c8f", textTransform: "uppercase", letterSpacing: 1, marginTop: 8, marginBottom: 4 }}>{g.title}</div>,
                          ...g.items.map(s => <a key={s} href="#services" onClick={() => setMobileOpen(false)} style={{ display: "block", fontSize: 13, color: "#4b5563", padding: "5px 0", textDecoration: "none" }}>{s}</a>)
                        ])}
                      </div>
                    )}
                  </>
              }
            </div>
          ))}
          <div style={{ padding: 24 }}>
            <a href="#contact" onClick={() => setMobileOpen(false)} style={{ background: "#0f4c8f", color: "#fff", padding: "12px 24px", fontFamily: "Raleway,sans-serif", fontWeight: 700, fontSize: 13, display: "inline-block", textDecoration: "none" }}>CONTACT US</a>
          </div>
        </div>
      )}
    </>
  );
}
const navBtnStyle = { background: "none", border: "none", cursor: "pointer", fontFamily: "Raleway,sans-serif", fontWeight: 600, fontSize: 12.5, letterSpacing: 0.5, color: "#0f1c36", padding: "0 14px", height: 70, display: "flex", alignItems: "center", gap: 4, transition: "color 0.15s", textDecoration: "none", whiteSpace: "nowrap" };




export default Navbar