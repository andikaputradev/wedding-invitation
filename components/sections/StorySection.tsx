import { Reveal } from "@/components/motion/Reveal";
import { AnimatedGradient } from "@/components/motion/AnimatedGradient";
import { invitationData } from "@/data/invitation";
import type { StoryItem } from "@/types/invitation";

interface StoryCardProps {
  item: StoryItem;
  index: number;
  isLeft: boolean;
}

function StoryCard({ item, index, isLeft }: StoryCardProps) {
  return (
    <div className="relative flex items-start gap-0 md:gap-8">
      {isLeft ? (
        <>
          <Reveal
            delay={index * 0.12}
            direction="right"
            className="hidden md:flex flex-1 justify-end"
          >
            <article className="card-glass max-w-xs rounded-2xl p-6 text-right border border-[#D4AF37]/15 shadow-[0_2px_16px_rgba(212,175,55,0.07)]">
              <span className="font-sans text-xs uppercase tracking-widest text-[#D4AF37]">
                {item.year}
              </span>
              <h3 className="mt-1 font-serif text-lg font-semibold text-[color:var(--text-primary)]">
                {item.title}
              </h3>
              <p className="mt-2 font-sans text-sm leading-relaxed text-[color:var(--text-secondary)]">
                {item.description}
              </p>
            </article>
          </Reveal>

          <div className="relative mx-4 flex flex-col items-center" aria-hidden>
            <div className="z-10 flex h-10 w-10 items-center justify-center rounded-full bg-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.4)]">
              <span className="font-sans text-xs font-bold text-[#2A1E12]">
                {index + 1}
              </span>
            </div>
            <div className="absolute top-10 h-full w-px bg-gradient-to-b from-[#D4AF37]/50 to-transparent" />
          </div>

          <div className="flex-1 md:hidden">
            <Reveal delay={index * 0.12} direction="left">
              <article className="card-glass rounded-2xl p-5 border border-[#D4AF37]/15">
                <span className="font-sans text-xs uppercase tracking-widest text-[#D4AF37]">
                  {item.year}
                </span>
                <h3 className="mt-1 font-serif text-base font-semibold text-[color:var(--text-primary)]">
                  {item.title}
                </h3>
                <p className="mt-1.5 font-sans text-sm leading-relaxed text-[color:var(--text-secondary)]">
                  {item.description}
                </p>
              </article>
            </Reveal>
          </div>

          <div className="hidden md:block flex-1" />
        </>
      ) : (
        <>
          <div className="hidden md:block flex-1" />

          <div className="relative mx-4 flex flex-col items-center" aria-hidden>
            <div className="z-10 flex h-10 w-10 items-center justify-center rounded-full bg-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.4)]">
              <span className="font-sans text-xs font-bold text-[#2A1E12]">
                {index + 1}
              </span>
            </div>
            <div className="absolute top-10 h-full w-px bg-gradient-to-b from-[#D4AF37]/50 to-transparent" />
          </div>

          <Reveal
            delay={index * 0.12}
            direction="left"
            className="flex-1"
          >
            <article className="card-glass rounded-2xl p-6 border border-[#D4AF37]/15 shadow-[0_2px_16px_rgba(212,175,55,0.07)]">
              <span className="font-sans text-xs uppercase tracking-widest text-[#D4AF37]">
                {item.year}
              </span>
              <h3 className="mt-1 font-serif text-lg font-semibold text-[color:var(--text-primary)]">
                {item.title}
              </h3>
              <p className="mt-2 font-sans text-sm leading-relaxed text-[color:var(--text-secondary)]">
                {item.description}
              </p>
            </article>
          </Reveal>
        </>
      )}
    </div>
  );
}

export function StorySection() {
  const { story } = invitationData;

  return (
    <section
      id="story"
      className="relative py-24 section-padding overflow-hidden"
      aria-label="Cerita perjalanan kami"
    >
      <AnimatedGradient className="z-0 opacity-40" />

      <div className="relative z-10 mx-auto max-w-4xl">
        <Reveal direction="up">
          <div className="mb-14 flex flex-col items-center gap-3 text-center">
            <span className="font-sans text-xs uppercase tracking-[0.4em] text-[color:var(--text-muted)]">
              Perjalanan Kami
            </span>
            <h2 className="font-serif text-3xl font-bold gold-text sm:text-4xl">
              Cerita Cinta
            </h2>
            <div className="gold-divider w-24" aria-hidden />
          </div>
        </Reveal>

        <div className="flex flex-col gap-10">
          {story.map((item, i) => (
            <StoryCard
              key={item.year}
              item={item}
              index={i}
              isLeft={i % 2 === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
