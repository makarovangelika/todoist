import { Injectable, WritableSignal, signal } from '@angular/core';
import { Filters, Task } from '../models';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  filters: WritableSignal<Filters> = signal({
    term: null,
    deadlineRange: null
  });

  constructor() { }

  changeTerm(newTerm: string | null) {
    this.filters.update(filters => {
      filters.term = newTerm;
      return filters;
    })
  }

  filterByTerm(tasks: Task[]) {
    if (!this.filters().term) {
      return tasks;
    }
    return tasks.filter(task => {
      return task.description.toLowerCase().includes(this.filters().term?.toLowerCase()!);
    })
  }

}
