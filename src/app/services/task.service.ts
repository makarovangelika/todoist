import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  tasks = [
    {done: false, description: 'Приготовить'},
    {done: false, description: 'Убраться'},
    {done: false, description: 'Работать'}
]

  constructor() { }

  getTasks() {
    return this.tasks;
  }
}
