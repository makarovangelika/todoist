import { Injectable } from '@angular/core';
import { UserStorageService } from './user-storage.service';
import { User } from '../models';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  constructor(private userStorageService: UserStorageService) { }

  registerUser(user: User) {
    if (this.userStorageService.getUser(user.email)) {
      return false;
    }
    this.userStorageService.addUser(user);
    return true;
  }
}
