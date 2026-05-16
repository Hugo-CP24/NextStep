import { create } from "zustand";

const useTaskStore = create((set) => ({
  tasks: [
    {
      id: 1,
      title: "Update documentation",
      description: "Olar the API docs with latest changes",
      done: true,
      priority: "low",
      energy: "low",
      date: "2026-05-18",
      tags: ["Docs"],
    },
    {
      id: 2,
      title: "Complete project proposal",
      description: "Finish the Q2 project proposal",
      done: false,
      priority: "high",
      energy: "high",
      date: "2026-05-15",
      tags: ["Work", "Important"],
    },
    {
      id: 3,
      title: "Team standup meeting",
      description: "Olar the API docs with latest changes",
      done: true,
      priority: "low",
      energy: "low",
      date: "2026-05-14",
      tags: ["Meeting"],
    },
  ],

  filter: "all",
  setFilter: (filter) => set({ filter }),

  addTask: (task) =>
    set((state) => ({
      tasks: [...state.tasks, { ...task, id: Date.now(), done: false }],
    })),

  toggleTask: (id) =>
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === id ? { ...t, done: !t.done } : t
      ),
    })),
}));

export default useTaskStore;