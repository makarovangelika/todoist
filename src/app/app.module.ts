import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { SignUpPageComponent } from './components/sign-up-page/sign-up-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { TasksPageComponent } from './components/tasks-page/tasks-page.component';
import { RouterModule, Routes } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { CheckboxModule } from 'primeng/checkbox';
import { TaskComponent } from './components/task/task.component';
import { FormsModule } from '@angular/forms';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { AddTaskDialogComponent } from './components/add-task-dialog/add-task-dialog.component';
import { EditTaskDialogComponent } from './components/edit-task-dialog/edit-task-dialog.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CalendarModule  } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { SidebarModule } from 'primeng/sidebar';
import { UserMenuComponent } from './components/user-menu/user-menu.component';
import { AddCategoryDialogComponent } from './components/add-category-dialog/add-category-dialog.component';

const appRoutes: Routes = [
  {path: '', component: SignUpPageComponent},
  {path: 'login', component: LoginPageComponent},
  {path: 'tasks', component: TasksPageComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    SignUpPageComponent,
    LoginPageComponent,
    TasksPageComponent,
    TaskComponent,
    AddTaskDialogComponent,
    EditTaskDialogComponent,
    UserMenuComponent,
    AddCategoryDialogComponent
  ],
  imports: [
    BrowserModule,
    InputTextModule,
    PasswordModule,
    ReactiveFormsModule,
    ButtonModule,
    DividerModule,
    CheckboxModule,
    DynamicDialogModule,
    ConfirmDialogModule,
    CalendarModule,
    DropdownModule,
    FormsModule,
    SidebarModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
