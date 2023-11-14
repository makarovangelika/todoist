import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SignUpPageComponent } from './components/sign-up-page/sign-up-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { TasksPageComponent } from './components/tasks-page/tasks-page.component';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  {path: 'signup', component: SignUpPageComponent},
  {path: 'login', component: LoginPageComponent},
  {path: 'tasks', component: TasksPageComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    SignUpPageComponent,
    LoginPageComponent,
    TasksPageComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
