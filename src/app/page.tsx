"use client";

import React from 'react';
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { QuoteCard } from "@/components/dashboard/QuoteCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusCircle, PenTool, DollarSign } from "lucide-react";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, rectSortingStrategy } from '@dnd-kit/sortable';
import { useLifeOSStore } from "@/store/useLifeOSStore";
import { DraggableWidget } from "@/components/dashboard/DraggableWidget";
import { cn } from "@/lib/utils";

export default function Home() {
  const { dashboardLayout, setDashboardLayout } = useLifeOSStore();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = dashboardLayout.indexOf(active.id as string);
      const newIndex = dashboardLayout.indexOf(over?.id as string);
      setDashboardLayout(arrayMove(dashboardLayout, oldIndex, newIndex));
    }
  };

  const renderWidget = (id: string) => {
    switch (id) {
      case 'stats':
        return (
          <DraggableWidget id="stats" className="col-span-4 transition-all">
            <div className="h-full">
              <DashboardStats />
            </div>
          </DraggableWidget>
        );
      case 'quote':
        return (
          <DraggableWidget id="quote" className="col-span-3 transition-all">
            <div className="h-full">
              <QuoteCard />
            </div>
          </DraggableWidget>
        );
      case 'agenda':
        return (
          <DraggableWidget id="agenda" className="col-span-4 transition-all h-[300px]">
            <div className="border border-dashed rounded-xl p-8 flex flex-col items-center justify-center bg-card/50 text-card-foreground shadow-sm h-full hover:bg-card/80 transition-colors">
              <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
                <PlusCircle className="h-6 w-6 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground font-medium">Upcoming Agenda</p>
              <p className="text-xs text-muted-foreground/60">Sync your calendar to see more</p>
            </div>
          </DraggableWidget>
        );
      case 'finance':
        return (
          <DraggableWidget id="finance" className="col-span-3 transition-all h-[300px]">
            <div className="border border-dashed rounded-xl p-8 flex flex-col items-center justify-center bg-card/50 text-card-foreground shadow-sm h-full hover:bg-card/80 transition-colors">
              <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
                <DollarSign className="h-6 w-6 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground font-medium">Expense Trends</p>
              <p className="text-xs text-muted-foreground/60">Connect accounts for insights</p>
            </div>
          </DraggableWidget>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <DashboardHeader />

        <div className="flex gap-2">
          <Link href="/calendar">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Event
            </Button>
          </Link>
          <Link href="/journal">
            <Button variant="outline">
              <PenTool className="mr-2 h-4 w-4" />
              Log Mood
            </Button>
          </Link>
          <Link href="/finance">
            <Button variant="secondary">
              <DollarSign className="mr-2 h-4 w-4" />
              Add Expense
            </Button>
          </Link>
        </div>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={dashboardLayout}
          strategy={rectSortingStrategy}
        >
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
            {dashboardLayout.map((id) => (
              <React.Fragment key={id}>
                {renderWidget(id)}
              </React.Fragment>
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
