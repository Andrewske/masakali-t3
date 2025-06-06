import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '~/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap text-xl font-medium border border-purple ring-offset-white uppercase font-montserrat text-xl mx-auto cursor-pointer text-center transition-colors duration-50  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300',
  {
    variants: {
      variant: {
        default: '',
        isWhite:
          'bg-white text-purple [&:hover]:bg-purple [&:hover]:text-white [&:hover]:border-white',
        isPurple:
          'bg-purple text-white [&:hover]:bg-white [&:hover]:text-purple',
        isLoading:
          'uppercase font-montserrat text-xl mx-auto text-center transition-colors duration-50 bg-gray-400 text-white !cursor-progress',
        disabled:
          '!bg-red-100 text-slate-900 hover:bg-slate-100/80 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-800/80',
        outline:
          'bg-white text-purple border-gray-300 hover:bg-gray-100 hover:border-white gap-4 !px-2 !mx-0 text-md',
      },
      size: {
        default: 'px-8 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'isWhite',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
