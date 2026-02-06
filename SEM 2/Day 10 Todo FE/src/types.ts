export type Priority = "High" | "Medium" | "Low";

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  createdAt: string;
  priority?: Priority;
  dueDate?: string;
}

export type Filter = "All" | "Active" | "Completed";

