import Logo from "../../components/Logo";
import Footer from "../../components/Footer";
import LeadersScrollStory, {
  type LeaderStory,
} from "../../components/LeadersScrollStory";
import { mediaFromMap } from "../../lib/media-key";
import { getSignedMediaMap } from "../../lib/b2/sign";

const leaders: LeaderStory[] = [
  {
    id: "adrien",
    name: "Adrien Coutant",
    dates: "Fin XIXe",
    role: "Fondateur",
    text: "Les premières ardoises. Peu de traces écrites — le geste, lui, s'est transmis.",
    photo: "/images/adrien-removebg-preview.png",
    archives: [],
  },
  {
    id: "henri",
    name: "Henri Coutant",
    dates: "Années 1930",
    role: "Transmission",
    text: "Sous Henri, l'entreprise s'affirme. L'enseigne d'époque en témoigne encore.",
    photo: "/images/henri.png",
    archives: [
      {
        src: "/images/logohenri2.png",
        alt: "Enseigne Henri Coutant",
        caption: "Enseigne Henri Coutant — Châtillon-sur-Sèvre, années 1930.",
      },
      {
        src: "/images/henrihistoire1.png",
        alt: "L'équipe devant l'atelier, époque Henri Coutant",
      },
      {
        src: "/images/henrihistoire2.png",
        alt: "Travaux sur le clocher, époque Henri Coutant",
      },
    ],
  },
  {
    id: "hubert",
    name: "Hubert Coutant",
    dates: "Milieu XXe",
    role: "Continuité",
    text: "Il maintient l'exigence du geste et prépare la relève de l'entreprise.",
    photo: "/images/hubert.png",
    archives: [
      {
        src: "/images/hubert1.png",
        alt: "Compagnons devant le chantier, époque Hubert Coutant",
      },
      {
        src: "/images/henrihistoire4.png",
        alt: "Clocher échafaudé, archives Coutant",
      },
      {
        src: "/images/henrihistoire3.png",
        alt: "Montée au clocher, archives Coutant",
      },
    ],
  },
  {
    id: "alain",
    name: "Alain Coutant",
    dates: "1986",
    role: "Création de la SARL",
    text: "Il fonde la SARL sur le sur-mesure, l'écoute et l'exigence du geste juste.",
    photo: "/images/alain.png",
    archives: [
      {
        src: "/images/alain1.png",
        alt: "Couvreur sur le chantier, époque Alain Coutant",
      },
      {
        src: "/images/alain5.png",
        alt: "Réception à l'Élysée, 1996",
      },
      {
        src: "/images/alain3.png",
        alt: "Coq de clocher restauré",
      },
      {
        src: "/images/alain4.png",
        alt: "La flotte de véhicules de l'entreprise",
      },
      {
        src: "/images/alain2.png",
        alt: "Les locaux de l'entreprise",
      },
    ],
  },
];

