import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

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

  constructor(private as: AuthService) {}

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
