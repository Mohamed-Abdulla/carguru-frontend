"use client";

import React from "react";
import { Car } from "@/lib/types";
import { Shield, Star, Fuel, Zap } from "lucide-react";
import Link from "next/link";
import CarImage from "@/components/CarImage";
import { motion } from "framer-motion";

interface CarCardProps {
  car: Car;
  matchScore?: number;
  matchReasons?: string[];
  showScore?: boolean;
}

function SafeStars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-3 w-3 ${i < Math.floor(rating) ? "fill-primary text-primary" : "text-muted-foreground"}`}
        />
      ))}
    </div>
  );
}

function SafetyBadge({ rating }: { rating: number }) {
  const colors =
    rating >= 5
      ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
      : rating >= 4
        ? "bg-blue-500/15 text-blue-400 border-blue-500/30"
        : "bg-amber-500/15 text-amber-400 border-amber-500/30";
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-semibold ${colors}`}>
      <Shield className="h-2.5 w-2.5" />
      {rating}★ Safety
    </span>
  );
}

const CarCard = React.memo(function CarCard({ car, matchScore, matchReasons, showScore = false }: CarCardProps) {
  const efficiency =
    car.fuel_type === "Electric" ? `${car.range_km} km` : car.mileage_kmpl ? `${car.mileage_kmpl} kmpl` : "—";

  return (
    <Link
      href={`/cars/${car.id}`}
      id={`car-card-${car.id}`}
      className="block"
    >
      <motion.div
        whileHover={{ y: -5, boxShadow: "0 20px 40px oklch(0 0 0 / 0.1)" }}
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3 }}
        className="glass-card rounded-2xl overflow-hidden flex flex-col group h-full"
      >
      {/* Image area */}
      <div className="relative h-44 bg-muted overflow-hidden">
        <CarImage
          src={car.image_url}
          alt={`${car.make} ${car.model}`}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          unoptimized
        />
        {/* Fuel badge */}
        <span className="absolute top-3 left-3 rounded-full bg-background/80 backdrop-blur-sm border border-border px-2.5 py-1 text-xs font-semibold">
          {car.fuel_type}
        </span>
        {/* Match score badge */}
        {showScore && matchScore !== undefined && (
          <div className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-primary shadow-lg">
            <span className="text-xs font-extrabold text-primary-foreground">{matchScore}</span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        <div>
          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{car.make}</p>
          <h3 className="text-base font-bold leading-snug">{car.model}</h3>
          <p className="text-xs text-muted-foreground truncate">{car.variant}</p>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xl font-extrabold gradient-text">₹{car.price_lakh}L</span>
          <SafetyBadge rating={car.safety_rating} />
        </div>

        {/* Specs row */}
        <div className="flex items-center gap-3 text-xs text-muted-foreground border-t border-border/50 pt-3">
          <span className="flex items-center gap-1">
            <Fuel className="h-3 w-3 text-primary" />
            {efficiency}
          </span>
          <span className="flex items-center gap-1">
            <Zap className="h-3 w-3 text-primary" />
            {car.power_bhp} bhp
          </span>
          <span>{car.seats} seats</span>
        </div>

        {/* User rating */}
        <div className="flex items-center gap-2">
          <SafeStars rating={car.user_rating} />
          <span className="text-xs text-muted-foreground">
            {car.user_rating} ({car.review_count.toLocaleString()} reviews)
          </span>
        </div>

        {/* Match score bar */}
        {showScore && matchScore !== undefined && (
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Match Score</span>
              <span className="font-bold text-primary">{matchScore}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-muted overflow-hidden">
              <div className="h-full score-bar-fill rounded-full" style={{ width: `${matchScore}%` }} />
            </div>
          </div>
        )}

        {/* Match reasons */}
        {showScore && matchReasons && matchReasons.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1">
            {matchReasons.slice(0, 3).map((r, i) => (
              <span
                key={i}
                className="text-xs rounded-full bg-primary/10 text-primary px-2 py-0.5 border border-primary/20"
              >
                {r}
              </span>
            ))}
          </div>
        )}

        {/* View details */}
        <div className="mt-auto pt-2">
          <div className="flex items-center justify-between text-xs font-semibold text-primary group-hover:underline">
            View Details
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </div>
        </div>
      </div>
      </motion.div>
    </Link>)
}
)

export default CarCard;
