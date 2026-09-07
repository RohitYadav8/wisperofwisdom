"use client";

import { motion } from "motion/react";

type AnimateInProps = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
};

export function AnimateIn({
  children,
  delay = 0,
  className = "",
  direction = "up",
}: AnimateInProps) {
  const directions = {
    up: {
      x: 0,
      y: 40,
    },
    down: {
      x: 0,
      y: -40,
    },
    left: {
      x: 40,
      y: 0,
    },
    right: {
      x: -40,
      y: 0,
    },
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        ...directions[direction],
        filter: "blur(10px)",
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        filter: "blur(0px)",
      }}
      viewport={{
        once: true,
        amount: 0.2,
      }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}