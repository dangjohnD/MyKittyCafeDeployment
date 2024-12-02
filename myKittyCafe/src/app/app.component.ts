import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  userEmail: string | null = null;
  userType!: any;
  isMobile: boolean = false;
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(){
    this.authService.asObserver.subscribe(
      message => { this.userType = message}
    );

    this.checkScreenSize();
  }

  @HostListener('window:resize', [])
  onResize() {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isMobile = window.innerWidth <= 600; // Set mobile breakpoint
    console.log("screencheck")
  }

  navigateHome() {
    this.router.navigate(['/home']);
  }

  navigateToBooking() {
    this.router.navigate(['/booking']);
  }

  navigateToViewAll(){
    this.router.navigate(['/viewall']);
  }

  navigateToLogin(){
    this.router.navigate(['/login']);
  }

  navigateToRegister(){
    this.router.navigate(['/register']);
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/home']);
  }

  navigateToAdmin(){
    this.router.navigate(['/admin-board']);
  }
}