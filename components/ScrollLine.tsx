'use client';

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

type ScrollLineProps = {
  className?: string;
};

export default function ScrollLine({ className = "h-16 w-px bg-accent/25" }: ScrollLineProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.88", "end 0.55"]
  });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <motion.div
      ref={ref}
      style={{ scaleY, transformOrigin: "top" }}
      className={className}
    />
  );
}
