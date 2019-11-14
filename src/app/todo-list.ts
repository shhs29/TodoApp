import { Todo } from './todo';

export class TodoList {
  id: number;
  title = '';
  todos: Todo[];


  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
