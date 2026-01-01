import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Quote } from 'lucide-react';

export function QuoteCard() {
    return (
        <Card className="h-full bg-gradient-to-br from-amber-50 to-white dark:from-amber-950/20 dark:to-background border-amber-200 dark:border-amber-800 transition-all hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-amber-900 dark:text-amber-100">Quote of the Day</CardTitle>
                <div className="h-8 w-8 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                    <Quote className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                </div>
            </CardHeader>
            <CardContent>
                <div className="relative pt-4">
                    <Quote className="absolute -top-1 -left-1 h-6 w-6 text-amber-200 dark:text-amber-800 opacity-50 rotate-180" />
                    <blockquote className="pl-6 italic text-muted-foreground leading-relaxed font-serif text-lg">
                        "The only way to do great work is to love what you do."
                    </blockquote>
                    <p className="mt-4 text-right text-sm font-semibold text-amber-700 dark:text-amber-300">- Steve Jobs</p>
                </div>
            </CardContent>
        </Card>
    );
}
