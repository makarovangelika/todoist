import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { SignUpPageComponent } from './components/sign-up-page/sign-up-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { TasksPageComponent } from './components/tasks-page/tasks-page.component';
import { RouterModule, Routes, provideRouter } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { CheckboxModule } from 'primeng/checkbox';
import { TaskComponent } from './components/task/task.component';
import { FormsModule } from '@angular/forms';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CalendarModule  } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { SidebarModule } from 'primeng/sidebar';
import { UserMenuComponent } from './components/user-menu/user-menu.component';
import { AddCategoryDialogComponent } from './components/add-category-dialog/add-category-dialog.component';
import { MenuModule } from 'primeng/menu';
import { EditCategoryDialogComponent } from './components/edit-category-dialog/edit-category-dialog.component';
import { TooltipModule } from 'primeng/tooltip';
import { FilterComponent } from './components/filter/filter.component';
import { AdditionalFiltersComponent } from './components/additional-filters/additional-filters.component';
import { ChipModule } from 'primeng/chip';
import { FilterChipsComponent } from './components/filter-chips/filter-chips.component';
import { authGuard } from './guards/auth-guard';
import { TaskDialogComponent } from './components/task-dialog/task-dialog.component';

const appRoutes: Routes = [
  {path: 'signup', component: SignUpPageComponent},
  {path: 'login', component: LoginPageComponent},
  {path: '', component: TasksPageComponent, canActivate: [authGuard]}
]

@NgModule({
  declarations: [
    AppComponent,
    SignUpPageComponent,
    LoginPageComponent,
    TasksPageComponent,
    TaskComponent,
    UserMenuComponent,
    AddCategoryDialogComponent,
    EditCategoryDialogComponent,
    FilterComponent,
    AdditionalFiltersComponent,
    FilterChipsComponent,
    TaskDialogComponent
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
    MenuModule,
    TooltipModule,
    ChipModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [provideRouter(appRoutes)],
  bootstrap: [AppComponent]
})
export class AppModule { }
