import { Injectable } from '@angular/core';
import { UserStorageService } from './user-storage.service';
import { User } from '../models';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private userStorageService: UserStorageService) { }

  checkUser(user: User) {
    const registeredUser = this.userStorageService.getUser(user.email);
    if (registeredUser && (user.password === registeredUser.password)) {
      return true;
    }
    return false;
  }

  authorizeUser(user: User) {
    const serialisedUser = JSON.stringify(user);
    localStorage.setItem('authorized user', serialisedUser);
  }
}
