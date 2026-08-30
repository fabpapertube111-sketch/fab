'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { fadeUp, viewportConfig } from '@/lib/animations';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  highlight?: string;
  description?: string;
  align?: 'left' | 'center' | 'right';
  theme?: 'light' | 'dark';
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  highlight,
  description,
  align = 'center',
  theme = 'light',
  className,
}: SectionHeadingProps) {
  const alignClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end',
  };

  const isDark = theme === 'dark';

  return (
    <motion.div
      className={cn('flex flex-col gap-3', alignClasses[align], className)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.12 } },
      }}
    >
      {eyebrow && (
        <motion.span
          variants={fadeUp}
          className={cn(
            'text-xs font-bold tracking-[0.2em] uppercase',
            isDark ? 'text-[#c8922a]' : 'text-[#c8922a]'
          )}
        >
          {eyebrow}
        </motion.span>
      )}

      <motion.h2
        variants={fadeUp}
        className={cn(
          'text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight',
          isDark ? 'text-white' : 'text-[#1a1a1a]'
        )}
      >
        {highlight ? (
          <>
            {title.split(highlight)[0]}
            <span className="text-[#c8922a]">{highlight}</span>
            {title.split(highlight)[1]}
          </>
        ) : (
          title
        )}
      </motion.h2>

      {description && (
        <motion.p
          variants={fadeUp}
          className={cn(
            'text-base md:text-lg leading-relaxed max-w-2xl',
            isDark ? 'text-gray-300' : 'text-[#6b6b6b]',
            align === 'center' && 'mx-auto'
          )}
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}
