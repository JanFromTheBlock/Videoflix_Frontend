import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password1: string = '';
  password2: string = '';
  show1: boolean = false;
  show2: boolean = false;

  constructor(private as: AuthService, private router: Router) {}

  navigateToLogin(){
    this.router.navigate(['/login'])
  }

  showPassword(passwordNumber: any) {
    if (passwordNumber == 1) {
      this.show1 = !this.show1;
    }
    if (passwordNumber == 2) {
      this.show2 = !this.show2;
    }

}

  async registerUser(){
    if(this.password1 === this.password2){
      await this.submitRegistration();
    }
  }

  async submitRegistration(){
    try{
      let response = await this.as.ResponseRegister(this.username, this.email, this.password1);
      console.log(response);
        //REDIRECT
      }catch (e){
      console.error('an error occured', e);
    }
  }
}
