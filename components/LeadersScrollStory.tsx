"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useMediaSrc } from "../components/MediaProvider";

export type ArchiveItem = {
  src: string;
  alt: string;
  caption?: string;
};

export type LeaderStory = {
  id: "adrien" | "henri" | "hubert" | "alain";
  name: string;
  dates: string;
  role: string;
  text: string;
  photo: string;
  archives: ArchiveItem[];
};

type LeadersScrollStoryProps = {
  leaders: LeaderStory[];
};

/** Progress ranges along the sticky scroll track. */
const R = {
  adrienEnd: 0.12,
  henriFocusEnd: 0.2,
  henriArchEnd: 0.44,
  hubertEnd: 0.66,
} as const;

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * Math.min(1, Math.max(0, t));
}

function segment(p: number, start: number, end: number) {
  if (end <= start) return p >= end ? 1 : 0;
  return (p - start) / (end - start);
}

const PORTRAIT_WIDTH_PX = 210;
const PORTRAIT_SCALE = 1.19;
const PORTRAIT_VISUAL_WIDTH_PX = PORTRAIT_WIDTH_PX * PORTRAIT_SCALE;
const GALLERY_GAP_PX = 100;
const GALLERY_NUDGE_X_PX = -70;
const FOCUS_SCALE_BOOST = 1.1;

const MOBILE_PORTRAIT_WIDTH = 132;
const MOBILE_PORTRAIT_SCALE = 0.9;
const MOBILE_IMAGE_HEIGHT = 118;
const MOBILE_LABEL_HEIGHT = 44;
const MOBILE_GALLERY_GAP = 14;
const MOBILE_NUDGE_Y = -10;
const MOBILE_FOCUS_Y = -145;

function galleryXPx(index: number) {
  const step = PORTRAIT_VISUAL_WIDTH_PX + GALLERY_GAP_PX;
  return (index - 1.5) * step + GALLERY_NUDGE_X_PX;
}

function galleryYPx(index: number) {
  const step = MOBILE_IMAGE_HEIGHT + MOBILE_LABEL_HEIGHT + MOBILE_GALLERY_GAP;
  return (index - 1.5) * step + MOBILE_NUDGE_Y;
}

function vwToPx(vw: number) {
  if (typeof window === "undefined") return vw * 14;
  return (window.innerWidth * vw) / 100;
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return isMobile;
}

