"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useLifeOSStore } from '@/store/useLifeOSStore';
import { TimerDisplay } from './TimerDisplay';
import { TimerControls } from './TimerControls';
import { Card, CardContent } from '@/components/ui/card';

type Mode = 'work' | 'shortBreak' | 'longBreak';

export function PomodoroTimer() {
    const settings = useLifeOSStore((state) => state.pomodoroSettings);

    const [mode, setMode] = useState<Mode>('work');
    const [timeLeft, setTimeLeft] = useState(settings.workDuration * 60);
    const [isRunning, setIsRunning] = useState(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    // Update timer when settings change or mode changes
    useEffect(() => {
        // Only reset if not running to avoid disrupting active sessions abruptly?
        // Usually changing settings or mode resets the timer.
        resetTimer(mode);
    }, [settings, mode]); // eslint-disable-line react-hooks/exhaustive-deps

    const resetTimer = (currentMode: Mode) => {
        setIsRunning(false);
        if (timerRef.current) clearInterval(timerRef.current);

        let duration = settings.workDuration;
        if (currentMode === 'shortBreak') duration = settings.shortBreakDuration;
        if (currentMode === 'longBreak') duration = settings.longBreakDuration;

        setTimeLeft(duration * 60);
    };

    const handleModeChange = (newMode: Mode) => {
        setMode(newMode);
        // useEffect will handle reset
    };

    const toggleTimer = () => {
        if (isRunning) {
            setIsRunning(false);
            if (timerRef.current) clearInterval(timerRef.current);
        } else {
            setIsRunning(true);
            timerRef.current = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        setIsRunning(false);
                        if (timerRef.current) clearInterval(timerRef.current);
                        // Could add sound notification here
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
    };

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        }
    }, []);

    const totalTime = (mode === 'work' ? settings.workDuration : mode === 'shortBreak' ? settings.shortBreakDuration : settings.longBreakDuration) * 60;

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardContent className="pt-6">
                <TimerDisplay timeLeft={timeLeft} totalTime={totalTime} mode={mode} />
                <div className="mt-8">
                    <TimerControls
                        isRunning={isRunning}
                        onToggle={toggleTimer}
                        onReset={() => resetTimer(mode)}
                        mode={mode}
                        setMode={handleModeChange}
                    />
                </div>
            </CardContent>
        </Card>
    );
}
