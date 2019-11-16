import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import {Todo} from './todo';
import {TodoList} from './todo-list';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule
      ],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
  fixture = TestBed.createComponent(AppComponent);
  component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'TODO app'`, () => {
    expect(component.title).toEqual('TODO app');
  });

  it('should create new todo list', () => {
    const todoList = {id: 1, title: 'Todo List', todos: []};
    component.createNewTodoList();
    expect(component.todoLists).toContain(todoList);
  });

  it('should delete a todo list', () => {
    const todoList1 = {id: 1, title: 'Todo List', todos: []};
    const todoList2 = {id: 2, title: 'Todo List', todos: []};
    component.createNewTodoList();
    component.createNewTodoList();
    component.deleteList(todoList1)
    expect(component.todoLists).not.toContain(todoList1);
    expect(component.todoLists).toContain(todoList2);
  });

});
