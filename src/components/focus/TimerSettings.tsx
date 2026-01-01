"use client";

import React from 'react';
import { useLifeOSStore } from '@/store/useLifeOSStore';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function TimerSettings() {
    const { pomodoroSettings, updatePomodoroSettings } = useLifeOSStore();

    return (
        <Card>
            <CardHeader>
                <CardTitle>Timer Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid gap-2">
                    <Label htmlFor="workDuration">Work Duration (minutes)</Label>
                    <Input
                        id="workDuration"
                        type="number"
                        value={pomodoroSettings.workDuration}
                        onChange={(e) => updatePomodoroSettings({ workDuration: Number(e.target.value) })}
                        min={1}
                        max={60}
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="shortBreakDuration">Short Break (minutes)</Label>
                    <Input
                        id="shortBreakDuration"
                        type="number"
                        value={pomodoroSettings.shortBreakDuration}
                        onChange={(e) => updatePomodoroSettings({ shortBreakDuration: Number(e.target.value) })}
                        min={1}
                        max={30}
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="longBreakDuration">Long Break (minutes)</Label>
                    <Input
                        id="longBreakDuration"
                        type="number"
                        value={pomodoroSettings.longBreakDuration}
                        onChange={(e) => updatePomodoroSettings({ longBreakDuration: Number(e.target.value) })}
                        min={1}
                        max={60}
                    />
                </div>
            </CardContent>
        </Card>
    );
}
