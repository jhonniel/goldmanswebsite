import type { Transition } from "framer-motion";

export const easeOutExpo: Transition["ease"] = [0.22, 1, 0.36, 1];

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const revealTransition = (delay = 0): Transition => ({
  duration: 0.35,
  delay,
  ease: easeOutExpo,
});
