import Footer from "../../components/Footer";

const sections = [
  {
    title: "Propriété du Site",
    content: (
      <>
        <p>
          Alain COUTANT S.A.R.L, Sarl au capital de 75 188 €, dont le siège social est :
        </p>
        <p className="mt-2">
          BP 04<br />
          Z.I. de la Poterie<br />
          79700 Mauléon
        </p>
        <p className="mt-2">
          Immatriculée au Registre du Commerce et des Sociétés de Bressuire sous le nº B 421
          037 961. Nº SIRET : 42103796100016.
        </p>
        <p className="mt-2">
          Tél : +33 (5) 49 81 81 49<br />
          Fax : +33 (5) 49 81 90 31
        </p>
      </>
    )
  },
  {
    title: "Responsable de publication",
    content: <p>M. Mathias Coutant</p>
  },
  {
    title: "Site réalisé par",
    content: (
      <p>
        M. Camille Le Marec<br />
        lemareccamille@gmail.com
      </p>
    )
  },
  {
    title: "Site hébergé par",
    content: <p>Vercel.com</p>
  },
  {
    title: "Crédits photos",
    content: <p>SARL Alain Coutant</p>
  },
  {
    title: "Responsabilité",
    content: (
      <div className="space-y-3">
        <p>
          Alain COUTANT S.A.R.L est responsable de l&apos;ensemble des informations contenues sur
          le site www.alaincoutantcouverture.com
        </p>
        <p>
          La responsabilité de Alain COUTANT S.A.R.L ne saurait en revanche être engagée pour
          les informations contenues :
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>sur les sites vers lesquels renvoie www.alaincoutantcouverture.com;</li>
          <li>sur les sites qui renvoient, au moyen d&apos;un lien hypertexte, vers ce site ;</li>
          <li>sur les sites qui reproduisent, sans autorisation, les contenus de ce site.</li>
        </ul>
      </div>
    )
  },
  {
    title: "Contenus du site",
    content: (
      <p>
        Les contenus du site sont constitués par la structure générale, les textes, les images
        animées et fixes, ainsi que les sons et vidéos et sont couverts par le droit d&apos;auteur.
        En vertu de l&apos;article L.1224 du Code de la propriété intellectuelle, ils ne peuvent
        donc être repris sans autorisation de reproduction préalable.
      </p>
    )
  },
  {
    title: "Utilisation des contenus du site",
    content: (
      <div className="space-y-3">
        <p>
          Les contenus du site www.alaincoutantcouverture.com ne doivent être utilisés qu&apos;à des
          fins personnelles, associatives ou professionnelles. Toute utilisation à des fins
          commerciales ou publicitaires est interdite.
        </p>
        <p>
          La reproduction devra obéir aux principes suivants : gratuité de la diffusion,
          citation explicite du site comme source et mention que les droits de reproduction sont
          réservés et strictement limités.
        </p>
      </div>
    )
  },
  {
    title: "Création de liens",
    content: (
      <div className="space-y-3">
        <p>
          Le site autorise la mise en place de liens hypertextes pointant vers ses pages, sous
          réserve de :
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            ne pas utiliser la technique du lien profond ; les pages doivent s&apos;ouvrir dans une
            fenêtre indépendante.
          </li>
          <li>
            préciser la source www.alaincoutantcouverture.com pour chaque lien vers le contenu
            visé.
          </li>
        </ul>
        <p>
          Les informations utilisées ne doivent l&apos;être qu&apos;à des fins personnelles,
          éducatives, associatives ou professionnelles ; toute utilisation à des fins
          commerciales ou publicitaires étant interdite.
        </p>
        <p>
          Cette autorisation ne s&apos;applique pas aux sites diffusant des informations à
          caractère raciste, pornographique, xénophobe, polémique ou pouvant porter atteinte à la
          sensibilité du plus grand nombre.
        </p>
      </div>
    )
  },
  {
    title: "Liens vers d'autres sites",
    content: (
      <p>
        Des liens vers d&apos;autres sites, privés ou officiels, français ou étrangers, sont
        proposés. Ils n&apos;engagent en aucun cas Alain COUTANT S.A.R.L quant à leur contenu et ne
        visent qu&apos;à permettre à l&apos;internaute d&apos;accéder à d&apos;autres ressources
        documentaires sur le sujet consulté.
      </p>
    )
  }
];

export default function MentionsLegalesPage() {
  return (
    <>
      <main className="bg-offwhite px-6 py-16 text-primary md:px-10 md:py-20">
        <div className="mx-auto max-w-5xl space-y-10">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.3em] text-primary/60">
              Informations légales
            </p>
            <h1 className="font-serif text-4xl md:text-5xl">Mentions légales</h1>
          </div>

          <div className="space-y-10">
            {sections.map((section) => (
              <article key={section.title} className="space-y-3 rounded-2xl bg-white p-6 shadow-soft">
                <h2 className="font-serif text-2xl text-primary md:text-3xl">{section.title}</h2>
                <div className="space-y-3 text-base leading-relaxed text-primary/80 md:text-lg">
                  {section.content}
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

