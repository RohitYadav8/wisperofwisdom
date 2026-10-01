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

      const currentValue = Math.floor(
        easedProgress * value
      );

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
        py-10

        transition-colors
        duration-500

        dark:bg-[#061522]

        sm:py-12
        lg:py-14
      "
    >
      {/* =====================================================
          BACKGROUND GLOW
      ===================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-[260px]
          w-[440px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-[#2196F3]/[0.03]
          blur-[100px]

          dark:bg-[#2196F3]/[0.06]
        "
      />

      {/* =====================================================
          CONTAINER
      ===================================================== */}

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
        {/* =====================================================
            STATS GRID
        ===================================================== */}

        <div
          className="
            grid
            grid-cols-2
            gap-x-4
            gap-y-8

            md:grid-cols-4
            md:gap-0
          "
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{
                opacity: 0,
                y: 18,
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
                duration: 0.6,
                delay: index * 0.07,
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
                  text-[42px]
                  font-normal
                  leading-none
                  tracking-[-0.04em]
                  text-[#66686A]

                  transition-colors
                  duration-300

                  group-hover:text-[#2196F3]

                  dark:text-slate-100
                  dark:group-hover:text-[#42A5F5]

                  sm:text-[52px]

                  lg:text-[60px]

                  xl:text-[64px]
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
                  mt-4
                  text-[9px]
                  font-medium
                  uppercase
                  tracking-[0.28em]
                  text-[#9A9DA1]

                  transition-colors
                  duration-300

                  group-hover:text-[#2196F3]

                  dark:text-slate-500
                  dark:group-hover:text-[#42A5F5]

                  sm:text-[10px]

                  lg:mt-5
                  lg:text-[11px]
                "
              >
                {stat.label}
              </p>

              {/* HOVER LINE */}

              <div
                className="
                  mt-3
                  h-px
                  w-0
                  bg-[#2196F3]
                  transition-all
                  duration-500
                  group-hover:w-7
                "
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}