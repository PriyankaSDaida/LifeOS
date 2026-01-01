import { startOfToday, subDays, isSameDay, addMinutes, isAfter, isBefore, setHours, setMinutes, getDay } from 'date-fns';
import { Event, Expense, GratitudeEntry } from '@/store/useLifeOSStore';

// --- Sentiment Analysis ---

interface SentimentSummary {
    averageMood: number;
    trend: 'improving' | 'declining' | 'stable';
    keywords: string[];
    summary: string;
}

export function analyzeSentiment(entries: GratitudeEntry[]): SentimentSummary {
    if (entries.length === 0) {
        return { averageMood: 0, trend: 'stable', keywords: [], summary: "No data yet." };
    }

    // sort by date desc
    const sorted = [...entries].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    const recent = sorted.slice(0, 7); // Last 7 entries

    const totalMood = recent.reduce((sum, e) => sum + e.mood, 0);
    const averageMood = totalMood / recent.length;

    // Trend calculation
    let trend: 'improving' | 'declining' | 'stable' = 'stable';
    if (recent.length >= 2) {
        // Compare first half vs second half of recent entries to determine trend
        // recent is desc, so recent[0] is latest
        const latest = recent.slice(0, Math.ceil(recent.length / 2));
        const older = recent.slice(Math.ceil(recent.length / 2));

        const latestAvg = latest.reduce((s, e) => s + e.mood, 0) / latest.length;
        const olderAvg = older.reduce((s, e) => s + e.mood, 0) / older.length;

        if (latestAvg > olderAvg + 0.5) trend = 'improving';
        else if (latestAvg < olderAvg - 0.5) trend = 'declining';
    }

    // Keyword extraction (very basic heuristic)
    const allText = recent.map(e => e.content.toLowerCase()).join(' ');
    const commonWords = ['happy', 'grateful', 'work', 'family', 'friends', 'stress', 'tired', 'excited', 'productive', 'calm', 'anxious'];
    const foundKeywords = commonWords.filter(word => allText.includes(word));

    // Generate summary text
    let summary = "You've been feeling generally okay.";
    if (averageMood >= 4) summary = "You've had a fantastic week! Keep up the positive momentum.";
    else if (averageMood >= 3) summary = "Your mood has been balanced. Good stability.";
    else summary = "It seems like a tough week. Remember to take time for self-care.";

    if (trend === 'improving') summary += " Things are looking up!";
    if (trend === 'declining') summary += " Take it easy, things have been a bit heavy lately.";

    return {
        averageMood,
        trend,
        keywords: foundKeywords.slice(0, 3), // Top 3
        summary
    };
}

// --- Finance Insights ---

interface FinanceInsight {
    type: 'success' | 'warning' | 'info';
    message: string;
}

export function analyzeFinances(expenses: Expense[], monthlyBudget: number): FinanceInsight {
    if (expenses.length === 0) return { type: 'info', message: "Track your expenses to get smart insights." };

    const currentMonth = new Date().getMonth();
    const currentMonthExpenses = expenses.filter(e => new Date(e.date).getMonth() === currentMonth);
    const totalSpent = currentMonthExpenses.reduce((sum, e) => sum + e.amount, 0);

    // 1. Budget Alert
    if (totalSpent > monthlyBudget) {
        return { type: 'warning', message: `You've exceeded your monthly budget by $${(totalSpent - monthlyBudget).toFixed(0)}.` };
    }
    if (totalSpent > monthlyBudget * 0.9) {
        return { type: 'warning', message: `Careful! You've used ${((totalSpent / monthlyBudget) * 100).toFixed(0)}% of your budget.` };
    }

    // 2. Category Analysis
    const categoryTotals: Record<string, number> = {};
    currentMonthExpenses.forEach(e => {
        categoryTotals[e.category] = (categoryTotals[e.category] || 0) + e.amount;
    });

    // Find highest category
    let maxCat = '';
    let maxVal = 0;
    Object.entries(categoryTotals).forEach(([cat, val]) => {
        if (val > maxVal) {
            maxVal = val;
            maxCat = cat;
        }
    });

    if (maxCat) {
        return { type: 'info', message: `Your highest spending category this month is ${maxCat} ($${maxVal.toFixed(0)}).` };
    }

    return { type: 'success', message: "You are on track with your budget. Great job!" };
}

// --- Auto-Scheduler (Magic Button) ---

export function findNextAvailableSlot(events: Event[], durationMinutes: number): Date | null {
    const workStartHour = 9;
    const workEndHour = 17;
    const now = new Date();

    // Start searching from next hour
    let searchDate = startOfToday();
    if (isSameDay(searchDate, now)) {
        searchDate = setMinutes(new Date(), 0);
        searchDate = addMinutes(searchDate, 60); // Start next hour
    }

    // Limit search to next 7 days
    for (let i = 0; i < 7; i++) {
        // Set work hours for this search day
        let dayStart = setHours(searchDate, workStartHour);
        dayStart = setMinutes(dayStart, 0);

        let dayEnd = setHours(searchDate, workEndHour);
        dayEnd = setMinutes(dayEnd, 0);

        // If today, ensure we don't start in the past
        if (isBefore(dayStart, now)) {
            dayStart = now;
            // Round up to next 30 min slot
            const minutes = dayStart.getMinutes();
            if (minutes > 30) {
                dayStart = addMinutes(dayStart, 60 - minutes);
            } else {
                dayStart = addMinutes(dayStart, 30 - minutes);
            }
        }

        // Check slots in 30 min increments
        let currentSlot = dayStart;

        while (isBefore(addMinutes(currentSlot, durationMinutes), dayEnd)) {
            const slotEnd = addMinutes(currentSlot, durationMinutes);

            // Check collision
            const hasCollision = events.some(event => {
                const eStart = new Date(event.start);
                const eEnd = new Date(event.end);

                // Check overlap logic
                return (
                    (isAfter(currentSlot, eStart) && isBefore(currentSlot, eEnd)) || // Slot starts inside event
                    (isAfter(slotEnd, eStart) && isBefore(slotEnd, eEnd)) ||       // Slot ends inside event
                    (isBefore(currentSlot, eStart) && isAfter(slotEnd, eEnd)) ||     // Slot encompasses event
                    isSameDay(currentSlot, eStart) && currentSlot.getTime() === eStart.getTime() // Exact match
                );
            });

            if (!hasCollision) {
                return currentSlot;
            }

            currentSlot = addMinutes(currentSlot, 30);
        }

        // Move to next day
        searchDate = addMinutes(searchDate, 24 * 60); // crude add day
        searchDate = setHours(searchDate, workStartHour);
    }

    return null; // No slot found
}
