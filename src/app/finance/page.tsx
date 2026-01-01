import { ExpenseForm } from '@/components/finance/ExpenseForm';
import { BudgetChart } from '@/components/finance/BudgetChart';
import { ExpenseList } from '@/components/finance/ExpenseList';

export default function FinancePage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Financial Tracker</h1>
            </div>

            <div className="grid gap-6 md:grid-cols-2 max-w-5xl mx-auto">
                <div className="space-y-6">
                    <ExpenseForm />
                    <BudgetChart />
                </div>
                <div>
                    <ExpenseList />
                </div>
            </div>
        </div>
    );
}
