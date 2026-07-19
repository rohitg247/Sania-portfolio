import * as React from 'react';
import { cn } from '@/lib/utils';

const Input = React.forwardRef(({ className, type = 'text', ...props }, ref) => (
  <input
    type={type}
    ref={ref}
    className={cn(
      'flex min-h-11 w-full rounded-xl border border-input bg-background/60 px-4 py-3 text-base ring-offset-background transition-colors placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 disabled:cursor-not-allowed disabled:opacity-50',
      className
    )}
    {...props}
  />
));
Input.displayName = 'Input';

export { Input };
