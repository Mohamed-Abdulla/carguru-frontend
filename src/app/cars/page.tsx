import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CarCard from "@/components/CarCard";
import { getCars } from "@/lib/api";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Browse All Cars",
  description:
    "Explore all 35 cars on CarGuru — filter by fuel type, body type, budget, and more.",
};

interface SearchParams {
  fuel_type?: string;
  body_type?: string;
  budget_max?: string;
  transmission?: string;
}

export default async function CarsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const queryParams: Record<string, string> = { limit: "50" };
  if (params.fuel_type) queryParams.fuel_type = params.fuel_type;
  if (params.body_type) queryParams.body_type = params.body_type;
  if (params.budget_max) queryParams.budget_max = params.budget_max;
  if (params.transmission) queryParams.transmission = params.transmission;

  let data: { data: import("@/lib/types").Car[]; total: number } = { data: [], total: 0 };
  try {
    data = await getCars(queryParams);
  } catch {
    // silently show empty state
  }

  const FUELS = ["Petrol", "Diesel", "Electric", "Hybrid", "CNG"];
  const BODIES = ["Hatchback", "Sedan", "SUV", "MPV"];

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/"
              id="cars-back-btn"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
            >
              <ArrowLeft className="h-4 w-4" /> Back to home
            </Link>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2">
              Browse All Cars
            </h1>
            <p className="text-muted-foreground">
              {data.total} cars · Showing {data.data.length} results
            </p>
          </div>

          {/* Quick filters */}
          <div className="flex flex-wrap gap-2 mb-10">
            <Link href="/cars" id="filter-all" className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-all ${!params.fuel_type && !params.body_type ? "border-primary bg-primary/15 text-primary" : "border-border bg-muted text-muted-foreground hover:border-primary/40"}`}>
              All
            </Link>
            {FUELS.map((f) => (
              <Link
                key={f}
                href={`/cars?fuel_type=${f}${params.body_type ? `&body_type=${params.body_type}` : ""}`}
                id={`filter-fuel-${f.toLowerCase()}`}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-all ${params.fuel_type === f ? "border-primary bg-primary/15 text-primary" : "border-border bg-muted text-muted-foreground hover:border-primary/40"}`}
              >
                {f}
              </Link>
            ))}
            {BODIES.map((b) => (
              <Link
                key={b}
                href={`/cars?body_type=${b}${params.fuel_type ? `&fuel_type=${params.fuel_type}` : ""}`}
                id={`filter-body-${b.toLowerCase()}`}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-all ${params.body_type === b ? "border-primary bg-primary/15 text-primary" : "border-border bg-muted text-muted-foreground hover:border-primary/40"}`}
              >
                {b}
              </Link>
            ))}
          </div>

          {/* Grid */}
          {data.data.length === 0 ? (
            <div className="text-center py-24 text-muted-foreground">
              <p className="text-lg">No cars found for these filters.</p>
              <Link href="/cars" className="mt-4 inline-block text-primary hover:underline">
                Clear filters
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {data.data.map((car) => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
