"use client";

import React, { useState } from 'react';
import {
    DndContext,
    closestCorners,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragOverlay,
    DragStartEvent,
    DragOverEvent,
    DragEndEvent,
    defaultDropAnimationSideEffects,
    DropAnimation,
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates, arrayMove } from '@dnd-kit/sortable';
import { useLifeOSStore } from '@/store/useLifeOSStore';
import { BoardColumn } from './BoardColumn';
import { DraggableTaskCard } from './DraggableTaskCard';

const dropAnimation: DropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
        styles: {
            active: {
                opacity: '0.5',
            },
        },
    }),
};

export function KanbanBoard() {
    const { board, setBoard } = useLifeOSStore();
    const [activeId, setActiveId] = useState<string | null>(null);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            }
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragStart = (event: DragStartEvent) => {
        setActiveId(event.active.id as string);
    };

    const handleDragOver = (event: DragOverEvent) => {
        const { active, over } = event;
        if (!over) return;

        const activeId = active.id as string;
        const overId = over.id as string;

        // Find containers (columns)
        const findContainer = (id: string) => {
            if (activeId in board.tasks && overId in board.columns) {
                return overId;
            }

            // If direct column
            if (id in board.columns) return id;

            // If task, find its column
            return Object.keys(board.columns).find((key) =>
                board.columns[key].taskIds.includes(id)
            );
        };

        const activeContainer = findContainer(activeId);
        const overContainer = findContainer(overId);

        if (
            !activeContainer ||
            !overContainer ||
            activeContainer === overContainer
        ) {
            return;
        }

        // Moving between columns within drag over
        // logic usually handled in DragEnd for simple state, but for "live" reordering visual, need to update temp state.
        // However, updating global store on drag over might be jittery.
        // For simplicity with this store structure, we can just handle it on DragEnd or use a local state that syncs.

        // Actually dnd-kit recommends visual updates on DragOver for sorting between containers.
        // Let's implement active state update only on DragEnd for stability first.
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        const activeId = active.id as string;
        const overId = over?.id as string;

        if (!over) {
            setActiveId(null);
            return;
        }

        // Find source and destination containers
        const findContainer = (id: string) => {
            if (id in board.columns) return id;
            return Object.keys(board.columns).find((key) =>
                board.columns[key].taskIds.includes(id)
            );
        };

        const activeContainer = findContainer(activeId);
        const overContainer = findContainer(overId);

        if (activeContainer && overContainer) {

            if (activeContainer === overContainer) {
                // Reordering within same column
                const column = board.columns[activeContainer];
                const oldIndex = column.taskIds.indexOf(activeId);
                const newIndex = column.taskIds.indexOf(overId);

                if (oldIndex !== newIndex) {
                    const newBoard = {
                        ...board,
                        columns: {
                            ...board.columns,
                            [activeContainer]: {
                                ...column,
                                taskIds: arrayMove(column.taskIds, oldIndex, newIndex)
                            }
                        }
                    };
                    setBoard(newBoard);
                }
            } else {
                // Moving to different column
                const sourceColumn = board.columns[activeContainer];
                const destColumn = board.columns[overContainer];

                const sourceTaskIds = [...sourceColumn.taskIds];
                const destTaskIds = [...destColumn.taskIds];

                // Remove from source
                sourceTaskIds.splice(sourceTaskIds.indexOf(activeId), 1);

                // Add to dest
                const newIndex = overId in board.columns ? destTaskIds.length : destTaskIds.indexOf(overId);

                // If dropped on the column itself, add to end (or 0 if empty/top). 
                // If dropped on a task, insert at that index.
                // If overId is the column ID, use length (append) or 0 (prepend). Usually append.

                // Logic check: insert *at* the position relative to overId
                let insertIndex = destTaskIds.length;
                if (overId !== overContainer) {
                    // We are over a task
                    const overTaskIndex = destTaskIds.indexOf(overId);
                    insertIndex = overTaskIndex >= 0 ? overTaskIndex : destTaskIds.length;
                }

                destTaskIds.splice(insertIndex, 0, activeId);

                const newBoard = {
                    ...board,
                    columns: {
                        ...board.columns,
                        [activeContainer]: { ...sourceColumn, taskIds: sourceTaskIds },
                        [overContainer]: { ...destColumn, taskIds: destTaskIds },
                    }
                };
                setBoard(newBoard);
            }
        }

        setActiveId(null);
    };

    return (
        <DndContext
            id="kanban-board"
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
        >
            <div className="flex overflow-x-auto pb-4 gap-6 h-[calc(100vh-200px)]">
                {board.columnOrder.map((columnId) => {
                    const column = board.columns[columnId];
                    const tasks = column.taskIds.map((taskId) => board.tasks[taskId]);
                    return <BoardColumn key={columnId} column={column} tasks={tasks} />;
                })}
            </div>

            <DragOverlay dropAnimation={dropAnimation}>
                {activeId ? (
                    <DraggableTaskCard task={board.tasks[activeId]} />
                ) : null}
            </DragOverlay>
        </DndContext>
    );
}
