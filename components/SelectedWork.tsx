"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const projects = [
  { number: "01", name: "Torque X", type: "Vehicle parts & service platform", role: "Product design · Full-stack", visual: "torque", images: [
    "/projects/torquex-hero.png",
    "/projects/torquex-offer.png",
    "/projects/torquex-service.png",
    "/projects/torquex-feedback.png",
  ] },
  { number: "02", name: "PrepSter", type: "AI-powered interview preparation system", role: "Product design · Full-stack", visual: "prepster", images: [
    "/projects/prepster-hero.png",
    "/projects/prepster-tutoring.png",
    "/projects/prepster-mentors.png",
  ] },
  { number: "03", name: "RAG Chatbot", type: "Retrieval-augmented knowledge base", role: "RAG pipeline · Backend", visual: "rag", mark: "KNOWLEDGE" },
];

export default function SelectedWork() {
  const sectionRef = useRef<HTMLElement>(null);

  const moveVisual = (event: React.PointerEvent<HTMLDivElement>) => {
    if (matchMedia("(pointer: coarse), (prefers-reduced-motion: reduce)").matches) return;
    const box = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width - .5;
    const y = (event.clientY - box.top) / box.height - .5;
    gsap.to(event.currentTarget.querySelector(".work-card-surface"), {
      x: x * 12, y: y * 10, rotationX: y * -4, rotationY: x * 4,
      duration: .7, ease: "power3.out", transformPerspective: 900,
    });
    gsap.to(event.currentTarget, {
      "--pointer-x": `${(x + .5) * 100}%`, "--pointer-y": `${(y + .5) * 100}%`,
      duration: .35, ease: "power2.out",
    });
  };

  const resetVisual = (event: React.PointerEvent<HTMLDivElement>) => {
    gsap.to(event.currentTarget.querySelector(".work-card-surface"), {
      x: 0, y: 0, rotationX: 0, rotationY: 0, duration: .8, ease: "power3.out",
    });
  };

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(".work-intro > *", {
        y: 42,
        autoAlpha: 0,
        stagger: .08,
        duration: .9,
        ease: "power4.out",
        scrollTrigger: { trigger: ".work-intro", start: "top 78%", once: true },
      });

      gsap.utils.toArray<HTMLElement>(".work-card").forEach((card) => {
        const visual = card.querySelector(".work-card-visual");
        const copy = card.querySelector(".work-card-copy");
        const image = card.querySelector(".work-card-image");
        const timeline = gsap.timeline({
          scrollTrigger: { trigger: card, start: "top 88%", once: true },
        });
        timeline
          .fromTo(visual, { autoAlpha: 0, scale: 0.95, y: 30 }, { autoAlpha: 1, scale: 1, y: 0, duration: 0.8, ease: "power3.out" })
          .fromTo(copy, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.65, ease: "power3.out" }, "<.15");
        if (image) timeline.fromTo(image, { scale: 1.06 }, { scale: 1, duration: 1, ease: "power3.out" }, 0);
      });

      if (matchMedia("(min-width: 761px)").matches) {
        gsap.utils.toArray<HTMLElement>(".work-card-gallery").forEach((card) => {
          const slides = gsap.utils.toArray<HTMLElement>(".work-gallery-slide", card);
          if (slides.length < 2) return;
          const progress = card.querySelector(".work-gallery-progress i");
          gsap.set(slides.slice(1), { yPercent: 105, force3D: true });
          const gallery = gsap.timeline({
            scrollTrigger: {
              trigger: card,
              start: "top 8%",
              end: () => `+=${(slides.length - 1) * innerHeight * .55}`,
              pin: true,
              pinSpacing: true,
              scrub: 1.2,
              fastScrollEnd: true,
              preventOverlaps: true,
              invalidateOnRefresh: true,
            },
          });

          slides.slice(1).forEach((slide) => {
            gallery.fromTo(slide, { yPercent: 105 }, { yPercent: 0, duration: 1, ease: "none", force3D: true });
          });
          gallery.fromTo(progress, { scaleX: 1 / slides.length }, { scaleX: 1, duration: slides.length - 1, ease: "none" }, 0);
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="work" className="work-section" aria-labelledby="work-title">
      <header className="work-intro">
        <p className="work-eyebrow">SELECTED WORK / {String(projects.length).padStart(2, "0")}</p>
        <h2 id="work-title">Useful products for real people.</h2>
        <p>Strategy, product design, and full-stack build.</p>
      </header>

      <div className="work-list">
        {projects.map((project, index) => (
          <article
            className={`work-card${index ? " work-card-spaced" : ""}${index % 2 ? " work-card-reverse" : ""}${project.images ? " work-card-gallery" : ""}`}
            key={project.name}
          >
            <div className={`work-card-visual work-card-${project.visual}`} onPointerMove={moveVisual} onPointerLeave={resetVisual}>
              <div className="work-card-surface">
                {project.images ? (
                  <div className="work-gallery">
                    {project.images.map((image, index) => (
                      <div className="work-gallery-slide" key={`${image}-${index}`}>
                        <Image
                          src={image}
                          alt={`${project.name} screen ${index + 1}`}
                          fill
                          sizes="(max-width: 760px) 100vw, 72vw"
                          className="work-card-image"
                          priority
                        />
                        <span>{String(index + 1).padStart(2, "0")}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <span className="work-card-placeholder" aria-hidden="true">{project.mark}</span>
                )}
              </div>
            </div>
            <div className="work-card-copy">
              <p className="work-card-number">{project.number} / {String(projects.length).padStart(2, "0")}</p>
              <h3>{project.name}</h3>
              <p className="work-card-type">{project.type}</p>
              <p className="work-card-role">{project.role}</p>
              {project.images && project.images.length > 1 && <div className="work-gallery-progress" aria-hidden="true"><span>SCROLL / {String(project.images.length).padStart(2, "0")} SCREENS</span><i /></div>}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
