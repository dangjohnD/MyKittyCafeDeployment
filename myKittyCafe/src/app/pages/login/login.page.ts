import { Component, OnInit } from '@angular/core';
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

  constructor(private authService: AuthService) { }

  ngOnInit() {}


  handleLogin(){

    if (this.username == '' || this.password == ''){
      this.missingCredentials = true;
      return;
    }
    //
    this.authService.login(this.username, this.password).subscribe(
      (response) => {
        console.log(response.message);
        this.authService.setMessage("employee");
      },
      (res) => {
        console.log('Error logging in:', res.error);
        this.wrongCredentials = true;
      }
    );
  }


}
