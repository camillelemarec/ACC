import Link from "next/link";

type FooterProps = {
  className?: string;
};

export default function Footer({ className = "" }: FooterProps) {
  return (
    <section className={`bg-primary px-6 py-16 text-white md:px-12 ${className}`}>
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.3em] text-white/70">Contact</p>
          <p className="text-lg font-serif">Alain Coutant Couverture</p>
          <p className="text-sm text-white/80">
            Mauléon (79) · Château d&apos;Olonne (85)
          </p>
          <p className="text-sm text-white/80">Tel : +33 (0)2 xx xx xx xx</p>
          <p className="text-sm text-white/80">Email : contact@alaincoutant.fr</p>
        </div>
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.3em] text-white/70">Navigation</p>
          <div className="flex flex-col gap-2 text-sm">
            <Link className="hover:text-accent" href="/notre-histoire">
              Notre Histoire
            </Link>
            <Link className="hover:text-accent" href="/savoir-faire">
              Les Gammes
            </Link>
            <Link className="hover:text-accent" href="/agence-vendee">
              Nos Agences
            </Link>
            <Link className="hover:text-accent" href="/nos-partenaires">
              Nos Partenaires
            </Link>
            <Link className="hover:text-accent" href="/contact">
              Nous Contacter
            </Link>
          </div>
        </div>
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.3em] text-white/70">
            Mentions & Réseaux
          </p>
          <div className="flex flex-col gap-1 text-sm text-white/80">
            <Link className="hover:text-accent" href="/mentions-legales">
              Mentions légales
            </Link>
            <span>Politique de confidentialité</span>
          </div>
          <div className="flex gap-3 text-sm text-white/80">
            <span>Instagram</span>
            <span>LinkedIn</span>
          </div>
        </div>
      </div>
    </section>
  );
}

