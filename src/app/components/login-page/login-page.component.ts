import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomError, UserForm } from 'src/app/models';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  authForm: FormGroup<UserForm> = new FormGroup<UserForm>({
    email: new FormControl(null, {validators: [Validators.required, Validators.email], updateOn: 'blur'}),
    password: new FormControl(null, Validators.required)
  })
  error: CustomError = null;

  constructor(private loginService: LoginService,
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
      this.loginService.authorizeUser$(email, password).subscribe({
        next: authorizedUser => {
          this.router.navigate(['']);
        },
        error: error => {
          if (error.message === 'ERR_INVALID_EMAIL_OR_PASSWORD') {
            this.error = $localize `:@@INVALID_EMAIL_OR_PASSWORD:Invalid email or password`;
          }
        }
      });
  }
}
