import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  firstName = ''
  lastName = ''
  username = ''
  password = ''
  missingCredentials = false;
  existingUser = false;
  invalidEmail = false;
  success = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  handleRegister() {

    if (this.checkEmpty()){
      this.missingCredentials = true;
      return;
    }

    if (!this.validateEmail(this.username)){
      this.invalidEmail = true;
      return;
    }

    this.authService
      .register(this.firstName, this.lastName, this.username, this.password)
      .subscribe(
        (response) => {
          console.log('Response:', response.message);
          this.success = true;
        },
        (error) => {
          if (error.status === 409) {
            console.error('Username already exists:', error.error);
            this.existingUser = true;
          } else {
            console.error('An error occurred:', error);
            // Handle other errors accordingly
          }
        }
      );


      this.clear();
  }

  checkEmpty(): boolean{
    return (this.firstName == '' ||
      this.lastName == '' ||
      this.username == '' ||
      this.password == '')
  }

  validateEmail(email: string): boolean {
    // Regex for basic email validation
    const emailPattern: RegExp =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }

  clear(){
    this.firstName = ''
    this.lastName = ''
    this.username = ''
    this.password = ''
    this.missingCredentials = false;
    this.existingUser = false;
    this.invalidEmail = false;
  }
}
