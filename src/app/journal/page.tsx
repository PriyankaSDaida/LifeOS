import { JournalEntryForm } from '@/components/journal/JournalEntryForm';
import { JournalList } from '@/components/journal/JournalList';
import { SentimentSummary } from '@/components/journal/SentimentSummary';

export default function JournalPage() {
    return (
        <div className="container max-w-2xl mx-auto space-y-8">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">Gratitude Journal</h1>
                <p className="text-muted-foreground">Take a moment to reflect on what matters.</p>
            </div>

            <JournalEntryForm />

            <SentimentSummary />

            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                        Past Entries
                    </span>
                </div>
            </div>

            <JournalList />
        </div>
    );
}
