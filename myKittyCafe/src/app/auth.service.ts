import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly TOKEN_KEY = 'authToken';
  public username!: string;
  public password!: string;
  public apiUrl = environment.apiUrl;
  message = new BehaviorSubject<any>('');
  asObserver = this.message.asObservable();

  constructor(private http: HttpClient) {
    this.initializeFromToken();
  }

  private initializeFromToken() {
    const token = this.getToken();
    if (token) {
      const decodedToken = this.decodeToken(token);
      if (decodedToken) {
        const isExpired = this.isTokenExpired(decodedToken);
        if (!isExpired && decodedToken.sub) {
          // Set the username from the token's "sub" claim
          console.log(decodedToken.sub);
          this.setMessage(decodedToken.sub);
          return;
        }
      }
      this.logout(); // Clear invalid or expired token
    }
  }

  
/*
  login(username: string, password: string): Observable<any> {
    console.log('Logging in with username:', username);
    return this.http.post<any>(this.apiUrl + '/login', { username, password });
  }
  */

  login(username: string, password: string): Observable<any> {
    console.log("logging in");
    return new Observable((observer) => {
      this.http
        .post<any>(`${this.apiUrl}/login`, { username, password })
        .subscribe(
          (response) => {
            console.log(response)
            if (response.token) {
              this.storeToken(response.token);
              const decodedToken = this.decodeToken(response.token);
              if (decodedToken && decodedToken.sub) {
                this.setMessage(decodedToken.sub);
              }
              observer.next(response);
              observer.complete();
            } else {
              observer.error('No token returned from login');
            }
          },
          (error) => {
            observer.error(error);
          }
        );
    });
  }

  registerSuccessfulLogin(username: string, password: string) {
    console.log('User logged in successfully:', username);
    // Additional actions after successful login (if needed)
  }

  register(firstName: string, lastName: string, username: string, password: string){
    return this.http.post<any>(this.apiUrl + '/users',
    {firstName, lastName, username, password})
  }

  logout(){
    localStorage.removeItem(this.TOKEN_KEY);
    this.setMessage('');
  }

  setMessage(msg: any){
    this.message.next(msg);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  private storeToken(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  /**
   * Decodes a JWT token.
   */
  private decodeToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch (error) {
      console.error('Failed to decode token:', error);
      return null;
    }
  }

  private isTokenExpired(decodedToken: any): boolean {
    const now = Math.floor(Date.now() / 1000); // Current time in seconds
    return decodedToken.exp && decodedToken.exp < now;
  }

}