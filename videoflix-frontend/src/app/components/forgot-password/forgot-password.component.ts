import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { catchError, lastValueFrom, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {
  email: string = "";
  serverError: string = '';
  emailError: string = ''
  buttondisabled: boolean = true;

  constructor(private http: HttpClient, private router: Router) { }

  registerUser(){
      this.Registration().then(response => {
        console.log("Email sent successfully.");
        this.navigateToActivatePw();
      }).catch((e: any) => {
        if (e.status === 404) {
          this.emailError = "Email address not found.";
        } else if (e.status === 500) {
          this.emailError = "Password reset for this email is not possible.";
        } else {
          this.serverError = 'An unexpected error occurred. Please try again later.';
        }
      });
  }

  navigateToActivatePw(){
    this.router.navigate(['/activate-new-pw']);
  }

  Registration(){
    const url = environment.baseUrl + '/reset_pw/'
    const body = {
      "email": this.email,
    };
    return lastValueFrom(this.http.post(url, body).pipe(
      catchError(err => {
        return throwError(err);
      })
    )
  );
}

  validateMailForm(){

    const submitBtn: any = document.getElementById('submitBtnResetPw');
    const emailInput = document.getElementById('resetmail') as HTMLInputElement;
    let email = emailInput.value;
    let allFieldsFilled = true;
    if(!this.isValidEmail(email)){
      allFieldsFilled = false
    }
    submitBtn.disabled = !allFieldsFilled;
    this.buttondisabled = !allFieldsFilled;
  }

  isValidEmail(email: any) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email)
}
}
