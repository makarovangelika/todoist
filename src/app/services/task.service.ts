import { Injectable } from '@angular/core';
import { UserStorageService } from './user-storage.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  tasks = [
    {done: false, description: 'Приготовить'},
    {done: false, description: 'Убраться'},
    {done: false, description: 'Работать'}
]

  constructor(private userStorageService: UserStorageService) { }

  getTasks() {
    const authorizedUser = this.userStorageService.getAuthorizedUser();
    const tasks = this.userStorageService.getUser(authorizedUser.email)?.tasks;
    if (!tasks) {
      return [];
    }
    return tasks;
  }
}
