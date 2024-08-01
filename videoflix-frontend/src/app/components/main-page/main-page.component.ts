import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent {
  videos: any = [];
  baseUrl = environment.baseUrl;

  constructor(private router: Router, private http: HttpClient) {
    this.getVideos();
   }

  async getVideos(){
    const url = this.baseUrl + '/videos/';
    try {
      this.videos = await lastValueFrom(this.http.get(url));
      console.log(this.videos);
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  }
}
