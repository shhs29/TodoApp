import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListComponent } from './todo-list.component';
import { FormsModule } from '@angular/forms';
import {Todo} from '../todo';
import {TodoList} from '../todo-list';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule
      ],
      declarations: [ TodoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    component.todoList = new TodoList();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add todo', () => {
    const todo1 = new Todo({id: 1, title: 'Task 1', isCompleted: false});
    const todo2 = new Todo({id: 2, title: 'Task 2', isCompleted: false});
    component.newTodo = todo1;
    component.addTodo();
    component.newTodo = todo2;
    component.addTodo();
    expect(component.todos).toEqual([todo1, todo2]);
   });

   describe('delete a todo', () => {

       it('should remove todo with the corresponding id', () => {
         const todo1 = new Todo({id: 1, title: 'Task 1', isCompleted: false});
         const todo2 = new Todo({id: 2, title: 'Task 2', isCompleted: false});
         component.todos = [todo1, todo2];
         fixture.detectChanges();
         component.deleteTodo(todo1);
         expect(component.todos).toEqual([todo2]);
       });

       it('should not removing anything if todo with corresponding id is not found', () => {
         const todo1 = new Todo({id: 1, title: 'Task 1', isCompleted: false});
         const todo2 = new Todo({id: 2, title: 'Task 2', isCompleted: false});
         const todo3 = new Todo({id: 3, title: 'Task 3', isCompleted: false});
         component.todos = [todo1, todo2];
         fixture.detectChanges();
         component.deleteTodo(todo3);
         expect(component.todos).toEqual([todo1, todo2]);
       });

     });

     describe('should change todo status', () => {

       it('should set the todo to completed if currently pending and reorder', () => {
         const todo1 = new Todo({id: 1, title: 'Task 1', isCompleted: false});
         const todo2 = new Todo({id: 2, title: 'Task 2', isCompleted: false});
         component.todos = [todo1, todo2];
         fixture.detectChanges();
         const updatedTodo = component.changeStatus(todo1);
         expect(updatedTodo.isCompleted).toEqual(true);
         expect(component.todos).toEqual([todo2, todo1]);
       });

        it('should set the todo to pending if currently completed and reorder', () => {
          const todo1 = new Todo({id: 1, title: 'Task 1', isCompleted: true});
          const todo2 = new Todo({id: 2, title: 'Task 2', isCompleted: true});
          component.todos = [todo1, todo2];
          fixture.detectChanges();

          const updatedTodo = component.changeStatus(todo2);
          expect(updatedTodo.isCompleted).toEqual(false);
          expect(component.todos).toEqual([todo2, todo1]);
        });

     });

});
