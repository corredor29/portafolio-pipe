import { useState } from "react";
import { motion } from "framer-motion";
import { useLang } from "../context/useLang";

const EXPO = [0.22, 1, 0.36, 1];
const EMAIL = "corredorsilvafelipe8@gmail.com";
const LINKEDIN = "https://linkedin.com/in/felipe-corredor-95664434b";
const LINKEDIN_LABEL = "linkedin.com/in/felipe-corredor-95664434b";

const COPY = {
  es: {
    kicker: "06 — Señal", title: "CONTACTO", headline: "Hablemos.",
    lead: "¿Un proyecto, una idea o una oportunidad? Escríbeme y respondo pronto.",
    email: "Correo", linkedin: "LinkedIn", avail: "Disponibilidad",
    availText: "Disponible para proyectos freelance y oportunidades.",
    name: "Nombre", mail: "Email", subject: "Asunto", message: "Mensaje",
    phName: "Tu nombre", phMail: "tu@correo.com", phSubject: "¿De qué se trata?", phMessage: "Cuéntame un poco…",
    send: "Enviar", sending: "Enviando…", ok: "Mensaje enviado. Gracias — te respondo pronto.",
    err: `Ocurrió un error. Escribe a ${EMAIL}`,
  },
  en: {
    kicker: "06 — Signal", title: "CONTACT", headline: "Let’s talk.",
    lead: "A project, an idea or an opportunity? Write me and I’ll reply soon.",
    email: "Email", linkedin: "LinkedIn", avail: "Availability",
    availText: "Available for freelance projects and opportunities.",
    name: "Name", mail: "Email", subject: "Subject", message: "Message",
    phName: "Your name", phMail: "you@email.com", phSubject: "What is it about?", phMessage: "Tell me a bit…",
    send: "Send", sending: "Sending…", ok: "Message sent. Thanks — I’ll reply soon.",
    err: `Something went wrong. Write to ${EMAIL}`,
  },
};

const mono = { fontFamily: "'Space Mono', monospace" };
const sans = { fontFamily: "'DM Sans', sans-serif" };
const label = "block text-[10px] tracking-[0.24em] uppercase text-[#7B919C] mb-3";
const field =
  "w-full bg-transparent border-0 border-b border-[#7B919C]/30 rounded-none px-0 py-3 text-[15px] text-[#DEDCDC] placeholder:text-[#989DAA]/70 outline-none transition-colors duration-300 focus:border-[#C5BAC4]";

const reveal = (i = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.9, ease: EXPO, delay: 0.08 * i },
});

const Contact = () => {
  const { lang } = useLang();
  const c = COPY[lang] || COPY.es;
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState("idle");

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    try {
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: "0b6d2745-f0e2-45e7-91f8-8a8047913385",
          name: formData.name,
          email: formData.email,
          subject: formData.subject || "Nuevo mensaje desde el Portafolio Web",
          message: formData.message,
          from_name: "Portafolio Felipe Corredor",
        }),
      });
      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const linkCls =
    "relative inline-block text-[#DEDCDC] text-lg md:text-xl break-all no-underline after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-px after:w-full after:bg-[#C5BAC4] after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-500 hover:text-[#C5BAC4] transition-colors duration-300";

  return (
    <section id="contacto-stage" className="relative w-full text-[#DEDCDC] px-6 md:px-12 pt-32 pb-28 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #191D23 0%, #07080A 55%, #000 100%)" }}>
      <div className="relative max-w-6xl mx-auto">
        <motion.div {...reveal(0)} className="flex items-center gap-4 mb-6">
          <span className="text-[11px] tracking-[0.3em] uppercase text-[#989DAA]" style={mono}>{c.kicker}</span>
          <span className="h-px w-16 bg-[#57707A]/60" />
        </motion.div>
        <motion.h2 {...reveal(1)} className="leading-[0.9] text-[#57707A] text-[clamp(3.5rem,10vw,9rem)] tracking-tight"
          style={{ fontFamily: "'Anton', sans-serif" }}>{c.title}</motion.h2>
        <motion.p {...reveal(2)} className="mt-6 text-[clamp(2rem,4.5vw,3.75rem)] leading-none text-[#DEDCDC]"
          style={{ fontFamily: "'Anton', sans-serif" }}>{c.headline}</motion.p>
        <motion.p {...reveal(3)} className="mt-4 max-w-xl text-[#7B919C] text-base md:text-lg font-light" style={sans}>{c.lead}</motion.p>

        <div className="mt-16 h-px w-full bg-[#7B919C]/20" />

        <div className="mt-14 grid lg:grid-cols-[45fr_55fr] gap-14 lg:gap-20">
          <div className="flex flex-col gap-10" style={sans}>
            <motion.div {...reveal(0)}>
              <span className={label} style={mono}>{c.email}</span>
              <a href={`mailto:${EMAIL}`} className={linkCls}>{EMAIL}</a>
            </motion.div>
            <motion.div {...reveal(1)}>
              <span className={label} style={mono}>{c.linkedin}</span>
              <a href={LINKEDIN} target="_blank" rel="noreferrer" className={linkCls}>{LINKEDIN_LABEL}</a>
            </motion.div>
            <motion.div {...reveal(2)}>
              <span className={label} style={mono}>{c.avail}</span>
              <p className="flex items-baseline gap-3 text-[#DEDCDC]/90 text-base md:text-lg font-light">
                <span aria-hidden className="inline-block w-1.5 h-1.5 rounded-full bg-[#C5BAC4] translate-y-[-2px]" />
                {c.availText}
              </p>
            </motion.div>
          </div>

          <motion.form {...reveal(1)} onSubmit={handleSubmit} className="flex flex-col gap-8" style={sans}>
            <div className="grid sm:grid-cols-2 gap-8">
              <label><span className={label} style={mono}>{c.name}</span>
                <input name="name" required value={formData.name} onChange={handleChange} placeholder={c.phName} className={field} /></label>
              <label><span className={label} style={mono}>{c.mail}</span>
                <input name="email" type="email" required value={formData.email} onChange={handleChange} placeholder={c.phMail} className={field} /></label>
            </div>
            <label><span className={label} style={mono}>{c.subject}</span>
              <input name="subject" value={formData.subject} onChange={handleChange} placeholder={c.phSubject} className={field} /></label>
            <label><span className={label} style={mono}>{c.message}</span>
              <textarea name="message" required rows={4} value={formData.message} onChange={handleChange} placeholder={c.phMessage} className={`${field} resize-none`} /></label>
            <div className="flex flex-wrap items-center gap-6 pt-2">
              <button type="submit" disabled={status === "loading"}
                className="group inline-flex items-center gap-3 border border-[#DEDCDC]/40 px-7 py-3 text-[12px] tracking-[0.28em] uppercase text-[#DEDCDC] bg-transparent hover:border-[#C5BAC4] hover:text-[#C5BAC4] transition-colors duration-300 disabled:opacity-50"
                style={mono}>
                {status === "loading" ? c.sending : c.send}
                <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
              </button>
              {status === "success" && <span className="text-sm text-[#C5BAC4]">{c.ok}</span>}
              {status === "error" && <span className="text-sm text-[#989DAA]">{c.err}</span>}
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
