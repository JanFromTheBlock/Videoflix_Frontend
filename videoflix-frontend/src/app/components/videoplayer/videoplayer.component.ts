import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-videoplayer',
  standalone: true,
  imports: [],
  templateUrl: './videoplayer.component.html',
  styleUrl: './videoplayer.component.scss'
})
export class VideoplayerComponent {
  videoIdFromUrl: string | null = ''
  constructor(private route: ActivatedRoute){}

  ngOnInit(){
    this.route.paramMap.subscribe(paramMap => {
      this.videoIdFromUrl = paramMap.get('id');
      console.log('Got ID', this.videoIdFromUrl);

    })
  }
}
