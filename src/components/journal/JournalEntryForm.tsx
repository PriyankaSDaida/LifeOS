"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useLifeOSStore } from '@/store/useLifeOSStore';
import { Star } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export function JournalEntryForm() {
    const { addGratitudeEntry } = useLifeOSStore();
    const [content, setContent] = useState('');
    const [mood, setMood] = useState(3);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!content.trim()) return;

        addGratitudeEntry({
            id: uuidv4(),
            content,
            mood,
            createdAt: new Date(),
        });

        setContent('');
        setMood(3);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>New Entry</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label>How are you feeling?</Label>
                        <div className="flex gap-4">
                            {[
                                { value: 1, emoji: "😢", label: "Sad" },
                                { value: 2, emoji: "😐", label: "Okay" },
                                { value: 3, emoji: "🙂", label: "Good" },
                                { value: 4, emoji: "😀", label: "Happy" },
                                { value: 5, emoji: "🤩", label: "Grteful" },
                            ].map((item) => (
                                <button
                                    key={item.value}
                                    type="button"
                                    onClick={() => setMood(item.value)}
                                    className={cn(
                                        "text-2xl focus:outline-none transition-all hover:scale-125 p-2 rounded-full",
                                        mood === item.value ? "bg-primary/10 scale-125" : "opacity-50 hover:opacity-100"
                                    )}
                                    title={item.label}
                                >
                                    {item.emoji}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="content">What are you grateful for today?</Label>
                        <Textarea
                            id="content"
                            placeholder="I am grateful for..."
                            className="resize-none h-32"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                        />
                    </div>

                    <Button type="submit" className="w-full">
                        Save Entry
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
