import { defineStore } from "pinia";

export type Todo = {
  text: string;
  id: string;
  deadline: string;
};

export const useTodoStore = defineStore("todo", {
  state: () => ({
    todos: [] as Todo[],
  }),
});

const todos = useTodoStore();
todos.todos;
