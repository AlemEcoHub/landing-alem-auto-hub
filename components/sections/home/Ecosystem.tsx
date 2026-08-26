"use client";

import { useEffect, useState } from "react";
import SectionHeading from "../../SectionHeading";
import Reveal from "../../Reveal";
import Highlight from "../../Highlight";
import { useInView } from "../../motion/useInView";
import type { Dict } from "@/lib/i18n";

// ЭКРАН 3 · ЭКОСИСТЕМА — цикл показан спидометром: шкала с делениями, стрелка
// идёт по стадиям, в центре читается название текущего этапа.
const CX = 320;
const CY = 228;
const R = 158;
const A0 = -120;
const SPAN = 240;
const TICKS = 28;
const STEP_MS = 950;

// Угол отсчитывается по часовой стрелке от 12 часов.
function polar(radius: number, deg: number) {
  const a = ((deg - 90) * Math.PI) / 180;
  return { x: CX + radius * Math.cos(a), y: CY + radius * Math.sin(a) };
}

function arcPath(radius: number, from: number, to: number) {
  const p0 = polar(radius, from);
  const p1 = polar(radius, to);
  const large = Math.abs(to - from) > 180 ? 1 : 0;
  return `M ${p0.x.toFixed(1)} ${p0.y.toFixed(1)} A ${radius} ${radius} 0 ${large} 1 ${p1.x.toFixed(1)} ${p1.y.toFixed(1)}`;
}

const ARC_LEN = 2 * Math.PI * R * (SPAN / 360);

export default function Ecosystem({ t }: { t: Dict }) {
  const e = t.home.ecosystem;
  const count = e.nodes.length;
  const { ref, inView } = useInView<HTMLDivElement>(0.3);
  const [stage, setStage] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStage(count - 1);
      return;
    }
    // Цикл идёт по кругу и после последней стадии начинается заново —
    // это и есть мысль блока.
    const id = setInterval(() => setStage((s) => (s + 1) % count), STEP_MS);
    return () => clearInterval(id);
  }, [inView, count]);

  const angle = (i: number) => A0 + (SPAN * i) / (count - 1);

  return (
    <section id="ecosystem" className="section relative overflow-hidden">
      <div
        className="glow-brand absolute left-1/2 top-1/2 h-[460px] w-[460px] -translate-x-1/2 -translate-y-1/2 opacity-50"
        aria-hidden
      />
      <div className="container-x relative">
        <SectionHeading trackId="ecosystem" eyebrow={e.eyebrow} title={e.title} />

        <div ref={ref} className="mx-auto mt-10 w-full max-w-[620px] sm:mt-14">
          <svg
            viewBox="0 0 640 400"
            className="h-auto w-full"
            role="img"
            aria-label={`${e.center}: ${e.nodes.join(" → ")}`}
          >
            <defs>
              <linearGradient id="dialFill" x1="0" y1="1" x2="1" y2="0">
                <stop offset="0" stopColor="#E8431E" />
                <stop offset="1" stopColor="#FF8C00" />
              </linearGradient>
            </defs>

            <path className="dial-base" d={arcPath(R, A0, A0 + SPAN)} />
            <path
              className="dial-fill"
              d={arcPath(R, A0, A0 + SPAN)}
              style={{
                strokeDasharray: `${ARC_LEN.toFixed(0)} 2000`,
                strokeDashoffset: (ARC_LEN * (1 - stage / (count - 1))).toFixed(1),
              }}
            />

            {/* деления шкалы */}
            {Array.from({ length: TICKS + 1 }, (_, i) => {
              const deg = A0 + (SPAN * i) / TICKS;
              const major = i % 4 === 0;
              const p1 = polar(R - 20, deg);
              const p2 = polar(R - (major ? 34 : 28), deg);
              return (
                <line
                  key={`tick-${i}`}
                  className={major ? "dial-tick dial-tick-major" : "dial-tick"}
                  x1={p1.x.toFixed(1)}
                  y1={p1.y.toFixed(1)}
                  x2={p2.x.toFixed(1)}
                  y2={p2.y.toFixed(1)}
                />
              );
            })}

            {/* стадии цикла */}
            {e.nodes.map((node, i) => {
              const deg = angle(i);
              const pn = polar(R, deg);
              const pl = polar(R + 30, deg);
              const passed = i <= stage;
              const active = i === stage;
              const anchor =
                pl.x < CX - 12 ? "end" : pl.x > CX + 12 ? "start" : "middle";
              return (
                <g key={node}>
                  <circle
                    className={`dial-node ${passed ? "is-on" : ""}`}
                    cx={pn.x.toFixed(1)}
                    cy={pn.y.toFixed(1)}
                    r="13"
                  />
                  <text
                    className={`dial-num ${passed ? "is-on" : ""}`}
                    x={pn.x.toFixed(1)}
                    y={(pn.y + 4).toFixed(1)}
                    textAnchor="middle"
                  >
                    {i + 1}
                  </text>
                  <text
                    className={`dial-label ${active ? "is-on" : ""}`}
                    x={pl.x.toFixed(1)}
                    y={(pl.y + 4).toFixed(1)}
                    textAnchor={anchor}
                  >
                    {node}
                  </text>
                </g>
              );
            })}

            {/* стрелка */}
            <g
              className="dial-needle"
              style={{ transform: `rotate(${angle(stage)}deg)` }}
            >
              <line
                x1={CX}
                y1={CY}
                x2={CX}
                y2={CY - R + 34}
                stroke="#FF8C00"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <circle className="dial-hub" cx={CX} cy={CY} r="16" />
            </g>

            <text className="dial-caption" x={CX} y={CY - 46} textAnchor="middle">
              {e.center.toUpperCase()}
            </text>
            <text className="dial-readout" x={CX} y={CY + 68} textAnchor="middle">
              {e.nodes[stage]}
            </text>
          </svg>

          {/* На телефоне подписи по кругу нечитаемы — выносим их списком. */}
          <ol className="mt-4 grid grid-cols-2 gap-x-4 gap-y-1.5 sm:hidden">
            {e.nodes.map((node, i) => (
              <li
                key={node}
                className={`flex items-baseline gap-2 text-[13px] transition-colors ${
                  i === stage ? "text-white" : "text-muted"
                }`}
              >
                <span
                  className={`font-mono text-[11px] ${
                    i <= stage ? "text-brand-light" : "text-muted/60"
                  }`}
                >
                  {i + 1}
                </span>
                {node}
              </li>
            ))}
          </ol>
        </div>

        <Reveal className="mx-auto mt-8 max-w-3xl text-center">
          <p className="text-balance text-xl font-bold leading-snug text-white sm:text-2xl">
            <Highlight text={e.text} />
          </p>
          <p className="mt-3 text-sm text-muted">{e.cycleNote}</p>
        </Reveal>
      </div>
    </section>
  );
}
