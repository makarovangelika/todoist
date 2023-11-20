import { Injectable } from '@angular/core';
import { UserStorageService } from './user-storage.service';
import { User } from '../models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private userStorageService: UserStorageService) { }

  authorizeUser(email: string, password: string): Observable<User> {
    const registeredUser = this.userStorageService.getUser(email);
    const authorization = new Observable<User>(subscriber => {
      if (registeredUser && (password === registeredUser.password)) {
        const user = {
          email: email,
          password: password
        }
        const serialisedUser = JSON.stringify(user);
        localStorage.setItem('authorized user', serialisedUser);
        subscriber.next(user);
        subscriber.complete();
      } else {
        subscriber.error(new Error('ERR_INVALID_EMAIL_OR_PASSWORD'));
        return;
      }
    });
    return authorization;
  }
}
