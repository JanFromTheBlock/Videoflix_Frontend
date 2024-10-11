import { Subscription } from 'rxjs';
import { Component } from '@angular/core';
import { LoaderService, LoaderState } from '../../services/loader.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading-animation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading-animation.component.html',
  styleUrl: './loading-animation.component.scss'
})
export class LoadingAnimationComponent {
  show = false
  public subscription: Subscription | undefined;
  constructor(private loader: LoaderService){ }

  /**
   * This function subscribes the loader Service and shows the loader animation if something is loading
   *
   */
  ngOnInit(){
    this.subscription = this.loader.loaderState.subscribe((state: LoaderState) => {
      this.show = state.show
    })
  }

  /**
   * This function ends the subscription of the loader sesrvice, when the app is closed
   *
   */
  ngOnDestroy(){
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }
}
