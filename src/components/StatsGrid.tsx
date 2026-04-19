"use client";

import { motion } from "framer-motion";
import { Car, ShieldCheck, Star, TrendingUp } from "lucide-react";

const ICON_MAP = {
  car: Car,
  shield: ShieldCheck,
  star: Star,
  trending: TrendingUp,
};

interface StatItem {
  id: string;
  icon: keyof typeof ICON_MAP;
  value: string;
  label: string;
}

interface StatsGridProps {
  items: StatItem[];
}

export default function StatsGrid({ items }: StatsGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {items.map((item, i) => (
        <motion.div
          key={item.id}
          id={item.id}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.1 }}
          className="flex flex-col items-center text-center gap-2"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/15">
            {(() => {
              const Icon = ICON_MAP[item.icon];
              return <Icon className="h-5 w-5 text-primary" />;
            })()}
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold gradient-text">
            {item.value}
          </div>
          <div className="text-sm text-muted-foreground">{item.label}</div>
        </motion.div>
      ))}
    </div>
  );
}
