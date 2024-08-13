import { Component } from '@angular/core';
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
export class LoginComponent {
  username: any = '';
  password: any = '';
  show: boolean = false;
  combiError: string = '';
  serverError: string = '';
  buttondisabled: boolean = true;


  constructor(private as: AuthService, private router: Router) {
    debugger
    if (localStorage.getItem('LoggedIn') === 'true') {
      this.navigateToMainPage()
    }
    this.RememberLoginData();
  }

  RememberLoginData() {
    const user = localStorage.getItem('User');
    const password = localStorage.getItem('password');

    if (user !== null && password !== null) {
        this.username = user
        this.password = password;
        this.buttondisabled = false;
    }
}

  navigateToRegistration() {
    this.router.navigate(['/register']);
  }

  showPassword() {
    this.show = !this.show;
  }

  rememberUser(){
    this.as.rememberMe = !this.as.rememberMe
  }

  async login() {
    try {
      let resp: any = await this.as.loginWithUsernameAndPassword(
        this.username,
        this.password
      );
      console.log(resp);
      localStorage.setItem('token', resp['token'])
      localStorage.setItem('LoggedIn', 'true')
      if(this.as.rememberMe){
        localStorage.setItem('User', this.username);
        localStorage.setItem('password', this.password);
      }
      this.navigateToMainPage();
    } catch (e: any) {
      if (e.status === 400) {
        this.combiError = "The combination of username and password is not correct";
      } else {
        this.serverError =
          'An unexpected error occurred. Please try again later.';
      }
    }
  }

  navigateToMainPage(){
    this.router.navigate(['/main'])
  }

  navigateToForgotPassword(){
    this.router.navigate(['/resetpw'])
  }

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
