import { Injectable } from '@angular/core';
import { SortOption, SortValue, Task } from '../models';
import { PRIORITY_WEIGHTS } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class SortTasksService {

  constructor() { }

  sort(tasks: Task[], sortOption: SortOption) {
    return [...tasks].sort((prevTask, nextTask) => {
      switch(sortOption.value) {
        case SortValue.deadline:
          return this.sortByDeadline(prevTask, nextTask);
        case SortValue.priorityUp:
          return this.sortByPriority(prevTask, nextTask, sortOption.value);
        case SortValue.priorityDown:
          return this.sortByPriority(prevTask, nextTask, sortOption.value);
        case SortValue.category:
          return this.sortByCategory(prevTask, nextTask);
        default:
          return 0;
      }
    })
  }

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
    const prevTaskWeight = PRIORITY_WEIGHTS.get(prevTask.priority)!;
    const nextTaskWeight = PRIORITY_WEIGHTS.get(nextTask.priority)!;
    if (sortValue === SortValue.priorityUp) {
      return prevTaskWeight - nextTaskWeight;
    } else {
      return nextTaskWeight - prevTaskWeight;
    };
  }

  sortByCategory(prevTask: Task, nextTask: Task) {
    if (prevTask.category?.name === nextTask.category?.name) {
      return 0;
    }
    if (!prevTask.category) {
      return 1;
    }
    if (!nextTask.category) {
      return -1;
    }
    if (prevTask.category.name < nextTask.category.name) {
      return -1;
    } else {
      return 1;
    }
  }
}
