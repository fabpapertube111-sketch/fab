'use client';

import { forwardRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  external?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      variant = 'primary',
      size = 'md',
      href,
      external,
      icon,
      iconPosition = 'right',
      loading,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center gap-2 font-semibold tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed select-none';

    const variants = {
      primary:
        'bg-[#c8922a] text-white hover:bg-[#a67520] focus-visible:ring-[#c8922a] shadow-md hover:shadow-lg hover:-translate-y-0.5',
      secondary:
        'bg-white text-[#1a1a1a] hover:bg-[#f5f4f0] focus-visible:ring-[#1a1a1a] border border-[#e5e5e5] shadow-sm hover:shadow-md hover:-translate-y-0.5',
      outline:
        'bg-transparent border-2 border-[#c8922a] text-[#c8922a] hover:bg-[#c8922a] hover:text-white focus-visible:ring-[#c8922a]',
      ghost:
        'bg-transparent text-[#c8922a] hover:bg-[#c8922a]/10 focus-visible:ring-[#c8922a]',
      dark:
        'bg-[#1a1a1a] text-white hover:bg-[#2d2d2d] focus-visible:ring-[#1a1a1a] shadow-md hover:shadow-lg hover:-translate-y-0.5',
    };

    const sizes = {
      sm: 'px-4 py-2 text-sm rounded',
      md: 'px-6 py-3 text-sm rounded-sm',
      lg: 'px-8 py-4 text-base rounded-sm',
    };

    const classes = cn(baseStyles, variants[variant], sizes[size], className);

    const content = (
      <>
        {loading && (
          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        )}
        {icon && iconPosition === 'left' && !loading && (
          <span className="flex-shrink-0">{icon}</span>
        )}
        <span>{children}</span>
        {icon && iconPosition === 'right' && !loading && (
          <span className="arrow-icon flex-shrink-0 transition-transform duration-300">{icon}</span>
        )}
      </>
    );

    if (href) {
      return (
        <Link
          href={href}
          target={external ? '_blank' : undefined}
          rel={external ? 'noopener noreferrer' : undefined}
          className={classes}
        >
          {content}
        </Link>
      );
    }

    return (
      <button ref={ref} className={classes} disabled={disabled || loading} {...props}>
        {content}
      </button>
    );
  }
);

Button.displayName = 'Button';

// Motion-wrapped button for animation contexts
export const MotionButton = motion(Button);

export default Button;
