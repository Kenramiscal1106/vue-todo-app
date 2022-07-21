import { defineStore } from "pinia";

export type Todo = {
  text: string;
  id: string;
  deadline: string;
  category: Categories
};

export type Categories = {
  title: string,
  color: string,
}

export const useTodoStore = defineStore("todos", {
  state: () => ({
    todos: [] as Todo[],
  }),
});


export const useCategoryStore = defineStore("categories", {
  state: () => ({
    categories: [] as Categories[]
  })
})