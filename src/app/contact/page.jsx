"use client"

import { useState, useEffect, useRef } from "react";

/* ── Reliable Reveal hook ── */
function useReveal(threshold = 0.08) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.IntersectionObserver) { setVisible(true); return; }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) { setVisible(true); obs.unobserve(el); }
        });
      },
      { threshold, rootMargin: "0px 0px -40px 0px" }
    );
    obs.observe(el);
    return () => obs.unobserve(el);
  }, [threshold]);
  return [ref, visible];
}

function Reveal({ children, delay = 0, direction = "up" }) {
  const [ref, visible] = useReveal(0.08);
  const offsets = {
    up: "translateY(28px)", down: "translateY(-28px)",
    left: "translateX(-28px)", right: "translateX(28px)",
  };
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : offsets[direction],
      transition: `opacity 0.65s cubic-bezier(.4,0,.2,1) ${delay}s, transform 0.65s cubic-bezier(.4,0,.2,1) ${delay}s`,
      willChange: "opacity, transform",
    }}>
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────
   ★  CONFIGURE THESE BEFORE GOING LIVE  ★
   Replace with your actual values:
   - YOUR_EMAIL        → your email address
   - YOUR_PHONE_NUMBER → WhatsApp number with country code (no + or spaces)
   - YOUR_EMAILJS_*    → EmailJS credentials (free at emailjs.com)
   - MAP_EMBED_URL     → Your Google Maps embed URL
───────────────────────────────────────── */
const CONFIG = {
  email: "corporate@mrocsolutions.com",
  whatsappNumber: "9490943906",       // e.g. "919876543210" for India
  whatsappMessage: "Hello MROC, I have an inquiry.",
  emailjsServiceId: "YOUR_SERVICE_ID",
  emailjsTemplateId: "YOUR_TEMPLATE_ID",
  emailjsPublicKey: "YOUR_PUBLIC_KEY",
  // Google Maps embed URL — replace with your actual address embed
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3807.7619857530945!2d78.49252367493439!3d17.37518238350997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9836627ef1bd%3A0x5a3425adb525b69d!2sLM%20GLOBAL!5e0!3m2!1sen!2sin!4v1776525614453!5m2!1sen!2sin",
};

const contactInfo = [
  { icon: "📍", label: "Head Office", value: "Toronto, ON, Canada — 2026" },
  { icon: "✉", label: "Email Us", value: CONFIG.email },
  { icon: "📞", label: "USA", value: "+1 (123) 456-7890" },
  { icon: "📞", label: "Canada", value: "+1 (123) 456-7890" },
  { icon: "📞", label: "London", value: "+44 123 456 789" },
  { icon: "📞", label: "Australia", value: "+61 1 2345 6789" },
];

