"use client";

import { motion } from "framer-motion";

type TimelineItem = {
  year: string;
  title: string;
  description: string;
};

type TimelineSectionProps = {
  items: TimelineItem[];
};

export default function TimelineSection({ items }: TimelineSectionProps) {
  return (
    <section className="mx-auto max-w-6xl px-6 md:px-10">
      <div
        className="relative overflow-hidden space-y-10 rounded-3xl bg-[#f7f2e9] p-6 shadow-[0_18px_50px_rgba(0,0,0,0.08)] ring-1 ring-primary/10 md:p-10"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            backgroundImage:
              "radial-gradient(circle at 15% 20%, rgba(0,0,0,0.04), transparent 35%), radial-gradient(circle at 80% 10%, rgba(0,0,0,0.03), transparent 35%), radial-gradient(circle at 30% 80%, rgba(0,0,0,0.03), transparent 40%)"
          }}
        />
        <p className="text-xs uppercase tracking-[0.3em] text-primary/60">Héritage</p>
        <h2 className="font-serif text-2xl md:text-4xl">
          Une lignée de couvreurs, une vision renouvelée
        </h2>
        <div className="relative">
          <div className="absolute left-4 top-0 h-full w-px bg-primary/25 md:left-6" />
          <div className="space-y-8 md:space-y-10">
            {items.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="relative pl-10 md:pl-14"
              >
                <div className="absolute left-0 top-2 h-4 w-4 -translate-x-1/2 rounded-full bg-primary shadow-[0_6px_16px_rgba(0,0,0,0.18)] md:left-[6px]" />
                <div className="flex flex-col gap-1">
                  <span className="text-xs uppercase tracking-[0.25em] text-primary/60">
                    {item.year}
                  </span>
                  <h3 className="font-serif text-xl text-primary md:text-3xl">
                    {item.title}
                  </h3>
                  <p className="text-base leading-relaxed text-primary/75 md:text-lg">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}



