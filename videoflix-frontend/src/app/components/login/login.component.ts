import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  show: boolean = false;

  constructor(private as: AuthService, private router: Router) {}

  navigateToRegistration() {
    this.router.navigate(['/register']);
  }

  showPassword() {
    this.show = !this.show;
  }

  async login() {
    try {
      let resp = await this.as.loginWithUsernameAndPassword(
        this.username,
        this.password
      );
      console.log(resp);
      //redirect
    } catch (e) {
      //show Error message
      console.error(e);
    }
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
  }
}
