import React, { createContext, useContext, useMemo, useState } from "react";

export type AccentColor = "pink" | "cyan" | "yellow" | "mint";

export interface CalendarEvent {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  time?: string; // e.g. "09:00 AM"
  color: AccentColor;
  icon?: string;
}

export interface Note {
  id: string;
  title: string;
  body: string;
  color: AccentColor;
  updatedAt: number;
}

interface AppDataValue {
  events: CalendarEvent[];
  notes: Note[];
  addEvent: (e: Omit<CalendarEvent, "id">) => CalendarEvent;
  updateEvent: (id: string, patch: Partial<CalendarEvent>) => void;
  removeEvent: (id: string) => void;
  addNote: (n: Omit<Note, "id" | "updatedAt">) => Note;
  updateNote: (id: string, patch: Partial<Note>) => void;
  removeNote: (id: string) => void;
  eventsByDate: (date: string) => CalendarEvent[];
}

const AppDataContext = createContext<AppDataValue | undefined>(undefined);

const uid = () => Math.random().toString(36).slice(2, 10);

const seedEvents: CalendarEvent[] = [
  { id: uid(), title: "Coffee with Sam", date: "2023-10-02", time: "09:30 AM", color: "cyan", icon: "local-cafe" },
  { id: uid(), title: "Design review", date: "2023-10-05", time: "01:00 PM", color: "yellow", icon: "brush" },
  { id: uid(), title: "Gym session", date: "2023-10-05", time: "06:00 PM", color: "pink", icon: "fitness-center" },
  { id: uid(), title: "Team standup", date: "2023-10-11", time: "10:00 AM", color: "cyan", icon: "groups" },
  { id: uid(), title: "Birthday party", date: "2023-10-21", time: "07:00 PM", color: "pink", icon: "celebration" },
];

const seedNotes: Note[] = [
  { id: uid(), title: "Grocery list", body: "Milk, eggs, comic paper, ink pens, sticky tape.", color: "yellow", updatedAt: Date.now() - 86400000 },
  { id: uid(), title: "App ideas", body: "A calendar that feels hand-drawn. Wonky borders everywhere!", color: "cyan", updatedAt: Date.now() - 3600000 },
  { id: uid(), title: "Doodle prompts", body: "Speech bubbles, halftone dots, tape corners.", color: "pink", updatedAt: Date.now() },
];

export function AppDataProvider({ children }: { children: React.ReactNode }) {
  const [events, setEvents] = useState<CalendarEvent[]>(seedEvents);
  const [notes, setNotes] = useState<Note[]>(seedNotes);

  const value = useMemo<AppDataValue>(
    () => ({
      events,
      notes,
      addEvent: (e) => {
        const created = { ...e, id: uid() };
        setEvents((prev) => [...prev, created]);
        return created;
      },
      updateEvent: (id, patch) =>
        setEvents((prev) => prev.map((e) => (e.id === id ? { ...e, ...patch } : e))),
      removeEvent: (id) => setEvents((prev) => prev.filter((e) => e.id !== id)),
      addNote: (n) => {
        const created = { ...n, id: uid(), updatedAt: Date.now() };
        setNotes((prev) => [created, ...prev]);
        return created;
      },
      updateNote: (id, patch) =>
        setNotes((prev) =>
          prev.map((n) => (n.id === id ? { ...n, ...patch, updatedAt: Date.now() } : n))
        ),
      removeNote: (id) => setNotes((prev) => prev.filter((n) => n.id !== id)),
      eventsByDate: (date) => events.filter((e) => e.date === date),
    }),
    [events, notes]
  );

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
}

export function useAppData(): AppDataValue {
  const ctx = useContext(AppDataContext);
  if (!ctx) throw new Error("useAppData must be used within an AppDataProvider");
  return ctx;
}

export const accentToColor: Record<AccentColor, string> = {
  pink: "#ff71ce",
  cyan: "#01cdfe",
  yellow: "#fff500",
  mint: "#05ffa1",
};