function usePortraitMotion(
  progress: MotionValue<number>,
  index: number,
  isMobile: boolean
) {
  const gx = galleryXPx(index);
  const gy = galleryYPx(index);
  const focusX = isMobile ? 0 : GALLERY_NUDGE_X_PX;
  const focusY = isMobile ? MOBILE_FOCUS_Y : 0;
  const exitX = [-48, -42, 45, 50][index]!;
  const exitY = [-6, 4, -4, 8][index]!;
  const mobileExitY = [-220, -180, 180, 220][index]!;

  const x = useTransform(progress, (p) => {
    if (isMobile) return 0;

    const exitPx = vwToPx(exitX);

    if (index === 0) {
      if (p < R.adrienEnd) return gx;
      return lerp(gx, exitPx, segment(p, R.adrienEnd, R.henriFocusEnd));
    }
    if (index === 1) {
      if (p < R.adrienEnd) return gx;
      if (p < R.henriFocusEnd)
        return lerp(gx, focusX, segment(p, R.adrienEnd, R.henriFocusEnd));
      if (p < R.henriArchEnd) return focusX;
      return lerp(focusX, exitPx, segment(p, R.henriArchEnd, R.hubertEnd));
    }
    if (index === 2) {
      if (p < R.adrienEnd) return gx;
      if (p < R.henriFocusEnd)
        return lerp(gx, exitPx, segment(p, R.adrienEnd, R.henriFocusEnd));
      if (p < R.henriArchEnd) return exitPx;
      if (p < R.hubertEnd)
        return lerp(exitPx, focusX, segment(p, R.henriArchEnd, R.henriArchEnd + 0.08));
      return lerp(focusX, exitPx, segment(p, R.hubertEnd, R.hubertEnd + 0.1));
    }
    if (p < R.adrienEnd) return gx;
    if (p < R.henriFocusEnd)
      return lerp(gx, exitPx, segment(p, R.adrienEnd, R.henriFocusEnd));
    if (p < R.hubertEnd) return exitPx;
    return lerp(exitPx, focusX, segment(p, R.hubertEnd, R.hubertEnd + 0.1));
  });

  const y = useTransform(progress, (p) => {
    if (isMobile) {
      if (index === 0) {
        if (p < R.adrienEnd) return gy;
        return lerp(gy, mobileExitY, segment(p, R.adrienEnd, R.henriFocusEnd));
      }
      if (index === 1) {
        if (p < R.adrienEnd) return gy;
        if (p < R.henriFocusEnd)
          return lerp(gy, focusY, segment(p, R.adrienEnd, R.henriFocusEnd));
        if (p < R.henriArchEnd) return focusY;
        return lerp(focusY, mobileExitY, segment(p, R.henriArchEnd, R.hubertEnd));
      }
      if (index === 2) {
        if (p < R.adrienEnd) return gy;
        if (p < R.henriFocusEnd)
          return lerp(gy, mobileExitY, segment(p, R.adrienEnd, R.henriFocusEnd));
        if (p < R.henriArchEnd) return mobileExitY;
        if (p < R.hubertEnd)
          return lerp(mobileExitY, focusY, segment(p, R.henriArchEnd, R.henriArchEnd + 0.08));
        return lerp(focusY, mobileExitY, segment(p, R.hubertEnd, R.hubertEnd + 0.1));
      }
      if (p < R.adrienEnd) return gy;
      if (p < R.henriFocusEnd)
        return lerp(gy, mobileExitY, segment(p, R.adrienEnd, R.henriFocusEnd));
      if (p < R.hubertEnd) return mobileExitY;
      return lerp(mobileExitY, focusY, segment(p, R.hubertEnd, R.hubertEnd + 0.1));
    }

    if (index === 0) {
      if (p < R.adrienEnd) return "0vh";
      return `${lerp(0, exitY, segment(p, R.adrienEnd, R.henriFocusEnd))}vh`;
    }
    if (index === 1) {
      if (p < R.adrienEnd) return "0vh";
      if (p < R.henriFocusEnd)
        return `${lerp(0, focusY, segment(p, R.adrienEnd, R.henriFocusEnd))}vh`;
      if (p < R.henriArchEnd) return `${focusY}vh`;
      return `${lerp(focusY, exitY, segment(p, R.henriArchEnd, R.hubertEnd))}vh`;
    }
    if (index === 2) {
      if (p < R.adrienEnd) return "0vh";
      if (p < R.henriFocusEnd)
        return `${lerp(0, exitY, segment(p, R.adrienEnd, R.henriFocusEnd))}vh`;
      if (p < R.henriArchEnd) return `${exitY}vh`;
      if (p < R.hubertEnd)
        return `${lerp(exitY, focusY, segment(p, R.henriArchEnd, R.henriArchEnd + 0.08))}vh`;
      return `${lerp(focusY, exitY, segment(p, R.hubertEnd, R.hubertEnd + 0.1))}vh`;
    }
    if (p < R.adrienEnd) return "0vh";
    if (p < R.henriFocusEnd)
      return `${lerp(0, exitY, segment(p, R.adrienEnd, R.henriFocusEnd))}vh`;
    if (p < R.hubertEnd) return `${exitY}vh`;
    return `${lerp(exitY, focusY, segment(p, R.hubertEnd, R.hubertEnd + 0.1))}vh`;
  });

  const scale = useTransform(progress, (p) => {
    const g = isMobile ? MOBILE_PORTRAIT_SCALE : PORTRAIT_SCALE;
    const f = g * FOCUS_SCALE_BOOST;
    const e = g * 0.55;
    if (index === 0) {
      if (p < R.adrienEnd) return g;
      return lerp(g, e, segment(p, R.adrienEnd, R.henriFocusEnd));
    }
    if (index === 1) {
      if (p < R.adrienEnd) return g;
      if (p < R.henriFocusEnd) return lerp(g, f, segment(p, R.adrienEnd, R.henriFocusEnd));
      if (p < R.henriArchEnd) return f;
      return lerp(f, e, segment(p, R.henriArchEnd, R.hubertEnd));
    }
    if (index === 2) {
      if (p < R.adrienEnd) return g;
      if (p < R.henriFocusEnd) return lerp(g, e, segment(p, R.adrienEnd, R.henriFocusEnd));
      if (p < R.henriArchEnd) return e;
      if (p < R.hubertEnd)
        return lerp(e, f, segment(p, R.henriArchEnd, R.henriArchEnd + 0.08));
      return lerp(f, e, segment(p, R.hubertEnd, R.hubertEnd + 0.1));
    }
    if (p < R.adrienEnd) return g;
    if (p < R.henriFocusEnd) return lerp(g, e, segment(p, R.adrienEnd, R.henriFocusEnd));
    if (p < R.hubertEnd) return e;
    return lerp(e, f, segment(p, R.hubertEnd, R.hubertEnd + 0.1));
  });

  const opacity = useTransform(progress, (p) => {
    if (index === 0) {
      if (p < R.adrienEnd) return 1;
      return 1 - segment(p, R.adrienEnd, R.henriFocusEnd);
    }
    if (index === 1) {
      if (p < R.henriArchEnd) return 1;
      return 1 - segment(p, R.henriArchEnd, R.hubertEnd);
    }
    if (index === 2) {
      if (p < R.adrienEnd) return 1;
      if (p < R.henriFocusEnd) return 1 - segment(p, R.adrienEnd, R.henriFocusEnd);
      if (p < R.henriArchEnd) return 0;
      if (p < R.hubertEnd)
        return segment(p, R.henriArchEnd, R.henriArchEnd + 0.08);
      return 1 - segment(p, R.hubertEnd, R.hubertEnd + 0.1);
    }
    if (p < R.adrienEnd) return 1;
    if (p < R.henriFocusEnd) return 1 - segment(p, R.adrienEnd, R.henriFocusEnd);
    if (p < R.hubertEnd) return 0;
    return segment(p, R.hubertEnd, R.hubertEnd + 0.1);
  });

  // Name label under each photo: visible in gallery mode, fades when chapters start
  const labelOpacity = useTransform(progress, (p) => {
    if (p < R.adrienEnd) return 1;
    return 1 - segment(p, R.adrienEnd, R.henriFocusEnd);
  });

  return { x, y, scale, opacity, labelOpacity };
}

