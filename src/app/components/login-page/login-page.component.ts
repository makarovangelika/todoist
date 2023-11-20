import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  authForm = this.fb.group({
    email: ['', {validators: [Validators.required, Validators.email], updateOn: 'blur'}],
    password: ['', Validators.required]
  })
  error = '';

  constructor(private fb: FormBuilder,
              private loginService: LoginService,
              private router: Router) {}
  
  get email() {
    return this.authForm.get('email');
  }
  get password() {
    return this.authForm.get('password');
  }

  login() {
      const email = this.authForm.value.email as string;
      const password = this.authForm.value.password as string;
      this.loginService.authorizeUser(email, password).subscribe({
        next: authorizedUser => {
          this.router.navigate(['/tasks']);
        },
        error: error => {
          if (error.message === 'ERR_INVALID_EMAIL_OR_PASSWORD') {
            this.error = 'Неверно введены email или пароль';
          }
        }
      });
  }
}
