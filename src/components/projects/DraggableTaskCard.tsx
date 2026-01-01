"use client";

import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Task } from '@/store/useLifeOSStore';
import { cn } from '@/lib/utils';
import { MessageSquare } from 'lucide-react';
import { TaskDetailsDialog } from './TaskDetailsDialog';

interface DraggableTaskCardProps {
    task: Task;
}

export function DraggableTaskCard({ task }: DraggableTaskCardProps) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: task.id, data: { type: 'Task', task } });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    if (isDragging) {
        return (
            <div
                ref={setNodeRef}
                style={style}
                className={cn(
                    "p-4 rounded-lg bg-background border-2 border-primary/20 opacity-50 h-[100px]",
                )}
            />
        );
    }

    return (
        <>
            <div
                ref={setNodeRef}
                style={style}
                {...attributes}
                {...listeners}
                onClick={() => setIsDialogOpen(true)}
                className={cn(
                    "p-4 rounded-lg border shadow-sm cursor-grab active:cursor-grabbing hover:shadow-md transition-all group relative",
                    task.color || 'bg-background'
                )}
            >
                <div className="flex justify-between items-start gap-2">
                    <p className="text-sm font-medium leading-tight">{task.content}</p>
                </div>

                {task.comments && task.comments.length > 0 && (
                    <div className="flex items-center gap-1 mt-2 text-muted-foreground">
                        <MessageSquare className="w-3 h-3" />
                        <span className="text-[10px]">{task.comments.length}</span>
                    </div>
                )}
            </div>

            <TaskDetailsDialog
                taskId={task.id}
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
            />
        </>
    );
}
