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
  private subscription: Subscription | undefined;

  constructor(private as: AuthService, private router: Router) {}

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  ngOnInit() {
    this.subscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateButtons(event.urlAfterRedirects);
      }
    });
  }

  updateButtons(url: string) {
    if (url === '/main') {
      this.showLoginButton = false;
      this.showLogoutButton = true;
    } else if (url === '/register' || url === '/resetpw') {
      this.showLoginButton = true;
      this.showLogoutButton = false;
    } else if (url === '/login' || url === '/') {
      this.showLoginButton = false;
      this.showLogoutButton = false;
    }
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  logOut(){
    localStorage.removeItem('token');
    this.navigateToLogin();
  }
}
