import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password1: string = '';
  password2: string = '';
  show1: boolean = false;
  show2: boolean = false;
  usernameError: string = '';
  emailError: string = '';
  serverError: string = '';

  constructor(private as: AuthService, private router: Router) {}

  navigateToLogin() {
    this.router.navigate(['/login']);
  }


  navigateToActivationPage(){
    this.router.navigate(['activatemail'])
  }

  showPassword(passwordNumber: any) {
    if (passwordNumber == 1) {
      this.show1 = !this.show1;
    }
    if (passwordNumber == 2) {
      this.show2 = !this.show2;
    }
  }

  async registerUser() {
    if (this.password1 === this.password2) {
      await this.submitRegistration();
    }
  }

  async submitRegistration() {
    try {
      let response = await this.as.ResponseRegister(
        this.username,
        this.email,
        this.password1
      );
      console.log(response);
      this.navigateToActivationPage();
    } catch (e: any) {
      if (e && e.error && e.error.errors) {
        if (e.error.errors.username) {
          this.usernameError = e.error.errors.username;
        }
        if (e.error.errors.email) {
          this.emailError = e.error.errors.email;
        } else if (
          e.status === 0 ||
          e.status === 400 ||
          (e.message && e.message.includes('ERR_CONNECTION_REFUSED'))
        ) {
          this.serverError = 'Server not reachable. Please try again later.';
        }
      }else{
        this.serverError = 'An unexpected error occurred. Please try again later.';
      }
    }
  }

  validateRegisterForm() {
    const form: any = document.getElementById('register-form');
    const submitBtn: any = document.getElementById('button-register');
    const inputs = form.querySelectorAll(
      'input[type="text"], input[type="email"], input[type="password"]'
    );
    const emailInput = document.getElementById('new-email') as HTMLInputElement;
    let email = emailInput.value;
    const pw1Input = document.getElementById('password1') as HTMLInputElement;
    let pw1 = pw1Input.value;
    const pw2Input = document.getElementById('password2') as HTMLInputElement;
    let pw2 = pw2Input.value;
    let allFieldsFilled = true;

    inputs.forEach((input: { value: string }) => {
      if (!input.value.trim() || !this.isValidEmail(email) || pw1 != pw2) {
        allFieldsFilled = false;
      }
    });
    submitBtn.disabled = !allFieldsFilled;
  }

  isValidEmail(email: any) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }
}
