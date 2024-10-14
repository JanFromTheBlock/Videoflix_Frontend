import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit, OnDestroy {
  showLogoutButton: boolean = false;
  showLoginButton: boolean = false;
  showDropdown: boolean = false;
  private subscription: Subscription | undefined;

  constructor(private as: AuthService, private router: Router) {}

  /**
   * This function unsubscribes the Router event, when the page is closed
   *
   */
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  /**
   * This function subsribes the router event, to update the buttons of the header, depending of the visited page
   *
   */
  ngOnInit() {
    this.subscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateButtons(event.urlAfterRedirects);
      }
    });
  }

  /**
   * This function switches the buttons of the header, depending of the visited page.
   *
   * @param {string} url - url of the current visited page
   */
  updateButtons(url: string) {
    if (url === '/main' || url.match(/^\/video\/\d+$/)) {
      this.showLoginButton = false;
      this.showLogoutButton = true;
    } else if (url === '/login' || url === '/' || url === '/privacy-policy' || url === '/imprint')  {
      this.showLoginButton = false;
      this.showLogoutButton = false;
    }else {
      this.showLoginButton = true;
      this.showLogoutButton = false;
    }
  }

  /**
   * This function navigates to Login
   *
   */
  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  /**
   * This function navigates to the main page.
   *
   */
  navigateToMain() {
    this.router.navigate(['/main']);
  }

  /**
   * This function navigates to the base page
   *
   */
  navigateToBase(){
    this.router.navigate(['/']);
  }

   /**
   * This function navigates to privacy policy
   *
   */
   navigateToPrivacy() {
    this.router.navigate(['/privacy-policy']);
  }

  /**
   * This function navigates to Imprint
   *
   */
  navigateToImprint() {
    this.router.navigate(['/imprint']);
  }

  /**
   * This function navigates, depending of the login status, to the main or base page
   *
   */
  goHome(){
    if (localStorage.getItem('LoggedIn') === 'true') {
      this.navigateToMain();
    }else{
      this.navigateToBase();
    }
  }

  /**
   * This function logouts the user and navigates to the login page
   *
   */
  logOut(){
    localStorage.removeItem('token');
    localStorage.setItem('LoggedIn', 'false');
    this.navigateToLogin();
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
}
