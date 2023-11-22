import { Injectable } from '@angular/core';
import { UserStorageService } from './user-storage.service';
import { Task } from '../models';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  authorizedUser = this.userStorageService.getAuthorizedUser();

  constructor(private userStorageService: UserStorageService) { }

  getTasks(): Task[] {
    const tasks = localStorage.getItem(`tasks: ${this.authorizedUser.email}`);
    if (!tasks) {
      return [];
    }
    return JSON.parse(tasks);
  }
  updateTasks(tasks: Task[]) {
    const serializedTasks = JSON.stringify(tasks);
    localStorage.setItem(`tasks: ${this.authorizedUser.email}`, serializedTasks);
  }
}
