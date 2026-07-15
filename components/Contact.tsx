"use client";
/* eslint-disable @next/next/no-img-element */

import { FormEvent, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const email = "prashishbusiness@gmail.com";
const heroTools = [
  { name: "Django", slug: "django", size: 64 },
  { name: "LangChain", slug: "langchain", size: 72, hero: true },
  { name: "Automation", slug: "n8n", size: 56 },
];

const marqueeTools = [
  ["React", "react"],
  ["Next.js", "nextdotjs"],
  ["C#", "csharp"],
  ["Docker", "docker"],
];

const getIconUrl = (slug: string, color: string) => {
  if (slug === "langchain") {
    return "/langchain.png";
  }
  if (slug === "csharp") {
    return "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/csharp.svg";
  }
  if (slug === "n8n") {
    return "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/n8n.svg";
  }
  return `https://cdn.simpleicons.org/${slug}/${color}`;
};

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".contact-title span", {
        yPercent: 110,
        stagger: .08,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: { trigger: ".contact-title", start: "top 82%", once: true },
      });
      gsap.from(".pro-label", {
        y: 20,
        autoAlpha: 0,
        duration: .7,
        ease: "power4.out",
        scrollTrigger: { trigger: ".pro-section", start: "top 82%", once: true },
      });
      gsap.from(".pro-hero-tool", {
        y: 50,
        autoAlpha: 0,
        stagger: .1,
        duration: .8,
        ease: "power3.out",
        scrollTrigger: { trigger: ".pro-heroes", start: "top 82%", once: true },
      });
      gsap.from(".marquee-wrap", {
        autoAlpha: 0,
        duration: .6,
        ease: "power2.out",
        scrollTrigger: { trigger: ".marquee-wrap", start: "top 90%", once: true },
      });
      gsap.from(".contact-form > *", {
        y: 30,
        autoAlpha: 0,
        stagger: .07,
        duration: .7,
        ease: "power3.out",
        scrollTrigger: { trigger: ".contact-form", start: "top 86%", once: true },
      });
      gsap.from(".footer-brand-title span", {
        yPercent: 60,
        autoAlpha: 0,
        stagger: 0.12,
        duration: 1.1,
        ease: "power4.out",
        scrollTrigger: { trigger: ".site-footer", start: "top 82%", once: true },
      });
      gsap.from(".footer-col", {
        y: 25,
        autoAlpha: 0,
        stagger: 0.08,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: ".site-footer", start: "top 82%", once: true },
      });

    }, sectionRef);
    return () => ctx.revert();
  }, []);
  const sendEmail = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = data.get("name")?.toString().trim() || "New enquiry";
    const sender = data.get("email")?.toString().trim() || "Not provided";
    const message = data.get("message")?.toString().trim() || "I’d like to discuss a project.";
    const subject = encodeURIComponent(`Portfolio enquiry — ${name}`);
    const body = encodeURIComponent(`Name / company: ${name}\nEmail: ${sender}\n\n${message}`);
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };



  return (
    <section ref={sectionRef} id="contact" className="contact-wrap" aria-labelledby="contact-title">
      <div className="pro-section">
        <p className="pro-label">PROFESSIONAL AT</p>

        {/* Hero Tools — 3 main technologies */}
        <div className="pro-heroes">
          {heroTools.map((tool) => (
            <div
              className={`pro-hero-tool${tool.hero ? " pro-hero-featured" : ""}`}
              key={tool.name}
            >
              <img
                src={getIconUrl(tool.slug, tool.hero ? "ffffff" : "171717")}
                alt={tool.name}
                width={tool.size}
                height={tool.size}
                style={{ width: tool.size, height: tool.size }}
              />
            </div>
          ))}
        </div>

        {/* Marquee Strip — infinite scrolling smaller icons */}
        <div className="marquee-wrap">
          <div className="marquee-track">
            {/* Repeat the list multiple times for seamless scrolling on wide screens */}
            {Array(6).fill(marqueeTools).flat().map(([name, slug], i) => (
              <div className="marquee-item" key={`${slug}-${i}`}>
                <img
                  src={getIconUrl(slug, "171717")}
                  alt={name}
                  width={28}
                  height={28}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="contact-section">
        <p className="contact-eyebrow">05 / CONTACT</p>
        <h2 id="contact-title" className="contact-title">
          <span>Have something</span><span>worth building?</span>
        </h2>

        <form className="contact-form" onSubmit={sendEmail}>
          <label>
            <span>MY NAME / COMPANY IS</span>
            <input name="name" autoComplete="name" placeholder="Your name or company" required />
          </label>
          <label>
            <span>REPLY TO</span>
            <input name="email" type="email" autoComplete="email" placeholder="you@company.com" required />
          </label>
          <label className="contact-message">
            <span>THE SHORT VERSION</span>
            <textarea name="message" placeholder="What are we making?" rows={1} required />
          </label>
          <button type="submit"><span>SEND THE BRIEF</span><b>↗︎</b></button>
        </form>
      </div>

      <footer className="site-footer">
        <div className="footer-top">
          <div className="footer-cols">
            <div className="footer-col">
              <h4>CONNECT</h4>
              <div className="footer-socials">
                <a href="https://github.com/prashishhh" target="_blank" rel="noreferrer" aria-label="GitHub">
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 .7a11.5 11.5 0 0 0-3.64 22.4c.58.1.79-.25.79-.56v-2.23c-3.22.7-3.9-1.36-3.9-1.36-.52-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.57-.29-5.27-1.28-5.27-5.68 0-1.26.45-2.28 1.19-3.08-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.16 1.18A10.95 10.95 0 0 1 12 6.14c.98 0 1.95.13 2.86.39 2.2-1.49 3.16-1.18 3.16-1.18.63 1.58.23 2.75.11 3.04.74.8 1.19 1.82 1.19 3.08 0 4.41-2.71 5.38-5.29 5.67.42.36.78 1.06.78 2.14v3.26c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .7Z" /></svg>
                </a>
                <a href="https://www.linkedin.com/in/prashishsapkota/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V8.98h3.41v1.57h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.29ZM5.32 7.41a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.1 20.45H3.54V8.98H7.1v11.47Z" /></svg>
                </a>
              </div>
            </div>
            <div className="footer-col">
              <h4>COLLABORATION</h4>
              <p>Open To Freelance Projects &amp; Remote Opportunities.</p>
              <a href={`mailto:${email}`} className="footer-email-link">PRASHISHBUSINESS@GMAIL.COM ↗︎</a>
            </div>
          </div>
        </div>

        <div className="footer-middle">
          <h2 className="footer-brand-title">
            <span className="font-display-serif-italic">Prashish</span>
            <span className="font-display-heavy-sans">
              SAPKOTA
            </span>
          </h2>
        </div>

        <div className="footer-bottom">
          <p>© 2026 PRASHISH SAPKOTA</p>
          <nav aria-label="Footer navigation">
            <a href="#work">WORK</a><a href="#about">ABOUT</a><a href={`mailto:${email}`}>EMAIL ↗︎</a>
          </nav>
          <a href="#top" className="back-to-top-btn">BACK TO TOP ↑︎</a>
        </div>
      </footer>
    </section>
  );
}
