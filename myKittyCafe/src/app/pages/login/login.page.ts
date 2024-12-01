import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'cypress/types/lodash';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username = '';
  password = '';
  errorMsg = "Invalid Credentials"
  message!: string;
  wrongCredentials = false;
  missingCredentials = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {}


  handleLogin(){
    this.wrongCredentials = false;
    this.missingCredentials = false;

    if (this.username == '' || this.password == ''){
      this.missingCredentials = true;
      return;
    }
    // Handle Log in
    this.authService.login(this.username, this.password).subscribe(
      (response) => {
        console.log(response.message);
        if (this.username == "admin@gmail.com"){
          this.authService.setMessage(this.username);
        }
        this.authService.setMessage(this.username);
        this.router.navigate(['/home']);
      },
      (res) => {
        console.log('Error logging in:', res.error);
        this.wrongCredentials = true;
      }
    );
  }


}
