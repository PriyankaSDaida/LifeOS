"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLifeOSStore } from "@/store/useLifeOSStore";
import { analyzeFinances } from '@/lib/ai-sim';
import { Sparkles, DollarSign } from 'lucide-react';
import { useMemo } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

const COLORS = ['#8b5cf6', '#d946ef', '#0ea5e9', '#f59e0b', '#10b981'];

export function ExpenseWidget() {
    const { expenses, monthlyBudget } = useLifeOSStore();

    // AI Insight Calculation
    const insight = useMemo(() => analyzeFinances(expenses, monthlyBudget), [expenses, monthlyBudget]);

    const data = useMemo(() => {
        const categoryTotals: Record<string, number> = {};

        expenses.forEach((expense) => {
            if (categoryTotals[expense.category]) {
                categoryTotals[expense.category] += expense.amount;
            } else {
                categoryTotals[expense.category] = expense.amount;
            }
        });

        return Object.entries(categoryTotals).map(([name, value]) => ({
            name,
            value,
        }));
    }, [expenses]);

    const totalSpent = data.reduce((acc, curr) => acc + curr.value, 0);

    return (
        <Card className="h-full border-none shadow-none bg-transparent flex flex-col relative group">
            {/* AI Insight Overlay - Visible on mount if data exists */}
            {expenses.length > 0 && (
                <div className="absolute top-0 right-0 z-10">
                    <div className={`
                  border rounded-full px-2 py-1 flex items-center gap-1.5 shadow-sm backdrop-blur-sm
                  ${insight.type === 'warning'
                            ? 'bg-amber-50 dark:bg-amber-950/30 border-amber-100 dark:border-amber-800 text-amber-700 dark:text-amber-400'
                            : 'bg-indigo-50 dark:bg-indigo-950/30 border-indigo-100 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300'
                        }
              `}>
                        <Sparkles className="w-3 h-3" />
                        <span className="text-[10px] font-medium">
                            AI Insight
                        </span>
                    </div>
                </div>
            )}

            <CardHeader className="px-0 pt-0 pb-2">
                <CardTitle className="text-lg font-medium flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <DollarSign className="w-5 h-5 text-primary" />
                        Expense Trends
                    </div>
                    <span className="text-sm font-normal text-muted-foreground">
                        Total: ${totalSpent.toLocaleString()}
                    </span>
                </CardTitle>
            </CardHeader>

            <CardContent className="px-0 flex-1 min-h-0 flex flex-col">
                {data.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                        <p>No expenses recorded.</p>
                        <p className="text-xs">Add an expense to see insights.</p>
                    </div>
                ) : (
                    <>
                        <div className="flex-1 min-h-0">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={data}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={40}
                                        outerRadius={60}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {data.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        formatter={(value: number) => [`$${value}`, 'Amount']}
                                        contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '8px', border: '1px solid hsl(var(--border))' }}
                                        itemStyle={{ color: 'hsl(var(--foreground))' }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Insight Text displayed below chart */}
                        <div className="mt-1 text-[10px] sm:text-xs text-center px-3 py-2 bg-muted/40 rounded-lg text-muted-foreground leading-tight">
                            {insight.message}
                        </div>
                    </>
                )}
            </CardContent>
        </Card>
    );
}
