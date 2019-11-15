import { Component, OnInit, Input } from '@angular/core';
import { Todo } from '../todo';
import { TodoList } from '../todo-list';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  @Input()
  todoList: TodoList;

  newTodo: Todo = new Todo();
  lastId = 0;
  todos: Todo[] = [];

  constructor() { }

  ngOnInit() {
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
    this.todoList = {id: this.todoList.id, title: this.todoList.title, todos: this.todos}
    this.newTodo = new Todo();
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
    this.todoList = {id: this.todoList.id, title: this.todoList.title, todos: this.todos}
    return todo;
  }

 getTodoById(id: number): Todo {
    return this.todos.filter(todo => todo.id === id).pop();
  }


  deleteTodo(todoToBeRemoved: Todo) {
    this.todos = this.todos.filter(todo => todo.id !== todoToBeRemoved.id);
    this.todoList = {id: this.todoList.id, title: this.todoList.title, todos: this.todos}
  }

  getPendingTodos() {
    return this.todos.filter(todo => todo.isCompleted === false).length;
  }

}
