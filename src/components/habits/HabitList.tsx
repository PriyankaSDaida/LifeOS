"use client";

import React from 'react';
import { useLifeOSStore, Habit } from '@/store/useLifeOSStore';
import { Button } from '@/components/ui/button';
import { Check, Trash2, X } from 'lucide-react';
import { format, isSameDay, startOfToday } from 'date-fns';
import { cn } from '@/lib/utils';
import { StreakCounter } from './StreakCounter';
import { ContributionGraph } from './ContributionGraph';

function HabitItem({ habit }: { habit: Habit }) {
    const toggleHabitCompletion = useLifeOSStore(state => state.toggleHabitCompletion);
    const deleteHabit = useLifeOSStore(state => state.deleteHabit);
    const today = startOfToday();
    const isCompletedToday = habit.completedDates.some(d => isSameDay(d, today));

    return (
        <div className="border rounded-lg p-4 bg-card space-y-4">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="font-semibold text-lg">{habit.title}</h3>
                    <p className="text-sm text-muted-foreground capitalize">{habit.frequency}</p>
                </div>
                <div className="flex items-center gap-2">
                    <StreakCounter streak={habit.streak} />
                    <Button variant="ghost" size="icon" onClick={() => deleteHabit(habit.id)} className="text-destructive hover:text-destructive/90">
                        <Trash2 className="w-5 h-5" />
                    </Button>
                </div>
            </div>

            <div className="flex items-center justify-between">
                <Button
                    variant={isCompletedToday ? "default" : "outline"}
                    className={cn("w-full sm:w-auto", isCompletedToday && "bg-green-600 hover:bg-green-700")}
                    onClick={() => toggleHabitCompletion(habit.id, today)}
                >
                    {isCompletedToday ? (
                        <>
                            <Check className="mr-2 h-4 w-4" /> Completed Today
                        </>
                    ) : (
                        "Mark as Done"
                    )}
                </Button>
            </div>

            <ContributionGraph completedDates={habit.completedDates} className="mt-4 border-t pt-4" />
        </div>
    );
}

export function HabitList() {
    const habits = useLifeOSStore(state => state.habits);

    if (habits.length === 0) {
        return (
            <div className="text-center py-10 text-muted-foreground">
                No habits tracked yet. Start today!
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {habits.map(habit => (
                <HabitItem key={habit.id} habit={habit} />
            ))}
        </div>
    );
}
