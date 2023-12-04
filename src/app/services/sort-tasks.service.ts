import { Injectable } from '@angular/core';
import { Task } from '../models';

@Injectable({
  providedIn: 'root'
})
export class SortTasksService {

  constructor() { }

  sortByDeadline(prevTask: Task, nextTask: Task) {
    if (prevTask.deadline === nextTask.deadline) {
      return 0;
    }
    if (!prevTask.deadline) { // prevTask no deadline = prev task > next task = 1
      return 1;
    }
    if (!nextTask.deadline) { // nextTask no deadline = prev task < next task = -1
      return -1;
    }
    return new Date(prevTask.deadline).getTime() - new Date(nextTask.deadline).getTime();
  }
}
