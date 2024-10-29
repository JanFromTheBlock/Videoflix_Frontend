import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-reset-pw',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reset-pw.component.html',
  styleUrl: './reset-pw.component.scss',
})
export class ResetPwComponent {
  email: string | null = '';
  buttondisabled: boolean = true;
  pwResetError: boolean = false;
  show1: boolean = false;
  show2: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) {
    this.getMailFromUrl();
  }

  ngOnInit() {}

  /**
   * This function gets the mail address from the URL
   *
   */
  getMailFromUrl() {
    this.route.paramMap.subscribe((paramMap) => {
      this.email = paramMap.get('mail');
    });
  }

  /**
   * This function triggers the backend request for a new password and handles the response from the bakcend
   *
   */
  async setNewPW() {
    try{
      this.pwResetError = false;
      let response = await this.safeNewPW();
      this.navigateToSucces();
    }catch(e: any){
      console.error('Error', e);
      this.pwResetError = true;
    }
  }

  /**
   * This function sends the bakcend request to set and safe the new password
   *
   * @returns response from the backend
   */
  async safeNewPW(){
    const email: any = document.getElementById('email_pw');
    const pw1: any = document.getElementById('new-pw1');
    const url = 'http://127.0.0.1:8000/set_new_pw/';
    const body = {
      email: email.value,
      pw: pw1.value,
    };
    return await lastValueFrom(this.http.post(url, body));
  }

  /**
   * This function navigates to succes page
   *
   */
  navigateToSucces() {
    this.router.navigate(['/reset-succes']);
  }

  validateResetForm() {
    const submitBtn = this.getFormElement('submitNewPw');
    const pw1 = this.getInputValue('new-pw1');
    const pw2 = this.getInputValue('new-pw2');
    this.clearPasswordRequirements();
    const isPasswordValid = this.isPasswordValid(pw1);
    const allFieldsFilled = this.arePasswordsMatching(pw1, pw2) && isPasswordValid;
    if (!isPasswordValid) {
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
    document.getElementById('reset-pw-requirements')?.classList.remove('pw-requirements-red');
  }

  /**
   * This function changes the requirements to red
   *
   */
  showPasswordRequirements() {
    document.getElementById('reset-pw-requirements')?.classList.add('pw-requirements-red');
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
   * This function comparesthe passwords and checks if the passwords are the same
   *
   * @param {string} pw1 - password number 1
   * @param {string} pw2 - password number 2
   * @returns the reslut of the check - false or true
   */
  arePasswordsMatching(pw1: string, pw2: string): boolean {
    return pw1 === pw2;
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
   * This function shows/hides the password
   *
   * @param passwordNumber - id of the password
   */
  showPassword(passwordNumber: any) {
    if (passwordNumber == 1) {
      this.show1 = !this.show1;
    }
    if (passwordNumber == 2) {
      this.show2 = !this.show2;
    }
  }
}
