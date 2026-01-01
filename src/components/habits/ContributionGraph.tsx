"use client";

import React, { useMemo } from 'react';
import { eachDayOfInterval, subDays, startOfToday, isSameDay, format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface ContributionGraphProps {
    completedDates: Date[];
    className?: string;
}

export function ContributionGraph({ completedDates, className }: ContributionGraphProps) {
    const today = startOfToday();
    const startDate = subDays(today, 364); // Show last year

    const days = useMemo(() => {
        return eachDayOfInterval({ start: startDate, end: today });
    }, [startDate, today]);

    const getIntensity = (date: Date) => {
        return completedDates.some((d) => isSameDay(d, date)) ? 'bg-green-500' : 'bg-muted';
    };

    return (
        <div className={cn("overflow-x-auto p-4", className)}>
            <div className="flex gap-1 min-w-max">
                <div className="grid grid-rows-7 grid-flow-col gap-1">
                    {days.map((day) => (
                        <TooltipProvider key={day.toISOString()}>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <div
                                        className={cn(
                                            "w-3 h-3 rounded-sm transition-colors",
                                            getIntensity(day)
                                        )}
                                    />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>{format(day, 'MMM d, yyyy')}</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    ))}
                </div>
            </div>
        </div>
    );
}
