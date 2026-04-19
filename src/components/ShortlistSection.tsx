"use client";

import React, { useState, useCallback, useMemo } from "react";
import { SlidersHorizontal, Loader2, ChevronRight } from "lucide-react";
import Link from "next/link";
import CarCard from "./CarCard";
import { getRecommendations } from "@/lib/api";
import { ScoredCar } from "@/lib/types";
import { motion, AnimatePresence } from "framer-motion";

const FUEL_OPTIONS = ["Petrol", "Diesel", "Electric", "Hybrid", "CNG"];
const BODY_OPTIONS = ["Hatchback", "Sedan", "SUV", "MPV", "SUV Coupe"];
const PRIORITY_OPTIONS = [
  { value: "safety", label: "Safety" },
  { value: "mileage", label: "Mileage" },
  { value: "price", label: "Value for Money" },
  { value: "power", label: "Performance" },
  { value: "space", label: "Space" },
];
const USE_CASE_OPTIONS = [
  { value: "city", label: "City" },
  { value: "highway", label: "Highway" },
  { value: "offroad", label: "Off-road" },
  { value: "family_trips", label: "Family Trips" },
  { value: "daily_commute", label: "Daily Commute" },
];

const ToggleChip = React.memo(function ToggleChip({
  label,
  selected,
  onToggle,
  id,
}: {
  label: string;
  selected: boolean;
  onToggle: () => void;
  id: string;
}) {
  return (
    <motion.button
      id={id}
      onClick={onToggle}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-all ${
        selected
          ? "border-primary bg-primary/15 text-primary"
          : "border-border bg-muted text-muted-foreground hover:border-primary/40 hover:text-foreground"
      }`}
    >
      {label}
    </motion.button>
  );
});

export default function ShortlistSection() {
  const [budgetMax, setBudgetMax] = useState(30);
  const [budgetMin, setBudgetMin] = useState(0);
  const [fuels, setFuels] = useState<string[]>([]);
  const [bodies, setBodies] = useState<string[]>([]);
  const [priorities, setPriorities] = useState<string[]>([]);
  const [useCases, setUseCases] = useState<string[]>([]);
  const [transmission, setTransmission] = useState<string>("");
  const [seats, setSeats] = useState<number>(0);

  const [results, setResults] = useState<ScoredCar[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggle = useCallback((arr: string[], val: string, setArr: (a: string[]) => void) => {
    setArr(arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val]);
  }, []);

  const handleSubmit = useCallback(async () => {
    setLoading(true);
    setError(null);
    setResults(null);
    try {
      const res = await getRecommendations({
        budget_min: budgetMin > 0 ? budgetMin : undefined,
        budget_max: budgetMax,
        fuel_type: fuels.length ? fuels : undefined,
        body_type: bodies.length ? bodies : undefined,
        priorities: priorities.length ? priorities : undefined,
        use_case: useCases.length ? useCases : undefined,
        transmission: transmission || undefined,
        seats: seats > 0 ? seats : undefined,
        top_n: 6,
      });
      setResults(res.recommendations);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }, [budgetMin, budgetMax, fuels, bodies, priorities, useCases, transmission, seats]);

  const handleReset = useCallback(() => {
    setFuels([]);
    setBodies([]);
    setPriorities([]);
    setUseCases([]);
    setTransmission("");
    setSeats(0);
    setBudgetMax(30);
    setResults(null);
  }, []);

  return (
    <section id="shortlist" className="py-24 scroll-mt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary mb-4">
            <SlidersHorizontal className="h-3 w-3" />
            Smart Filter
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
            Build your shortlist
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Set your preferences and let our engine rank the best matches — with clear explanations for every pick.
          </p>
        </div>

        {/* Filter Panel */}
        <div className="glass-card rounded-2xl p-6 sm:p-8 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Budget */}
            <div className="space-y-3">
              <label className="text-sm font-semibold" htmlFor="budget-max-slider">
                Budget <span className="text-muted-foreground font-normal">up to</span> ₹{budgetMax}L
              </label>
              <input
                id="budget-max-slider"
                type="range"
                min={5}
                max={50}
                step={0.5}
                value={budgetMax}
                onChange={(e) => setBudgetMax(parseFloat(e.target.value))}
                className="w-full accent-primary"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>₹5L</span><span>₹50L+</span>
              </div>
            </div>

            {/* Seats + Transmission */}
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold" htmlFor="seats-select">Min Seats</label>
                <select
                  id="seats-select"
                  value={seats}
                  onChange={(e) => setSeats(parseInt(e.target.value))}
                  className="w-full rounded-xl border border-border bg-muted px-3 py-2 text-sm focus:outline-none focus:border-primary"
                >
                  <option value={0}>Any</option>
                  {[4, 5, 6, 7, 8].map((s) => (
                    <option key={s} value={s}>{s}+ seats</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold" htmlFor="transmission-select">Transmission</label>
                <select
                  id="transmission-select"
                  value={transmission}
                  onChange={(e) => setTransmission(e.target.value)}
                  className="w-full rounded-xl border border-border bg-muted px-3 py-2 text-sm focus:outline-none focus:border-primary"
                >
                  <option value="">Any</option>
                  <option value="Automatic">Automatic</option>
                  <option value="Manual">Manual</option>
                </select>
              </div>
            </div>

            {/* Fuel types */}
            <div className="space-y-3">
              <p className="text-sm font-semibold">Fuel Type</p>
              <div className="flex flex-wrap gap-2">
                {FUEL_OPTIONS.map((f) => (
                  <ToggleChip
                    key={f}
                    id={`filter-fuel-${f.toLowerCase()}`}
                    label={f}
                    selected={fuels.includes(f)}
                    onToggle={() => toggle(fuels, f, setFuels)}
                  />
                ))}
              </div>
            </div>

            {/* Body type */}
            <div className="space-y-3">
              <p className="text-sm font-semibold">Body Type</p>
              <div className="flex flex-wrap gap-2">
                {BODY_OPTIONS.map((b) => (
                  <ToggleChip
                    key={b}
                    id={`filter-body-${b.toLowerCase().replace(/\s+/g, "-")}`}
                    label={b}
                    selected={bodies.includes(b)}
                    onToggle={() => toggle(bodies, b, setBodies)}
                  />
                ))}
              </div>
            </div>

            {/* Use case */}
            <div className="space-y-3">
              <p className="text-sm font-semibold">Primary Use</p>
              <div className="flex flex-wrap gap-2">
                {USE_CASE_OPTIONS.map((u) => (
                  <ToggleChip
                    key={u.value}
                    id={`filter-use-${u.value}`}
                    label={u.label}
                    selected={useCases.includes(u.value)}
                    onToggle={() => toggle(useCases, u.value, setUseCases)}
                  />
                ))}
              </div>
            </div>

            {/* Priorities */}
            <div className="space-y-3">
              <p className="text-sm font-semibold">What matters most? <span className="text-muted-foreground font-normal text-xs">(pick up to 3)</span></p>
              <div className="flex flex-wrap gap-2">
                {PRIORITY_OPTIONS.map((p) => (
                  <ToggleChip
                    key={p.value}
                    id={`filter-priority-${p.value}`}
                    label={p.label}
                    selected={priorities.includes(p.value)}
                    onToggle={() => {
                      if (!priorities.includes(p.value) && priorities.length >= 3) return;
                      toggle(priorities, p.value, setPriorities);
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-between items-center">
            <button
              id="filter-reset-btn"
              onClick={handleReset}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Reset filters
            </button>
            <button
              id="filter-submit-btn"
              onClick={handleSubmit}
              disabled={loading}
              className="flex items-center gap-2 rounded-full bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-60"
            >
              {loading ? (
                <><Loader2 className="h-4 w-4 animate-spin" /> Finding matches…</>
              ) : (
                <>Find My Cars <ChevronRight className="h-4 w-4" /></>
              )}
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-8 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error}
          </div>
        )}

        {/* Results */}
        <AnimatePresence>
          {results && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="mt-12"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">
                  {results.length} match{results.length !== 1 ? "es" : ""} found
                </h3>
                <Link
                  href="/cars"
                  id="shortlist-see-all-btn"
                  className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                >
                  See all cars <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.map(({ car, match_score, match_reasons }, i) => (
                  <motion.div
                    key={car.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <CarCard
                      car={car}
                      matchScore={match_score}
                      matchReasons={match_reasons}
                      showScore
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA to browse */}
        {!results && !loading && (
          <div className="text-center mt-4">
            <Link
              href="/cars"
              id="shortlist-browse-btn"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Just want to browse everything? <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
