"use client";

import { useEffect, useState } from "react";

// Thin gradient bar at the very top that fills as you scroll the page.
export default function ScrollProgress() {
  const [scale, setScale] = useState(0);

  useEffect(() => {
    function onScroll() {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setScale(max > 0 ? h.scrollTop / max : 0);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return <div className="scroll-progress" style={{ transform: `scaleX(${scale})` }} />;
}
