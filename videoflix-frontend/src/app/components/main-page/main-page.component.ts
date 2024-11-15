import { HttpClient } from '@angular/common/http';
import { Component, Renderer2, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
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
export class MainPageComponent implements AfterViewInit{
  @ViewChild('thumbnailBig', {static: false}) thumbnailBig!: ElementRef<HTMLImageElement>;
  videos: any = [];
  genres = ["animals", "mountains", "sea"];
  baseUrl = environment.baseUrl;
  selectedVideo: any = null;

  constructor(private router: Router, private http: HttpClient, private renderer: Renderer2) {   }

   ngAfterViewInit(){
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
      if (this.videos.length > 0) {
        setTimeout(() => this.setRandomThumbnail(), 10);
      }
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  }

  setRandomThumbnail() {
    this.selectedVideo = this.videos[Math.floor(Math.random() * this.videos.length)];
    const thumbnailUrl = `${this.baseUrl}${this.selectedVideo.thumbnail}`;
    this.thumbnailBig.nativeElement.src = thumbnailUrl;
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
