import { Injectable, WritableSignal, signal } from '@angular/core';
import { Task } from '../models';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  term: WritableSignal<string | null> = signal(null);

  constructor() { }

  changeTerm(newTerm: string | null) {
    this.term.set(newTerm);
  }

  filterByTerm(tasks: Task[]) {
    if (!this.term()) {
      return tasks;
    }
    return tasks.filter(task => {
      return task.description.toLowerCase().includes(this.term()?.toLowerCase()!);
    })
  }
}
