import React from 'react';
import { Flame } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StreakCounterProps {
    streak: number;
    className?: string;
}

export function StreakCounter({ streak, className }: StreakCounterProps) {
    return (
        <div className={cn("flex items-center gap-1 text-orange-500 font-bold", className)}>
            <Flame className={cn("w-5 h-5", streak > 0 && "fill-orange-500 animate-pulse")} />
            <span>{streak}</span>
            <span className="text-sm font-normal text-muted-foreground ml-1">days</span>
        </div>
    );
}
