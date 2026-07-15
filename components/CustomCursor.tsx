"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    // Check if device is touch or screen size is small
    const checkDevice = () => {
      const mobileOrTouch = 
        window.matchMedia("(max-width: 768px)").matches || 
        ("ontouchstart" in window) || 
        (navigator.maxTouchPoints > 0);
      setIsMobile(mobileOrTouch);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);

    if (isMobile) return () => window.removeEventListener("resize", checkDevice);

    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      
      if (dotRef.current) {
        dotRef.current.style.left = `${clientX}px`;
        dotRef.current.style.top = `${clientY}px`;
      }
      
      if (ringRef.current) {
        ringRef.current.animate(
          {
            left: `${clientX}px`,
            top: `${clientY}px`
          },
          { duration: 150, fill: "forwards" }
        );
      }
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isHoverable = 
        target.tagName === "A" || 
        target.tagName === "BUTTON" || 
        target.closest("a") || 
        target.closest("button") || 
        target.classList.contains("interactive") || 
        target.closest(".interactive");

      if (isHoverable) {
        document.body.classList.add("hover-active");
      } else {
        document.body.classList.remove("hover-active");
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover", onMouseOver);

    return () => {
      window.removeEventListener("resize", checkDevice);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      document.body.classList.remove("hover-active");
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      <div ref={dotRef} className="custom-cursor" />
      <div ref={ringRef} className="custom-cursor-ring" />
    </>
  );
}
