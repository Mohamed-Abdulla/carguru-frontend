import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import ShortlistSection from "@/components/ShortlistSection";
import PopularSection from "@/components/PopularSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

function LoadingFallback({ label }: { label: string }) {
  return (
    <div className="py-16 flex items-center justify-center text-muted-foreground text-sm">
      Loading {label}…
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <Suspense fallback={<LoadingFallback label="stats" />}>
          <StatsSection />
        </Suspense>
        <ShortlistSection />
        <Suspense fallback={<LoadingFallback label="popular cars" />}>
          <PopularSection />
        </Suspense>
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
