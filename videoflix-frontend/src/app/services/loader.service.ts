import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface LoaderState {
  show: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private loaderSubject = new Subject<LoaderState>();
  loaderState = this.loaderSubject.asObservable();
  constructor() { }

  /**
   * This function sets the Loader State to true, so that the loader animation starts
   *
   */
  show(){
    this.loaderSubject.next(<LoaderState>{ show: true})
  }

  /**
   * This function sets the Loader State to false, so that the loader animation endes
   *
   */
hide(){
  this.loaderSubject.next(<LoaderState>{ show: false})
}
}
