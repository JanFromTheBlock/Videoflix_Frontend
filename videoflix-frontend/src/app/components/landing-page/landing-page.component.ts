import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {
  emailForRegistration: string = ''

  constructor(private router: Router, private http: HttpClient) {
    this.getVideos;
   }

  getVideos(){
    const url = environment.baseUrl + '/videos/';
    let videos =  lastValueFrom(this.http.get(url));
    console.log(videos);

  }

  navigateToRegistration(){
    this.router.navigate(['/register'])
  }

  navigateToLogin(){
    this.router.navigate(['/login'])
  }
}
