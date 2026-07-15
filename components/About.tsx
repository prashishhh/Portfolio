"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".about-content > *", {
        y: 56,
        autoAlpha: 0,
        stagger: .12,
        duration: .9,
        ease: "power4.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 76%", once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="about-section" aria-labelledby="about-title">
      <div className="about-content">
        <p className="about-identity"><strong>PRASHISH SAPKOTA</strong><span>Product Builder</span></p>
        <h2 id="about-title">I design, build, and ship software.</h2>
        <p className="about-description">
          From thoughtful interfaces to scalable backend systems, I create products
          that are fast, reliable, and built to last.
        </p>
      </div>
    </section>
  );
}
