"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function Hero() {
  const [time, setTime] = useState("");
  const heroRef = useRef<HTMLElement>(null);
  const accentRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const tick = () => setTime(new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Kathmandu", hour: "2-digit", minute: "2-digit",
      second: "2-digit", hour12: false,
    }).format(new Date()));
    tick();
    const timer = window.setInterval(tick, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const moveLens = (event: React.PointerEvent<HTMLElement>) => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const box = event.currentTarget.getBoundingClientRect();
    gsap.to(event.currentTarget, {
      "--spot-x": `${event.clientX - box.left}px`,
      "--spot-y": `${event.clientY - box.top}px`,
      duration: .35,
      ease: "power3.out",
    });
  };

  const showLens = () => gsap.to(accentRef.current, { opacity: 1, duration: .25, ease: "power2.out" });
  const hideLens = () => gsap.to(accentRef.current, { opacity: 0, duration: .35, ease: "power2.out" });

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".hero-meta-item", { y: 16, autoAlpha: 0 }, {
        y: 0, autoAlpha: 1, duration: .7, stagger: .06, ease: "power4.out",
        clearProps: "transform,opacity,visibility",
      });
      gsap.fromTo(".hero-word", { yPercent: 110 }, {
        yPercent: 0, duration: 1.05, stagger: .08, ease: "power4.out",
        clearProps: "transform",
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="hero" aria-labelledby="hero-title">
      <header className="profile-nav">
        <a className="hero-meta-item profile-nav-name" href="#top">
          <strong>Prashish Sapkota</strong>
          <span>Product Builder</span>
        </a>
        <p className="hero-meta-item profile-nav-meta"><strong>Kathmandu, Nepal</strong><span>{time || "--:--:--"} NPT</span></p>
        <nav className="hero-meta-item profile-links" aria-label="Primary navigation">
          <a href="#work">WORK</a><a href="#about">ABOUT</a><a href="#contact">CONTACT</a>
        </nav>
      </header>

      <main className="hero-stage" onPointerEnter={showLens} onPointerMove={moveLens} onPointerLeave={hideLens}>
        <p className="hero-kicker">DESIGNER&apos;S EYE <span>×</span> DEVELOPER&apos;S BRAIN</p>

        <h1 id="hero-title" aria-label="Product Builder">
          <span className="word-mask"><span className="hero-word">PRODUCT</span></span>
          <span className="word-mask builder-mask"><span className="hero-word builder-word">BUILDER</span></span>
        </h1>

        <h1 ref={accentRef} className="accent-title" aria-hidden="true">
          <span className="word-mask"><span className="hero-word">PRODUCT</span></span>
          <span className="word-mask builder-mask"><span className="hero-word builder-word">BUILDER</span></span>
        </h1>

      </main>

      <div className="hero-bottom">
        <p className="hero-bottom-item hero-intro">I design the system, build the interface, and ship the product.</p>
        <a className="hero-bottom-item work-link" href="#work">
          <span>See what I&apos;ve built ↘</span>
        </a>
      </div>
    </section>
  );
}
