import { getPopular } from "@/lib/api";
import CarCard from "./CarCard";
import { TrendingUp } from "lucide-react";
import Link from "next/link";
import AnimatedGrid from "./AnimatedGrid";

export default async function PopularSection() {
  let cars = [];
  try {
    cars = await getPopular(6);
  } catch {
    return null;
  }

  return (
    <section id="popular" className="py-24 bg-muted/20 scroll-mt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary mb-3">
              <TrendingUp className="h-3 w-3" />
              Popular Right Now
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              What buyers are loving
            </h2>
            <p className="text-muted-foreground mt-2 text-sm">
              Ranked by verified buyer reviews
            </p>
          </div>
          <Link
            href="/cars"
            id="popular-see-all"
            className="shrink-0 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium hover:border-primary/50 hover:text-primary transition-colors"
          >
            Browse all →
          </Link>
        </div>

        {/* Cards grid */}
        <AnimatedGrid>
          {cars.map((car, i) => (
            <div key={car.id} className="relative h-full">
              {i < 3 && (
                <div className="absolute -top-2 -left-2 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-black shadow-lg">
                  #{i + 1}
                </div>
              )}
              <CarCard car={car} />
            </div>
          ))}
        </AnimatedGrid>
      </div>
    </section>
  );
}
