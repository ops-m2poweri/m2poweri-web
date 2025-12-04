// src/components/ui/hamburger-blob.tsx
"use client";

import { motion } from "framer-motion";

type HamburgerBlobProps = {
  open: boolean;
  reducedMotion?: boolean;
};

export function HamburgerBlob({ open, reducedMotion }: HamburgerBlobProps) {
  const animateState = reducedMotion ? undefined : open ? "open" : "closed";

  return (
    <motion.div
      className="relative flex h-10 w-10 items-center justify-center"
      initial={false}
      animate={animateState}
    >
      {/* Blob dietro */}
      {!reducedMotion && (
        <motion.div
          className="absolute h-9 w-9 rounded-full bg-brand-blue/25 blur-md"
          variants={{
            open: { scale: 1.25, opacity: 0.9 },
            closed: { scale: 0.95, opacity: 0.6 },
          }}
          transition={{ duration: 0.35 }}
        />
      )}

      {/* Contenitore linee */}
      <div className="relative z-10 h-5 w-6">
        {/* linea top */}
        <motion.span
          className="absolute left-1/2 top-1/2 h-[2px] w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white origin-center"
          variants={
            reducedMotion
              ? undefined
              : {
                  open: { rotate: 45, y: 0 },
                  closed: { rotate: 0, y: -4 },
                }
          }
          transition={{ duration: 0.22 }}
        />

        {/* linea middle */}
        <motion.span
          className="absolute left-1/2 top-1/2 h-[2px] w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white origin-center"
          variants={
            reducedMotion
              ? undefined
              : {
                  open: { opacity: 0 },
                  closed: { opacity: 1, rotate: 0, y: 0 },
                }
          }
          transition={{ duration: 0.18 }}
        />

        {/* linea bottom */}
        <motion.span
          className="absolute left-1/2 top-1/2 h-[2px] w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white origin-center"
          variants={
            reducedMotion
              ? undefined
              : {
                  open: { rotate: -45, y: 0 },
                  closed: { rotate: 0, y: 4 },
                }
          }
          transition={{ duration: 0.22 }}
        />
      </div>
    </motion.div>
  );
}
