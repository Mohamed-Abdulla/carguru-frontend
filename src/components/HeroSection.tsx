"use client";

import { useState } from "react";
import { Globe, Sparkles, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import Script from "next/script";

// ─── Constants ────────────────────────────────────────────────────────────────

const LANGUAGES = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "hi", label: "हिंदी", flag: "🇮🇳" },
  { code: "ta", label: "தமிழ்", flag: "🏴" },
];

const AGENT_ID = process.env.NEXT_PUBLIC_ELEVEN_LABS_AGENT_ID ?? "";

// ─── Hero Section ─────────────────────────────────────────────────────────────

export default function HeroSection() {
  const [lang, setLang] = useState(LANGUAGES[0]);
  const [langOpen, setLangOpen] = useState(false);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
    >
      {/* ElevenLabs widget script — loads once */}
      <Script
        src="https://unpkg.com/@elevenlabs/convai-widget-embed"
        strategy="lazyOnload"
      />

      <div className="hero-blob-1 top-1/4 -left-32 opacity-60" />
      <div className="hero-blob-2 bottom-1/4 -right-16 opacity-50" />

      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(oklch(1 0 0) 1px, transparent 1px), linear-gradient(90deg, oklch(1 0 0) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 text-center"
      >
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary mb-6">
          <Sparkles className="h-3 w-3" />
          AI-Powered Car Research
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight mb-6">
          Find your perfect car{" "}
          <span className="gradient-text block sm:inline">in your language</span>
        </h1>

        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          Tell us what you need — in English, Hindi, or Tamil.{" "}
          <span className="text-foreground font-medium">CarGuru</span> cuts through the confusion
          and gives you a shortlist you can actually trust.
        </p>

        {/* AI Widget Card */}
        <div className="glass-card rounded-2xl p-6 sm:p-8 max-w-2xl mx-auto">
          {/* Language selector */}
          <div className="flex items-center justify-between mb-5">
            <p className="text-sm font-medium text-muted-foreground">Talk to CarGuru AI</p>

            <div className="relative">
              <button
                id="hero-lang-select"
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-2 rounded-full border border-border bg-muted px-3 py-2 text-sm font-medium hover:border-primary/50 transition-colors"
              >
                <Globe className="h-3.5 w-3.5 text-muted-foreground" />
                <span>{lang.flag}</span>
                <span className="hidden sm:inline text-muted-foreground">{lang.label}</span>
                <ChevronDown className="h-3 w-3 text-muted-foreground" />
              </button>
              {langOpen && (
                <div className="absolute right-0 top-full mt-2 w-36 rounded-xl border border-border bg-card shadow-xl py-1 z-20">
                  {LANGUAGES.map((l) => (
                    <button
                      key={l.code}
                      id={`hero-lang-${l.code}`}
                      className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-muted transition-colors"
                      onClick={() => { setLang(l); setLangOpen(false); }}
                    >
                      <span>{l.flag}</span>
                      <span>{l.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Active language badge */}
          <div className="flex justify-center mb-4">
            <div className="flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
              <span>{lang.flag}</span>
              <span>Speaking in {lang.label}</span>
            </div>
          </div>

          {/* ElevenLabs convai widget — voice + text handled internally */}
          <div className="flex justify-center">
            <elevenlabs-convai
              agent-id={AGENT_ID}
              override-language={lang.code}
              action-text="Talk to CarGuru AI"
              start-call-text="Start talking"
              end-call-text="End call"
              listening-text="Listening…"
              speaking-text="CarGuru is speaking…"
              variant="expanded"
              avatar-orb-color-1="#6366f1"
              avatar-orb-color-2="#a855f7"
            />
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center gap-2 text-muted-foreground text-xs">
          <span>Or explore manually below</span>
          <ChevronDown className="h-4 w-4 animate-bounce" />
        </div>
      </motion.div>
    </section>
  );
}
