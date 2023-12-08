import { Injectable, WritableSignal, signal } from '@angular/core';
import { FilterFormData, Filters, Status, Task } from '../models';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  filters: WritableSignal<Filters> = signal({
    term: null,
    deadlineFrom: null,
    deadlineTo: null,
    status: Status.all
  });

  constructor() { }

  changeTerm(newTerm: string | null) {
    this.filters.update(filters => {
      filters.term = newTerm;
      return filters;
    })
  }

  filterByTerm(tasks: Task[]) {
    return tasks.filter(task => {
      return task.description.toLowerCase().includes(this.filters().term?.toLowerCase()!);
    })
  }

  filterByDeadlineFrom(tasks: Task[]) {
    return tasks.filter(task => {
      const taskDeadline = new Date(task.deadline).getTime();
      const deadlineFrom = this.filters().deadlineFrom!.getTime();
      return taskDeadline >= deadlineFrom;
    })
  }

  filterByDeadlineTo(tasks: Task[]) {
    return tasks.filter(task => {
      const taskDeadline = new Date(task.deadline).getTime();
      const deadlineTo = this.filters().deadlineTo!.getTime();
      return taskDeadline <= deadlineTo && task.deadline;
    })
  }

  updateFilters(filterFormData: FilterFormData) {
    this.filters.update(filters => {
      return {
        ...filters,
        ...filterFormData
      }
    })
  }

  filter(tasks: Task[]) {
    if (this.filters().term) {
      tasks = this.filterByTerm(tasks);
    }
    if (this.filters().deadlineFrom) {
     tasks = this.filterByDeadlineFrom(tasks);
    }
    if (this.filters().deadlineTo) {
      tasks = this.filterByDeadlineTo(tasks);
    }
    return tasks;
  }
}
