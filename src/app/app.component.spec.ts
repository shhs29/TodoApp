import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import {Todo} from './todo';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it(`should have as title 'TODO app'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;
    expect(component.title).toEqual('TODO app');
  });

  it('should add todo', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;
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
         const fixture = TestBed.createComponent(AppComponent);
         const component = fixture.componentInstance;
         const todo1 = new Todo({id: 1, title: 'Task 1', isCompleted: false});
         const todo2 = new Todo({id: 2, title: 'Task 2', isCompleted: false});
         component.todos = [todo1, todo2];
         fixture.detectChanges();
         component.deleteTodo(todo1);
         expect(component.todos).toEqual([todo2]);
       });

       it('should not removing anything if todo with corresponding id is not found', () => {
         const fixture = TestBed.createComponent(AppComponent);
         const component = fixture.componentInstance;
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
         const fixture = TestBed.createComponent(AppComponent);
         const component = fixture.componentInstance;
         const todo1 = new Todo({id: 1, title: 'Task 1', isCompleted: false});
         const todo2 = new Todo({id: 2, title: 'Task 2', isCompleted: false});
         component.todos = [todo1, todo2];
         fixture.detectChanges();
         const updatedTodo = component.changeStatus(todo1);
         expect(updatedTodo.isCompleted).toEqual(true);
         expect(component.todos).toEqual([todo2, todo1]);
       });

        it('should set the todo to pending if currently completed and reorder', () => {
          const fixture = TestBed.createComponent(AppComponent);
          const component = fixture.componentInstance;
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
