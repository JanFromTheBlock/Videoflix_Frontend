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

  async ngOnInit(){
    this.getIdFromUrl();
    await this.getVideoToPlay();
    this.getNewVideoSrc('720')
  }

  getIdFromUrl(){
    this.route.paramMap.subscribe(paramMap => {
      this.videoIdFromUrl = paramMap.get('id');
      console.log('Got ID', this.videoIdFromUrl);
    })
  }

  async getVideoToPlay(){
    const url = this.baseUrl + '/single_video?video_id=' + this.videoIdFromUrl;
    try {
      this.video = await lastValueFrom(this.http.get(url));
      this.videoAvailable = true;
      console.log('video', this.video);
    } catch (error: any) {
      if (error.status === 400) {
        this.videoAvailable = false;
      }
      console.error('Error fetching videos:', error);
    }
  }

  toggleDropdown(){
    this.showDropdown = !this.showDropdown;
  }

  closeDropdown(){
    this.showDropdown = false;
  }

  dontClose(event: MouseEvent){
    event.stopPropagation();
  }

  changeVideoQuality(quality: string, resolution: any){
    this.toggleDropdown();
    this.videoQuality = quality
    console.log(this.videoQuality);
    this.getNewVideoSrc(resolution);
  }

  getNewVideoSrc(resolution: string){
    let source = this.video.video_file;
    console.log(source);

    let parts: any = source?.split('.', 2);
    let newSource = this.baseUrl + parts[0] + '_' + resolution + 'p.' + parts[1];
    console.log(newSource);
    document.getElementById('video')?.setAttribute('src', newSource);


  }
}
