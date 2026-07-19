import * as React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold ring-offset-background transition-all active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        gradient: 'gradient-primary text-white shadow-soft hover:-translate-y-0.5 hover:shadow-glow',
        outline:
          'border-2 border-primary/60 bg-transparent text-foreground hover:-translate-y-0.5 hover:border-primary hover:shadow-glow',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
      },
      size: {
        // min-h-11 == 44px, the mobile touch-target floor.
        default: 'min-h-11 px-6 py-3',
        lg: 'min-h-12 px-8 py-3.5 text-base',
        icon: 'h-11 w-11',
      },
    },
    defaultVariants: { variant: 'gradient', size: 'default' },
  }
);

const Button = React.forwardRef(({ className, variant, size, ...props }, ref) => (
  <button ref={ref} className={cn(buttonVariants({ variant, size, className }))} {...props} />
));
Button.displayName = 'Button';

export { Button, buttonVariants };
