import React from 'react';
import { PomodoroTimer } from '@/components/focus/PomodoroTimer';
import { TimerSettings } from '@/components/focus/TimerSettings';

export default function FocusPage() {
    return (
        <div className="container mx-auto p-6 space-y-8 max-w-4xl">
            <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">Focus Timer</h1>
                <p className="text-muted-foreground">
                    Stay productive with focused work sessions.
                </p>
            </div>

            <div className="grid gap-8 md:grid-cols-[1fr_300px]">
                <main>
                    <PomodoroTimer />
                </main>

                <aside>
                    <TimerSettings />
                </aside>
            </div>
        </div>
    );
}
