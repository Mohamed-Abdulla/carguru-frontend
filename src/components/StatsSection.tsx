import { getStats } from "@/lib/api";
import StatsGrid from "./StatsGrid";

export default async function StatsSection() {
  let stats = null;
  try {
    stats = await getStats();
  } catch {
    return null;
  }

  const items: any[] = [
    {
      id: "stats-cars",
      icon: "car",
      value: `${stats.summary.total_cars}+`,
      label: "Cars Researched",
    },
    {
      id: "stats-reviews",
      icon: "star",
      value: `${(stats.summary.total_reviews / 1000).toFixed(0)}K+`,
      label: "User Reviews",
    },
    {
      id: "stats-safety",
      icon: "shield",
      value: `${stats.summary.avg_safety_rating}/5`,
      label: "Avg Safety Rating",
    },
    {
      id: "stats-price",
      icon: "trending",
      value: `₹${stats.summary.min_price_lakh}L–${stats.summary.max_price_lakh}L`,
      label: "Price Range Covered",
    },
  ];

  return (
    <section className="border-y border-border bg-muted/30 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <StatsGrid items={items} />
      </div>
    </section>
  );
}
