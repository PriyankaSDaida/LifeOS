import { create } from 'zustand';
import { addDays, subDays, startOfToday, setHours, isSameDay, startOfDay } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';

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

// Habit Tracker Interfaces
export interface Habit {
  id: string;
  title: string;
  frequency: 'daily' | 'weekly';
  completedDates: Date[];
  streak: number;
  createdAt: Date;
}

// Pomodoro Interfaces
export interface PomodoroSettings {
  workDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
}

// Kanban Interfaces
export interface Comment {
  id: string;
  content: string;
  createdAt: Date;
}

export interface Task {
  id: string;
  content: string;
  color?: string; // Tailwind class e.g. 'bg-blue-100'
  comments: Comment[];
}

export interface Column {
  id: string;
  title: string;
  taskIds: string[];
}

export interface BoardData {
  tasks: Record<string, Task>;
  columns: Record<string, Column>;
  columnOrder: string[];
}

// Brain Dump / Ideas Interfaces
export interface Idea {
  id: string;
  content: string;
  color: string; // e.g. 'bg-pink-400'
  rotation: number; // e.g. -2, 4, etc for tilt
  createdAt: Date;
}

interface LifeOSState {
  events: Event[];
  expenses: Expense[];
  journalEntries: GratitudeEntry[];
  monthlyBudget: number;

  // Habits State
  habits: Habit[];

  // Pomodoro State
  pomodoroSettings: PomodoroSettings;

  // Kanban State
  board: BoardData;

  // Ideas State
  ideas: Idea[];

  // Actions
  addEvent: (event: Event) => void;
  updateEvent: (id: string, updates: Partial<Event>) => void;
  deleteEvent: (id: string) => void;
  toggleEventCompletion: (id: string) => void;

  addExpense: (expense: Expense) => void;
  deleteExpense: (id: string) => void;
  setMonthlyBudget: (amount: number) => void;

  addGratitudeEntry: (entry: GratitudeEntry) => void;

  // Dashboard Layout
  dashboardLayout: string[];
  setDashboardLayout: (layout: string[]) => void;

  // Habit Actions
  addHabit: (title: string, frequency: 'daily' | 'weekly') => void;
  deleteHabit: (id: string) => void;
  toggleHabitCompletion: (id: string, date: Date) => void;

  // Pomodoro Actions
  updatePomodoroSettings: (settings: Partial<PomodoroSettings>) => void;

  // Kanban Actions
  setBoard: (board: BoardData) => void;
  addTask: (columnId: string, content: string) => void;
  addComment: (taskId: string, content: string) => void;
  updateTaskColor: (taskId: string, color: string) => void;

