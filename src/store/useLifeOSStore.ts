import { create } from 'zustand';
import { addDays, subDays, startOfToday, setHours } from 'date-fns';

export interface Event {
  id: string;
  title: string;
  start: Date;
  end: Date;
  isGoal: boolean;
  isCompleted: boolean;
}

export interface Expense {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: Date;
}

export interface GratitudeEntry {
  id: string;
  content: string;
  mood: number; // 1-5
  createdAt: Date;
}

interface LifeOSState {
  events: Event[];
  expenses: Expense[];
  journalEntries: GratitudeEntry[];
  monthlyBudget: number;
  
  addEvent: (event: Event) => void;
  updateEvent: (id: string, updates: Partial<Event>) => void;
  deleteEvent: (id: string) => void;
  toggleEventCompletion: (id: string) => void;
  
  addExpense: (expense: Expense) => void;
  deleteExpense: (id: string) => void;
  setMonthlyBudget: (amount: number) => void;
  
  addGratitudeEntry: (entry: GratitudeEntry) => void;
}

const today = startOfToday();

const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Morning Run',
    start: setHours(today, 7),
    end: setHours(today, 8),
    isGoal: true,
    isCompleted: true,
  },
  {
    id: '2',
    title: 'Team Standup',
    start: setHours(today, 10),
    end: setHours(today, 10.5),
    isGoal: false,
    isCompleted: false,
  },
  {
    id: '3',
    title: 'Deep Work: Project X',
    start: setHours(today, 14),
    end: setHours(today, 16),
    isGoal: true,
    isCompleted: false,
  },
  {
    id: '4',
    title: 'Lunch with Sarah',
    start: setHours(addDays(today, 1), 12),
    end: setHours(addDays(today, 1), 13),
    isGoal: false,
    isCompleted: false,
  },
];

const mockExpenses: Expense[] = [
  { id: '1', amount: 1200, category: 'Rent', description: 'Monthly Rent', date: subDays(today, 5) },
  { id: '2', amount: 45.50, category: 'Food', description: 'Grocery Run', date: subDays(today, 2) },
  { id: '3', amount: 15.00, category: 'Transport', description: 'Uber', date: today },
  { id: '4', amount: 120.00, category: 'Entertainment', description: 'Concert Tickets', date: subDays(today, 10) },
];

const mockJournal: GratitudeEntry[] = [
  { id: '1', content: 'Grateful for a sunny morning walk.', mood: 5, createdAt: subDays(today, 1) },
  { id: '2', content: 'Had a productive meeting with the team.', mood: 4, createdAt: subDays(today, 2) },
];

export const useLifeOSStore = create<LifeOSState>((set) => ({
  events: mockEvents,
  expenses: mockExpenses,
  journalEntries: mockJournal,
  monthlyBudget: 2000,

  addEvent: (event) => set((state) => ({ events: [...state.events, event] })),
  updateEvent: (id, updates) =>
    set((state) => ({
      events: state.events.map((e) => (e.id === id ? { ...e, ...updates } : e)),
    })),
  deleteEvent: (id) => set((state) => ({ events: state.events.filter((e) => e.id !== id) })),
  toggleEventCompletion: (id) =>
    set((state) => ({
      events: state.events.map((e) => (e.id === id ? { ...e, isCompleted: !e.isCompleted } : e)),
    })),

  addExpense: (expense) => set((state) => ({ expenses: [...state.expenses, expense] })),
  deleteExpense: (id) => set((state) => ({ expenses: state.expenses.filter((e) => e.id !== id) })),
  setMonthlyBudget: (amount) => set({ monthlyBudget: amount }),

  addGratitudeEntry: (entry) => set((state) => ({ journalEntries: [entry, ...state.journalEntries] })),
}));
