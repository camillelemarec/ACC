'use client';

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

type DrawingSVGProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  duration?: number;
  delay?: number;
  scrollLinked?: boolean;
};

export default function DrawingSVG({
  src,
  alt,
  width,
  height,
  className = "",
  duration = 2.8,
  delay = 0.3,
  scrollLinked = false,
}: DrawingSVGProps) {
  const ref = useRef<HTMLDivElement>(null);

  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.25"]
  });
  const scrollClipPercent = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const scrollClipPath = useTransform(scrollClipPercent, (v: number) => `inset(0 ${v}% 0 0)`);
  const scrollOpacity = useTransform(scrollYProgress, [0, 0.35], [0.4, 1]);

  return (
    <div ref={ref} className={className}>
      {scrollLinked ? (
        <motion.div style={{ clipPath: scrollClipPath, opacity: scrollOpacity }}>
          <Image src={src} alt={alt} width={width} height={height} className="h-auto w-full" />
        </motion.div>
      ) : (
        <motion.div
          initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0.4 }}
          animate={
            isInView
              ? { clipPath: "inset(0 0% 0 0)", opacity: 1 }
              : undefined
          }
          transition={{
            clipPath: {
              duration,
              delay,
              ease: [0.22, 0.61, 0.36, 1],
            },
            opacity: {
              duration: duration * 0.4,
              delay,
              ease: "easeOut",
            },
          }}
        >
          <Image src={src} alt={alt} width={width} height={height} className="h-auto w-full" />
        </motion.div>
      )}
    </div>
  );
}
