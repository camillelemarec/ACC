'use client';

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  direction?: 'up' | 'left' | 'right';
  amount?: number;
};

export default function ScrollReveal({
  children,
  className = "",
  direction = 'up',
  amount = 40,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.95", "start 0.4"]
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const yUp = useTransform(scrollYProgress, [0, 1], [amount, 0]);
  const xMove = useTransform(
    scrollYProgress,
    [0, 1],
    [direction === 'right' ? amount : -amount, 0]
  );

  const style: Record<string, unknown> = { opacity };
  if (direction === 'up') style.y = yUp;
  else style.x = xMove;

  return (
    <motion.div ref={ref} style={style} className={className}>
      {children}
    </motion.div>
  );
}
