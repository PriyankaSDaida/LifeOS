"use client";

import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Column, Task, useLifeOSStore } from '@/store/useLifeOSStore';
import { DraggableTaskCard } from './DraggableTaskCard';
import { Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface BoardColumnProps {
    column: Column;
    tasks: Task[];
}

export function BoardColumn({ column, tasks }: BoardColumnProps) {
    const [isAdding, setIsAdding] = useState(false);
    const [newTaskContent, setNewTaskContent] = useState('');
    const addTask = useLifeOSStore((state) => state.addTask);

    const { setNodeRef } = useSortable({
        id: column.id,
        data: {
            type: 'Column',
            column,
        },
    });

    const handleAddTask = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTaskContent.trim()) return;
        addTask(column.id, newTaskContent);
        setNewTaskContent('');
        setIsAdding(false);
    };

    return (
        <div ref={setNodeRef} className="bg-secondary/30 p-4 rounded-xl w-[300px] flex flex-col gap-4 h-full max-h-full">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">{column.title}</h3>
                    <span className="bg-secondary text-secondary-foreground text-xs px-2 py-0.5 rounded-full font-medium">
                        {tasks.length}
                    </span>
                </div>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 ml-auto hover:bg-background/50"
                    onClick={() => setIsAdding(!isAdding)}
                >
                    <Plus className="w-4 h-4" />
                </Button>
            </div>

            {isAdding && (
                <form onSubmit={handleAddTask} className="flex gap-2 mb-2 animate-in fade-in slide-in-from-top-2">
                    <Input
                        autoFocus
                        value={newTaskContent}
                        onChange={(e) => setNewTaskContent(e.target.value)}
                        placeholder="Task name..."
                        className="h-8 text-sm bg-background"
                        onBlur={() => !newTaskContent && setIsAdding(false)}
                    />
                </form>
            )}

            <div className="flex-1 flex flex-col gap-3 min-h-[100px]">
                <SortableContext items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
                    {tasks.map((task) => (
                        <DraggableTaskCard key={task.id} task={task} />
                    ))}
                </SortableContext>
            </div>
        </div>
    );
}
