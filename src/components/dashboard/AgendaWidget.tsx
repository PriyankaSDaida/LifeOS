"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLifeOSStore } from "@/store/useLifeOSStore";
import { format, isAfter, isToday, isTomorrow, startOfToday } from "date-fns";
import { Calendar as CalendarIcon, Clock } from "lucide-react";

export function AgendaWidget() {
    const { events } = useLifeOSStore();
    const today = startOfToday();

    // Filter for future events or today's remaining events, sorted soonest first
    const upcomingEvents = events
        .filter((event) => {
            const eventStart = new Date(event.start);
            return isAfter(eventStart, today) || isToday(eventStart);
        })
        .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())
        .slice(0, 5); // Show top 5

    const formatEventDate = (date: Date) => {
        if (isToday(date)) return "Today";
        if (isTomorrow(date)) return "Tomorrow";
        return format(date, "MMM d");
    };

    return (
        <Card className="h-full border-none shadow-none bg-transparent">
            <CardHeader className="px-0 pt-0 pb-4">
                <CardTitle className="text-lg font-medium flex items-center gap-2">
                    <CalendarIcon className="w-5 h-5 text-primary" />
                    Upcoming Agenda
                </CardTitle>
            </CardHeader>
            <CardContent className="px-0 space-y-3">
                {upcomingEvents.length === 0 ? (
                    <div className="text-center text-muted-foreground py-8">
                        <p>No upcoming events.</p>
                        <p className="text-xs">Enjoy your free time!</p>
                    </div>
                ) : (
                    upcomingEvents.map((event) => (
                        <div key={event.id} className="flex items-center gap-3 p-3 rounded-lg bg-card border shadow-sm hover:shadow-md transition-all">
                            <div className="flex-shrink-0 w-12 text-center">
                                <span className="block text-xs font-semibold text-muted-foreground uppercase">{formatEventDate(event.start)}</span>
                                <span className="block text-lg font-bold text-primary">{format(event.start, "d")}</span>
                            </div>
                            <div className="w-px h-8 bg-border" />
                            <div className="flex-1 min-w-0">
                                <p className="font-medium truncate">{event.title}</p>
                                <div className="flex items-center text-xs text-muted-foreground gap-1">
                                    <Clock className="w-3 h-3" />
                                    {format(event.start, "h:mm a")} - {format(event.end, "h:mm a")}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </CardContent>
        </Card>
    );
}
