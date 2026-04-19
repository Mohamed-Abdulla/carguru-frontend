"use client";

import { useState } from "react";
import { Send, CheckCircle2, Mail, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function CTASection() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    // Send via mailto (opens default mail app) + simulate submission
    const subject = encodeURIComponent(`CarGuru Enquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    window.location.href = `mailto:mohamedabdulla@example.com?subject=${subject}&body=${body}`;
    // Simulate success after brief delay
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
    }, 800);
  }

  return (
    <section id="contact" className="py-24 scroll-mt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative rounded-3xl overflow-hidden"
        >
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/5 to-transparent" />
          <div className="absolute inset-0 border border-primary/20 rounded-3xl" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 p-8 sm:p-12 lg:p-16">
            {/* Left copy */}
            <div className="flex flex-col justify-center">
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary mb-6">
                <Mail className="h-3 w-3" />
                Get Expert Help
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
                Still confused?{" "}
                <span className="gradient-text">We'll help you decide.</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Drop us a message and our team will personally review your requirements and send you a curated shortlist.
                No spam. Just clarity.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {[
                  "Personalized car advice within 24hrs",
                  "Test drive coordination support",
                  "Finance & EMI guidance",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Form / Success */}
            <div className="flex items-center">
              {submitted ? (
                <div
                  id="cta-success"
                  className="glass-card rounded-2xl p-8 w-full text-center space-y-4"
                >
                  <div className="flex h-16 w-16 mx-auto items-center justify-center rounded-full bg-primary/15">
                    <CheckCircle2 className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Message sent!</h3>
                  <p className="text-muted-foreground text-sm">
                    We'll get back to you within 24 hours with personalised recommendations.
                  </p>
                  <button
                    id="cta-restart-btn"
                    onClick={() => { setSubmitted(false); setEmail(""); setName(""); setMessage(""); }}
                    className="inline-flex items-center gap-2 rounded-full border border-primary px-6 py-2.5 text-sm font-medium text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    Send another <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <form
                  id="cta-form"
                  onSubmit={handleSubmit}
                  className="glass-card rounded-2xl p-8 w-full space-y-4"
                >
                  <div>
                    <label htmlFor="cta-name" className="block text-sm font-semibold mb-1.5">
                      Your name
                    </label>
                    <input
                      id="cta-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Rahul Sharma"
                      className="w-full rounded-xl border border-border bg-muted/50 px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="cta-email" className="block text-sm font-semibold mb-1.5">
                      Your email
                    </label>
                    <input
                      id="cta-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="rahul@example.com"
                      className="w-full rounded-xl border border-border bg-muted/50 px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="cta-message" className="block text-sm font-semibold mb-1.5">
                      What are you looking for?
                    </label>
                    <textarea
                      id="cta-message"
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="I'm looking for a family SUV under ₹20L with good safety…"
                      className="w-full rounded-xl border border-border bg-muted/50 px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-colors resize-none"
                    />
                  </div>
                  <button
                    id="cta-submit-btn"
                    type="submit"
                    disabled={loading}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-60"
                  >
                    {loading ? "Sending…" : (
                      <><Send className="h-4 w-4" /> Send Message</>
                    )}
                  </button>
                  <p className="text-xs text-center text-muted-foreground">
                    We typically reply within 24 hours. Zero spam.
                  </p>
                </form>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
