"use client";

import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
// Wait, I missed installing checkbox component from shadcn. I'll use standard input.
import { useLifeOSStore, Event } from '@/store/useLifeOSStore';
import { v4 as uuidv4 } from 'uuid';

interface EventDialogProps {
    isOpen: boolean;
    onClose: () => void;
    selectedSlot: { start: Date; end: Date } | null;
    selectedEvent: Event | null;
}

export function EventDialog({ isOpen, onClose, selectedSlot, selectedEvent }: EventDialogProps) {
    const { addEvent, updateEvent, deleteEvent } = useLifeOSStore();
    const [title, setTitle] = useState('');
    const [isGoal, setIsGoal] = useState(false);
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');

    useEffect(() => {
        if (selectedEvent) {
            setTitle(selectedEvent.title);
            setIsGoal(selectedEvent.isGoal);
            // Format for datetime-local input: YYYY-MM-DDTHH:mm
            setStart(selectedEvent.start.toISOString().slice(0, 16));
            setEnd(selectedEvent.end.toISOString().slice(0, 16));
        } else if (selectedSlot) {
            setTitle('');
            setIsGoal(false);
            setStart(selectedSlot.start.toISOString().slice(0, 16));
            setEnd(selectedSlot.end.toISOString().slice(0, 16));
        }
    }, [selectedEvent, selectedSlot, isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const startTime = new Date(start);
        const endTime = new Date(end);

        if (selectedEvent) {
            updateEvent(selectedEvent.id, {
                title,
                isGoal,
                start: startTime,
                end: endTime,
            });
        } else {
            addEvent({
                id: uuidv4(),
                title,
                isGoal,
                isCompleted: false,
                start: startTime,
                end: endTime,
            });
        }
        onClose();
    };

    const handleDelete = () => {
        if (selectedEvent) {
            deleteEvent(selectedEvent.id);
            onClose();
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{selectedEvent ? 'Edit Event' : 'Add New Event'}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="title">Title</Label>
                        <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="start">Start</Label>
                            <Input
                                id="start"
                                type="datetime-local"
                                value={start}
                                onChange={(e) => setStart(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="end">End</Label>
                            <Input
                                id="end"
                                type="datetime-local"
                                value={end}
                                onChange={(e) => setEnd(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            id="isGoal"
                            checked={isGoal}
                            onChange={(e) => setIsGoal(e.target.checked)}
                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <Label htmlFor="isGoal">Mark as Goal</Label>
                    </div>

                    <DialogFooter className="flex justify-between sm:justify-between">
                        {selectedEvent ? (
                            <Button type="button" variant="destructive" onClick={handleDelete}>Delete</Button>
                        ) : <div />}
                        <div className="flex gap-2">
                            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
                            <Button type="submit">Save</Button>
                        </div>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
