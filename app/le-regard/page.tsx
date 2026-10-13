'use client';

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useMediaSrc } from "../../components/MediaProvider";

export default function LeRegardPage() {
  const media = useMediaSrc();
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#0b1026] px-6 text-white">
      {/* Fond étoilé subtil */}
      <div className="pointer-events-none absolute inset-0">
        {[...Array(40)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute block h-px w-px rounded-full bg-white"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{ opacity: [0.2, 0.8, 0.2] }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 4,
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative z-10 flex max-w-2xl flex-col items-center text-center"
      >
        <Image
          src={media("/images/LePetitPrincePsychiatrePsychothérapeute-removebg-preview.png")}
          alt="Le Petit Prince"
          width={120}
          height={120}
          className="mb-12 h-24 w-auto opacity-80 md:h-32"
        />

        <blockquote className="font-serif text-2xl leading-relaxed tracking-wide md:text-4xl md:leading-relaxed">
          &laquo;&nbsp;On ne voit bien qu&apos;avec le cœur.
          <br />
          L&apos;essentiel est invisible pour les yeux.&nbsp;&raquo;
        </blockquote>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="mt-8 text-sm uppercase tracking-[0.35em] text-white/50"
        >
          Antoine de Saint-Exupéry — Le Petit Prince
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-8 z-10"
      >
        <Link
          href="/"
          className="text-xs uppercase tracking-[0.3em] text-white/30 transition hover:text-white/60"
        >
          Revenir
        </Link>
      </motion.div>
    </main>
  );
}
