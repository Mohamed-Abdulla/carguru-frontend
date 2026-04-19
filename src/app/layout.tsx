import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "CarGuru — Your AI Car Research Assistant",
    template: "%s | CarGuru",
  },
  description:
    "CarGuru helps confused car buyers go from 'I don't know what to buy' to a confident shortlist in minutes. Powered by AI recommendations across 35+ cars.",
  keywords: [
    "car recommendation",
    "car buying guide",
    "AI car assistant",
    "best car in India",
    "car shortlist",
    "buy car online",
  ],
  authors: [{ name: "CarGuru" }],
  creator: "CarGuru",
  openGraph: {
    type: "website",
    locale: "en_IN",
    title: "CarGuru — Your AI Car Research Assistant",
    description:
      "Get personalized car recommendations in your language. Compare specs, safety ratings, and prices in seconds.",
    siteName: "CarGuru",
  },
  twitter: {
    card: "summary_large_image",
    title: "CarGuru — Your AI Car Research Assistant",
    description:
      "Get personalized car recommendations in your language. Compare specs, safety ratings, and prices in seconds.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
