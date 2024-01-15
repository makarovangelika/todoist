import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomError, UserForm } from 'src/app/models';
import { LoginService } from 'src/app/services/login.service';
import { SignUpService } from 'src/app/services/sign-up.service';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.scss']
})
export class SignUpPageComponent {

  registrationForm: FormGroup<UserForm> = new FormGroup<UserForm>({
    email: new FormControl(null, {validators: [Validators.required, Validators.email], updateOn: 'blur'}),
    password: new FormControl(null, [Validators.required, Validators.pattern('(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}')])
  })
  
  error: CustomError = null;

  constructor(private signUpService: SignUpService,
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
    
    this.signUpService.registerUser$(email, password).subscribe({
      next: user => {
        this.loginService.authorizeUser$(user.email, user.password).subscribe({
          next: authorizedUser => {
            this.router.navigate(['']);
          },
          error: error => {
            this.router.navigate(['/login']);
          }
        });
      },
      error: error => {
        if (error.message === 'ERR_EMAIL_EXISTS') {
          this.error = $localize `:@@ACCOUNT_WITH_THIS_EMAIL_ALREADY_EXISTS:Account with this email already exists`;
        }
      }
    });
  }
}
