"use client";

import { useState, useCallback } from 'react';
import { Calendar, dateFnsLocalizer, View, Views } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { useLifeOSStore, Event } from '@/store/useLifeOSStore';
import { EventDialog } from './EventDialog';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';

const locales = {
    'en-US': enUS,
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

const DnDCalendar = withDragAndDrop<Event>(Calendar);

export function CalendarView() {
    const { events, updateEvent } = useLifeOSStore();
    const [view, setView] = useState<View>(Views.WEEK);
    const [date, setDate] = useState(new Date());

    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState<{ start: Date; end: Date } | null>(null);
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

    const onEventDrop = useCallback(({ event, start, end }: any) => {
        updateEvent(event.id, { start, end });
    }, [updateEvent]);

    const onEventResize = useCallback(({ event, start, end }: any) => {
        updateEvent(event.id, { start, end });
    }, [updateEvent]);

    const handleSelectSlot = useCallback((slotInfo: { start: Date; end: Date }) => {
        setSelectedSlot(slotInfo);
        setSelectedEvent(null);
        setDialogOpen(true);
    }, []);

    const handleSelectEvent = useCallback((event: Event) => {
        setSelectedEvent(event);
        setSelectedSlot(null);
        setDialogOpen(true);
    }, []);

    const eventStyleGetter = (event: Event) => {
        const backgroundColor = event.isGoal ? '#10b981' : '#3b82f6'; // Emerald for goals, Blue for events
        return {
            style: {
                backgroundColor,
                borderRadius: '4px',
            }
        };
    };

    return (
        <div className="h-[calc(100vh-200px)] min-h-[500px]">
            <DnDCalendar
                localizer={localizer}
                events={events}
                startAccessor={(event: Event) => new Date(event.start)}
                endAccessor={(event: Event) => new Date(event.end)}
                view={view}
                onView={setView}
                date={date}
                onNavigate={setDate}
                onEventDrop={onEventDrop}
                onEventResize={onEventResize}
                onSelectSlot={handleSelectSlot}
                onSelectEvent={handleSelectEvent as any}
                selectable
                resizable
                eventPropGetter={eventStyleGetter}
                className="bg-card text-card-foreground p-4 rounded-lg shadow"
            />

            <EventDialog
                isOpen={dialogOpen}
                onClose={() => setDialogOpen(false)}
                selectedSlot={selectedSlot}
                selectedEvent={selectedEvent}
            />
        </div>
    );
}
