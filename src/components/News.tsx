import { ArrowUpRight } from "lucide-react";
import { news, newsCategoryLabel } from "../data/news";

function formatDate(value: string) {
  const parsed = new Date(`${value}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return value;
  return new Intl.DateTimeFormat("en-PH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(parsed);
}

export default function News() {
  return (
    <section id="news" className="section-defer relative scroll-mt-24 bg-white py-12 sm:scroll-mt-28 sm:py-20">
      <div className="container-page">
        <p className="section-kicker">News</p>
        <h2 className="section-title max-w-2xl">
          Achievements and acknowledgements
        </h2>

        {news.length === 0 ? (
          <div className="surface-card mt-8 p-6 sm:p-8">
            <p className="text-sm leading-relaxed text-ink-muted">
              No news has been published yet. Updates will appear here as
              Goldman’s Supply Corporation posts verified achievements and
              public acknowledgements.
            </p>
          </div>
        ) : (
          <div className="mt-8 grid auto-rows-fr grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {news.map((item) => {
              const body = (
                <div className="flex h-full min-h-0 flex-col">
                  <div className="aspect-[4/3] shrink-0 overflow-hidden bg-paper">
                    <img
                      src={item.image}
                      alt={item.imageAlt}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px]">
                      <span className="font-semibold tracking-[0.08em] text-gold-bright uppercase">
                        {newsCategoryLabel[item.category]}
                      </span>
                      <time className="text-ink-muted" dateTime={item.date}>
                        {formatDate(item.date)}
                      </time>
                    </div>
                    <h3 className="mt-2 line-clamp-3 text-base font-semibold text-ink lg:min-h-[4.5rem]">
                      {item.title}
                    </h3>
                    <p className="mt-2 line-clamp-4 text-sm leading-relaxed text-ink-muted lg:min-h-[5.5rem]">
                      {item.description}
                    </p>
                    <p className="mt-auto inline-flex min-h-6 items-center gap-1 pt-3 text-sm font-medium text-gold-bright">
                      {item.source || item.href ? (
                        <>
                          {item.source ?? "View post"}
                          {item.href ? <ArrowUpRight size={14} strokeWidth={1.8} /> : null}
                        </>
                      ) : (
                        <span className="invisible">Source</span>
                      )}
                    </p>
                  </div>
                </div>
              );

              return (
                <article key={item.id} className="surface-card h-full overflow-hidden">
                  {item.href ? (
                    <a
                      href={item.href}
                      className="block h-full"
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      {body}
                    </a>
                  ) : (
                    body
                  )}
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
