import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {
  emailForRegistration: string = '';

  constructor(private router: Router, private http: HttpClient) {
   }

  /**
   * This function navigates to Registration
   *
   */
  navigateToRegistration(){
    this.router.navigate(['/register'])
  }

  /**
   * This function navigates to login page
   *
   */
  navigateToLogin(){
    this.router.navigate(['/login'])
  }
}