function Portrait({
  leader,
  index,
  progress,
  isMobile,
}: {
  leader: LeaderStory;
  index: number;
  progress: MotionValue<number>;
  isMobile: boolean;
}) {
  const media = useMediaSrc();
  const { x, y, scale, opacity, labelOpacity } = usePortraitMotion(
    progress,
    index,
    isMobile
  );

  return (
    <motion.div
      style={{ x, y, scale, opacity }}
      className={`absolute left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center will-change-transform ${
        isMobile ? "top-[40%] w-[132px]" : "top-[33%] w-[210px]"
      }`}
    >
      <div
        className={`flex w-full shrink-0 items-end justify-center overflow-hidden ${
          isMobile ? "h-[118px]" : "h-[200px]"
        }`}
      >
        <Image
          src={media(leader.photo)}
          alt={leader.name}
          width={280}
          height={340}
          className="max-h-full w-auto max-w-full object-contain object-bottom"
          priority={index < 2}
        />
      </div>
      <motion.div
        style={{ opacity: labelOpacity }}
        className="mt-3 flex h-12 w-full shrink-0 flex-col items-center justify-start text-center"
      >
        <p className="text-[0.6rem] uppercase tracking-[0.25em] text-accent">
          {leader.dates}
        </p>
        <p className="mt-1 font-serif text-sm text-primary md:text-base">
          {leader.name}
        </p>
      </motion.div>
    </motion.div>
  );
}

/** Scattered "archive table" slots around the centered portrait. */
const ARCHIVE_SLOTS = [
  "right-[2%] top-[10%] w-[38%] max-w-[300px] md:right-[6%] md:top-[12%] md:w-[24%]",
  "left-[2%] top-[14%] w-[36%] max-w-[280px] md:left-[6%] md:top-[16%] md:w-[22%]",
  "right-[4%] top-[52%] w-[34%] max-w-[260px] md:right-[9%] md:top-[54%] md:w-[20%]",
  "left-[4%] top-[54%] w-[34%] max-w-[260px] md:left-[9%] md:top-[56%] md:w-[20%]",
  "right-[1%] top-[30%] w-[24%] max-w-[190px] md:right-[1%] md:top-[30%] md:w-[13%]",
];

