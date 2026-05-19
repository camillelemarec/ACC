import Footer from "../../components/Footer";

export default function NosPartenairesPage() {
  return (
    <>
        <main className="mx-auto max-w-5xl bg-offwhite px-6 py-10 md:py-20 text-primary md:px-10">
        <p className="text-xs uppercase tracking-[0.3em] text-primary/60">Réseau</p>
        <h1 className="mt-4 font-serif text-3xl md:text-4xl">Nos partenaires</h1>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-primary/75">
          Bâtir ensemble, c’est aussi s’entourer. Nos partenaires partagent
          la même exigence : la qualité du dialogue, la sensibilité au
          détail, l’engagement dans la durée. Collaboration locale,
          fournisseurs choisis, prescripteurs de confiance.
        </p>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="rounded-2xl bg-white p-6 shadow-soft"
            >
              <p className="text-sm text-primary/60">Partenaire {item}</p>
              <p className="font-serif text-xl">Nom à renseigner</p>
              <p className="mt-2 text-sm text-primary/70">
                Spécialité et zone d'intervention à préciser.
              </p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}

