import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface TimerDisplayProps {
    timeLeft: number; // in seconds
    totalTime: number; // in seconds
    mode: 'work' | 'shortBreak' | 'longBreak';
}

export function TimerDisplay({ timeLeft, totalTime, mode }: TimerDisplayProps) {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const percentage = (timeLeft / totalTime) * 100;

    const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

    const getColor = () => {
        switch (mode) {
            case 'work': return '#f87171'; // Red-400
            case 'shortBreak': return '#4ade80'; // Green-400
            case 'longBreak': return '#60a5fa'; // Blue-400
            default: return '#f87171';
        }
    };

    return (
        <div className="w-64 h-64 mx-auto relative font-mono">
            <CircularProgressbar
                value={percentage}
                text={formattedTime}
                styles={buildStyles({
                    textSize: '16px',
                    pathColor: getColor(),
                    textColor: 'currentColor', // Allows theme adaptivity if parent sets color
                    trailColor: 'rgba(128,128,128, 0.2)',
                    pathTransitionDuration: 0.5,
                })}
            />
            <div className="absolute font-sans bottom-12 left-0 right-0 text-center uppercase tracking-widest text-sm text-muted-foreground font-semibold">
                {mode === 'work' ? 'Focus' : mode === 'shortBreak' ? 'Short Break' : 'Long Break'}
            </div>
        </div>
    );
}
