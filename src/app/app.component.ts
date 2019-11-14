import { Component } from '@angular/core';
import { Todo } from './todo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TODO app';
  newTodo: Todo = new Todo();
  lastId = 0;
  todos: Todo[] = [];

  constructor() {
  }

  isInvalid() {
    return this.newTodo.title.length === 0;
  }

  addTodo() {
    if (!this.newTodo.id) {
      this.newTodo.id = ++this.lastId;
    }
    this.todos.push(this.newTodo);
    this.reorderTodos();
    this.newTodo = new Todo();
  }

  getTodoById(id: number): Todo {
    return this.todos.filter(todo => todo.id === id).pop();
  }

  reorderTodos() {
    const completedTasks = this.todos.filter(todo => todo.isCompleted === true);
    const pendingTasks = this.todos.filter(todo => todo.isCompleted === false);
    this.todos = [];
    pendingTasks.forEach(task => this.todos.push(task));
    completedTasks.forEach(task => this.todos.push(task));
  }

  changeStatus(todo: Todo) {
    todo = this.getTodoById(todo.id);
    todo.isCompleted = !todo.isCompleted;
    this.reorderTodos();
    return todo;
  }

  deleteTodo(todoToBeRemoved: Todo) {
    this.todos = this.todos.filter(todo => todo.id !== todoToBeRemoved.id);
  }

  getPendingTodos() {
    return this.todos.filter(todo => todo.isCompleted === false).length;
  }

}
