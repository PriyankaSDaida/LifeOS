"use client";

import { useLifeOSStore } from '@/store/useLifeOSStore';
import { Card, CardContent } from '@/components/ui/card';
import { format } from 'date-fns';
import { motion } from 'framer-motion';

const MOOD_CONFIG = {
    1: { emoji: "😢", color: "border-blue-200 bg-blue-50/50 dark:bg-blue-900/10", label: "Sad" },
    2: { emoji: "😐", color: "border-slate-200 bg-slate-50/50 dark:bg-slate-900/10", label: "Okay" },
    3: { emoji: "🙂", color: "border-green-200 bg-green-50/50 dark:bg-green-900/10", label: "Good" },
    4: { emoji: "😀", color: "border-yellow-200 bg-yellow-50/50 dark:bg-yellow-900/10", label: "Happy" },
    5: { emoji: "🤩", color: "border-purple-200 bg-purple-50/50 dark:bg-purple-900/10", label: "Grateful" },
};

export function JournalList() {
    const { journalEntries } = useLifeOSStore();

    if (journalEntries.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center text-muted-foreground py-12 bg-muted/30 rounded-xl"
            >
                <p className="text-xl font-medium mb-2">No entries yet</p>
                <p>Take a moment to write down what you're grateful for.</p>
            </motion.div>
        );
    }

    return (
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {journalEntries.map((entry, index) => {
                const moodConfig = MOOD_CONFIG[entry.mood as keyof typeof MOOD_CONFIG] || MOOD_CONFIG[3];

                return (
                    <motion.div
                        key={entry.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="break-inside-avoid"
                    >
                        <Card className={`overflow-hidden border-2 transition-all hover:shadow-md ${moodConfig.color}`}>
                            <CardContent className="p-5">
                                <div className="flex justify-between items-start mb-3">
                                    <div className="flex items-center gap-2 bg-background/50 backdrop-blur-sm px-2 py-1 rounded-full shadow-sm">
                                        <span className="text-xl" role="img" aria-label={moodConfig.label}>
                                            {moodConfig.emoji}
                                        </span>
                                        <span className="text-xs font-medium text-muted-foreground hidden sm:inline-block">
                                            {moodConfig.label}
                                        </span>
                                    </div>
                                    <span className="text-xs font-medium text-muted-foreground bg-background/50 backdrop-blur-sm px-2 py-1 rounded-full">
                                        {format(new Date(entry.createdAt), "MMM d, h:mm a")}
                                    </span>
                                </div>
                                <p className="leading-relaxed whitespace-pre-wrap text-sm sm:text-base opacity-90">
                                    {entry.content}
                                </p>
                            </CardContent>
                        </Card>
                    </motion.div>
                );
            })}
        </div>
    );
}
