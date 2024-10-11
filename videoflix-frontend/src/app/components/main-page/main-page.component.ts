import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent {
  videos: any = [];
  genres = ["animals", "mountains", "sea"];
  baseUrl = environment.baseUrl;

  constructor(private router: Router, private http: HttpClient) {
    this.getVideos();
   }

   /**
    * This function tryes to get alle the videos from the backend
    *
    */
  async getVideos(){
    const url = this.baseUrl + '/videos/';
    try {
      this.videos = await lastValueFrom(this.http.get(url));
      console.log(this.videos);
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  }

  /**
   * This function divides the videos from the backend into genres
   *
   * @param {any} genre - the genre to filter the videos for
   * @returns - an array with all the videos of the genre
   */
  filterVideos(genre: any){
    let filteredVideos: any = [];
    if (genre) {
      filteredVideos = this.videos.filter((videos: { genre: any; }) => videos.genre === genre)
    }else{
      filteredVideos = []
    }
    return filteredVideos;
  }
}
