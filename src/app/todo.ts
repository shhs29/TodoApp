export class Todo {
  id: number;
  title: string = '';
  isCompleted: boolean = false;


  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