  // Idea Actions
  addIdea: (content: string, color: string, rotation: number) => void;
  deleteIdea: (id: string) => void;
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

const mockHabits: Habit[] = [
  {
    id: '1',
    title: 'Read 30 mins',
    frequency: 'daily',
    completedDates: [subDays(today, 1), subDays(today, 2)],
    streak: 2,
    createdAt: subDays(today, 30)
  },
  {
    id: '2',
    title: 'Drink 2L Water',
    frequency: 'daily',
    completedDates: [today, subDays(today, 1)],
    streak: 2,
    createdAt: subDays(today, 10)
  },
];

const initialBoard: BoardData = {
  tasks: {
    'task-1': { id: 'task-1', content: 'Design System Update', comments: [], color: 'bg-white' },
    'task-2': { id: 'task-2', content: 'Client Meeting Preparation', comments: [], color: 'bg-white' },
    'task-3': { id: 'task-3', content: 'Fix Navigation Bug', comments: [], color: 'bg-red-100' },
    'task-4': { id: 'task-4', content: 'Write Documentation', comments: [], color: 'bg-green-100' },
  },
  columns: {
    'col-1': { id: 'col-1', title: 'To Do', taskIds: ['task-1', 'task-2'] },
    'col-2': { id: 'col-2', title: 'In Progress', taskIds: ['task-3'] },
    'col-3': { id: 'col-3', title: 'Done', taskIds: ['task-4'] },
  },
  columnOrder: ['col-1', 'col-2', 'col-3'],
};

const mockIdeas: Idea[] = [
  { id: '1', content: 'Build a robot that folds laundry', color: 'bg-neon-pink', rotation: -3, createdAt: subDays(today, 1) },
  { id: '2', content: 'Learn to juggle', color: 'bg-neon-green', rotation: 2, createdAt: subDays(today, 2) },
  { id: '3', content: 'App idea: Tinder for cats', color: 'bg-neon-blue', rotation: 5, createdAt: subDays(today, 5) },
];

export const useLifeOSStore = create<LifeOSState>((set) => ({
  events: mockEvents,
  expenses: mockExpenses,
  journalEntries: mockJournal,
  monthlyBudget: 2000,

  habits: mockHabits,
  pomodoroSettings: {
    workDuration: 25,
    shortBreakDuration: 5,
    longBreakDuration: 15,
  },
  board: initialBoard,
  dashboardLayout: ['stats', 'quote', 'agenda', 'finance'],
  ideas: mockIdeas,

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

  // Habit Actions
  addHabit: (title, frequency) => set((state) => ({
    habits: [
      ...state.habits,
      {
        id: uuidv4(),
        title,
        frequency,
        completedDates: [],
        streak: 0,
        createdAt: new Date(),
      }
    ]
  })),

  deleteHabit: (id) => set((state) => ({ habits: state.habits.filter((h) => h.id !== id) })),

  toggleHabitCompletion: (id, date) => set((state) => ({
    habits: state.habits.map((habit) => {
      if (habit.id !== id) return habit;

      const isCompletedToday = habit.completedDates.some(d => isSameDay(d, date));
      let newCompletedDates = isCompletedToday
        ? habit.completedDates.filter(d => !isSameDay(d, date))
        : [...habit.completedDates, date];

      // Simple streak calculation (re-calculate based on sorted dates)
      // In a real app, this might be more complex
      const sortedDates = newCompletedDates.sort((a, b) => b.getTime() - a.getTime());
      let streak = 0;
      let currentCheck = today;

      // If today is completed, start checking from today. 
      // If not, check from yesterday to maintain streak if today isn't over.
      // For simplicity here, we just count consecutive days backwards from the most recent completion.

      if (sortedDates.length > 0) {
        let checkDate = startOfToday();
        // If we completed today, streak includes today.
        if (isSameDay(sortedDates[0], checkDate)) {
          streak = 1;
          checkDate = subDays(checkDate, 1);
        } else if (isSameDay(sortedDates[0], subDays(checkDate, 1))) {
          // If we haven't done today yet, but did yesterday, streak is still alive
          streak = 0; // The logic below will pick it up
          checkDate = subDays(checkDate, 1);
        }

        for (let i = 0; i < sortedDates.length; i++) {
          // This is a simplified streak logic.
          // Real logic needs to check adjacency.
        }
        // Let's simplified: just count length for now or implement better logic later if needed.
        // Actually, let's do a robust simple calc:
        // Check if latest is today or yesterday.
        const latest = sortedDates[0];
        if (!latest) streak = 0;
        else {
          const diffToToday = (startOfToday().getTime() - startOfDay(latest).getTime()) / (1000 * 3600 * 24);
          if (diffToToday <= 1) {
            streak = 1;
            let prev = latest;
            for (let i = 1; i < sortedDates.length; i++) {
              const curr = sortedDates[i];
              const diff = (startOfDay(prev).getTime() - startOfDay(curr).getTime()) / (1000 * 3600 * 24);
              if (diff === 1) {
                streak++;
                prev = curr;
              } else {
                break;
              }
            }
          } else {
            streak = 0;
          }
        }
      }

      return {
        ...habit,
        completedDates: newCompletedDates,
        streak: streak
      };
    })
  })),

  // Pomodoro Actions
  updatePomodoroSettings: (settings) => set((state) => ({
    pomodoroSettings: { ...state.pomodoroSettings, ...settings }
  })),

  // Kanban Actions
  setBoard: (board) => set({ board }),

  addTask: (columnId, content) => set((state) => {
    const newTaskId = uuidv4();
    const newTask: Task = {
      id: newTaskId,
      content,
      comments: [],
      color: 'bg-white'
    };

    const column = state.board.columns[columnId];
    const newColumn = {
      ...column,
      taskIds: [newTaskId, ...column.taskIds] // Add to top
    };

    return {
      board: {
        ...state.board,
        tasks: {
          ...state.board.tasks,
          [newTaskId]: newTask
        },
        columns: {
          ...state.board.columns,
          [columnId]: newColumn
        }
      }
    };
  }),

  addComment: (taskId, content) => set((state) => {
    const task = state.board.tasks[taskId];
    if (!task) return state;

    const newComment: Comment = {
      id: uuidv4(),
      content,
      createdAt: new Date()
    };

    return {
      board: {
        ...state.board,
        tasks: {
          ...state.board.tasks,
          [taskId]: {
            ...task,
            comments: [...task.comments, newComment]
          }
        }
      }
    };
  }),

  updateTaskColor: (taskId, color) => set((state) => {
    const task = state.board.tasks[taskId];
    if (!task) return state;

    return {
      board: {
        ...state.board,
        tasks: {
          ...state.board.tasks,
          [taskId]: {
            ...task,
            color
          }
        }
      }
    };
  }),

  // Dashboard Actions
  setDashboardLayout: (layout) => set({ dashboardLayout: layout }),

  // Ideas Actions
  addIdea: (content, color, rotation) => set((state) => ({
    ideas: [
      {
        id: uuidv4(),
        content,
        color,
        rotation,
        createdAt: new Date(),
      },
      ...state.ideas,
    ]
  })),
  deleteIdea: (id) => set((state) => ({ ideas: state.ideas.filter((i) => i.id !== id) })),
}));

