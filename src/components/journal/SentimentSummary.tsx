"use client";

import { useLifeOSStore } from '@/store/useLifeOSStore';
import { analyzeSentiment } from '@/lib/ai-sim';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { motion } from 'framer-motion';

export function SentimentSummary() {
    const { journalEntries } = useLifeOSStore();
    const analysis = analyzeSentiment(journalEntries);

    if (journalEntries.length < 2) return null;

    const getTrendIcon = (trend: string) => {
        switch (trend) {
            case 'improving': return <TrendingUp className="w-4 h-4 text-green-500" />;
            case 'declining': return <TrendingDown className="w-4 h-4 text-orange-500" />;
            default: return <Minus className="w-4 h-4 text-slate-500" />;
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
        >
            <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 border-none shadow-sm mb-8">
                <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-lg font-medium text-indigo-900 dark:text-indigo-100">
                        <Sparkles className="w-5 h-5 text-indigo-500" />
                        Weekly AI Insights
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-1 space-y-2">
                            <p className="text-sm text-indigo-800/80 dark:text-indigo-200/80 leading-relaxed">
                                {analysis.summary}
                            </p>
                            <div className="flex flex-wrap gap-2 mt-3">
                                {analysis.keywords.map(word => (
                                    <span key={word} className="px-2 py-1 bg-white/50 dark:bg-white/10 rounded-md text-xs font-medium text-indigo-600 dark:text-indigo-300 capitalize">
                                        {word}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center gap-6 border-t md:border-t-0 md:border-l border-indigo-100 dark:border-indigo-800 pt-4 md:pt-0 md:pl-6">
                            <div className="text-center">
                                <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Average Mood</div>
                                <div className="text-2xl font-bold text-indigo-700 dark:text-indigo-300">
                                    {analysis.averageMood.toFixed(1)} <span className="text-sm text-muted-foreground font-normal">/ 5</span>
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Trend</div>
                                <div className="flex items-center justify-center gap-1 font-medium capitalize text-slate-700 dark:text-slate-300">
                                    {getTrendIcon(analysis.trend)}
                                    {analysis.trend}
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}
