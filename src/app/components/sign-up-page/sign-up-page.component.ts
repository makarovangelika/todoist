import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models';
import { LoginService } from 'src/app/services/login.service';
import { SignUpService } from 'src/app/services/sign-up.service';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.scss']
})
export class SignUpPageComponent {

  registrationForm = this.fb.group({
    email: ['', {validators: [Validators.required, Validators.email], updateOn: 'blur'}],
    password: ['', [Validators.required, Validators.pattern('(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}')]]
  })
  error = '';

  constructor(private fb: FormBuilder,
              private signUpService: SignUpService,
              private router: Router,
              private loginService: LoginService) {}
  
  get email() {
    return this.registrationForm.get('email');
  }
  get password() {
    return this.registrationForm.get('password');
  }

  signUp() {
    const email = this.registrationForm.value.email as string;
    const password = this.registrationForm.value.password as string;
    
    this.signUpService.registerUser(email, password).subscribe({
      next: user => {
        this.loginService.authorizeUser(user.email, user.password).subscribe({
          next: authorizedUser => {
            this.router.navigate(['/tasks']);
          },
          error: error => {
            this.router.navigate(['/login']);
          }
        });
      },
      error: error => {
        if (error.message === 'ERR_EMAIL_EXISTS') {
          this.error = 'Учётная запись с таким email уже зарегистрирована';
        }
      }
    });
  }
}
