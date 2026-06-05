'use client';

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Logo from "../components/Logo";
import ScrollIndicator from "../components/ScrollIndicator";
import Footer from "../components/Footer";
import BlinkingEyeSVG from "../components/BlinkingEyeSVG";
import DrawingSVG from "../components/DrawingSVG";
import ScrollReveal from "../components/ScrollReveal";
import ScrollLine from "../components/ScrollLine";
import FriseMicro from "../components/FriseMicro";
import { asset } from "../lib/asset";

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  const heroBgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1]);
  const heroContentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroContentScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.92]);
  const heroContentY = useTransform(scrollYProgress, [0, 0.5], [0, -40]);
  const heroBottomOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);

  const ch2Ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress: ch2Progress } = useScroll({
    target: ch2Ref,
    offset: ["start end", "end start"]
  });
  const ch2BgY = useTransform(ch2Progress, [0, 1], ["5%", "-5%"]);

  const entrepriseRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress: entrepriseProgress } = useScroll({
    target: entrepriseRef,
    offset: ["start end", "end start"]
  });
  const entrepriseImgY = useTransform(entrepriseProgress, [0, 1], ["-6%", "6%"]);
  const entrepriseImgScale = useTransform(entrepriseProgress, [0, 0.5], [0.95, 1]);

  const gammesRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress: gammesProgress } = useScroll({
    target: gammesRef,
    offset: ["start end", "end start"]
  });
  const gammesImgY = useTransform(gammesProgress, [0, 1], ["-6%", "6%"]);

  const contactRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress: contactProgress } = useScroll({
    target: contactRef,
    offset: ["start end", "end start"]
  });
  const contactImgY = useTransform(contactProgress, [0, 1], ["-6%", "6%"]);
  const contactImgScale = useTransform(contactProgress, [0, 0.5], [0.95, 1]);

  return (
    <main className="overflow-x-hidden">
      {/* ═══════════ HERO ═══════════ */}
      <section
        ref={heroRef}
        className="relative h-screen overflow-hidden"
        aria-label="Accueil SARL Alain Coutant"
      >
        <Logo
          variant="light"
          size="sm"
          className="absolute left-1/2 top-[13px] z-20 -translate-x-1/2"
        />
        <motion.div
          style={{ scale: heroBgScale }}
          className="absolute inset-0"
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover"
            src={asset("/images/Cap Sud Ouest_  Thouars _ Deux Sèvres.mp4")}
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/45 to-primary/70" />
        <div className="relative z-10 flex h-full flex-col justify-between px-6 py-8 text-white md:px-12 md:py-12">
          <motion.div
            style={{ opacity: heroContentOpacity, scale: heroContentScale, y: heroContentY }}
            className="flex flex-1 flex-col items-center justify-center gap-6 text-center"
          >
            <h1 className="max-w-4xl font-serif text-3xl leading-tight md:text-5xl">
              Alain Coutant Couverture
            </h1>
          </motion.div>
          <motion.div
            style={{ opacity: heroBottomOpacity }}
            className="flex items-center justify-between"
          >
            <p className="md:translate-y-[40px] text-xs uppercase tracking-[0.3em] md:text-sm">
              L&apos;Art et la passion de la Couverture depuis 1886
            </p>
            <ScrollIndicator />
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FRISE MICRO-CONDENSÉE — 3 étapes
          ═══════════════════════════════════════════ */}
      <FriseMicro />

      {/* ═══════════════════════════════════════════
          STORYTELLING — Le Voyage
          ═══════════════════════════════════════════ */}

      {/* ── Chapitre 1 · L'Écoute, le Regard, le Dialogue ── */}
      <section className="relative overflow-hidden bg-offwhite">
        <div className="mx-auto max-w-6xl px-6 pb-8 pt-20 md:px-12 md:pb-16 md:pt-32">
          <ScrollReveal className="text-center mb-16 md:mb-24">
            <span className="text-xs md:text-[0.65rem] uppercase tracking-[0.4em] text-primary/40">
              Chapitre premier
            </span>
            <h2 className="mt-3 font-serif text-3xl leading-snug md:text-[2.5rem]">
              L&apos;Écoute, le Regard, le Dialogue
            </h2>
          </ScrollReveal>

          {/* ─ L'Écoute ─ */}
          <div className="grid items-center gap-6 md:grid-cols-2 md:gap-20">
            <div className="flex justify-center">
              <DrawingSVG
                src={asset("/images/ecoutecroquis.svg")}
                alt="L'écoute du client"
                width={420}
                height={420}
                className="w-full max-w-[20rem] md:max-w-[22rem]"
                scrollLinked
              />
            </div>
            <ScrollReveal className="text-center md:text-left">
              <h3 className="font-serif text-2xl leading-snug md:text-3xl">
                L&apos;Écoute
              </h3>
              <p className="mt-5 max-w-lg text-base leading-[1.9] text-primary/65 md:text-[1.06rem]">
                Pas simplement entendre une demande, mais accueillir une
                sensibilité, saisir l&apos;histoire d&apos;un lieu, comprendre ce qui
                se joue entre vous et votre bâti. Chez nous, chaque projet
                naît d&apos;un dialogue attentif, patient, sincère.
                C&apos;est dans cette attention que commence le sur-mesure.
              </p>
            </ScrollReveal>
          </div>

          {/* Fil interne */}
          <div className="flex justify-center py-6 md:py-10">
            <ScrollLine className="h-14 w-px bg-accent/25" />
          </div>

          {/* ─ Le Regard ─ */}
          <div className="grid items-center gap-6 md:grid-cols-2 md:gap-20">
            <div className="flex justify-center md:order-2">
              <BlinkingEyeSVG
                openSrc={asset("/images/croquisoeil.svg")}
                closedSrc={asset("/images/oeilferme.svg")}
                alt="Le regard sur site"
                width={420}
                height={347}
                className="w-full max-w-[20rem] md:max-w-[22rem]"
                scrollLinked
              />
            </div>
            <ScrollReveal className="text-center md:text-left md:order-1">
              <h3 className="inline-flex items-end gap-1.5 font-serif text-2xl leading-snug md:text-3xl">
                <span>Le Regard, mais pas que</span>
                <span className="inline-flex items-end">
                  <span>...</span>
                  <Link href="/le-regard" className="relative -mb-0.5 ml-0.5 inline-block opacity-60 transition-opacity hover:opacity-100" aria-label="Easter egg">
                    <Image
                      src={asset("/images/LePetitPrincePsychiatrePsychothérapeute-removebg-preview.png")}
                      alt=""
                      width={40}
                      height={40}
                      className="h-9 w-auto md:h-10"
                    />
                  </Link>
                </span>
              </h3>
              <p className="mt-5 max-w-lg text-base leading-[1.9] text-primary/65 md:text-[1.06rem]">
                Parce qu&apos;on ne comprend vraiment un lieu qu&apos;en le voyant.
                Nous venons sur site, nous observons la lumière, les volumes,
                les matériaux en place. Ce regard attentif nourrit chaque
                décision qui suivra il ancre le projet dans sa réalité.
              </p>
            </ScrollReveal>
          </div>

          {/* Fil interne */}
          <div className="flex justify-center py-6 md:py-10">
            <ScrollLine className="h-14 w-px bg-accent/25" />
          </div>

          {/* ─ Le Dialogue ─ */}
          <div className="grid items-center gap-6 md:grid-cols-2 md:gap-20 pb-8 md:pb-16">
            <div className="flex justify-center">
              <DrawingSVG
                src={asset("/images/croquisconvers.svg")}
                alt="Le dialogue avec le client"
                width={500}
                height={330}
                className="w-full max-w-[500px]"
                scrollLinked
              />
            </div>
            <ScrollReveal className="text-center md:text-left">
              <h3 className="font-serif text-2xl leading-snug md:text-3xl">
                Le Dialogue
              </h3>
              <p className="mt-5 max-w-lg text-base leading-[1.9] text-primary/65 md:text-[1.06rem]">
                Vérifier que l&apos;on s&apos;est bien compris. Le dialogue,
                c&apos;est cette conversation où votre vision et notre lecture
                se rencontrent, se précisent, s&apos;affinent. Un projet,
                c&apos;est une union et toute union commence par se parler
                vraiment.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Fil conducteur ── */}
      <div className="flex justify-center bg-white py-2">
        <ScrollLine className="h-16 w-px bg-accent/25" />
      </div>

      {/* ── Chapitre 2 · Conception et Échange ── */}
      <section ref={ch2Ref} className="relative overflow-hidden bg-white">
        <motion.div
          style={{ y: ch2BgY }}
          className="pointer-events-none absolute inset-0 flex items-end justify-end opacity-[0.12]"
        >
          <Image
            src={asset("/images/croquischateau.svg")}
            alt=""
            width={1100}
            height={750}
            className="w-full max-w-5xl"
            aria-hidden="true"
          />
        </motion.div>

        <div className="relative mx-auto max-w-6xl px-6 py-16 md:px-12 md:py-40">
          <div className="grid items-center gap-6 md:grid-cols-2 md:gap-20">
            <ScrollReveal direction="left" className="flex justify-center">
              <Image
                src={asset("/images/croquistraiteaux.svg")}
                alt="La conception sur tréteaux"
                width={420}
                height={420}
                className="w-full max-w-[20rem] md:max-w-[22rem]"
              />
            </ScrollReveal>

            <ScrollReveal className="text-center md:text-left">
              <span className="text-xs md:text-[0.65rem] uppercase tracking-[0.4em] text-primary/40">
                Chapitre deux
              </span>
              <h2 className="mt-3 font-serif text-3xl leading-snug md:text-[2.5rem]">
                Conception et Échange
              </h2>
              <p className="mt-6 max-w-lg text-base leading-[1.9] text-primary/65 md:text-[1.06rem]">
                De l&apos;écoute naît le trait. Nos hommes et femmes de l&apos;art
                dessinent à la main, posent sur le papier ce que les mots
                ont esquissé. Puis vient l&apos;échange&nbsp;: s&apos;assurer que nous
                nous sommes bien compris, que votre vision et notre lecture
                se rejoignent. C&apos;est un aller-retour patient, une
                conversation entre le possible et le souhaité, entre la
                matière et l&apos;intention. La conception n&apos;est pas un acte
                solitaire c&apos;est une élaboration à deux voix.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Fil conducteur + point ── */}
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

      {/* ── Chapitre 3 · La Mise en Œuvre & Le Suivi ── */}
      <section className="relative overflow-hidden bg-offwhite">
        <div className="mx-auto max-w-6xl px-6 py-16 md:px-12 md:py-40">
          <div className="grid items-center gap-6 md:grid-cols-2 md:gap-20">
            <ScrollReveal direction="left" className="flex justify-center">
              <Image
                src={asset("/images/croquischantier.svg")}
                alt="La réalisation sur chantier"
                width={550}
                height={550}
                className="w-full max-w-[24rem] md:max-w-[28rem]"
              />
            </ScrollReveal>

            <ScrollReveal className="text-center md:text-left">
              <span className="text-xs md:text-[0.65rem] uppercase tracking-[0.4em] text-primary/40">
                Chapitre trois
              </span>
              <h2 className="mt-3 font-serif text-3xl leading-snug md:text-[2.5rem]">
                La Mise en Œuvre
              </h2>
              <p className="mt-6 max-w-lg text-base leading-[1.9] text-primary/65 md:text-[1.06rem]">
                De la rencontre naît l&apos;ouvrage. Perchés à 20 mètres,
                nos hommes et femmes de l&apos;art façonnent l&apos;unique.
                Le geste précis, le bon sens hérité du territoire
                bas-Poitevin c&apos;est un savoir-faire qui combine la
                rigueur de la restauration patrimoniale et l&apos;audace de
                l&apos;architecture contemporaine. C&apos;est parce que nos
                couvreurs sont accomplis qu&apos;ils passent de l&apos;un à
                l&apos;autre avec la même exigence.
              </p>

              <div className="mt-12 border-l-2 border-accent/25 pl-6">
                <h3 className="font-serif text-xl md:text-2xl">Le Suivi</h3>
                <p className="mt-3 max-w-lg text-base leading-[1.9] text-primary/65 md:text-[1.06rem]">
                  Une toiture se vit au fil des décennies. Notre engagement
                  ne s&apos;achève pas à la dernière ardoise posée il se
                  prolonge, saison après saison, tout au long de la vie du
                  bâtiment. Entretien, vigilance, présence&nbsp;: une relation
                  diffuse mais constante, parce que bâtir ensemble,
                  c&apos;est aussi durer ensemble.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTIONS — Liens vers les pages
          ═══════════════════════════════════════════ */}

      {/* ── L'Entreprise ── */}
      <section ref={entrepriseRef} className="md:min-h-screen bg-offwhite overflow-hidden">
        <div className="grid h-full md:min-h-screen items-stretch md:grid-cols-2">
          <div className="relative overflow-hidden">
            <ScrollReveal direction="left" amount={50} className="flex h-full flex-col justify-center px-6 py-14 md:px-14">
              <span className="text-xs uppercase tracking-[0.25em] text-primary/60">
                L&apos;Entreprise
              </span>
              <h2 className="mt-4 font-serif text-3xl md:text-4xl">
                Grandir ensemble
              </h2>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-primary/80 md:text-lg">
                Une société, c&apos;est prendre ensemble. Depuis 1886, la SARL
                Alain Coutant grandit avec ses hommes 30 experts qui ont
                fait confiance, pris des risques, porté un ADN commun.
                Implantés à Mauléon (79) et au Château d&apos;Olonne (85),
                nous préservons ce que vous ne trouverez pas ailleurs&nbsp;:
                l&apos;attention, la sensibilité, et l&apos;exigence du travail
                bien fait.
              </p>
              <div className="mt-8 flex flex-col gap-3 text-sm uppercase tracking-[0.2em] text-primary">
                <Link
                  className="inline-block border-b border-primary/30 pb-2 transition hover:border-accent hover:text-accent"
                  href="/notre-histoire#famille"
                >
                  Notre Histoire Familiale
                </Link>
                <Link
                  className="inline-block border-b border-primary/30 pb-2 transition hover:border-accent hover:text-accent"
                  href="/notre-histoire#artisan"
                >
                  L&apos;Exigence de l&apos;Artisan
                </Link>
              </div>
            </ScrollReveal>
          </div>
          <div className="relative flex items-center justify-center bg-offwhite px-6 py-12 md:px-12">
            <div className="section-frame relative h-[50vh] md:h-[75%] w-full max-w-xl overflow-hidden rounded-2xl">
              <motion.div
                style={{
                  y: entrepriseImgY,
                  scale: entrepriseImgScale,
                  backgroundImage: `url('${asset("/images/entreprise.jpg")}')`
                }}
                className="absolute inset-[-8%] bg-cover bg-center"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-primary/10" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Transition ── */}
      <div className="h-16 bg-gradient-to-b from-offwhite to-white" />

      {/* ── Les Gammes ── */}
      <section ref={gammesRef} className="md:min-h-screen bg-white overflow-hidden">
        <div className="grid h-full md:min-h-screen items-stretch md:grid-cols-2">
          <div className="relative order-2 md:order-1 h-[50vh] md:h-auto overflow-hidden">
            <motion.div
              style={{
                y: gammesImgY,
                backgroundImage: `url('${asset("/images/ed18ceb7-dd29-4805-8e4f-b1c3f880666a.jpg")}')`
              }}
              className="absolute inset-[-6%] bg-cover bg-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-white/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent" />
          </div>
          <div className="relative order-1 md:order-2">
            <ScrollReveal direction="right" amount={50} className="flex h-full flex-col justify-center px-6 py-14 md:px-14">
              <span className="text-xs uppercase tracking-[0.25em] text-primary/60">
                Les Gammes
              </span>
              <h2 className="mt-4 font-serif text-3xl md:text-4xl">
                Nos Maîtrises et Savoirs-Faires
              </h2>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-primary/80 md:text-lg">
                Notre savoir-faire se situe à la croisée du patrimoine et du
                contemporain. À travers la maîtrise des matériaux — zinc,
                ardoise, cuivre, plomb — nous passons de la restauration
                d&apos;un monument historique à la couverture d&apos;une architecture
                actuelle avec la même exigence, la même précision.
              </p>
              <div className="mt-8 space-y-3 text-base text-primary">
                <Link
                  className="flex items-center gap-3 border-b border-primary/20 pb-3 text-sm uppercase tracking-[0.2em] transition hover:border-accent hover:text-accent"
                  href="/savoir-faire#materiaux"
                >
                  <span className="h-[2px] w-8 bg-accent" />
                  Zinc &amp; Bardages
                </Link>
                <Link
                  className="flex items-center gap-3 border-b border-primary/20 pb-3 text-sm uppercase tracking-[0.2em] transition hover:border-accent hover:text-accent"
                  href="/savoir-faire#ornements"
                >
                  <span className="h-[2px] w-8 bg-accent" />
                  Ornements &amp; Patrimoine
                </Link>
                <Link
                  className="flex items-center gap-3 border-b border-primary/20 pb-3 text-sm uppercase tracking-[0.2em] transition hover:border-accent hover:text-accent"
                  href="/savoir-faire#fenetres"
                >
                  <span className="h-[2px] w-8 bg-accent" />
                  Fenêtres de toit &amp; Lumière
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Transition ── */}
      <div className="h-16 bg-gradient-to-b from-white to-offwhite" />

      {/* ── Contact CTA ── */}
      <section ref={contactRef} className="md:min-h-screen bg-offwhite overflow-hidden">
        <div className="grid h-full md:min-h-screen items-stretch md:grid-cols-2">
          <div className="relative overflow-hidden">
            <ScrollReveal direction="left" amount={50} className="flex h-full flex-col justify-center px-6 py-14 md:px-14">
              <span className="text-xs uppercase tracking-[0.25em] text-primary/60">
                Et si on échangeait ?
              </span>
              <h2 className="mt-4 font-serif text-3xl md:text-4xl">
                Parlons de votre projet
              </h2>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-primary/80 md:text-lg">
                Besoin d&apos;un diagnostic, d&apos;un chiffrage ou d&apos;une étude pour votre toiture ?
                Nous vous répondons rapidement depuis nos agences de Mauléon et du
                Château d&apos;Olonne.
              </p>
              <div className="mt-8">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 border border-primary px-5 py-3 text-sm uppercase tracking-[0.2em] transition hover:border-accent hover:bg-accent hover:text-primary"
                >
                  Nous contacter
                  <span className="h-[2px] w-8 bg-accent" />
                </Link>
              </div>
            </ScrollReveal>
          </div>
          <div className="relative flex items-center justify-center bg-offwhite px-6 py-12 md:px-12">
            <div className="section-frame relative h-[50vh] md:h-[75%] w-full max-w-xl overflow-hidden rounded-2xl">
              <motion.div
                style={{
                  y: contactImgY,
                  scale: contactImgScale,
                  backgroundImage: `url('${asset("/images/contact.jpg")}')`
                }}
                className="absolute inset-[-8%] bg-cover bg-center"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-primary/10" />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
