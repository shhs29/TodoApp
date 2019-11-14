export class Todo {
  id: number;
  title = '';
  isCompleted = false;


  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
