"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLifeOSStore } from "@/store/useLifeOSStore";
import { DollarSign } from "lucide-react";
import { useMemo } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, Legend } from "recharts";

const COLORS = ['#8b5cf6', '#d946ef', '#0ea5e9', '#f59e0b', '#10b981'];

export function ExpenseWidget() {
    const { expenses } = useLifeOSStore();

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
        <Card className="h-full border-none shadow-none bg-transparent flex flex-col">
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
            <CardContent className="px-0 flex-1 min-h-0">
                {data.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                        <p>No expenses recorded.</p>
                        <p className="text-xs">Add an expense to see insights.</p>
                    </div>
                ) : (
                    <div className="h-full w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={data}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={50}
                                    outerRadius={70}
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
                                <Legend
                                    layout="vertical"
                                    verticalAlign="middle"
                                    align="right"
                                    wrapperStyle={{ fontSize: '12px' }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
