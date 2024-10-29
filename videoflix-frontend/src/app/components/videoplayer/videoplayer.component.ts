import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-videoplayer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './videoplayer.component.html',
  styleUrl: './videoplayer.component.scss'
})
export class VideoplayerComponent {
  videoIdFromUrl: string | null = '';
  videoAvailable: boolean = true;
  baseUrl = environment.baseUrl;
  showDropdown: boolean = false;
  videoQuality: any = 'medium';
  video: any = {
    create_at: '',
    description: '',
    genre: '',
    id: '',
    thumbnail: '',
    title: '',
    video_file: '',
  };

  constructor(private route: ActivatedRoute, private http: HttpClient){}

  /**
   * This function triggers some functions when the page is opened to get right video and the right resolution of the video.
   *
   */
  async ngOnInit(){
    this.getIdFromUrl();
    await this.getVideoToPlay();
    this.getNewVideoSrc('720')
  }

  /**
   * This function gets the id of the video from the url
   *
   */
  getIdFromUrl(){
    this.route.paramMap.subscribe(paramMap => {
      this.videoIdFromUrl = paramMap.get('id');
    })
  }

  /**
   * This function makes the bakcend request for the desired video and handles the response
   *
   */
  async getVideoToPlay(){
    const url = this.baseUrl + '/single_video?video_id=' + this.videoIdFromUrl;
    try {
      this.video = await lastValueFrom(this.http.get(url));
      this.videoAvailable = true;
    } catch (error: any) {
      if (error.status === 400) {
        this.videoAvailable = false;
      }
      console.error('Error fetching videos:', error);
    }
  }

  /**
   * This function toggles the dropdown menu of the resolution
   *
   */
  toggleDropdown(){
    this.showDropdown = !this.showDropdown;
  }

  /**
   * This function closes the dropdown menu
   *
   */
  closeDropdown(){
    this.showDropdown = false;
  }

  /**
   * This function prevents the dropdown to get closed
   *
   * @param {MouseEvent} event - the event that would be triggered bei the mouse click
   */
  dontClose(event: MouseEvent){
    event.stopPropagation();
  }

  /**
   * This function changes the resoluton to the desire quality
   *
   * @param {string} quality - the quality of the resoliution ()low, medium, high)
   * @param {string} resolution - the value of the resolution in pixel (480, 720, 1080)
   */
  changeVideoQuality(quality: string, resolution: any){
    this.toggleDropdown();
    this.videoQuality = quality
    this.getNewVideoSrc(resolution);
  }

  /**
   * This function calcualtes the new url of the video after changing the resolution and sets the new source url
   *
   * @param resolution - the value of the resolution in pixel (480, 720, 1080)
   */
  getNewVideoSrc(resolution: string){
    let source = this.video.video_file;
    let parts: any = source?.split('.', 2);
    let newSource = this.baseUrl + parts[0] + '_' + resolution + 'p.' + parts[1];
    document.getElementById('video')?.setAttribute('src', newSource);


  }
}
