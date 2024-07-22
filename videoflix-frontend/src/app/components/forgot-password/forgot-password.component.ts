import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {
  email: string = "";

  constructor(private http: HttpClient) { }

  registerUser(){
    const url = environment.baseUrl + '/reset_pw/'
    const body = {
      "email": this.email,
    };
    return lastValueFrom(this.http.post(url, body));
  }
}
