"use client";

import { useEffect, useRef } from "react";

// Wraps content and fades/slides it in when it scrolls into view.
// Use `stagger` to animate children one after another.
export default function Reveal({
  children,
  className = "",
  stagger = false,
  as: Tag = "div",
  ...rest
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`${stagger ? "reveal-stagger" : "reveal"} ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}
