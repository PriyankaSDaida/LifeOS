"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLifeOSStore } from '@/store/useLifeOSStore';
import { Calendar, DollarSign, BookHeart } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export function DashboardStats() {
    const { events, expenses, journalEntries, monthlyBudget } = useLifeOSStore();

    const eventsToday = events.filter(e => {
        const today = new Date();
        const eventDate = new Date(e.start);
        return eventDate.getDate() === today.getDate() &&
            eventDate.getMonth() === today.getMonth() &&
            eventDate.getFullYear() === today.getFullYear();
    });

    const currentMonthExpenses = expenses.reduce((acc, curr) => {
        const today = new Date();
        const expenseDate = new Date(curr.date);
        if (expenseDate.getMonth() === today.getMonth() && expenseDate.getFullYear() === today.getFullYear()) {
            return acc + curr.amount;
        }
        return acc;
    }, 0);

    const budgetProgress = Math.min((currentMonthExpenses / monthlyBudget) * 100, 100);

    const journalEntriesCount = journalEntries.length;

    return (
        <div className="grid gap-6 md:grid-cols-3">
            <Card className="hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-sky-500">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Events Today</CardTitle>
                    <div className="h-8 w-8 rounded-full bg-sky-100 dark:bg-sky-900/20 flex items-center justify-center">
                        <Calendar className="h-4 w-4 text-sky-600 dark:text-sky-400" />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{eventsToday.length}</div>
                    <p className="text-xs text-muted-foreground">
                        {eventsToday.filter(e => e.isGoal).length} goals aimed for today.
                    </p>
                </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-emerald-500">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Monthly Budget</CardTitle>
                    <div className="h-8 w-8 rounded-full bg-emerald-100 dark:bg-emerald-900/20 flex items-center justify-center">
                        <DollarSign className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">${currentMonthExpenses.toFixed(2)}</div>
                    <Progress value={budgetProgress} className="mt-2 h-2" indicatorClassName={budgetProgress > 100 ? "bg-destructive" : "bg-emerald-500"} />
                    <p className="text-xs text-muted-foreground mt-1">
                        {budgetProgress.toFixed(0)}% of ${monthlyBudget} budget used.
                    </p>
                </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-purple-500">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Journal Entries</CardTitle>
                    <div className="h-8 w-8 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
                        <BookHeart className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{journalEntriesCount}</div>
                    <p className="text-xs text-muted-foreground">
                        Total memories saved.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
