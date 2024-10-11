import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

  constructor(private router: Router){

  }


  /**
   * This function navigates to privacy policy
   *
   */
  navigateToPrivacy(){
    this.router.navigate(['/privacy-policy']);
  }

  /**
   * This function navigates to Imprint
   *
   */
  navigateToImprint(){
    this.router.navigate(['/imprint']);
  }
}
