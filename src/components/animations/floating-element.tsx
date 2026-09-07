"use client";

import { motion } from "motion/react";

type FloatingElementProps = {
  children: React.ReactNode;
  className?: string;
  distance?: number;
  duration?: number;
};

export function FloatingElement({
  children,
  className = "",
  distance = 10,
  duration = 5,
}: FloatingElementProps) {
  return (
    <motion.div
      animate={{
        y: [0, -distance, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}