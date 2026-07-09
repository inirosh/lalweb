"use client";

import { useEffect, useState } from "react";

// Shows a live "ends in Xd Xh Xm Xs" countdown until `endsAt`.
// Renders nothing once the time has passed (or if no date given).
export default function Countdown({ endsAt, className = "" }) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  if (!endsAt) return null;
  const end = new Date(endsAt).getTime();
  const diff = end - now;
  if (diff <= 0) return null;

  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  const pad = (n) => String(n).padStart(2, "0");

  const Box = ({ children }) => (
    <span className="rounded bg-brand-dark px-1.5 py-0.5 font-mono text-xs font-bold text-white">
      {children}
    </span>
  );

  return (
    <span className={`inline-flex items-center gap-1 ${className}`}>
      {d > 0 && (
        <>
          <Box>{d}d</Box>
          <span className="text-gray-400">:</span>
        </>
      )}
      <Box>{pad(h)}</Box>
      <span className="text-gray-400">:</span>
      <Box>{pad(m)}</Box>
      <span className="text-gray-400">:</span>
      <Box>{pad(s)}</Box>
    </span>
  );
}
