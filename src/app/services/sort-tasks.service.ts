import { Injectable } from '@angular/core';
import { SortValue, Task } from '../models';
import { PRIORITY_CODES } from '../constants';

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

  sortByPriority(prevTask: Task, nextTask: Task, sortValue: SortValue) {
    if (prevTask.priority === nextTask.priority) {
      return 0;
    }
    if (!prevTask.priority) {
      return 1;
    }
    if (!nextTask.priority) {
      return -1;
    }
    if (sortValue === SortValue.priorityUp) {
      return PRIORITY_CODES[prevTask.priority] - PRIORITY_CODES[nextTask.priority];
    } else {
      return PRIORITY_CODES[nextTask.priority] - PRIORITY_CODES[prevTask.priority];
    };
  }
}
