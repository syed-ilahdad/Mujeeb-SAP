"use client";

import { useEffect, useState } from "react";

export default function Page() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 150);
    return () => clearTimeout(t);
  }, []);

  const solutions = [
    {
      title: "SAP S/4HANA Transformation",
      desc: "Accelerate enterprise modernization with greenfield implementations, brownfield migrations, and intelligent process redesign.",
    },
    {
      title: "SAP BTP Innovation",
      desc: "Build scalable apps, automate workflows, integrate systems, and unlock innovation using SAP Business Technology Platform.",
    },
    {
      title: "Data & Analytics",
      desc: "Turn enterprise data into strategic insights with SAP Analytics Cloud, planning models, dashboards, and KPI reporting.",
    },
    {
      title: "Finance Modernization",
      desc: "Enable real-time finance operations with Central Finance, FP&A solutions, cost control, and intelligent reporting.",
    },
    {
      title: "Cloud Transformation",
      desc: "Move SAP workloads to secure cloud environments with optimized performance, resilience, and governance.",
    },
    {
      title: "Managed SAP Services",
      desc: "24/7 support, performance optimization, issue resolution, monitoring, and continuous improvement services.",
    },
  ];

  const benefits = [
    "Certified SAP Experts",
    "Faster Project Delivery",
    "Lower Transformation Risk",
    "Scalable Global Delivery",
    "Business Outcome Driven",
    "Long-Term Support Model",
  ];

  return (
    <section
      style={{
        background: "#f8fafc",
        minHeight: "100vh",
        overflow: "hidden",
      }}
    >
      {/* HERO */}
      <section
        style={{
          padding: "130px 24px 90px",
          background:
            "linear-gradient(135deg,#050f24 0%, #0f4c8f 55%, #3b82f6 100%)",
          position: "relative",
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1.1fr 0.9fr",
            gap: 50,
            alignItems: "center",
          }}
        >
          <div
            style={{
              opacity: show ? 1 : 0,
              transform: show ? "none" : "translateY(30px)",
              transition: "all 1s ease",
            }}
          >
            <div
              style={{
                display: "inline-block",
                padding: "8px 14px",
                borderRadius: 999,
                background: "rgba(255,255,255,0.12)",
                color: "#dbeafe",
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: 1,
                textTransform: "uppercase",
                marginBottom: 18,
              }}
            >
              Enterprise SAP Solutions
            </div>

            <h1
              style={{
                fontSize: "3.4rem",
                lineHeight: 1.1,
                fontWeight: 800,
                color: "#fff",
                margin: 0,
              }}
            >
              Smart Solutions for
              <br />
              Digital SAP Growth
            </h1>

            <p
              style={{
                color: "rgba(255,255,255,0.88)",
                fontSize: "1.08rem",
                lineHeight: 1.8,
                marginTop: 22,
                maxWidth: 640,
              }}
            >
              MROC delivers transformation-focused SAP solutions that help
              enterprises modernize operations, automate processes, optimize
              finance, and unlock real-time intelligence.
            </p>

            <div
              style={{
                marginTop: 30,
                display: "flex",
                gap: 16,
                flexWrap: "wrap",
              }}
            >
              <a
                href="#solutions"
                style={{
                  padding: "14px 26px",
                  borderRadius: 10,
                  background: "#fff",
                  color: "#0f4c8f",
                  fontWeight: 700,
                  textDecoration: "none",
                }}
              >
                Explore Solutions
              </a>

              <a
                href="#contact"
                style={{
                  padding: "14px 26px",
                  borderRadius: 10,
                  border: "1px solid rgba(255,255,255,0.35)",
                  color: "#fff",
                  fontWeight: 700,
                  textDecoration: "none",
                }}
              >
                Talk to Experts
              </a>
            </div>
          </div>

          {/* Right visual card */}
          <div
            style={{
              opacity: show ? 1 : 0,
              transform: show ? "none" : "translateX(35px)",
              transition: "all 1s .35s ease",
            }}
          >
            <div
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: 24,
                padding: 28,
                backdropFilter: "blur(10px)",
              }}
            >
              {[
                "S/4HANA Modernization",
                "Cloud Transformation",
                "Analytics & Planning",
                "Finance Automation",
                "Managed SAP Support",
              ].map((x, i) => (
                <div
                  key={x}
                  style={{
                    padding: "16px 18px",
                    borderRadius: 14,
                    marginBottom: i !== 4 ? 12 : 0,
                    background: "rgba(255,255,255,0.06)",
                    color: "#fff",
                    fontWeight: 600,
                  }}
                >
                  {x}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SOLUTIONS GRID */}
      <section id="solutions" style={{ padding: "90px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 55 }}>
            <div
              style={{
                color: "#0f4c8f",
                fontWeight: 800,
                fontSize: 13,
                letterSpacing: 1.2,
                textTransform: "uppercase",
              }}
            >
              Our Core Capabilities
            </div>

            <h2
              style={{
                fontSize: "2.5rem",
                marginTop: 14,
                marginBottom: 10,
                color: "#050f24",
              }}
            >
              Solutions Built for Enterprise Performance
            </h2>

            <p
              style={{
                color: "#64748b",
                fontSize: "1.05rem",
                maxWidth: 760,
                margin: "0 auto",
                lineHeight: 1.8,
              }}
            >
              We combine SAP expertise, business consulting, and innovation-led
              execution to deliver measurable business outcomes.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(290px,1fr))",
              gap: 24,
            }}
          >
            {solutions.map((item, i) => (
              <div
                key={i}
                style={{
                  background: "#fff",
                  borderRadius: 20,
                  padding: 28,
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 12px 35px rgba(15,76,143,0.07)",
                  transition: "0.3s ease",
                }}
              >
                <div
                  style={{
                    width: 54,
                    height: 54,
                    borderRadius: 14,
                    background:
                      "linear-gradient(135deg,#0f4c8f,#1d4ed8,#3b82f6)",
                    marginBottom: 18,
                  }}
                />

                <h3
                  style={{
                    fontSize: "1.2rem",
                    color: "#050f24",
                    marginBottom: 12,
                  }}
                >
                  {item.title}
                </h3>

                <p
                  style={{
                    color: "#64748b",
                    lineHeight: 1.8,
                    fontSize: "0.98rem",
                  }}
                >
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY MROC */}
      <section
        style={{
          padding: "90px 24px",
          background: "#eef4ff",
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 40,
            alignItems: "center",
          }}
        >
          <div>
            <div
              style={{
                color: "#0f4c8f",
                fontWeight: 800,
                fontSize: 13,
                letterSpacing: 1.2,
                textTransform: "uppercase",
              }}
            >
              Why Choose MROC
            </div>

            <h2
              style={{
                fontSize: "2.3rem",
                color: "#050f24",
                marginTop: 14,
                lineHeight: 1.2,
              }}
            >
              Trusted SAP Transformation Partner
            </h2>

            <p
              style={{
                color: "#64748b",
                lineHeight: 1.8,
                marginTop: 18,
              }}
            >
              We help organizations simplify complex SAP landscapes and build a
              future-ready enterprise with speed, quality, and strategic focus.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 18,
            }}
          >
            {benefits.map((b, i) => (
              <div
                key={i}
                style={{
                  background: "#fff",
                  borderRadius: 16,
                  padding: "18px 18px",
                  border: "1px solid #dbeafe",
                  fontWeight: 700,
                  color: "#0f172a",
                }}
              >
                {b}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        id="contact"
        style={{
          padding: "90px 24px",
          background:
            "linear-gradient(135deg,#050f24 0%, #0f4c8f 60%, #1d4ed8 100%)",
        }}
      >
        <div
          style={{
            maxWidth: 1000,
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              color: "#fff",
              fontSize: "2.4rem",
              marginBottom: 16,
            }}
          >
            Ready to Transform with SAP?
          </h2>

          <p
            style={{
              color: "rgba(255,255,255,0.82)",
              lineHeight: 1.8,
              maxWidth: 720,
              margin: "0 auto",
            }}
          >
            Partner with MROC to modernize your enterprise systems, improve
            efficiency, and accelerate innovation through intelligent SAP
            solutions.
          </p>

          <div style={{ marginTop: 28 }}>
            <a
              href="/contact"
              style={{
                display: "inline-block",
                padding: "15px 28px",
                borderRadius: 10,
                background: "#fff",
                color: "#0f4c8f",
                fontWeight: 800,
                textDecoration: "none",
              }}
            >
              Contact Our Team
            </a>
          </div>
        </div>
      </section>
    </section>
  );
}