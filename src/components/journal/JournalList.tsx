"use client";

import { useLifeOSStore } from '@/store/useLifeOSStore';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

export function JournalList() {
    const { journalEntries } = useLifeOSStore();

    return (
        <div className="space-y-4">
            {journalEntries.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">No entries yet. Start writing!</p>
            ) : (
                journalEntries.map((entry) => (
                    <Card key={entry.id}>
                        <CardContent className="pt-6">
                            <div className="flex justify-between items-start mb-2">
                                <div className="flex items-center gap-2">
                                    <span className="text-2xl" title="Mood">
                                        {["😢", "😐", "🙂", "😀", "🤩"][entry.mood - 1] || "🙂"}
                                    </span>
                                </div>
                                <span className="text-sm text-muted-foreground">{format(new Date(entry.createdAt), "PPP p")}</span>
                            </div>
                            <p className="whitespace-pre-wrap">{entry.content}</p>
                        </CardContent>
                    </Card>
                ))
            )}
        </div>
    );
}
