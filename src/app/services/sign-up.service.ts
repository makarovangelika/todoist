import { Injectable } from '@angular/core';
import { UserStorageService } from './user-storage.service';
import { User } from '../models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  constructor(private userStorageService: UserStorageService) { }

  registerUser(email: string, password: string): Observable<User> {
    const registration = new Observable<User>(subscriber => {
      if (this.userStorageService.getUser(email)) {
        subscriber.error(new Error("ERR_EMAIL_EXISTS"));
        return;
      }
      const user = {
        email: email,
        password: password,
      }
      this.userStorageService.addUser(user);
      subscriber.next(user);
      subscriber.complete();
    })
    return registration;
  }
}
