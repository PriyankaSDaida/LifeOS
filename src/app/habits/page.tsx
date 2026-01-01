import React from 'react';
import { HabitCreateForm } from '@/components/habits/HabitCreateForm';
import { HabitList } from '@/components/habits/HabitList';
import { Separator } from '@/components/ui/separator';

export default function HabitsPage() {
    return (
        <div className="container mx-auto p-6 space-y-8 max-w-4xl">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">Habit Tracker</h1>
                <p className="text-muted-foreground">
                    Build better streaks and track your daily progress.
                </p>
            </div>

            <div className="grid gap-8 md:grid-cols-[350px_1fr]">
                <aside className="space-y-6">
                    <div className="p-4 border rounded-lg bg-card text-card-foreground shadow-sm">
                        <h2 className="font-semibold mb-4">New Habit</h2>
                        <HabitCreateForm />
                    </div>
                </aside>

                <main className="space-y-6">
                    <h2 className="text-xl font-semibold">Your Habits</h2>
                    <Separator />
                    <HabitList />
                </main>
            </div>
        </div>
    );
}
