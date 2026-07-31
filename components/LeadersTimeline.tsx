import Image from "next/image";
import { asset } from "../lib/asset";

export type Leader = {
  name: string;
  dates: string;
  role: string;
  realisations: string;
  photo: string;
};

type LeadersTimelineProps = {
  leaders: Leader[];
};

export default function LeadersTimeline({ leaders }: LeadersTimelineProps) {
  return (
    <section
      className="bg-white py-16 md:py-24"
      aria-label="Dirigeants historiques"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-14 px-6 md:grid-cols-4 md:gap-x-10 md:gap-y-16 md:px-10">
        {leaders.map((leader, index) => (
          <article
            key={leader.name}
            className={`flex flex-col items-center text-center ${
              index % 2 === 1 ? "md:translate-y-10" : "md:translate-y-0"
            } ${index === 1 || index === 2 ? "translate-y-4 md:translate-y-10" : ""}`}
          >
            <div className="relative mb-5 w-full max-w-[160px] md:max-w-[200px]">
              <Image
                src={asset(leader.photo)}
                alt={leader.name}
                width={220}
                height={280}
                className="mx-auto h-auto w-full object-contain"
              />
            </div>
            <span className="text-[0.65rem] uppercase tracking-[0.28em] text-accent">
              {leader.dates}
            </span>
            <h3 className="mt-1.5 font-serif text-lg leading-tight text-primary md:text-xl">
              {leader.name}
            </h3>
            <p className="mt-0.5 text-xs uppercase tracking-[0.18em] text-primary/45">
              {leader.role}
            </p>
            <p className="mt-3 max-w-[14rem] text-sm leading-relaxed text-primary/65">
              {leader.realisations}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
