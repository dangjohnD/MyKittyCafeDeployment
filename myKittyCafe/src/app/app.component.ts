import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  userType!: any;
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(){
    this.authService.asObserver.subscribe(
      message => { this.userType = message}
    );
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
}