export default async function NotreHistoirePage() {
  const urls = await getSignedMediaMap();
  const media = (path: string) => mediaFromMap(urls, path);
  return (
    <>
      <main className="bg-[#f4efe8] pb-16 md:pb-24 pt-12 md:pt-16 text-primary">
        <section
          id="famille"
          className="mx-auto flex max-w-6xl flex-col gap-8 md:gap-12 px-6 pb-14 md:px-10 md:pb-20"
        >
          <div className="flex items-center justify-between gap-6">
            <Logo />
            <div className="hidden h-px flex-1 bg-primary/15 md:block" />
            <div className="text-xs uppercase tracking-[0.35em] text-primary/60">
              Depuis 1886
            </div>
          </div>

          <div className="space-y-5">
            <h1 className="font-serif text-3xl md:text-5xl">Notre Histoire</h1>
            <p className="max-w-2xl text-lg leading-relaxed text-primary/80">
              Une société, c&apos;est prendre ensemble. Depuis 1886, la famille
              Coutant transmet un même ADN&nbsp;: l&apos;homme et la matière au cœur
              de chaque toit. Ce que nous avons préservé, vous ne le
              trouverez pas ailleurs — dans l&apos;attention comme dans la
              prestation, dans le dessin comme dans l&apos;écoute.
            </p>
            <p className="max-w-2xl text-base leading-relaxed text-primary/70">
              Des premières ardoises posées à Mauléon jusqu&apos;aux réalisations
              emblématiques du littoral vendéen, chaque chantier est le fruit
              d&apos;une confiance partagée, d&apos;un risque pris ensemble, d&apos;un
              engagement tenu.
            </p>
          </div>
        </section>

        <LeadersScrollStory leaders={leaders} />

        <div className="space-y-14 pt-14 md:space-y-24 md:pt-24">
          <section
            id="artisan"
            className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl bg-white px-6 py-16 md:px-10 md:py-20"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/4 via-transparent to-accent/8" />
            <div className="relative space-y-6">
              <h2 className="font-serif text-2xl md:text-4xl">
                L&apos;Équipe — Bâtir ensemble
              </h2>
              <p className="max-w-3xl text-lg leading-relaxed text-primary/75">
                Trente hommes et femmes, compagnons et experts du zinc, de
                l&apos;ardoise et de l&apos;ornementation. Des couvreurs dévoués, nés
                avec un don — celui de l&apos;écoute, de l&apos;attention et du geste
                précis. Entre le moment où Mathias a repris l&apos;entreprise et
                aujourd&apos;hui, ils ont fait confiance, pris des risques. En
                retour, chacun porte la même exigence&nbsp;: que le travail soit
                juste, que le résultat soit unique.
              </p>
              <div
                className="section-frame relative mt-10 h-[250px] md:h-[420px] overflow-hidden rounded-2xl bg-cover bg-center"
                style={{
                  backgroundImage: `url('${media("/images/equipe.jpeg")}')`,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-primary/15 via-transparent to-transparent" />
              </div>
            </div>
          </section>

          <section className="mx-auto flex max-w-6xl flex-col gap-8 md:gap-10 rounded-3xl bg-[#f7f2e9] px-6 py-10 md:py-14 md:flex-row md:items-center md:px-10">
            <div className="flex-1 space-y-4 text-primary">
              <p className="text-xs uppercase tracking-[0.3em] text-primary/60">
                Transmission &amp; Engagement
              </p>
              <h3 className="font-serif text-2xl md:text-4xl">
                L&apos;École Supérieure de la Couverture d&apos;Angers
              </h3>
              <p className="text-lg leading-relaxed text-primary/75">
                Mathias Coutant, Président de la SARL Alain Coutant Couverture,
                est aussi Président de l&apos;École Supérieure de Couverture
                d&apos;Angers. Ce double engagement n&apos;est pas un titre — c&apos;est
                une responsabilité&nbsp;: transmettre le bon sens artisan, former
                des gens qui comprennent avant de faire.
              </p>
              <p className="text-lg leading-relaxed text-primary/75">
                Le génie de l&apos;artisanat des Deux-Sèvres, c&apos;est peut-être
                ça&nbsp;: des gens tellement ancrés dans leur savoir qu&apos;ils
                sont en avance. L&apos;école perpétue cette culture — le geste, la
                matière, l&apos;exigence.
              </p>
              <a
                href="https://www.esc-angers.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 border border-primary px-5 py-3 text-sm uppercase tracking-[0.2em] transition hover:border-accent hover:bg-accent hover:text-primary"
              >
                Découvrir l&apos;ESC d&apos;Angers
                <span className="h-[2px] w-8 bg-accent" />
              </a>
            </div>
            <div className="flex-1">
              <div className="relative h-48 rounded-2xl bg-[#f7f2e9]">
                <div className="absolute inset-0 flex items-center justify-center p-4">
                  <div
                    className="h-full w-full scale-[1.3] bg-contain bg-center bg-no-repeat"
                    style={{
                      backgroundImage: `url('${media("/images/esc.png")}')`,
                    }}
                    aria-label="École Supérieure de la Couverture d'Angers"
                  />
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
