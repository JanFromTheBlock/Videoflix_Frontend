import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements AfterViewInit {
  username: any = '';
  password: any = '';
  show: boolean = false;
  combiError: string = '';
  serverError: string = '';
  buttondisabled: boolean = true;

  constructor(
    private as: AuthService,
    private router: Router,
    private cdRef: ChangeDetectorRef
  ) {
    if (localStorage.getItem('LoggedIn') === 'true') {
      this.navigateToMainPage();
    }
  }

  /**
   * This function triggers when the page finished loading.
   *
   */
  ngAfterViewInit() {
    this.RememberLoginData();
    this.cdRef.detectChanges();
  }

  /**
   * This function inserts the remembered login data, if available,  in the login field
   *
   */
  RememberLoginData() {
    const user = localStorage.getItem('User');
    const password = localStorage.getItem('password');

    if (user !== null && password !== null) {
      this.username = user;
      this.password = password;
      this.buttondisabled = false;
      document.getElementById('checkbox')?.click();
    }
  }

  /**
   * This function navigates to the Regiastration page
   *
   */
  navigateToRegistration() {
    this.router.navigate(['/register']);
  }

  /**
   * This function shows or hides the password
   *
   */
  showPassword() {
    this.show = !this.show;
  }

  /**
   * This function triggers a service which remember or forget login data of the user
   *
   */
  rememberUser() {
    this.as.rememberMe = !this.as.rememberMe;
  }

  /**
   * This function hides all the errors
   *
   */
  hideErrors() {
    this.combiError = '';
    this.serverError = '';
  }

  /**
   * This function triggers the login-request to the backend and handles the answer of the request
   *
   */
  async login() {
    this.hideErrors();
    try {
      let resp: any = await this.as.loginWithUsernameAndPassword(
        this.username,
        this.password
      );
      this.saveLoginInFrontend(resp);
      if (this.as.rememberMe) {
        this.saveUserData();
      } else {this.deleteUserData();}
      this.navigateToMainPage();
    } catch (e: any) { this.LoginErrorHandling(e);}
  }

  /**
   * This function saves the token and the information that the user is logged in in the local storage of the browser
   *
   * @param {any} resp - answer of the Backend
   */
  saveLoginInFrontend(resp: any) {
    localStorage.setItem('token', resp['token']);
    localStorage.setItem('LoggedIn', 'true');
  }

  /**
   * This function deletes the Login information of the user from the local storage
   *
   */
  deleteUserData() {
    localStorage.removeItem('User');
    localStorage.removeItem('password');
  }

  /**
   * This function saves the Login information of the user in the local storage
   *
   */
  saveUserData() {
    localStorage.setItem('User', this.username);
    localStorage.setItem('password', this.password);
  }

  /**
   * This function handles possible errors, when somethin went wrong with the Login request to the backend
   *
   * @param {any} e - the error from the backend response
   */
  LoginErrorHandling(e: any) {
    if (e.status === 400) {
      this.combiError =
        'The combination of username and password is not correct';
    } else if (
      e.status === 403 &&
      e.error?.detail === 'Account is not activated. Please check your email.'
    ) {
      this.combiError =
        'Your account is not yet activated. Please check your email for the activation link.';
    } else {
      this.serverError =
        'An unexpected error occurred. Please try again later.';
    }
  }

  /**
   * This function navigates to main page
   *
   */
  navigateToMainPage() {
    this.router.navigate(['/main']);
  }

  /**
   * This function navigates to Forgot Password page
   *
   */
  navigateToForgotPassword() {
    this.router.navigate(['/resetpw']);
  }

  /**
   * This function validates the password and unsername to enable/disable the Login-button
   *
   */
  validateLoginForm() {
    const form: any = document.getElementById('login-form');
    const submitBtn: any = document.getElementById('button-login');
    const inputs = form.querySelectorAll(
      'input[type="text"], input[type="password"]'
    );
    let allFieldsFilled = true;
    inputs.forEach((input: { value: string }) => {
      if (!input.value.trim()) {
        allFieldsFilled = false;
      }
    });
    submitBtn.disabled = !allFieldsFilled;
    this.buttondisabled = !allFieldsFilled;
  }
}
