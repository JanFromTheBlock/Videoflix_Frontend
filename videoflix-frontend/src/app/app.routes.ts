import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ActivateYourMailComponent } from './components/activate-your-mail/activate-your-mail.component';
import { MainPageComponent } from './components/main-page/main-page.component';

export const routes: Routes = [
  {path: '', component: LandingPageComponent },
  {path: 'login', component: LoginComponent },
  {path: 'register', component: RegisterComponent},
  {path: 'resetpw', component: ForgotPasswordComponent},
  {path: 'main', component: MainPageComponent},
  {path: 'activatemail', component: ActivateYourMailComponent},
];
