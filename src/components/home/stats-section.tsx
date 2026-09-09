"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";

const stats = [
  {
    value: 175,
    suffix: "+",
    label: "Active Readers",
  },
  {
    value: 487,
    suffix: "",
    label: "Total Pages",
  },
  {
    value: 40,
    suffix: "+",
    label: "Cup of Coffee",
  },
  {
    value: 40,
    suffix: "+",
    label: "Facebook Fans",
  },
];

type CounterProps = {
  value: number;
  suffix?: string;
  duration?: number;
};

function Counter({
  value,
  suffix = "",
  duration = 1800,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);

  const isInView = useInView(ref, {
    once: true,
    amount: 0.5,
  });

  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let animationFrame: number;
    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      if (startTime === null) {
        startTime = timestamp;
      }

      const elapsed = timestamp - startTime;

      const progress = Math.min(elapsed / duration, 1);

      // Smooth ease-out animation
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      const currentValue = Math.floor(easedProgress * value);

      setCount(currentValue);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [isInView, value, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export function StatsSection() {
  return (
    <section
      className="
        relative
        overflow-hidden
        bg-[#F7F5EE]
        py-16
        transition-colors
        duration-500
        dark:bg-[#061522]
        sm:py-20
        lg:py-24
      "
    >
      {/* BACKGROUND GLOW */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-[320px]
          w-[520px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-[#2196F3]/[0.035]
          blur-[120px]
          dark:bg-[#2196F3]/[0.06]
        "
      />

      <div
        className="
          relative
          z-10
          mx-auto
          max-w-[1380px]
          px-5
          sm:px-8
          lg:px-12
          xl:px-16
        "
      >
        <div
          className="
            grid
            grid-cols-2
            gap-x-4
            gap-y-12
            md:grid-cols-4
            md:gap-0
          "
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{
                opacity: 0,
                y: 24,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.4,
              }}
              transition={{
                duration: 0.65,
                delay: index * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                group
                relative
                flex
                flex-col
                items-center
                justify-center
                text-center
              "
            >
              {/* COUNTER */}
              <motion.p
                whileHover={{
                  y: -3,
                }}
                transition={{
                  type: "spring",
                  stiffness: 250,
                  damping: 20,
                }}
                className="
                  font-serif
                  text-[48px]
                  font-normal
                  leading-none
                  tracking-[-0.04em]
                  text-[#66686A]
                  transition-colors
                  duration-300
                  group-hover:text-[#2196F3]
                  dark:text-slate-100
                  dark:group-hover:text-[#42A5F5]
                  sm:text-[58px]
                  lg:text-[68px]
                  xl:text-[72px]
                "
              >
                <Counter
                  value={stat.value}
                  suffix={stat.suffix}
                  duration={1800}
                />
              </motion.p>

              {/* LABEL */}
              <p
                className="
                  mt-7
                  text-[10px]
                  font-medium
                  uppercase
                  tracking-[0.3em]
                  text-[#9A9DA1]
                  transition-colors
                  duration-300
                  group-hover:text-[#2196F3]
                  dark:text-slate-500
                  dark:group-hover:text-[#42A5F5]
                  sm:text-[11px]
                  lg:mt-8
                  lg:text-[12px]
                "
              >
                {stat.label}
              </p>

              {/* HOVER LINE */}
              <div
                className="
                  mt-4
                  h-px
                  w-0
                  bg-[#2196F3]
                  transition-all
                  duration-500
                  group-hover:w-8
                "
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}                                                                                       