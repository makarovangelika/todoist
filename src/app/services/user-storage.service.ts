import { Injectable } from '@angular/core';
import { User } from '../models';

@Injectable({
  providedIn: 'root'
})
export class UserStorageService {

  constructor() { }

  getUser(email: string): User | null {
    const item = localStorage.getItem(email);
    if (item === null) {
      return null;
    }
    return JSON.parse(item);
  }

  addUser(user: User) {
    const item = JSON.stringify(user);
    localStorage.setItem(user.email, item);
  }

  getAuthorizedUser() {
    const authorizedUser = localStorage.getItem('authorized user');
    if (authorizedUser === null) {
      return null;
    }
    return JSON.parse(authorizedUser);
  }
}
