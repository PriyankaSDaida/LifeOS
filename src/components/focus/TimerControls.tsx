import React from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw } from 'lucide-react';

interface TimerControlsProps {
    isRunning: boolean;
    onToggle: () => void;
    onReset: () => void;
    mode: 'work' | 'shortBreak' | 'longBreak';
    setMode: (mode: 'work' | 'shortBreak' | 'longBreak') => void;
}

export function TimerControls({ isRunning, onToggle, onReset, mode, setMode }: TimerControlsProps) {
    return (
        <div className="space-y-6">
            <div className="flex justify-center gap-2">
                <Button
                    variant={mode === 'work' ? 'default' : 'outline'}
                    onClick={() => setMode('work')}
                    className={mode === 'work' ? "bg-red-500 hover:bg-red-600 border-red-500" : ""}
                >
                    Work
                </Button>
                <Button
                    variant={mode === 'shortBreak' ? 'default' : 'outline'}
                    onClick={() => setMode('shortBreak')}
                    className={mode === 'shortBreak' ? "bg-green-500 hover:bg-green-600 border-green-500" : ""}
                >
                    Short Break
                </Button>
                <Button
                    variant={mode === 'longBreak' ? 'default' : 'outline'}
                    onClick={() => setMode('longBreak')}
                    className={mode === 'longBreak' ? "bg-blue-500 hover:bg-blue-600 border-blue-500" : ""}
                >
                    Long Break
                </Button>
            </div>

            <div className="flex justify-center gap-4">
                <Button size="lg" onClick={onToggle} className="w-32">
                    {isRunning ? (
                        <>
                            <Pause className="mr-2 h-5 w-5" /> Pause
                        </>
                    ) : (
                        <>
                            <Play className="mr-2 h-5 w-5" /> Start
                        </>
                    )}
                </Button>
                <Button size="lg" variant="outline" onClick={onReset}>
                    <RotateCcw className="h-5 w-5" />
                </Button>
            </div>
        </div>
    );
}
