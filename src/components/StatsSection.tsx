"use client";

import { useEffect, useState, useMemo } from "react";
import { getStats } from "@/lib/api";
import { AnalyticsStats } from "@/lib/types";
import StatsGrid from "./StatsGrid";

export default function StatsSection() {
  const [stats, setStats] = useState<AnalyticsStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getStats();
        setStats(data);
      } catch (err) {
        console.error("Failed to fetch stats:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // ✅ ALWAYS call hooks before return
  const items = useMemo(() => {
    if (!stats) return [];

    return [
      {
        id: "stats-cars",
        icon: "car" as const,
        value: `${stats.summary.total_cars}+`,
        label: "Cars Researched",
      },
      {
        id: "stats-reviews",
        icon: "star" as const,
        value: `${(stats.summary.total_reviews / 1000).toFixed(0)}K+`,
        label: "User Reviews",
      },
      {
        id: "stats-safety",
        icon: "shield" as const,
        value: `${stats.summary.avg_safety_rating}/5`,
        label: "Avg Safety Rating",
      },
      {
        id: "stats-price",
        icon: "trending" as const,
        value: `₹${stats.summary.min_price_lakh}L–${stats.summary.max_price_lakh}L`,
        label: "Price Range Covered",
      },
    ];
  }, [stats]);

  if (loading || !stats) {
    return <div className="py-16 flex items-center justify-center text-muted-foreground text-sm">Loading stats…</div>;
  }

  return (
    <section className="border-y border-border bg-muted/30 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <StatsGrid items={items} />
      </div>
    </section>
  );
}
