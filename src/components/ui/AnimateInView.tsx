'use client';

import { motion, type Variants } from 'framer-motion';
import { viewportConfig } from '@/lib/animations';
import { cn } from '@/lib/utils';

interface AnimateInViewProps {
  children: React.ReactNode;
  variants?: Variants;
  className?: string;
  delay?: number;
  once?: boolean;
}

export default function AnimateInView({
  children,
  variants,
  className,
  delay = 0,
  once = true,
}: AnimateInViewProps) {
  const defaultVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        delay,
      },
    },
  };

  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ ...viewportConfig, once }}
      variants={variants || defaultVariants}
    >
      {children}
    </motion.div>
  );
}
