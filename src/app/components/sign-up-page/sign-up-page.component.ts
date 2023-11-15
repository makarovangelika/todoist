import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models';
import { SignUpService } from 'src/app/services/sign-up.service';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.scss']
})
export class SignUpPageComponent {

  registrationForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern('(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}')]]
  })

  constructor(private fb: FormBuilder,
              private signUpService: SignUpService,
              private router: Router) {}

  signUp() {
    const signupSucess = this.signUpService.registerUser({
      email: this.registrationForm.value.email as string,
      password: this.registrationForm.value.password as string,
    });
    if (signupSucess) {
      this.router.navigate(['/tasks']);
    }
  }
}