export default function page() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [focused, setFocused] = useState(null);
  const [waHover, setWaHover] = useState(false);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  /* ── Form submit: EmailJS + WhatsApp notify ── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    /* 1. Load EmailJS (CDN) if not already loaded */
    if (!window.emailjs) {
      await new Promise((res, rej) => {
        const s = document.createElement("script");
        s.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
        s.onload = res; s.onerror = rej;
        document.head.appendChild(s);
      });
      window.emailjs.init({ publicKey: CONFIG.emailjsPublicKey });
    }

    try {
      /* 2. Send email */
      await window.emailjs.send(CONFIG.emailjsServiceId, CONFIG.emailjsTemplateId, {
        from_name: form.name,
        from_email: form.email,
        phone: form.phone,
        message: form.message,
        to_email: CONFIG.email,
      });

      /* 3. Send WhatsApp notification (opens wa.me on sender's browser too — 
            for a server-side notify, use your backend/Twilio instead) */
      const waText = encodeURIComponent(
        `📩 New Contact Form Submission\n\n👤 Name: ${form.name}\n📧 Email: ${form.email}\n📞 Phone: ${form.phone}\n💬 Message: ${form.message}`
      );
      window.open(`https://wa.me/${CONFIG.whatsappNumber}?text=${waText}`, "_blank");

      setStatus("success");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  const inputStyle = (name) => ({
    width: "100%",
    padding: "14px 18px",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 14,
    color: "#0a1628",
    background: focused === name ? "#fff" : "#f8faff",
    border: `1.5px solid ${focused === name ? "#0f4c8f" : "#e2e8f0"}`,
    borderRadius: 10,
    outline: "none",
    transition: "all 0.2s ease",
    boxSizing: "border-box",
    boxShadow: focused === name ? "0 0 0 3px rgba(15,76,143,0.08)" : "none",
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600;700&display=swap');

        * { box-sizing: border-box; }

        @keyframes pulse-ring {
          0%   { transform: scale(1);   opacity: 0.7; }
          70%  { transform: scale(1.5); opacity: 0; }
          100% { transform: scale(1.5); opacity: 0; }
        }

        @keyframes wa-bounce {
          0%, 100% { transform: translateY(0) scale(1); }
          50%       { transform: translateY(-6px) scale(1.04); }
        }

        @keyframes spin-badge {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }

        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1.45fr;
          gap: 48px;
          align-items: start;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 18px;
        }

        .submit-btn {
          width: 100%;
          padding: 15px 28px;
          background: linear-gradient(135deg, #0f4c8f, #1d4ed8);
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-weight: 700;
          font-size: 13px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.25s ease;
          position: relative;
          overflow: hidden;
        }
        .submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(15,76,143,0.3);
        }
        .submit-btn:disabled { opacity: 0.7; cursor: not-allowed; }
        .submit-btn::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.1), transparent);
          opacity: 0;
          transition: opacity 0.25s;
        }
        .submit-btn:hover::after { opacity: 1; }

        .info-card {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          padding: 16px 18px;
          border-radius: 12px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          transition: all 0.2s ease;
        }
        .info-card:hover {
          background: rgba(255,255,255,0.1);
          border-color: rgba(255,255,255,0.2);
          transform: translateX(4px);
        }

        .wa-floating {
          position: fixed;
          bottom: 32px;
          right: 32px;
          z-index: 999;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 10px;
        }

        .wa-pill {
          background: #fff;
          border-radius: 100px;
          padding: 10px 20px 10px 14px;
          display: flex;
          align-items: center;
          gap: 10px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.15);
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 600;
          color: #0a1628;
          white-space: nowrap;
          animation: fadeSlideIn 0.3s ease both;
        }

        .wa-btn {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: #25d366;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 28px rgba(37,211,102,0.45);
          cursor: pointer;
          text-decoration: none;
          animation: wa-bounce 2.8s ease-in-out infinite;
          position: relative;
          border: none;
          flex-shrink: 0;
        }

        .wa-ring {
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          border: 2px solid #25d366;
          animation: pulse-ring 2s ease-out infinite;
        }

        .wa-icon {
          font-size: 28px;
          line-height: 1;
          position: relative;
          z-index: 1;
        }

        .map-container {
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0,0,0,0.12);
          border: 1px solid #e2e8f0;
        }

        textarea { resize: vertical; min-height: 130px; }

        label {
          display: block;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.8px;
          text-transform: uppercase;
          color: #475569;
          margin-bottom: 7px;
        }

        .success-banner {
          background: linear-gradient(135deg, #f0fdf4, #dcfce7);
          border: 1.5px solid #86efac;
          border-radius: 10px;
          padding: 14px 18px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          color: #166534;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 10px;
          animation: fadeSlideIn 0.3s ease;
        }

        .error-banner {
          background: #fef2f2;
          border: 1.5px solid #fca5a5;
          border-radius: 10px;
          padding: 14px 18px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          color: #991b1b;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 10px;
          animation: fadeSlideIn 0.3s ease;
        }

        @media (max-width: 900px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 36px !important; }
        }
        @media (max-width: 600px) {
          .form-row { grid-template-columns: 1fr !important; }
          .wa-floating { bottom: 20px; right: 16px; }
        }
      `}</style>

      {/* ══ HERO BANNER ══ */}
      <section
        style={{
          background: "linear-gradient(135deg, #040e24 0%, #0f2d5e 60%, #1d4ed8 100%)",
          padding: "100px 28px 80px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* decorative circles */}
        {[
          { size: 420, top: -120, right: -80, op: 0.06 },
          { size: 240, bottom: -60, left: -60, op: 0.08 },
          { size: 160, top: 40, left: "38%", op: 0.05 },
        ].map((c, i) => (
          <div key={i} aria-hidden style={{
            position: "absolute", borderRadius: "50%",
            width: c.size, height: c.size,
            top: c.top, bottom: c.bottom, left: c.left, right: c.right,
            border: "1.5px solid rgba(255,255,255,0.12)",
            opacity: c.op, pointerEvents: "none",
          }} />
        ))}

        <div style={{ maxWidth: 1140, margin: "0 auto", textAlign: "center", position: "relative" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
            <div style={{ width: 24, height: 2, background: "#60a5fa" }} />
            <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "#93c5fd" }}>
              Get In Touch
            </span>
            <div style={{ width: 24, height: 2, background: "#60a5fa" }} />
          </div>

          <h1 style={{ fontFamily: "'DM Serif Display',serif", fontSize: "clamp(2.4rem,5vw,3.8rem)", fontWeight: 400, color: "#fff", lineHeight: 1.15, marginBottom: 18 }}>
            Let's Build Something{" "}
            <em style={{ color: "#93c5fd", fontStyle: "italic" }}>Extraordinary</em>
          </h1>

          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "1.05rem", color: "rgba(255,255,255,0.65)", maxWidth: 520, margin: "0 auto", lineHeight: 1.75, fontWeight: 300 }}>
            Ready to transform your enterprise? Our SAP experts are here to
            guide you from first conversation to full implementation.
          </p>
        </div>
      </section>

      {/* ══ MAIN CONTACT SECTION ══ */}
      <section
        id="contact"
        style={{
          padding: "90px 28px 80px",
          background: "#f8faff",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* dot grid background */}
        <div aria-hidden style={{
          position: "absolute", inset: 0,
          backgroundImage: "radial-gradient(circle, #e2e8f0 1px, transparent 1px)",
          backgroundSize: "32px 32px", opacity: 0.4, pointerEvents: "none",
        }} />

        <div style={{ maxWidth: 1140, margin: "0 auto", position: "relative" }}>
          <div className="contact-grid">

            {/* ── LEFT: Info panel (dark) ── */}
            <Reveal direction="left">
              <div style={{
                background: "linear-gradient(160deg, #0a1628 0%, #0f2d5e 100%)",
                borderRadius: 22,
                padding: "44px 36px",
                color: "#fff",
                position: "relative",
                overflow: "hidden",
                boxShadow: "0 24px 64px rgba(10,22,40,0.22)",
              }}>
                {/* decorative blob */}
                <div aria-hidden style={{
                  position: "absolute", bottom: -60, right: -60,
                  width: 220, height: 220, borderRadius: "50%",
                  background: "radial-gradient(circle, rgba(59,130,246,0.18), transparent 70%)",
                  pointerEvents: "none",
                }} />

                <div style={{ position: "relative", zIndex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                    <div style={{ width: 20, height: 2, background: "#60a5fa" }} />
                    <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "#93c5fd" }}>
                      Contact Information
                    </span>
                  </div>

                  <h2 style={{ fontFamily: "'DM Serif Display',serif", fontSize: "clamp(1.6rem,2.5vw,2.1rem)", fontWeight: 400, color: "#fff", lineHeight: 1.25, marginBottom: 10 }}>
                    We're Here{" "}
                    <em style={{ color: "#60a5fa", fontStyle: "italic" }}>to Help</em>
                  </h2>
                  <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, color: "rgba(255,255,255,0.55)", lineHeight: 1.75, marginBottom: 32 }}>
                    Reach out through any channel — our team responds within one
                    business day.
                  </p>

                  {/* Contact info cards */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 36 }}>
                    {contactInfo.map(({ icon, label, value }) => (
                      <div key={label + value} className="info-card">
                        <span style={{ fontSize: 18, flexShrink: 0, marginTop: 1 }}>{icon}</span>
                        <div>
                          <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: "#60a5fa", marginBottom: 2 }}>
                            {label}
                          </div>
                          <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13.5, color: "rgba(255,255,255,0.75)", lineHeight: 1.4 }}>
                            {value}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* WhatsApp CTA inside panel */}
                  <a
                    href={`https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(CONFIG.whatsappMessage)}`}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 12,
                      background: "#25d366",
                      color: "#fff",
                      fontFamily: "'DM Sans',sans-serif",
                      fontWeight: 700,
                      fontSize: 13,
                      letterSpacing: 0.5,
                      padding: "13px 22px",
                      borderRadius: 100,
                      textDecoration: "none",
                      boxShadow: "0 6px 24px rgba(37,211,102,0.35)",
                      transition: "all 0.25s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "scale(1.04)";
                      e.currentTarget.style.boxShadow = "0 10px 32px rgba(37,211,102,0.5)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                      e.currentTarget.style.boxShadow = "0 6px 24px rgba(37,211,102,0.35)";
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.528 5.855L0 24l6.335-1.51A11.932 11.932 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.027-1.378l-.36-.214-3.737.891.938-3.618-.235-.372A9.818 9.818 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182c5.43 0 9.818 4.388 9.818 9.818 0 5.43-4.388 9.818-9.818 9.818z"/>
                    </svg>
                    Chat on WhatsApp
                  </a>

                  {/* Social links */}
                  <div style={{ display: "flex", gap: 10, marginTop: 28 }}>
                    {[["in","https://linkedin.com"],["Fb","#"],["Tw","#"],["Yt","#"]].map(([l, h]) => (
                      <a key={l} href={h} target="_blank" rel="noreferrer" style={{
                        width: 36, height: 36, borderRadius: 8,
                        border: "1px solid rgba(255,255,255,0.15)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: "rgba(255,255,255,0.5)", fontSize: 11, fontWeight: 700,
                        fontFamily: "'DM Sans',sans-serif", textDecoration: "none",
                        transition: "all 0.2s ease",
                      }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = "#1d4ed8"; e.currentTarget.style.borderColor = "#1d4ed8"; e.currentTarget.style.color = "#fff"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; e.currentTarget.style.color = "rgba(255,255,255,0.5)"; }}
                      >{l}</a>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>

            {/* ── RIGHT: Form ── */}
            <Reveal direction="right" delay={0.1}>
              <div style={{
                background: "#fff",
                borderRadius: 22,
                padding: "44px 40px",
                boxShadow: "0 8px 40px rgba(0,0,0,0.07)",
                border: "1px solid #e2e8f0",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                  <div style={{ width: 20, height: 2, background: "#0f4c8f" }} />
                  <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "#0f4c8f" }}>
                    Send a Message
                  </span>
                </div>

                <h3 style={{ fontFamily: "'DM Serif Display',serif", fontSize: "clamp(1.5rem,2.5vw,2rem)", fontWeight: 400, color: "#0a1628", marginBottom: 28, lineHeight: 1.25 }}>
                  We'd Love to{" "}
                  <em style={{ color: "#2563eb", fontStyle: "italic" }}>Hear From You</em>
                </h3>

                {/* Status banners */}
                {status === "success" && (
                  <div className="success-banner" style={{ marginBottom: 22 }}>
                    <span style={{ fontSize: 20 }}>✅</span>
                    Message sent! We'll respond within one business day.
                  </div>
                )}
                {status === "error" && (
                  <div className="error-banner" style={{ marginBottom: 22 }}>
                    <span style={{ fontSize: 20 }}>⚠️</span>
                    Something went wrong. Please configure EmailJS credentials or email us directly.
                  </div>
                )}

                <form onSubmit={handleSubmit} noValidate>
                  <div className="form-row" style={{ marginBottom: 20 }}>
                    <div>
                      <label htmlFor="name">Full Name</label>
                      <input
                        id="name" name="name" type="text"
                        placeholder="John Smith"
                        value={form.name} required
                        onChange={handleChange}
                        onFocus={() => setFocused("name")}
                        onBlur={() => setFocused(null)}
                        style={inputStyle("name")}
                      />
                    </div>
                    <div>
                      <label htmlFor="email">Email Address</label>
                      <input
                        id="email" name="email" type="email"
                        placeholder="john@company.com"
                        value={form.email} required
                        onChange={handleChange}
                        onFocus={() => setFocused("email")}
                        onBlur={() => setFocused(null)}
                        style={inputStyle("email")}
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      id="phone" name="phone" type="tel"
                      placeholder="+1 (123) 456-7890"
                      value={form.phone}
                      onChange={handleChange}
                      onFocus={() => setFocused("phone")}
                      onBlur={() => setFocused(null)}
                      style={inputStyle("phone")}
                    />
                  </div>

                  <div style={{ marginBottom: 28 }}>
                    <label htmlFor="message">Your Message</label>
                    <textarea
                      id="message" name="message"
                      placeholder="Tell us about your project, goals, or questions…"
                      value={form.message} required
                      onChange={handleChange}
                      onFocus={() => setFocused("message")}
                      onBlur={() => setFocused(null)}
                      style={{ ...inputStyle("message"), display: "block" }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="submit-btn"
                    disabled={status === "sending"}
                  >
                    {status === "sending" ? "Sending…" : "Send Message →"}
                  </button>

                  <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: "#94a3b8", marginTop: 14, textAlign: "center" }}>
                    🔒 Your information is private and never shared.
                  </p>
                </form>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ══ GOOGLE MAP ══ */}
      <section style={{ padding: "0 28px 90px", background: "#f8faff" }}>
        <div style={{ maxWidth: 1140, margin: "0 auto" }}>
          <Reveal>
            {/* Map header */}
            <div style={{ textAlign: "center", marginBottom: 36 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <div style={{ width: 24, height: 2, background: "#0f4c8f" }} />
                <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "#0f4c8f" }}>
                  Our Location
                </span>
                <div style={{ width: 24, height: 2, background: "#0f4c8f" }} />
              </div>
              <h2 style={{ fontFamily: "'DM Serif Display',serif", fontSize: "clamp(1.7rem,2.8vw,2.4rem)", fontWeight: 400, color: "#0a1628", marginBottom: 8 }}>
                Find Us on the{" "}
                <em style={{ color: "#2563eb", fontStyle: "italic" }}>Map</em>
              </h2>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14.5, color: "#64748b" }}>
                📍 Toronto, Ontario, Canada
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="map-container">
              <iframe
                title="MROC Office Location"
                src={CONFIG.mapEmbedUrl}
                width="100%"
                height="440"
                style={{ border: 0, display: "block" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ FLOATING WHATSAPP BUTTON ══ */}
      <div className="wa-floating">
        {waHover && (
          <div className="wa-pill">
            <span style={{ fontSize: 18 }}>👋</span>
            <span>Chat with us instantly!</span>
          </div>
        )}
        <a
          className="wa-btn"
          href={`https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent("I have an inquiry.")}`}
          target="_blank"
          rel="noreferrer"
          aria-label="Chat on WhatsApp"
          onMouseEnter={() => setWaHover(true)}
          onMouseLeave={() => setWaHover(false)}
        >
          <div className="wa-ring" />
          <span className="wa-icon">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="#fff">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.528 5.855L0 24l6.335-1.51A11.932 11.932 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.027-1.378l-.36-.214-3.737.891.938-3.618-.235-.372A9.818 9.818 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182c5.43 0 9.818 4.388 9.818 9.818 0 5.43-4.388 9.818-9.818 9.818z"/>
            </svg>
          </span>
        </a>
      </div>
    </>
  );
}