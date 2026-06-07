"use client";

import React, { useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  glowColor?: string;
  className?: string;
}

const TILT_RANGE = 5; // gradi massimi di inclinazione

export function SpotlightCard({
  children,
  glowColor = "rgba(34, 211, 238, 0.15)", // Default cyan technological glow (brand)
  className,
  ...props
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCoords({ x, y });
    if (!reduce) {
      setTilt({
        rx: -(y / rect.height - 0.5) * TILT_RANGE,
        ry: (x / rect.width - 0.5) * TILT_RANGE,
      });
    }
  };

  const handleLeave = () => {
    setIsHovered(false);
    setTilt({ rx: 0, ry: 0 });
  };

  const transform =
    reduce || !isHovered
      ? undefined
      : `perspective(900px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale(1.01)`;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleLeave}
      className={cn(
        "relative overflow-hidden rounded-2xl border border-line bg-white/[0.02] p-6 backdrop-blur-sm transition-[transform,border-color,background-color] duration-200 ease-[var(--ease-premium)] hover:border-line-strong",
        className
      )}
      style={
        {
          "--mouse-x": `${coords.x}px`,
          "--mouse-y": `${coords.y}px`,
          transform,
          transformStyle: "preserve-3d",
        } as React.CSSProperties
      }
      {...props}
    >
      {/* Background Spotlight Glow Layer */}
      <div
        className={cn(
          "absolute pointer-events-none inset-0 opacity-0 transition-opacity duration-300",
          isHovered && "opacity-100"
        )}
        style={{
          background: `radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), ${glowColor}, transparent 80%)`,
        }}
      />

      {/* Light border reflection effect */}
      <div
        className={cn(
          "absolute pointer-events-none -inset-px opacity-0 transition-opacity duration-300 rounded-xl border border-transparent",
          isHovered && "opacity-100"
        )}
        style={{
          background: `radial-gradient(250px circle at var(--mouse-x) var(--mouse-y), rgba(255, 255, 255, 0.15), transparent 80%)`,
          maskImage: "linear-gradient(black, black)",
          WebkitMaskImage: "linear-gradient(black, black)",
          maskClip: "content-box",
          WebkitMaskClip: "content-box",
        }}
      />

      {/* Card Content Wrapper */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
