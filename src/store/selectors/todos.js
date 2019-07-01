import { createSelector } from 'reselect/lib/index'

export const getTodos = (state) => state.todosReducer.todos;
export const getLoad = (state) => state.todosReducer.load;
export const getId = (state) => state.todosReducer.id;

export const adminTodoSelector = createSelector(
    getTodos,
    items => items.filter(t => t.createdBy === 'admin')
);