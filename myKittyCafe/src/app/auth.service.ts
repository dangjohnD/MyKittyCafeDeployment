import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public username!: string;
  public password!: string;
  public apiUrl = 'http://localhost:8080/api';
  message = new BehaviorSubject<any>('');
  asObserver = this.message.asObservable();

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    console.log('Logging in with username:', username);
    return this.http.post<any>(this.apiUrl + '/login', { username, password });
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
    this.setMessage('');
  }

  setMessage(msg: any){
    this.message.next(msg);
  }
}