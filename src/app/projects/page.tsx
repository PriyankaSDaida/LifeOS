import React from 'react';
import { KanbanBoard } from '@/components/projects/KanbanBoard';

export default function ProjectsPage() {
    return (
        <div className="container mx-auto p-6 space-y-6 h-screen flex flex-col">
            <div className="space-y-2 shrink-0">
                <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
                <p className="text-muted-foreground">
                    Manage your tasks and projects with a Kanban board.
                </p>
            </div>

            <div className="flex-1 overflow-hidden">
                <KanbanBoard />
            </div>
        </div>
    );
}