const ARCHIVE_SLOTS_MOBILE = [
  "left-1/2 top-[34%] w-[82vw] max-w-[360px] -translate-x-1/2",
  "left-1/2 top-[44%] w-[82vw] max-w-[360px] -translate-x-1/2",
  "left-1/2 top-[54%] w-[82vw] max-w-[360px] -translate-x-1/2",
  "left-1/2 top-[64%] w-[82vw] max-w-[360px] -translate-x-1/2",
  "left-1/2 top-[39%] w-[70vw] max-w-[300px] -translate-x-1/2",
];

function ArchiveCard({
  item,
  index,
  progress,
  appearStart,
  appearEnd,
  fadeStart,
  fadeEnd,
  isMobile,
}: {
  item: ArchiveItem;
  index: number;
  progress: MotionValue<number>;
  appearStart: number;
  appearEnd: number;
  fadeStart: number;
  fadeEnd: number;
  isMobile: boolean;
}) {
  const media = useMediaSrc();
  const opacity = useTransform(
    progress,
    fadeEnd > fadeStart
      ? [appearStart, appearEnd, fadeStart, fadeEnd]
      : [appearStart, appearEnd],
    fadeEnd > fadeStart ? [0, 1, 1, 0] : [0, 1]
  );
  const y = useTransform(
    progress,
    [appearStart, appearEnd],
    isMobile ? [56, 0] : [40, 0]
  );
  const rotate = useTransform(
    progress,
    [appearStart, appearEnd],
    isMobile
      ? [0, 0]
      : [index % 2 === 0 ? -5 : 6, index % 2 === 0 ? -2 : 2.5]
  );
  const x = useTransform(
    progress,
    [appearStart, appearEnd],
    isMobile ? [0, 0] : [index % 2 === 0 ? -20 : 24, 0]
  );
  const cardScale = useTransform(
    progress,
    [appearStart, appearEnd],
    isMobile ? [0.92, 1] : [1, 1]
  );

  const slots = isMobile ? ARCHIVE_SLOTS_MOBILE : ARCHIVE_SLOTS;

  return (
    <motion.figure
      style={{ opacity, y, rotate, x, scale: cardScale }}
      className={`absolute z-10 ${slots[index % slots.length]}`}
    >
      <Image
        src={media(item.src)}
        alt={item.alt}
        width={680}
        height={400}
        className="h-auto w-full object-contain"
      />
      {item.caption ? (
        <figcaption className="mt-2 font-serif text-xs leading-relaxed text-primary/70 md:text-sm">
          {item.caption}
        </figcaption>
      ) : null}
    </motion.figure>
  );
}

function ChapterCopy({
  leaders,
  progress,
  isMobile,
}: {
  leaders: LeaderStory[];
  progress: MotionValue<number>;
  isMobile: boolean;
}) {
  const focused = leaders.filter((l) => l.id !== "adrien");
  const opacities = [
    useTransform(progress, [0.14, 0.2, 0.42, 0.48], [0, 1, 1, 0]),
    useTransform(progress, [0.48, 0.54, 0.63, 0.69], [0, 1, 1, 0]),
    useTransform(progress, [0.7, 0.78, 1], [0, 1, 1]),
  ];

  return (
    <div
      className={`pointer-events-none absolute left-1/2 z-20 w-[86vw] max-w-md -translate-x-1/2 ${
        isMobile ? "top-[78%]" : "top-[66%] md:top-[68%]"
      }`}
    >
      {focused.map((leader, i) => (
        <motion.div
          key={leader.id}
          style={{ opacity: opacities[i] }}
          className="absolute inset-x-0 top-0 text-center"
        >
          <p className="text-[0.65rem] uppercase tracking-[0.3em] text-accent">
            {leader.dates} · {leader.role}
          </p>
          <h2 className="mt-2 font-serif text-2xl text-primary md:text-3xl">
            {leader.name}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-primary/70 md:text-base">
            {leader.text}
          </p>
        </motion.div>
      ))}
    </div>
  );
}

