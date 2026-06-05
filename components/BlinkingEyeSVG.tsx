'use client';

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type BlinkingEyeSVGProps = {
  openSrc: string;
  closedSrc: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  scrollLinked?: boolean;
  blinkInterval?: number;
  blinkDuration?: number;
};

export default function BlinkingEyeSVG({
  openSrc,
  closedSrc,
  alt,
  width,
  height,
  className = "",
  scrollLinked = true,
  blinkInterval = 4000,
  blinkDuration = 120,
}: BlinkingEyeSVGProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isClosed, setIsClosed] = useState(false);

  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.25"],
  });
  const scrollClipPercent = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const scrollClipPath = useTransform(scrollClipPercent, (v: number) => `inset(0 ${v}% 0 0)`);
  const scrollOpacity = useTransform(scrollYProgress, [0, 0.35], [0.4, 1]);

  useEffect(() => {
    let closeTimeout: ReturnType<typeof setTimeout>;

    const blink = () => {
      setIsClosed(true);
      closeTimeout = setTimeout(() => setIsClosed(false), blinkDuration);
    };

    const interval = setInterval(blink, blinkInterval);

    return () => {
      clearInterval(interval);
      clearTimeout(closeTimeout);
    };
  }, [blinkInterval, blinkDuration]);

  const imageClassName = "h-full w-full object-contain";

  const stackedImages = (
    <div className="relative w-full" style={{ aspectRatio: `${width} / ${height}` }}>
      <Image
        src={openSrc}
        alt={alt}
        width={width}
        height={height}
        className={`${imageClassName} ${isClosed ? "invisible" : "visible"}`}
        priority
      />
      <Image
        src={closedSrc}
        alt=""
        width={width}
        height={height}
        aria-hidden="true"
        className={`absolute inset-0 ${imageClassName} ${isClosed ? "visible" : "invisible"}`}
      />
    </div>
  );

  return (
    <div ref={ref} className={className}>
      {scrollLinked ? (
        <motion.div style={{ clipPath: scrollClipPath, opacity: scrollOpacity }}>
          {stackedImages}
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
              duration: 2.8,
              delay: 0.3,
              ease: [0.22, 0.61, 0.36, 1],
            },
            opacity: {
              duration: 2.8 * 0.4,
              delay: 0.3,
              ease: "easeOut",
            },
          }}
        >
          {stackedImages}
        </motion.div>
      )}
    </div>
  );
}
