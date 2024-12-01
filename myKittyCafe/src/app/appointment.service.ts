import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Appointment } from './appointment';
import { LimitedApp } from './limitedApp';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  //public apiUrl = 'http://localhost:8080/api/appointments'
  public apiUrl = 'https://mykittycafeback.azurewebsites.net/api/appointments';
  constructor(private http: HttpClient, private authService: AuthService) { }

  addAppointment(appointment: Appointment): Observable<any> {
    return this.http.post<any>(this.apiUrl, appointment);
  }

  getAllAppointments(): Observable<Appointment[]> {
    const token = this.authService.getToken();
    const headers = { 
      Authorization: `Bearer ${token}` // Attach the token
    };

    return this.http.get<Appointment[]>(this.apiUrl,{ headers });
  }

  getAllLimitedApps(): Observable<LimitedApp[]>{
    return this.http.get<LimitedApp[]>(this.apiUrl + '/user');
  }

  getAppointmentsByEmails(email: String): Observable<Appointment[]>{
    return this.http.get<Appointment[]>(this.apiUrl + "/email/" + email);
  }

  deleteAppointmentById(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  deleteAppointmentByIdAdmin(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/admin/${id}`);
  }
  
}
