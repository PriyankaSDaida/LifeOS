import { CalendarView } from '@/components/planner/CalendarView';

export default function CalendarPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Planner</h1>
            </div>
            <CalendarView />
        </div>
    );
}
