'use client';

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useCallback } from "react";
import ScrollReveal from "../../components/ScrollReveal";
import ScrollLine from "../../components/ScrollLine";
import Footer from "../../components/Footer";
import { useMediaSrc } from "../../components/MediaProvider";

export default function NosAgencesPage() {
  const media = useMediaSrc();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const mapScale = useTransform(heroProgress, [0, 1], [1, 1.08]);
  const mapOpacity = useTransform(heroProgress, [0, 0.6], [1, 0]);
  const heroContentY = useTransform(heroProgress, [0, 1], [0, -60]);

  const mauleonRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: mauleonProgress } = useScroll({
    target: mauleonRef,
    offset: ["start end", "end start"],
  });
  const mauleonImgY = useTransform(mauleonProgress, [0, 1], ["-4%", "4%"]);

  const sablesRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: sablesProgress } = useScroll({
    target: sablesRef,
    offset: ["start end", "end start"],
  });
  const sablesImgY = useTransform(sablesProgress, [0, 1], ["-4%", "4%"]);

  const scrollToMauleon = useCallback(() => {
    mauleonRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const scrollToSables = useCallback(() => {
    sablesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <>
      <main className="overflow-x-hidden bg-offwhite text-primary">
        {/* ═══════════ HERO — Carte de France ═══════════ */}
        <section
          ref={heroRef}
          className="relative flex h-screen overflow-hidden bg-offwhite"
        >
          {/* Carte de France — côté gauche / centrée sur mobile */}
          <motion.div
            style={{ scale: mapScale, opacity: mapOpacity, y: heroContentY }}
            className="absolute inset-0 flex items-center justify-center md:justify-start md:pl-[8vw]"
          >
            <div className="relative">
              <Image
                src={media("/images/france.svg")}
                alt="Carte de France — Implantations Alain Coutant : Mauléon (79) et Les Sables-d'Olonne (85)"
                width={520}
                height={560}
                priority
                className="h-auto w-[70vw] max-w-[420px] md:w-[38vw] md:max-w-[520px]"
              />

              {/* Hotspot — Mauléon */}
              <button
                onClick={scrollToMauleon}
                className="group absolute h-[6%] w-[6%] -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                style={{ left: "34.5%", top: "45.2%" }}
                aria-label="Voir l'agence de Mauléon"
              >
                <span className="pointer-events-none absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap rounded-lg bg-primary px-3 py-1.5 text-xs font-medium tracking-wide text-white opacity-0 shadow-lg transition-all duration-200 translate-y-1 group-hover:translate-y-0 group-hover:opacity-100">
                  Agence Mauléon
                  <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-primary" />
                </span>
              </button>

              {/* Hotspot — Les Sables-d'Olonne */}
              <button
                onClick={scrollToSables}
                className="group absolute h-[6%] w-[6%] -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                style={{ left: "25.2%", top: "50.7%" }}
                aria-label="Voir l'agence des Sables-d'Olonne"
              >
                <span className="pointer-events-none absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap rounded-lg bg-primary px-3 py-1.5 text-xs font-medium tracking-wide text-white opacity-0 shadow-lg transition-all duration-200 translate-y-1 group-hover:translate-y-0 group-hover:opacity-100">
                  Agence Les Sables
                  <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-primary" />
                </span>
              </button>
            </div>
          </motion.div>

          {/* Texte — en bas sur mobile, à droite sur desktop */}
          <motion.div
            style={{ opacity: mapOpacity }}
            className="relative z-10 mt-auto flex w-full flex-col items-center px-6 pb-24 text-center md:ml-auto md:mt-0 md:flex md:w-1/2 md:items-end md:justify-center md:pb-0 md:pr-[8vw] md:text-right"
          >
            <p className="text-xs uppercase tracking-[0.4em] text-primary/50">
              Deux-Sèvres · Vendée
            </p>
            <h1 className="mt-3 font-serif text-3xl md:text-5xl">
              Nos Agences
            </h1>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-primary/45 md:text-base">
              Deux implantations, un même engagement&nbsp;: l&apos;attention,
              la sensibilité et l&apos;exigence du travail bien fait.
            </p>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            style={{ opacity: mapOpacity }}
            className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-primary/50"
          >
            <span className="text-xs uppercase tracking-[0.35em]">Découvrir</span>
            <span className="h-10 w-px bg-primary/20" />
            <div className="h-2.5 w-2.5 animate-bounce rounded-full bg-accent" />
          </motion.div>
        </section>

        {/* ═══════════ FIL CONDUCTEUR ═══════════ */}
        <div className="flex flex-col items-center bg-offwhite py-4">
          <ScrollLine className="h-20 w-px bg-accent/25" />
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            viewport={{ once: true }}
            className="mt-1 h-1.5 w-1.5 rounded-full bg-accent/40"
          />
        </div>

        {/* ═══════════ MAULÉON — Siège Social ═══════════ */}
        <section ref={mauleonRef} className="overflow-hidden bg-offwhite">
          <div className="mx-auto max-w-6xl px-6 py-16 md:px-12 md:py-28">
            <ScrollReveal className="mb-14 text-center md:mb-20">
              <span className="text-xs uppercase tracking-[0.4em] text-accent md:text-[0.65rem]">
                Siège social · Deux-Sèvres
              </span>
              <h2 className="mt-3 font-serif text-3xl leading-snug md:text-[2.6rem]">
                Mauléon
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-primary/65 md:text-lg">
                Depuis 1886, c&apos;est ici que tout commence. Au cœur du bocage
                deux-sévrien, notre siège rassemble l&apos;essentiel&nbsp;: les ateliers,
                les bureaux de conception et la majeure partie de nos trente
                compagnons.
              </p>
            </ScrollReveal>

            <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
              <ScrollReveal direction="left">
                <div className="relative h-[45vh] md:h-[55vh] overflow-hidden rounded-2xl">
                  <motion.div
                    style={{
                      y: mauleonImgY,
                      backgroundImage: `url('${media("/images/entreprise.jpg")}')`
                    }}
                    className="absolute inset-[-6%] bg-cover bg-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent" />
                </div>
              </ScrollReveal>

              <ScrollReveal>
                <div className="space-y-8">
                  <div className="space-y-5">
                    <h3 className="font-serif text-2xl md:text-3xl">
                      Le berceau de l&apos;entreprise
                    </h3>
                    <p className="max-w-lg text-base leading-[1.9] text-primary/65 md:text-[1.06rem]">
                      Mauléon est plus qu&apos;une adresse c&apos;est l&apos;ancrage.
                      Ici, la transmission du geste se fait de compagnon à
                      compagnon, dans un territoire qui a façonné notre
                      identité&nbsp;: le bon sens du Poitou, la rigueur artisanale,
                      l&apos;exigence tranquille de ceux qui savent.
                    </p>
                    <p className="max-w-lg text-base leading-[1.9] text-primary/65 md:text-[1.06rem]">
                      Couverture patrimoniale, architecture contemporaine,
                      marchés publics et privés chaque projet naît de cette
                      base, porté par l&apos;ADN de la maison.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-xl border border-accent/15 bg-white p-5">
                      <span className="font-serif text-2xl text-accent">30</span>
                      <p className="mt-1 text-xs uppercase tracking-[0.2em] text-primary/50">
                        Compagnons
                      </p>
                    </div>
                    <div className="rounded-xl border border-accent/15 bg-white p-5">
                      <span className="font-serif text-2xl text-accent">1886</span>
                      <p className="mt-1 text-xs uppercase tracking-[0.2em] text-primary/50">
                        Fondation
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm text-primary/70">
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 h-[2px] w-5 shrink-0 bg-accent/40" />
                      <span>Rue Gustave Eiffel, 79700 Mauléon</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 h-[2px] w-5 shrink-0 bg-accent/40" />
                      <Link href="tel:+33549815528" className="transition hover:text-accent">
                        +33 (0)5 49 81 55 28
                      </Link>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Carte Mauléon */}
            <ScrollReveal className="mt-14 md:mt-20">
              <div className="overflow-hidden rounded-2xl border border-primary/10 shadow-soft">
                <iframe
                  title="Plan Agence Mauléon"
                  src="https://maps.google.com/maps?q=Rue+Gustave+Eiffel%2C+79700+Maul%C3%A9on&t=k&z=17&output=embed"
                  className="h-56 w-full md:h-72"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ═══════════ TRANSITION ═══════════ */}
        <div className="flex flex-col items-center bg-offwhite py-6">
          <ScrollLine className="h-24 w-px bg-accent/25" />
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            viewport={{ once: true }}
            className="mt-1 h-1.5 w-1.5 rounded-full bg-accent/40"
          />
        </div>

        {/* ═══════════ LES SABLES-D'OLONNE ═══════════ */}
        <section ref={sablesRef} className="overflow-hidden bg-white">
          {/* Image pleine largeur avec parallaxe */}
          <div className="relative h-[50vh] md:h-[65vh] overflow-hidden">
            <motion.div
              style={{
                y: sablesImgY,
                backgroundImage: `url('${media("/images/agence-hero.avif")}')`
              }}
              className="absolute inset-[-6%] bg-cover bg-center"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-primary/40 to-primary/70" />
            <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-12 md:px-12">
              <ScrollReveal>
                <span className="text-xs uppercase tracking-[0.4em] text-white/70 md:text-[0.65rem]">
                  Littoral · Vendée
                </span>
                <h2 className="mt-3 font-serif text-3xl leading-snug text-white md:text-[2.6rem]">
                  Les Sables-d&apos;Olonne
                </h2>
              </ScrollReveal>
            </div>
          </div>

          <div className="mx-auto max-w-6xl px-6 py-16 md:px-12 md:py-28">
            <div className="grid items-start gap-10 md:grid-cols-2 md:gap-16">
              <ScrollReveal>
                <div className="space-y-6">
                  <h3 className="font-serif text-2xl md:text-3xl">
                    Face à l&apos;océan, d&apos;autres exigences
                  </h3>
                  <p className="max-w-lg text-base leading-[1.9] text-primary/65 md:text-[1.06rem]">
                    Les vents d&apos;ouest, l&apos;iode, les embruns le littoral
                    impose ses propres règles. Notre agence des
                    Sables-d&apos;Olonne est née de cette nécessité&nbsp;: porter le
                    même niveau d&apos;exigence que Mauléon, mais avec une
                    lecture adaptée au milieu salin.
                  </p>
                  <p className="max-w-lg text-base leading-[1.9] text-primary/65 md:text-[1.06rem]">
                    Ici, chaque choix de matériau, chaque détail de mise en
                    œuvre intègre la contrainte marine. Ce n&apos;est pas une
                    concession c&apos;est un savoir-faire à part entière.
                  </p>

                  <div className="space-y-2 pt-2 text-sm text-primary/70">
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 h-[2px] w-5 shrink-0 bg-accent/40" />
                      <span>10 Rue Jacquard, 85180 Les Sables-d&apos;Olonne</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 h-[2px] w-5 shrink-0 bg-accent/40" />
                      <Link href="tel:+33200000000" className="transition hover:text-accent">
                        +33 (0)2 xx xx xx xx
                      </Link>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal>
                <div className="space-y-5">
                  <span className="text-xs uppercase tracking-[0.4em] text-accent md:text-[0.65rem]">
                    Expertise milieu salin
                  </span>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-xl border border-accent/15 bg-offwhite p-6">
                      <h4 className="font-serif text-lg">Zinc Quartz &amp; Inox</h4>
                      <p className="mt-3 text-sm leading-relaxed text-primary/60">
                        Résistance à la corrosion, finition satinée et tenue
                        aux vents marins. Des matériaux choisis pour durer face
                        aux éléments.
                      </p>
                    </div>
                    <div className="rounded-xl border border-accent/15 bg-offwhite p-6">
                      <h4 className="font-serif text-lg">Étanchéité Marine</h4>
                      <p className="mt-3 text-sm leading-relaxed text-primary/60">
                        Traitements spécifiques, évacuation des eaux et
                        protection long terme contre les atmosphères salines.
                      </p>
                    </div>
                    <div className="rounded-xl border border-accent/15 bg-offwhite p-6">
                      <h4 className="font-serif text-lg">Bardages Côtiers</h4>
                      <p className="mt-3 text-sm leading-relaxed text-primary/60">
                        Habillages extérieurs pensés pour le bord de mer&nbsp;:
                        esthétique balnéaire et durabilité sans compromis.
                      </p>
                    </div>
                    <div className="rounded-xl border border-accent/15 bg-offwhite p-6">
                      <h4 className="font-serif text-lg">Couverture Littorale</h4>
                      <p className="mt-3 text-sm leading-relaxed text-primary/60">
                        Ardoise, tuile, zinc chaque couverture est pensée
                        selon l&apos;exposition aux embruns et aux vents dominants.
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Carte Les Sables */}
            <ScrollReveal className="mt-14 md:mt-20">
              <div className="overflow-hidden rounded-2xl border border-primary/10 shadow-soft">
                <iframe
                  title="Plan Agence Les Sables-d'Olonne"
                  src="https://maps.google.com/maps?q=10+Rue+Jacquard%2C+85180+Les+Sables-d%27Olonne&t=k&z=17&output=embed"
                  className="h-56 w-full md:h-72"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
