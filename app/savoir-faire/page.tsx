import Footer from "../../components/Footer";
import ImageCarousel from "../../components/ImageCarousel";

export default function SavoirFairePage() {
  const zincImages = [
    { src: "/images/02cbe854-7679-4d9f-a09b-3a17e6fe9868.jpg", alt: "Couverture en zinc" },
    { src: "/images/materiau4.jpg", alt: "Ouvrage zinc actuel" },
    { src: "/images/683776df-6d19-4d1e-b474-083aa53484a2.jpg", alt: "Détail toiture zinc" },
    { src: "/images/6605c133-68a0-417a-a282-c855a66679cf.jpg", alt: "Façonnage zinc" }
  ];

  const ardoiseImages = [
    { src: "/images/materiau1.jpg", alt: "Toiture en ardoise" },
    { src: "/images/5723ca3e-b330-4873-b673-3ebb573a5a78.jpg", alt: "Ardoise traditionnelle" },
    { src: "/images/0bce3e11-52f5-423a-bc5d-ab14aa7d1c81.jpg", alt: "Pose d'ardoise" },
    {
      src: "/images/c78419c5-7b48-449c-8b94-2115ccd5b110.jpg",
      alt: "Ardoise en format portrait",
      fit: "contain" as const
    }
  ];

  const plombCuivreImages = [
    {
      src: "/images/7f266590-7783-4f6d-8e5f-065e3bbe33a2.jpg",
      alt: "Ouvrage en plomb et cuivre",
      fit: "contain" as const
    },
    {
      src: "/images/9f3da7ef-632d-413b-a3ca-7ee0c14aa1ea.jpg",
      alt: "Finition cuivre en format portrait",
      fit: "contain" as const
    },
    { src: "/images/948a728b-1080-45aa-b0fa-4b86ee7fd7a8.jpg", alt: "Détail couverture cuivre" }
  ];

  const tuileImages = [
    { src: "/images/4a57abac-0be1-4efb-9523-14277b64f463.jpg", alt: "Toiture en tuiles" },
    { src: "/images/materiau3.jpg", alt: "Tuile actuelle" },
    { src: "/images/dbb9d7ff-b7b1-4ac2-84e2-b16be43c1a8c.jpg", alt: "Détail de tuiles" }
  ];

  return (
    <>
      <main className="bg-offwhite text-primary">
      <section className="relative overflow-hidden bg-white px-6 py-10 md:px-12 md:py-20">
        <div className="absolute -right-16 -top-24 h-48 w-48 rounded-full bg-accent/25 blur-3xl" />
        <div className="absolute -left-20 top-20 h-36 w-36 rounded-full bg-primary/10 blur-2xl" />
        <div className="relative space-y-4">
          <p className="text-xs uppercase tracking-[0.3em] text-primary/60">Les Gammes</p>
          <h1 className="max-w-4xl font-serif text-3xl leading-tight md:text-5xl">
            Nos Maîtrises et Savoirs-Faires
          </h1>
          <p className="max-w-3xl text-lg leading-relaxed text-primary/75">
            Métal, ardoise, ornementation nous ne posons pas des matériaux,
            nous modelons ce que l&apos;écoute a révélé. Chaque chantier est un
            ouvrage sur mesure, pensé comme un prolongement de votre vision.
            C&apos;est le processus intellectuel de l&apos;artisanat&nbsp;: comprendre
            d&apos;abord, concevoir ensuite, réaliser avec précision.
          </p>
        </div>
      </section>

      <section
        id="materiaux"
        className="mx-auto max-w-6xl px-6 py-12 md:px-10 md:py-24"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-primary/60">
              Galerie Masonry
            </p>
            <h2 className="font-serif text-3xl md:text-4xl">
              Zinc, Cuivre, Ardoise & Plomb
            </h2>
          </div>
          <span className="hidden text-xs uppercase tracking-[0.3em] text-primary/50 md:block">
            Matières nobles
          </span>
        </div>
        <div className="mt-10 md:mt-14 space-y-12 md:space-y-20">
          <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
            <ImageCarousel
              images={zincImages}
              className="h-[16rem] md:h-[32rem]"
              intervalMs={8000}
              startDelayMs={0}
            />
            <div className="mx-auto w-full max-w-xl space-y-5 text-base leading-loose text-primary/75 md:text-lg">
              <p>
                Le zinc se plie, se façonne, se modèle comme une idée prend
                forme entre les mains de celui qui la comprend. Longtemps
                symbole des toits parisiens, il est aujourd’hui au cœur des
                architectures les plus exigeantes.
              </p>
              <p>
                Nos couvreurs le travaillent avec la précision de l’orfèvre
                et le bon sens de l’artisan. Chaque toiture en zinc est un
                ouvrage sur mesure conçu, dessiné, puis façonné pour durer.
              </p>
            </div>
          </div>

          <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
            <ImageCarousel
              images={ardoiseImages}
              className="h-[16rem] md:h-[32rem]"
              intervalMs={8000}
              startDelayMs={1800}
            />
            <div className="mx-auto w-full max-w-xl space-y-5 text-base leading-loose text-primary/75 md:text-lg">
              <p>
                Matériau emblématique du patrimoine français, l’ardoise habille depuis des
                siècles châteaux, manoirs et demeures de caractère. L&apos;Ardoise est une roche de
                la famille des schistes utilisée en couverture pour ses qualités de durabilité.
                Utilisée pour les toitures à pente forte, naturelle, durable et intemporelle,
                elle incarne l’excellence de la couverture traditionnelle.
              </p>
              <p>
                Forte de son expérience, l’entreprise Alain Coutant Couverture redonne noblesse
                et allure à des bâtiments anciens, en sublimant leur toiture et en leur offrant
                une seconde jeunesse, dans le respect du bâti et des savoir-faire d’origine.
              </p>
            </div>
          </div>

          <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
            <ImageCarousel
              images={plombCuivreImages}
              className="h-[16rem] md:h-[32rem]"
              intervalMs={8000}
              startDelayMs={3600}
            />
            <div className="mx-auto w-full max-w-xl space-y-5 text-base leading-loose text-primary/75 md:text-lg">
              <p>
                Le plomb et le cuivre accompagnent les finitions les plus techniques en
                restauration patrimoniale comme en architecture contemporaine. Utilisés pour les
                noues, rives, habillages et détails d&apos;ornementation, ils apportent souplesse de
                mise en oeuvre, précision d&apos;assemblage et élégance durable.
              </p>
              <p>
                Maîtrisés par nos couvreurs, ces métaux permettent de réaliser des ouvrages sur
                mesure alliant protection, esthétique et longévité, dans le respect des règles de
                l&apos;art.
              </p>
            </div>
          </div>

          <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
            <ImageCarousel
              images={tuileImages}
              className="h-[16rem] md:h-[32rem]"
              intervalMs={8000}
              startDelayMs={5400}
            />
            <div className="mx-auto w-full max-w-xl space-y-5 text-base leading-loose text-primary/75 md:text-lg">
              <p>
                Tuiles plates, canal, à emboîtement... les tuiles proposent une gamme variée de
                formes et de couleurs. Matériau largement utilisé en couverture, il permet un
                chantier rapide et souvent plus économique que d&apos;autres solutions.
              </p>
              <p>
                Alain Coutant travaille avec de multiples fournisseurs afin de proposer un large
                choix et s&apos;adapter aux contraintes d&apos;urbanisme et d&apos;esthétique des régions.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-14 md:mt-28 grid items-center gap-6 md:grid-cols-[1.1fr,0.9fr]">
          <div className="space-y-4 text-base leading-relaxed text-primary/75 md:text-lg">
            <p>
              Notre expertise vient s&apos;ajouter à la garantie décennale naturelle sur
              l&apos;ensemble des prestations de l&apos;entreprise.
            </p>
            <p className="font-serif text-xl text-primary">Qualifications Qualibat :</p>
            <ul className="space-y-2 text-sm leading-relaxed md:text-base">
              <li>- Tuiles à emboîtement ou à glissement Mention patrimoine bâti</li>
              <li>- Tuiles canal (Technicité supérieure) Mention patrimoine bâti</li>
              <li>- Tuiles plates (Technicité supérieure) Mention patrimoine bâti</li>
              <li>- Ardoises de schiste ou fibre ciment (Technicité supérieure) Mention patrimoine bâti</li>
              <li>- Couverture en métaux sauf plomb (technicité supérieure) Mention patrimoine bâti</li>
              <li>- Revêtements de balcons et accessoires en plomb (Technicité supérieure) Mention patrimoine bâti</li>
              <li>- Couverture du patrimoine ancien</li>
            </ul>
            <p className="text-sm text-primary/70">
              Codes : 3101, 3113, 3123, 3143, 3153, 3161, 3193
            </p>
          </div>
          <div className="section-frame h-72 rounded-2xl bg-white p-6 shadow-soft">
            <div className="flex h-full items-center justify-center">
              <div
                className="h-full w-full bg-[url('/images/qualibat.png')] bg-contain bg-center bg-no-repeat"
                aria-label="Certifications Qualibat"
              />
            </div>
          </div>
        </div>
      </section>

      <section
        id="ornements"
        className="bg-white px-6 py-10 md:px-10 md:py-20"
      >
        <div className="mx-auto max-w-6xl space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-3xl md:text-4xl">Ornements & Patrimoine</h2>
            <span className="hidden text-xs uppercase tracking-[0.3em] text-primary/50 md:block">
              Détails
            </span>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {["ornement1.jpg", "ornement2.jpg", "ornement3.jpg"].map((image) => (
              <div
                key={image}
                className="section-frame relative h-44 md:h-64 overflow-hidden rounded-2xl bg-cover bg-center"
                style={{ backgroundImage: `url('/images/${image}')` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="fenetres"
        className="mx-auto max-w-6xl px-6 py-10 md:px-10 md:py-20"
      >
        <div className="space-y-6">
          <p className="text-xs uppercase tracking-[0.3em] text-primary/60">
            Lumière & Confort
          </p>
          <h2 className="font-serif text-3xl md:text-4xl">Fenêtres de toit & Verrières</h2>
          <p className="max-w-3xl text-lg leading-relaxed text-primary/75">
            Nous intégrons Velux, verrières et lanterneaux dans les règles de l'art, en
            respectant les lignes de la couverture et l'étanchéité. La lumière naturelle
            devient un matériau à part entière.
          </p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-[1.2fr,0.8fr]">
          <div className="section-frame h-56 md:h-80 overflow-hidden rounded-2xl bg-[url('/images/fenetres1.jpg')] bg-cover bg-center">
            <div className="h-full w-full bg-gradient-to-br from-primary/8 via-transparent to-accent/8" />
          </div>
          <div className="space-y-4">
            <div className="section-frame h-28 md:h-36 overflow-hidden rounded-2xl bg-[url('/images/fenetres2.jpg')] bg-cover bg-center" />
            <div className="section-frame h-28 md:h-36 overflow-hidden rounded-2xl bg-[url('/images/fenetres3.jpg')] bg-cover bg-center" />
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </>
  );
}

