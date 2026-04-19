import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getCarById } from "@/lib/api";
import {
  ArrowLeft,
  Shield,
  Fuel,
  Zap,
  Settings,
  Users,
  Star,
  MessageSquare,
  Wrench,
  TrendingUp,
  CheckCircle2,
  XCircle,
  Palette,
} from "lucide-react";
import CarImage from "@/components/CarImage";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { id } = await params;
    const car = await getCarById(parseInt(id));
    return {
      title: `${car.make} ${car.model} ${car.variant}`,
      description: `${car.make} ${car.model} — ₹${car.price_lakh}L · ${car.fuel_type} · ${car.body_type} · ${car.safety_rating}★ safety. Detailed specs, pros, cons, and more on CarGuru.`,
    };
  } catch {
    return { title: "Car Details" };
  }
}

function SpecItem({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string | number }) {
  return (
    <div className="glass-card rounded-xl p-4 flex items-start gap-3">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/15 shrink-0">
        <Icon className="h-4 w-4 text-primary" />
      </div>
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-bold mt-0.5">{value}</p>
      </div>
    </div>
  );
}

export default async function CarDetailPage({ params }: Props) {
  const { id } = await params;
  let car;
  try {
    car = await getCarById(parseInt(id));
  } catch {
    notFound();
  }

  const efficiency =
    car.fuel_type === "Electric"
      ? `${car.range_km} km range`
      : car.mileage_kmpl
        ? `${car.mileage_kmpl} kmpl`
        : "N/A";

  const safetyColor =
    car.safety_rating >= 5
      ? "text-emerald-400"
      : car.safety_rating >= 4
        ? "text-blue-400"
        : "text-amber-400";

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          {/* Back */}
          <Link
            href="/cars"
            id="detail-back-btn"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" /> All Cars
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left — Image + Colors */}
            <div className="space-y-6">
              <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden bg-muted">
                {car.image_url ? (
                <CarImage
                  src={car.image_url}
                  alt={`${car.make} ${car.model}`}
                  fill
                  className="object-cover"
                  unoptimized
                  priority
                />
                ) : (
                  <div className="h-full flex items-center justify-center text-muted-foreground">
                    <Zap className="h-16 w-16 opacity-20" />
                  </div>
                )}
                <div className="absolute top-4 left-4">
                  <span className="rounded-full bg-background/80 backdrop-blur-sm border border-border px-3 py-1.5 text-xs font-semibold">
                    {car.fuel_type}
                  </span>
                </div>
              </div>

              {/* Colors */}
              {car.colors?.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <Palette className="h-4 w-4 text-primary" /> Available Colors
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {car.colors.map((color) => (
                      <span
                        key={color}
                        className="rounded-full border border-border bg-muted px-3 py-1 text-xs text-muted-foreground"
                      >
                        {color}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Pros & Cons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4" /> What buyers love
                  </p>
                  <ul className="space-y-1.5">
                    {car.pros.map((p) => (
                      <li key={p} className="text-xs text-muted-foreground flex items-start gap-1.5">
                        <span className="text-emerald-400 mt-0.5 shrink-0">✓</span>
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-destructive flex items-center gap-1.5">
                    <XCircle className="h-4 w-4" /> Things to consider
                  </p>
                  <ul className="space-y-1.5">
                    {car.cons.map((c) => (
                      <li key={c} className="text-xs text-muted-foreground flex items-start gap-1.5">
                        <span className="text-destructive mt-0.5 shrink-0">✗</span>
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Right — Details */}
            <div className="space-y-8">
              {/* Title + Price */}
              <div>
                <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider mb-1">{car.make}</p>
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-1">
                  {car.model}
                </h1>
                <p className="text-muted-foreground text-sm mb-4">{car.variant} · {car.year}</p>

                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <span className="text-4xl font-black gradient-text">₹{car.price_lakh}L</span>
                  <div className={`flex items-center gap-1.5 ${safetyColor} font-bold`}>
                    <Shield className="h-5 w-5" />
                    <span>{car.safety_rating}★ NCAP Safety</span>
                  </div>
                </div>

                {/* Ratings */}
                <div className="flex items-center gap-3 glass-card rounded-xl px-5 py-4">
                  <div>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < Math.floor(car.user_rating) ? "fill-primary text-primary" : "text-muted-foreground"}`}
                        />
                      ))}
                    </div>
                    <p className="text-2xl font-extrabold mt-1">{car.user_rating}<span className="text-sm text-muted-foreground font-normal">/5</span></p>
                  </div>
                  <div className="border-l border-border pl-4">
                    <p className="text-2xl font-extrabold">{car.review_count.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                      <MessageSquare className="h-3 w-3" /> Verified reviews
                    </p>
                  </div>
                  <div className="border-l border-border pl-4">
                    <p className="text-2xl font-extrabold">{car.warranty_years}yr</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Warranty</p>
                  </div>
                </div>
              </div>

              {/* Specs grid */}
              <div>
                <h2 className="text-lg font-bold mb-4">Key Specifications</h2>
                <div className="grid grid-cols-2 gap-3">
                  <SpecItem icon={Fuel} label="Mileage / Range" value={efficiency} />
                  <SpecItem icon={Zap} label="Power" value={`${car.power_bhp} bhp`} />
                  <SpecItem icon={TrendingUp} label="Torque" value={`${car.torque_nm} Nm`} />
                  <SpecItem icon={Settings} label="Transmission" value={car.transmission} />
                  <SpecItem icon={Users} label="Seating" value={`${car.seats} seats`} />
                  <SpecItem icon={Settings} label="Body Type" value={car.body_type} />
                  {car.engine_cc && (
                    <SpecItem icon={Settings} label="Engine" value={`${car.engine_cc} cc`} />
                  )}
                  <SpecItem icon={TrendingUp} label="Ground Clearance" value={`${car.ground_clearance_mm} mm`} />
                  <SpecItem icon={Wrench} label="Service/Yr" value={`₹${car.service_cost_annual.toLocaleString()}`} />
                  <SpecItem icon={Settings} label="Boot Space" value={`${car.boot_space_litres}L`} />
                </div>
              </div>

              {/* Use cases */}
              <div className="space-y-3">
                <h2 className="text-lg font-bold">Best suited for</h2>
                <div className="flex flex-wrap gap-2">
                  {car.use_case.map((uc) => (
                    <span key={uc} className="rounded-full bg-primary/10 border border-primary/25 px-3 py-1 text-xs font-medium text-primary capitalize">
                      {uc.replace(/_/g, " ")}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Link
                  href="/#contact"
                  id="detail-enquire-btn"
                  className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
                >
                  Enquire Now
                </Link>
                <Link
                  href="/#shortlist"
                  id="detail-compare-btn"
                  className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-border py-3 text-sm font-medium hover:border-primary/50 transition-colors"
                >
                  Find Similar Cars
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
