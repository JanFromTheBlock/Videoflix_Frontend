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

  getMailFromUrl() {
    this.route.paramMap.subscribe((paramMap) => {
      this.email = paramMap.get('mail');
      console.log('Got ID', this.email);
    });
  }

  async setNewPW() {
    console.log('Begin setNewPW');
    try{
      this.pwResetError = false;
      let response = await this.safeNewPW();
      console.log('Response received', response);
      this.navigateToSucces();
    }catch(e: any){
      console.error('Error', e);
      this.pwResetError = true;
    }
    console.log('End setNewPw');

  }

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

  navigateToSucces() {
    this.router.navigate(['/reset-succes']);
  }

  validateResetForm() {
    const submitBtn: any = document.getElementById('submitNewPw');
    const pw1Input = document.getElementById('new-pw1') as HTMLInputElement;
    let pw1 = pw1Input.value;
    const pw2Input = document.getElementById('new-pw2') as HTMLInputElement;
    let pw2 = pw2Input.value;
    document.getElementById('reset-pw-requirements')?.classList.remove('pw-requirements-red');

    const passwordInput: any = document.getElementById('new-pw1');
    const passwordValue = passwordInput.value.trim();
    const passwordRegex = /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/;
    const isPasswordValid = passwordRegex.test(passwordValue);

    let allFieldsFilled = true;

    if (pw1 !== pw2) {
      allFieldsFilled = false;
    }

    if(!isPasswordValid){
      allFieldsFilled = false
      document.getElementById('reset-pw-requirements')?.classList.add('pw-requirements-red');
    }

    submitBtn.disabled = !allFieldsFilled;
    this.buttondisabled = !allFieldsFilled;
  }

  showPassword(passwordNumber: any) {
    if (passwordNumber == 1) {
      this.show1 = !this.show1;
    }
    if (passwordNumber == 2) {
      this.show2 = !this.show2;
    }
  }
}
