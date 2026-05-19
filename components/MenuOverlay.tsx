"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
type MenuOverlayProps = {
  open: boolean;
  onClose: () => void;
};

const links = [
  { label: "Accueil", href: "/" },
  { label: "Notre Histoire", href: "/notre-histoire" },
  { label: "Les Gammes", href: "/savoir-faire" },
  { label: "Nos Agences", href: "/agence-vendee", highlight: true },
  { label: "Nos Partenaires", href: "/nos-partenaires" },
  { label: "Nous Contacter", href: "/contact" }
];

export default function MenuOverlay({ open, onClose }: MenuOverlayProps) {
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-40">
          <motion.button
            type="button"
            aria-label="Fermer le menu"
            className="absolute inset-0 bg-primary/20 backdrop-blur-[1px]"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          />

          <motion.aside
            className="absolute right-0 top-0 flex h-full w-[88vw] max-w-md flex-col border-l border-primary/10 bg-offwhite text-primary shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.34, ease: "easeOut" }}
          >
            <nav className="flex-1 px-8 pt-16 pb-10">
              <ul className="space-y-6 text-left text-xl font-serif md:text-2xl">
                {links.map(({ label, href, highlight }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      onClick={onClose}
                      className={`inline-block border-b border-transparent pb-1 transition hover:border-accent hover:text-accent ${
                        highlight ? "text-accent" : ""
                      }`}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="border-t border-primary/10 px-8 py-6 text-xs uppercase tracking-[0.3em] text-primary/70">
              <Link
                href="/mentions-legales"
                onClick={onClose}
                className="inline-flex items-center justify-center gap-2 hover:text-accent"
              >
                Mentions légales
              </Link>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
