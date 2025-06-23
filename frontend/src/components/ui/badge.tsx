'use client';

import { cva, VariantProps } from 'class-variance-authority';
import React from 'react';

const badgeVariants = cva(
    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
    {
        variants: {
            variant: {
                default: 'bg-gray-100 text-gray-800',
                destructive: 'bg-red-100 text-red-800',
                secondary: 'bg-yellow-100 text-yellow-800',
                outline: 'border border-gray-300 text-gray-700',
            },
            size: {
                sm: 'px-2 text-[10px]',
                md: '',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'md',
        },
    }
);

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> { }

export function Badge({ className, variant, size, ...props }: BadgeProps) {
    return <span className={badgeVariants({ variant, size, className })} {...props} />;
}
