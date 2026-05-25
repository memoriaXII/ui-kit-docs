import { Variants } from "framer-motion";
import { useRef } from "react";

interface AnimationVariantsOptions {
  staggerChildren?: number;
  delayChildren?: number;
  itemYOffset?: number;
  stiffness?: number;
  damping?: number;
}

export const useAnimationVariants = (options?: AnimationVariantsOptions) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const {
    staggerChildren = 0.14,
    delayChildren = 0.3,
    itemYOffset = 30,
    stiffness = 300,
    damping = 24,
  } = options || {};

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren,
        delayChildren,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: itemYOffset },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness,
        damping,
      },
    },
  };

  return {
    containerRef,
    containerVariants,
    itemVariants,
  };
};
