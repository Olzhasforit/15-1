export interface Task {
  id: number;
  title: string;
  content: string;
  created_on: Date;
  due_date: Date;
}
export class Task {
  // другие свойства
  isEditable: boolean = false;
}
