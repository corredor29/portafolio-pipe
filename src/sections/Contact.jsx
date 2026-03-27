import { useState } from "react";
import { useLang } from "../context/LanguageContext";
import { t } from "../context/translations.js";

const Contact = () => {
  const { lang } = useLang();
  const tx = t[lang].contact;

  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulario enviado:", formData);
    setSent(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setSent(false), 4000);
  };

  const inputStyle = {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: 12,
    padding: "11px 14px",
    fontSize: 14,
    fontFamily: "'DM Sans', sans-serif",
    color: "#d8d8e8",
    width: "100%",
    outline: "none",
    transition: "border-color 0.25s, background 0.25s",
  };

  const labelStyle = {
    display: "block",
    fontFamily: "'DM Mono', monospace",
    fontSize: 10,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color: "#5a5a70",
    marginBottom: 7,
  };

  const onFocus = (e) => {
    e.target.style.borderColor = "rgba(99,102,241,0.5)";
    e.target.style.background = "rgba(99,102,241,0.05)";
  };
  const onBlur = (e) => {
    e.target.style.borderColor = "rgba(255,255,255,0.07)";
    e.target.style.background = "rgba(255,255,255,0.04)";
  };

  const contactCards = [
    {
      id: "email",
      label: tx.emailLabel,
      value: "corredorsilvafelipe8@gmail.com",
      href: "mailto:corredorsilvafelipe8@gmail.com",
      icon: (
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5H4.5a2.25 2.25 0 00-2.25 2.25m19.5 0-9.75 6.75L2.25 6.75" />
        </svg>
      ),
    },
    {
      id: "linkedin",
      label: tx.linkedinLabel,
      value: "linkedin.com/in/felipe-corredor-95664434b",
      href: "https://www.linkedin.com/in/felipe-corredor-95664434b/",
      icon: (
        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452H17.21v-5.569c0-1.328-.024-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.984V9h3.102v1.561h.044c.432-.818 1.487-1.681 3.06-1.681 3.271 0 3.874 2.152 3.874 4.95v6.622zM5.337 7.433a1.8 1.8 0 11.001-3.601 1.8 1.8 0 010 3.601zM6.961 20.452H3.71V9h3.251v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.771 24h20.451C23.2 24 24 23.226 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
  ];

  return (
    <section
      id="contacto"
      className="relative py-24 px-6 overflow-hidden"
      style={{ background: "#0c0c10" }}
    >
      {/* Orbes de fondo */}
      <div className="absolute pointer-events-none rounded-full"
        style={{ width: 600, height: 600, top: -100, right: -150, background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)" }} />
      <div className="absolute pointer-events-none rounded-full"
        style={{ width: 400, height: 400, bottom: 0, left: -100, background: "radial-gradient(circle, rgba(139,92,246,0.07) 0%, transparent 70%)" }} />

      <div className="relative max-w-4xl mx-auto" style={{ zIndex: 1 }}>

        {/* Encabezado */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4"
            style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: "#6366f1" }}>
            <span style={{ display: "block", width: 24, height: 1, background: "#6366f1", opacity: 0.7 }} />
            {tx.sectionNum}
          </div>

          <h2 style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: "clamp(38px, 6vw, 60px)",
            fontWeight: 800, color: "#f0f0f5",
            letterSpacing: "-0.02em", lineHeight: 1.05, marginBottom: 16,
          }}>
            {tx.heading1}{" "}
            <span style={{ background: "linear-gradient(120deg, #818cf8, #c4b5fd)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              {tx.heading2}
            </span>
          </h2>

          <p style={{ fontSize: 15, color: "#7a7a8c", lineHeight: 1.7, maxWidth: 420 }}>
            {tx.subheading}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">

          {/* Tarjetas */}
          <div className="flex flex-col gap-4">
            {contactCards.map((card) => (
              <a key={card.id} href={card.href}
                target={card.id === "linkedin" ? "_blank" : undefined}
                rel="noreferrer"
                className="group flex items-center gap-[18px] no-underline"
                style={{ padding: "20px 22px", borderRadius: 18, border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)", transition: "border-color 0.3s, background 0.3s, transform 0.2s" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(99,102,241,0.35)"; e.currentTarget.style.background = "rgba(99,102,241,0.05)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; e.currentTarget.style.background = "rgba(255,255,255,0.02)"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <div className="flex items-center justify-center flex-shrink-0"
                  style={{ width: 48, height: 48, borderRadius: 13, background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.15)", color: "#818cf8" }}>
                  {card.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "#5a5a70", marginBottom: 4 }}>
                    {card.label}
                  </div>
                  <div className="truncate group-hover:text-indigo-400" style={{ fontSize: 14, fontWeight: 500, color: "#d0d0e0", transition: "color 0.3s" }}>
                    {card.value}
                  </div>
                </div>
                <div className="opacity-0 group-hover:opacity-100 flex-shrink-0" style={{ color: "#6366f1", transition: "opacity 0.3s" }}>
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </a>
            ))}

            {/* Badge disponibilidad */}
            <div className="flex items-center gap-4"
              style={{ padding: "18px 22px", borderRadius: 18, border: "1px solid rgba(52,211,153,0.15)", background: "rgba(52,211,153,0.04)" }}>
              <span className="flex-shrink-0 rounded-full"
                style={{ width: 8, height: 8, background: "#34d399", boxShadow: "0 0 0 4px rgba(52,211,153,0.15)", animation: "availPulse 2s ease-in-out infinite" }} />
              <span style={{ fontSize: 13, color: "#5a7a6a" }}>
                <strong style={{ color: "#34d399", fontWeight: 500 }}>{tx.availableBadge}</strong> {tx.availableText}
              </span>
            </div>
          </div>

          {/* Formulario */}
          <div className="relative overflow-hidden"
            style={{ borderRadius: 22, border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.025)", padding: "30px 28px" }}>
            <div className="absolute top-0 left-0 right-0"
              style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.5), transparent)" }} />

            {sent ? (
              <div className="flex flex-col items-center justify-center text-center py-10 gap-3">
                <div className="flex items-center justify-center rounded-full"
                  style={{ width: 56, height: 56, background: "rgba(52,211,153,0.1)", border: "1px solid rgba(52,211,153,0.2)" }}>
                  <svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="#34d399" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p style={{ fontFamily: "'Syne', sans-serif", fontSize: 18, fontWeight: 700, color: "#e0e0f0" }}>
                  {tx.successTitle}
                </p>
                <p style={{ fontSize: 13, color: "#5a6a60" }}>{tx.successSub}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div style={{ marginBottom: 8 }}>
                  <p style={{ fontFamily: "'Syne', sans-serif", fontSize: 17, fontWeight: 700, color: "#e8e8f0", marginBottom: 4 }}>
                    {tx.formTitle}
                  </p>
                  <p style={{ fontSize: 13, color: "#5a5a70" }}>{tx.formSub}</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label style={labelStyle}>{tx.labelName}</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder={tx.placeholderName} style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
                  </div>
                  <div>
                    <label style={labelStyle}>{tx.labelEmail}</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder={tx.placeholderEmail} style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>{tx.labelSubject}</label>
                  <input type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder={tx.placeholderSubject} style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
                </div>

                <div>
                  <label style={labelStyle}>{tx.labelMessage}</label>
                  <textarea name="message" value={formData.message} onChange={handleChange} required rows={4} placeholder={tx.placeholderMessage} style={{ ...inputStyle, resize: "none" }} onFocus={onFocus} onBlur={onBlur} />
                </div>

                <button type="submit"
                  style={{ marginTop: 4, padding: "13px 24px", background: "linear-gradient(135deg, #6366f1 0%, #818cf8 100%)", border: "none", borderRadius: 12, color: "#fff", fontFamily: "'Syne', sans-serif", fontSize: 14, fontWeight: 700, letterSpacing: "0.04em", cursor: "pointer", transition: "opacity 0.2s, transform 0.15s" }}
                  onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.92"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)"; }}
                >
                  {tx.submit} &nbsp;→
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes availPulse {
          0%, 100% { box-shadow: 0 0 0 3px rgba(52,211,153,0.2); }
          50%       { box-shadow: 0 0 0 6px rgba(52,211,153,0.06); }
        }
      `}</style>
    </section>
  );
};

export default Contact;