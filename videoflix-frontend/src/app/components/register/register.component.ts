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
  buttondisabled: boolean = true;

  constructor(private as: AuthService, private router: Router) {}

  /**
   * This function navigates to Login
   *
   */
  navigateToLogin() {
    this.router.navigate(['/login']);
  }


  /**
   * This function navigates to the Mail Activation Page
   *
   */
  navigateToActivationPage(){
    this.router.navigate(['activatemail'])
  }

  /**
   * This function shows/hides the passwords of the Form
   *
   * @param passwordNumber - id to differ between the two password fields
   */
  showPassword(passwordNumber: any) {
    if (passwordNumber == 1) {
      this.show1 = !this.show1;
    }
    if (passwordNumber == 2) {
      this.show2 = !this.show2;
    }
  }

  /**
   * This function triggers the function to hide the errors and the function which sends the Registration request to the backend
   *
   */
  async registerUser() {
    if (this.password1 === this.password2) {
      this.hideErrors();
      await this.submitRegistration();
    }
  }

  /**
   * This function hides all the errors of the Registration form
   *
   */
  hideErrors(){
    this.usernameError = '';
    this.emailError = '';
    this.serverError = ''
  }

  /**
   * This function triggers the Register request to the backend and handles the response of the request (error handling, navigation to next page)
   *
   */
  async submitRegistration() {
    try {
      let response = await this.as.ResponseRegister(
        this.username,
        this.email,
        this.password1
      );
      this.navigateToActivationPage();
    } catch (e: any) {
      this.registerErrorHandling(e);
    }
  }

  registerErrorHandling(e: any){
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

  /**
   * This function validates the Register Form and disables/enables the submit button
   *
   */
  validateRegisterForm() {
    const form = this.getFormElement('register-form');
    const submitBtn = this.getFormElement('button-register');
    const inputs = form.querySelectorAll('input[type="text"], input[type="email"], input[type="password"]') as NodeListOf<HTMLInputElement>;
    const email = this.getInputValue('new-email');
    const pw1 = this.getInputValue('password1');
    const pw2 = this.getInputValue('password2');
    this.clearPasswordRequirements();
    const allFieldsFilled = this.areAllFieldsValid(inputs, email, pw1, pw2) && this.isPasswordValid(pw1);
    if (!this.isPasswordValid(pw1)) {
      this.showPasswordRequirements();
    }
    this.toggleSubmitButton(submitBtn, allFieldsFilled);
  }

  /**
   * This function gets the value of an HTML element
   *
   * @param {string} id - id of the HTML Element
   * @returns - The input of the HTML Element
   */
  getFormElement(id: string): HTMLElement {
    return document.getElementById(id) as HTMLElement;
  }

  /**
   * This function gets the value of an input field
   *
   * @param id - id of the input element
   * @returns - the input value or an empty element if the id doesnt exist
   */
  getInputValue(id: string): string {
    const input = document.getElementById(id) as HTMLInputElement;
    return input ? input.value.trim() : '';
  }

  /**
   * This function changes the requirements to black
   *
   */
  clearPasswordRequirements() {
    document.getElementById('register-requirements')?.classList.remove('pw-requirements-red');
  }

  /**
   * This function changes the requirements to red
   *
   */
  showPasswordRequirements() {
    document.getElementById('register-requirements')?.classList.add('pw-requirements-red');
  }

  /**
   * This function validates all the input fields of the Register form
   *
   * @param {NodeListOf} inputs - all inputs of the form
   * @param {string} email - the inserted email adress
   * @param {string} pw1 - the inserted password number 1
   * @param {string} pw2 - the inserted password number 2
   * @returns - the value of all fields filled (boolean)
   */
  areAllFieldsValid(inputs: NodeListOf<HTMLInputElement>, email: string, pw1: string, pw2: string): boolean {
    let allFieldsFilled = true;

    inputs.forEach((input) => {
      if (!input.value.trim() || !this.isValidEmail(email) || pw1 !== pw2) {
        allFieldsFilled = false;
      }
    });

    return allFieldsFilled;
  }

  /**
   * This function checks if the password meets the requirements
   *
   * @param {string} password - the inserted password
   * @returns - the boolean whether the password is right or wrong
   */
  isPasswordValid(password: string): boolean {
    const passwordRegex = /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/;
    return passwordRegex.test(password);
  }

  /**
   * This function toggles the submit button
   *
   * @param button - the HTML Element of the button
   * @param isEnabled - the information whether the button is enabled or not
   */
  toggleSubmitButton(button: HTMLElement, isEnabled: boolean) {
    (button as HTMLButtonElement).disabled = !isEnabled;
    this.buttondisabled = !isEnabled;
  }

  /**
   * This function validates the pattern of the mail address
   *
   * @param {string} email - the inserted email adress
   * @returns - the information whether the pattern of the mail adress is corrext or not
   */
  isValidEmail(email: any) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }
}
