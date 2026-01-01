"use client";

import { useEffect, useState } from 'react';
import { useLifeOSStore } from '@/store/useLifeOSStore';
import { Bell, BellOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

export function NotificationManager() {
    const [permission, setPermission] = useState<NotificationPermission>('default');
    const habits = useLifeOSStore((state) => state.habits);
    const journalEntries = useLifeOSStore((state) => state.journalEntries);

    useEffect(() => {
        if (typeof window !== 'undefined' && 'Notification' in window) {
            setPermission(Notification.permission);
        }
    }, []);

    const requestPermission = async () => {
        if (!('Notification' in window)) return;
        const result = await Notification.requestPermission();
        setPermission(result);
        if (result === 'granted') {
            new Notification('LifeOS Notifications Enabled', {
                body: 'You will now receive reminders for your habits and journal.',
                icon: '/icon-192x192.png'
            });
        }
    };

    useEffect(() => {
        if (permission !== 'granted') return;

        // Check for reminders every minute
        const checkReminders = () => {
            const now = new Date();
            const currentHour = now.getHours();

            // Mock Logic: In real app, this would run in a service worker or be smarter.
            // Here we just check on client load/interval for demo purposes.

            // Journal Reminder (e.g., after 8 PM)
            const hasJournaledToday = journalEntries.some(entry =>
                new Date(entry.createdAt).toDateString() === now.toDateString()
            );

            if (currentHour >= 20 && !hasJournaledToday) {
                // Debounce or check if already notified logic would go here
                // For now, simpler: user clicks a button to "Check Notifications" or we run it on mount once
            }
        };

        // Run once on mount for demo
        // checkReminders();

        // Set interval 
        const interval = setInterval(checkReminders, 60000);
        return () => clearInterval(interval);
    }, [permission, journalEntries, habits]);


    // Helper to trigger manual check (for demo/verification)
    const triggerCheck = () => {
        if (permission !== 'granted') {
            requestPermission();
            return;
        }

        new Notification('LifeOS Check-in', {
            body: `You have ${habits.length} habits to track today!`,
            icon: '/icon-192x192.png'
        });
    };

    if (permission === 'denied') {
        return null; // Or show settings instructions
    }

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={triggerCheck}
                        className={permission === 'granted' ? "text-primary" : "text-muted-foreground"}
                    >
                        {permission === 'granted' ? <Bell className="w-5 h-5" /> : <BellOff className="w-5 h-5" />}
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{permission === 'granted' ? 'Notifications Active (Click to Test)' : 'Enable Notifications'}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
