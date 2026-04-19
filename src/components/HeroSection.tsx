"use client";

import { useState } from "react";
import { Mic, MessageSquare, Globe, Sparkles, ChevronDown } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const LANGUAGES = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "hi", label: "हिंदी", flag: "🇮🇳" },
  { code: "ta", label: "தமிழ்", flag: "🏴" },
];

export default function HeroSection() {
  const [mode, setMode] = useState<"voice" | "text">("voice");
  const [lang, setLang] = useState(LANGUAGES[0]);
  const [langOpen, setLangOpen] = useState(false);
  const [message, setMessage] = useState("");

  const placeholders = {
    en: "e.g. I need an SUV under 15 lakhs for my family with good mileage…",
    hi: "e.g. मुझे 15 लाख में परिवार के लिए अच्छी माइलेज वाली SUV चाहिए…",
    ta: "e.g. என் குடும்பத்திற்கு 15 லட்சத்தில் நல்ல மைலேஜ் கொண்ட SUV வேண்டும்…",
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
    >
      {/* Ambient blobs */}
      <div className="hero-blob-1 top-1/4 -left-32 opacity-60" />
      <div className="hero-blob-2 bottom-1/4 -right-16 opacity-50" />

      {/* Grid pattern overlay */}
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

        {/* Headline */}
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
          {/* Mode + Language toggles */}
          <div className="flex items-center justify-between mb-6">
            {/* Mode toggle */}
            <div className="flex items-center gap-1 rounded-full bg-muted p-1">
              <button
                id="hero-mode-voice"
                onClick={() => setMode("voice")}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${mode === "voice" ? "bg-primary text-primary-foreground shadow" : "text-muted-foreground hover:text-foreground"}`}
              >
                <Mic className="h-3.5 w-3.5" />
                Voice
              </button>
              <button
                id="hero-mode-text"
                onClick={() => setMode("text")}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${mode === "text" ? "bg-primary text-primary-foreground shadow" : "text-muted-foreground hover:text-foreground"}`}
              >
                <MessageSquare className="h-3.5 w-3.5" />
                Text
              </button>
            </div>

            {/* Language selector */}
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

          {/* Voice mode */}
          {mode === "voice" && (
            <div className="flex flex-col items-center gap-6 py-4">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-primary/30 pulse-ring" />
                <div className="absolute inset-0 scale-125 rounded-full bg-primary/15 pulse-ring [animation-delay:0.5s]" />
                <button
                  id="hero-voice-btn"
                  className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full bg-primary shadow-2xl hover:scale-105 transition-transform active:scale-95"
                  aria-label="Start voice assistant"
                >
                  <Mic className="h-8 w-8 text-primary-foreground" />
                </button>
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-foreground">Tap to speak</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Powered by ElevenLabs Conversational AI
                </p>
              </div>
              {/* Waveform dummy */}
              <div className="flex items-end gap-1 h-8">
                {[3, 6, 9, 5, 8, 4, 7, 3, 6, 9, 5, 8].map((h, i) => (
                  <div
                    key={i}
                    className="w-1.5 rounded-full bg-primary/40"
                    style={{
                      height: `${h * 3}px`,
                      animation: `pulse 1.2s ease-in-out ${i * 0.1}s infinite alternate`,
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Text mode */}
          {mode === "text" && (
            <div className="space-y-3">
              <textarea
                id="hero-text-input"
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={placeholders[lang.code as keyof typeof placeholders]}
                className="w-full rounded-xl border border-border bg-muted/50 px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 resize-none transition-colors"
              />
              <Link
                href="#shortlist"
                id="hero-text-go"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
              >
                <Sparkles className="h-4 w-4" />
                Get My Recommendations
              </Link>
            </div>
          )}
        </div>

        {/* Scroll cue */}
        <div className="mt-12 flex flex-col items-center gap-2 text-muted-foreground text-xs">
          <span>Or explore manually below</span>
          <ChevronDown className="h-4 w-4 animate-bounce" />
        </div>
      </motion.div>
    </section>
  );
}
