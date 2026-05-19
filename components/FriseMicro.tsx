'use client';

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const steps = [
  { step: "I", title: "Écoute, Regard, Dialogue", subtitle: "La rencontre" },
  { step: "II", title: "La Réflexion et le Trait", subtitle: "La conception" },
  { step: "III", title: "La Mise en Œuvre", subtitle: "Les hommes" },
];

export default function FriseMicro() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "end 0.55"]
  });

  const introOp = useTransform(scrollYProgress, [0, 0.15], [0, 1]);

  const op1 = useTransform(scrollYProgress, [0.05, 0.25], [0, 1]);
  const y1 = useTransform(scrollYProgress, [0.05, 0.25], [20, 0]);
  const line1 = useTransform(scrollYProgress, [0.2, 0.42], [0, 1]);

  const op2 = useTransform(scrollYProgress, [0.33, 0.53], [0, 1]);
  const y2 = useTransform(scrollYProgress, [0.33, 0.53], [20, 0]);
  const line2 = useTransform(scrollYProgress, [0.48, 0.7], [0, 1]);

  const op3 = useTransform(scrollYProgress, [0.6, 0.8], [0, 1]);
  const y3 = useTransform(scrollYProgress, [0.6, 0.8], [20, 0]);

  const opArr = [op1, op2, op3];
  const yArr = [y1, y2, y3];
  const lineArr = [line1, line2];

  return (
    <section className="bg-offwhite py-16 md:py-24">
      <div ref={ref} className="mx-auto max-w-4xl px-6 md:px-12">
        <motion.p
          style={{ opacity: introOp }}
          className="mb-12 text-center font-serif text-sm italic tracking-widest text-accent md:mb-16 md:text-base"
        >
          Depuis 1886, voilà comment nous voyons les choses
        </motion.p>

        {/* Desktop */}
        <div className="hidden md:flex items-start justify-between">
          {steps.map((item, i) => (
            <div
              key={item.step}
              className="flex items-start"
              style={{ flex: i < 2 ? "1 1 0%" : "0 0 auto" }}
            >
              <motion.div
                style={{ opacity: opArr[i], y: yArr[i] }}
                className="flex w-40 shrink-0 flex-col items-center text-center"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-accent/30 bg-offwhite font-serif text-sm text-accent">
                  {item.step}
                </span>
                <h3 className="mt-4 max-w-[11rem] font-serif text-base leading-snug md:text-lg">
                  {item.title}
                </h3>
                <p className="mt-1 text-xs uppercase tracking-[0.25em] text-primary/40">
                  {item.subtitle}
                </p>
              </motion.div>
              {i < 2 && (
                <motion.div
                  style={{ scaleX: lineArr[i], transformOrigin: "left" }}
                  className="mt-5 h-px flex-1 bg-accent/25"
                />
              )}
            </div>
          ))}
        </div>

        {/* Mobile */}
        <div className="flex flex-col items-center md:hidden">
          {steps.map((item, i) => (
            <div key={item.step} className="flex flex-col items-center">
              <motion.div
                style={{ opacity: opArr[i], y: yArr[i] }}
                className="flex flex-col items-center text-center"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-accent/30 bg-offwhite font-serif text-sm text-accent">
                  {item.step}
                </span>
                <h3 className="mt-4 max-w-[11rem] font-serif text-base leading-snug">
                  {item.title}
                </h3>
                <p className="mt-1 text-xs uppercase tracking-[0.25em] text-primary/40">
                  {item.subtitle}
                </p>
              </motion.div>
              {i < 2 && (
                <motion.div
                  style={{ scaleY: lineArr[i], transformOrigin: "top" }}
                  className="my-4 h-10 w-px bg-accent/25"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
