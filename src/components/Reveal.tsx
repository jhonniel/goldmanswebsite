import { m, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { fadeUp, revealTransition } from "../lib/motion";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export default function Reveal({
  children,
  className,
  delay = 0,
}: RevealProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <m.div
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.18 }}
      transition={revealTransition(delay)}
    >
      {children}
    </m.div>
  );
}
