"use client";

import React, { useState } from 'react';
import { useLifeOSStore, Task } from '@/store/useLifeOSStore';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Send, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";


interface TaskDetailsDialogProps {
    taskId: string | null;
    isOpen: boolean;
    onClose: () => void;
}

const COLORS = [
    { label: 'White', value: 'bg-white' },
    { label: 'Red', value: 'bg-red-100' },
    { label: 'Orange', value: 'bg-orange-100' },
    { label: 'Yellow', value: 'bg-yellow-100' },
    { label: 'Green', value: 'bg-green-100' },
    { label: 'Blue', value: 'bg-blue-100' },
    { label: 'Purple', value: 'bg-purple-100' },
    { label: 'Pink', value: 'bg-pink-100' },
];

export function TaskDetailsDialog({ taskId, isOpen, onClose }: TaskDetailsDialogProps) {
    const [comment, setComment] = useState('');
    const task = useLifeOSStore((state) =>
        taskId ? state.board.tasks[taskId] : null
    );

    const addComment = useLifeOSStore((state) => state.addComment);
    const updateTaskColor = useLifeOSStore((state) => state.updateTaskColor);

    if (!task) return null;

    const handleAddComment = (e: React.FormEvent) => {
        e.preventDefault();
        if (!comment.trim() || !taskId) return;
        addComment(taskId, comment);
        setComment('');
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold">{task.content}</DialogTitle>
                    <VisuallyHidden.Root>
                        <DialogDescription>
                            Details and comments for task {task.content}
                        </DialogDescription>
                    </VisuallyHidden.Root>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                        <h4 className="font-medium text-sm text-muted-foreground">Color Label</h4>
                        <div className="flex gap-2 flex-wrap">
                            {COLORS.map((color) => (
                                <button
                                    key={color.value}
                                    className={cn(
                                        "w-6 h-6 rounded-full border border-black/10 transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                                        color.value,
                                        task.color === color.value && "ring-2 ring-ring ring-offset-2"
                                    )}
                                    onClick={() => updateTaskColor(task.id, color.value)}
                                    title={color.label}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h4 className="font-medium text-sm text-muted-foreground flex items-center gap-2">
                            <MessageSquare className="w-4 h-4" />
                            Comments
                        </h4>

                        <div className="bg-muted/30 rounded-lg p-3 max-h-[200px] overflow-y-auto space-y-3">
                            {task.comments.length === 0 ? (
                                <p className="text-xs text-muted-foreground italic">No comments yet.</p>
                            ) : (
                                task.comments.map((c) => (
                                    <div key={c.id} className="bg-background p-2 rounded shadow-sm text-sm">
                                        <p>{c.content}</p>
                                        <p className="text-[10px] text-muted-foreground mt-1 text-right">
                                            {new Date(c.createdAt).toLocaleDateString()} {new Date(c.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </p>
                                    </div>
                                ))
                            )}
                        </div>

                        <form onSubmit={handleAddComment} className="flex gap-2">
                            <Input
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Add a comment..."
                                className="flex-1"
                            />
                            <Button type="submit" size="icon" disabled={!comment.trim()}>
                                <Send className="w-4 h-4" />
                            </Button>
                        </form>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
