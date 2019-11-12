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
  lastId: number = 0;
  todos: Todo[] = [];

  constructor() {
  }

  addTask() {
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
    let completedTasks = this.todos.filter(todo => todo.isCompleted === true);
    let pendingTasks = this.todos.filter(todo => todo.isCompleted === false);
    this.todos = [];
    pendingTasks.forEach(task => this.todos.push(task));
    completedTasks.forEach(task => this.todos.push(task));
  }

  changeStatus(todo: Todo) {
    let todo = this.getTodoById(todo.id);
    todo.isCompleted = !todo.isCompleted;
    this.reorderTodos();
  }

  deleteTodo(todoToBeRemoved: Todo) {
    this.todos = this.todos.filter(todo => todo.id != todoToBeRemoved.id);
  }

}
