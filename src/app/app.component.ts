import { Component } from '@angular/core';
import { Todo } from './todo';
import { TodoList } from './todo-list';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TODO app';
  lastId = 0;
  todoLists: TodoList[] = [];

  constructor() {
  }

  createNewTodoList() {
    const todoList = {id: ++this.lastId, title: "Todo List", todos: []}
    this.todoLists.push(todoList);
  }

 deleteList(todoListToBeRemoved: TodoList) {
    console.log(todoListToBeRemoved);
    this.todoLists = this.todoLists.filter(todoList => todoList.id !== todoListToBeRemoved.id);
    console.log(this.todoLists);
  }
}
