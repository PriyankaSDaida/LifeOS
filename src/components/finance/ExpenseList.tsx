"use client";

import { useLifeOSStore } from '@/store/useLifeOSStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

export function ExpenseList() {
    const { expenses, deleteExpense } = useLifeOSStore();

    const total = expenses.reduce((sum, item) => sum + item.amount, 0);

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex justify-between items-center">
                    <span>Recent Transactions</span>
                    <span className="text-xl">Total: ${total.toFixed(2)}</span>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-muted-foreground uppercase bg-muted/50">
                            <tr>
                                <th className="px-4 py-3 rounded-l-lg">Date</th>
                                <th className="px-4 py-3">Category</th>
                                <th className="px-4 py-3">Note</th>
                                <th className="px-4 py-3 text-right">Amount</th>
                                <th className="px-4 py-3 rounded-r-lg"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {expenses.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map(expense => (
                                <tr key={expense.id} className="border-b last:border-0 hover:bg-muted/50 transition-colors">
                                    <td className="px-4 py-3 font-medium whitespace-nowrap">
                                        {format(new Date(expense.date), 'MMM d')}
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                                            {expense.category}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-muted-foreground w-1/3 break-words">
                                        {expense.description || "-"}
                                    </td>
                                    <td className="px-4 py-3 text-right font-bold">
                                        ${expense.amount.toFixed(2)}
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => deleteExpense(expense.id)}
                                            className="h-8 w-8 text-destructive hover:text-destructive/90 rounded-full"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>
    );
}