/**
 * Chapter boundaries (progress values) where the scroll must pause:
 * start of Henri, Hubert and Alain chapters.
 */
const CHAPTER_GATES = [0.14, 0.46, 0.7];
/** How long the scroll stays held at a gate (ms). */
const GATE_HOLD_MS = 650;

export default function LeadersScrollStory({ leaders }: LeadersScrollStoryProps) {
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 45,
    damping: 24,
    mass: 0.6,
  });

  // Hard "retenue": a strong fling cannot cross more than one chapter
  // boundary — the page is pinned at the gate for a short hold, then the
  // next gesture continues. Wheel/trackpad only; reverse scrolling is free.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let lockUntil = 0;
    let lockY = 0;
    let lockDown = true;

    const onWheel = (e: WheelEvent) => {
      const rect = el.getBoundingClientRect();
      const sectionTop = window.scrollY + rect.top;
      const vh = window.innerHeight;
      const track = rect.height - vh;
      const start = sectionTop;
      const end = sectionTop + track;
      const y = window.scrollY;

      // Only act while the sticky scene is pinned
      if (y < start - vh * 0.5 || y > end + vh * 0.5) return;

      const now = performance.now();
      const goingDown = e.deltaY > 0;

      // During a hold: block movement in the locked direction
      if (now < lockUntil && goingDown === lockDown) {
        e.preventDefault();
        window.scrollTo({ top: lockY });
        return;
      }

      const gates = CHAPTER_GATES.map((p) => start + p * track);
      const target = y + e.deltaY;

      let gate: number | null = null;
      if (goingDown) {
        for (const g of gates) {
          if (y < g - 2 && target > g) {
            gate = g;
            break;
          }
        }
      } else {
        for (let i = gates.length - 1; i >= 0; i--) {
          const g = gates[i]!;
          if (y > g + 2 && target < g) {
            gate = g;
            break;
          }
        }
      }

      if (gate !== null) {
        e.preventDefault();
        window.scrollTo({ top: gate });
        lockUntil = now + GATE_HOLD_MS;
        lockY = gate;
        lockDown = goingDown;
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, []);

  // Per-chapter archive timing: sequential reveal, fade before next chapter
  const archiveWindows: Record<
    string,
    { start: number; step: number; duration: number; fadeStart: number; fadeEnd: number }
  > = {
    henri: { start: 0.22, step: 0.06, duration: 0.06, fadeStart: 0.42, fadeEnd: 0.48 },
    hubert: { start: 0.5, step: 0.05, duration: 0.055, fadeStart: 0.64, fadeEnd: 0.7 },
    alain: { start: 0.72, step: 0.05, duration: 0.06, fadeStart: 0, fadeEnd: 0 },
  };

  return (
    <section
      ref={containerRef}
      className="relative h-[600vh] bg-white"
      aria-label="Lignée des dirigeants"
    >
      <div className="sticky top-0 h-screen overflow-hidden bg-white">
        <div className="relative mx-auto h-full max-w-7xl">
          <div className="absolute left-6 top-8 z-10 md:left-12 md:top-12">
            <p className="text-[0.65rem] uppercase tracking-[0.35em] text-primary/45">
              La lignée
            </p>
          </div>

          <div className="absolute inset-0">
            {leaders.map((leader, index) => (
              <Portrait
                key={leader.id}
                leader={leader}
                index={index}
                progress={progress}
                isMobile={isMobile}
              />
            ))}
          </div>

          {leaders.flatMap((leader) => {
            const win = archiveWindows[leader.id];
            if (!win) return [];
            return leader.archives.map((item, i) => {
              const start = win.start + i * win.step;
              const end = start + win.duration;
              return (
                <ArchiveCard
                  key={`${leader.id}-${item.src}-${i}`}
                  item={item}
                  index={i}
                  progress={progress}
                  appearStart={start}
                  appearEnd={end}
                  fadeStart={win.fadeStart}
                  fadeEnd={win.fadeEnd}
                  isMobile={isMobile}
                />
              );
            });
          })}

          <ChapterCopy leaders={leaders} progress={progress} isMobile={isMobile} />
        </div>
      </div>
    </section>
  );
}
