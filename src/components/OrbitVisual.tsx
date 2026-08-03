"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const SATELLITES = [
  { label: "Leads", angle: 0, ring: 1 },
  { label: "HRMS", angle: 90, ring: 1 },
  { label: "Invoicing", angle: 180, ring: 1 },
  { label: "Connectors", angle: 270, ring: 1 },
];

export default function OrbitVisual() {
  const ringRef = useRef<SVGGElement>(null);
  const ring2Ref = useRef<SVGGElement>(null);
  const pulseRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(ringRef.current, {
        rotation: 360,
        transformOrigin: "50% 50%",
        duration: 40,
        repeat: -1,
        ease: "none",
      });
      gsap.to(ring2Ref.current, {
        rotation: -360,
        transformOrigin: "50% 50%",
        duration: 55,
        repeat: -1,
        ease: "none",
      });
      gsap.to(pulseRef.current, {
        scale: 2.4,
        opacity: 0,
        transformOrigin: "50% 50%",
        duration: 2.4,
        repeat: -1,
        ease: "power2.out",
      });

      // counter-rotate labels so text stays upright
      gsap.utils.toArray<SVGGElement>(".sat-counter").forEach((el) => {
        gsap.to(el, {
          rotation: -360,
          transformOrigin: "50% 50%",
          duration: 40,
          repeat: -1,
          ease: "none",
        });
      });
    });
    return () => ctx.revert();
  }, []);

  const R1 = 150;

  return (
    <svg
      viewBox="0 0 500 500"
      className="w-full h-full max-w-[560px] mx-auto"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="hubGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#5B4FFF" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#5B4FFF" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="ringStroke" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8B82FF" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#C8FF4D" stopOpacity="0.3" />
        </linearGradient>
      </defs>

      <circle cx="250" cy="250" r="130" fill="url(#hubGlow)" />

      {/* static outer faint ring for depth */}
      <circle
        cx="250"
        cy="250"
        r="200"
        fill="none"
        stroke="#23283F"
        strokeWidth="1"
      />

      {/* rotating ring with satellites */}
      <g ref={ringRef}>
        <circle
          cx="250"
          cy="250"
          r={R1}
          fill="none"
          stroke="url(#ringStroke)"
          strokeWidth="1.25"
          strokeDasharray="2 6"
        />
        {SATELLITES.map((s, i) => {
          const rad = (s.angle * Math.PI) / 180;
          const x = 250 + R1 * Math.cos(rad);
          const y = 250 + R1 * Math.sin(rad);
          return (
            <g key={s.label} transform={`translate(${x}, ${y})`}>
              <g className="sat-counter">
                <circle r="34" fill="#12162A" stroke="#23283F" strokeWidth="1" />
                <circle r="34" fill="none" stroke="#5B4FFF" strokeOpacity="0.4" strokeWidth="1">
                  <animate
                    attributeName="r"
                    values="34;40;34"
                    dur="3s"
                    repeatCount="indefinite"
                    begin={`${i * 0.4}s`}
                  />
                </circle>
                <text
                  textAnchor="middle"
                  dy="4"
                  fontSize="9"
                  fill="#F7F5F0"
                  fontFamily="var(--font-mono)"
                  letterSpacing="0.02em"
                >
                  {s.label}
                </text>
              </g>
            </g>
          );
        })}
      </g>

      {/* second, slower counter-rotating decorative ring */}
      <g ref={ring2Ref}>
        <circle
          cx="250"
          cy="250"
          r="235"
          fill="none"
          stroke="#23283F"
          strokeWidth="1"
          strokeDasharray="1 10"
        />
        {[45, 135, 225, 315].map((a) => {
          const rad = (a * Math.PI) / 180;
          const x = 250 + 235 * Math.cos(rad);
          const y = 250 + 235 * Math.sin(rad);
          return <circle key={a} cx={x} cy={y} r="2.5" fill="#8B8FA3" />;
        })}
      </g>

      {/* pulse ring */}
      <circle ref={pulseRef} cx="250" cy="250" r="60" fill="none" stroke="#C8FF4D" strokeWidth="1" opacity="0.6" />

      {/* central hub */}
      <circle cx="250" cy="250" r="62" fill="#0B0E1A" stroke="#5B4FFF" strokeWidth="1.5" />
      <circle cx="250" cy="250" r="52" fill="#12162A" />
      <text
        x="250"
        y="246"
        textAnchor="middle"
        fontSize="13"
        fontWeight="600"
        fill="#F7F5F0"
        fontFamily="var(--font-display)"
      >
        Ambit
      </text>
      <text
        x="250"
        y="262"
        textAnchor="middle"
        fontSize="8"
        fill="#8B8FA3"
        fontFamily="var(--font-mono)"
        letterSpacing="0.08em"
      >
        SINGLE RECORD
      </text>
    </svg>
  );
}
