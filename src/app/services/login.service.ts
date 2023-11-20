import { Injectable } from '@angular/core';
import { UserStorageService } from './user-storage.service';
import { User } from '../models';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private userStorageService: UserStorageService) { }

  authorizeUser(email: string, password: string) {
    const registeredUser = this.userStorageService.getUser(email);
    if (registeredUser && (password === registeredUser.password)) {
      const user = {
        email: email,
        password: password
      }
      const serialisedUser = JSON.stringify(user);
      localStorage.setItem('authorized user', serialisedUser);
      return true;
    }
    return false;
  }
}
