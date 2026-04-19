"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedGridProps {
  children: ReactNode[];
}

export default function AnimatedGrid({ children }: AnimatedGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {children.map((child, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
}
