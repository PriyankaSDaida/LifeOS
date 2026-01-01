"use client";

import { useEffect, useState } from 'react';
import { format } from 'date-fns';

import { useLifeOSStore } from '@/store/useLifeOSStore';

export function DashboardHeader() {
    const { userProfile } = useLifeOSStore();
    const [greeting, setGreeting] = useState('Good Day');
    const [date, setDate] = useState<Date | null>(null);

    useEffect(() => {
        setDate(new Date());
        const hour = new Date().getHours();
        if (hour < 12) setGreeting('Good Morning');
        else if (hour < 18) setGreeting('Good Afternoon');
        else setGreeting('Good Evening');
    }, []);

    if (!date) return <div className="h-20" />; // Prevent hydration mismatch

    return (
        <div className="flex flex-col space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">{greeting}, {userProfile.name}</h1>
            <p className="text-muted-foreground">
                Today is {format(date, 'EEEE, MMMM do, yyyy')}.
            </p>
        </div>
    );
}
