import { createSelector } from 'reselect'

import { getTodos } from './../store/getters/todosGetters';


export const adminTodoSelector = createSelector(
    getTodos,
    items => items.filter(t => t.createdBy === 'admin')
);