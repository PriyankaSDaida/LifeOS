import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { QuoteCard } from "@/components/dashboard/QuoteCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusCircle, PenTool, DollarSign } from "lucide-react";

export default function Home() {
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

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4 space-y-4">
          {/* Wrapped Stats in a container if needed, but direct is fine. Adding classes to DashboardStats in next step if generic doesn't apply */}
          <DashboardStats />
        </div>
        <div className="col-span-3">
          <QuoteCard />
        </div>
      </div>

      {/* Visual Placeholder for where charts/calendars will act as summaries */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4 border border-dashed rounded-xl p-8 flex flex-col items-center justify-center bg-card/50 text-card-foreground shadow-sm h-[300px] hover:bg-card/80 transition-colors">
          <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
            <PlusCircle className="h-6 w-6 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground font-medium">Upcoming Agenda</p>
          <p className="text-xs text-muted-foreground/60">Sync your calendar to see more</p>
        </div>
        <div className="col-span-3 border border-dashed rounded-xl p-8 flex flex-col items-center justify-center bg-card/50 text-card-foreground shadow-sm h-[300px] hover:bg-card/80 transition-colors">
          <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
            <DollarSign className="h-6 w-6 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground font-medium">Expense Trends</p>
          <p className="text-xs text-muted-foreground/60">Connect accounts for insights</p>
        </div>
      </div>
    </div>
  );
}
