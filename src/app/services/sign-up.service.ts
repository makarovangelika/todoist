import { Injectable } from '@angular/core';
import { UserStorageService } from './user-storage.service';
import { User } from '../models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  constructor(private userStorageService: UserStorageService) { }

  registerUser(user: User): Observable<User> {
    const registration = new Observable<User>(subscriber => {
      if (this.userStorageService.getUser(user.email)) {
        subscriber.error(new Error("Учётная запись с таким email уже зарегистрирована"));
        return;
      }
      this.userStorageService.addUser(user);
      subscriber.next(user);
      subscriber.complete();
    })
    return registration;
  }
}
