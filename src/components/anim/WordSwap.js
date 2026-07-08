"use client";

import { useEffect, useState } from "react";

// Cycles through a list of words with a slide-up animation.
// Used in the hero headline (e.g. Drills → Grinders → Washers …).
export default function WordSwap({ words, interval = 2200, className = "" }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % words.length);
    }, interval);
    return () => clearInterval(t);
  }, [words.length, interval]);

  return (
    <span className="word-swap">
      {words.map((w, i) => (
        <span
          key={w}
          className={`${className} ${
            i === index ? "active" : i === (index - 1 + words.length) % words.length ? "leaving" : ""
          }`}
          aria-hidden={i !== index}
        >
          {w}
        </span>
      ))}
    </span>
  );
}
