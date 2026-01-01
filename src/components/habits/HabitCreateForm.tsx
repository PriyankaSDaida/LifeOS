"use client";

import React, { useState } from 'react';
import { useLifeOSStore } from '@/store/useLifeOSStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function HabitCreateForm() {
    const [title, setTitle] = useState('');
    const [frequency, setFrequency] = useState<'daily' | 'weekly'>('daily');
    const addHabit = useLifeOSStore((state) => state.addHabit);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;
        addHabit(title, frequency);
        setTitle('');
        setFrequency('daily');
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4 border rounded-lg bg-card">
            <div className="grid gap-2">
                <Label htmlFor="title">Habit Name</Label>
                <Input
                    id="title"
                    placeholder="e.g. Read 30 minutes"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="frequency">Frequency</Label>
                <Select value={frequency} onValueChange={(val: 'daily' | 'weekly') => setFrequency(val)}>
                    <SelectTrigger id="frequency">
                        <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <Button type="submit">Add Habit</Button>
        </form>
    );
}
