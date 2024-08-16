import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ActivateYourMailComponent } from './components/activate-your-mail/activate-your-mail.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { VideoplayerComponent } from './components/videoplayer/videoplayer.component';
import { SuccesMailActivationComponent } from './components/succes-mail-activation/succes-mail-activation.component';
import { ActivateNewPwComponent } from './components/activate-new-pw/activate-new-pw.component';
import { ResetPwComponent } from './components/reset-pw/reset-pw.component';
import { SuccessPwResetComponent } from './components/success-pw-reset/success-pw-reset.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { ImprintComponent } from './components/imprint/imprint.component';

export const routes: Routes = [
  {path: '', component: LandingPageComponent },
  {path: 'login', component: LoginComponent },
  {path: 'register', component: RegisterComponent},
  {path: 'resetpw', component: ForgotPasswordComponent},
  {path: 'main', component: MainPageComponent},
  {path: 'activatemail', component: ActivateYourMailComponent},
  {path: 'video/:id', component: VideoplayerComponent},
  {path: 'register-succes', component: SuccesMailActivationComponent},
  {path: 'activate-new-pw', component: ActivateNewPwComponent},
  {path: 'reset-password/:uidb64/:mail', component: ResetPwComponent },
  {path: 'reset-succes', component: SuccessPwResetComponent},
  {path: 'privacy-policy', component: PrivacyPolicyComponent},
  {path: 'imprint', component: ImprintComponent},
];
