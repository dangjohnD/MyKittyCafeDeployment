import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Appointment } from './appointment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  //public apiUrl = 'http://localhost:8080/api/appointments'
  public apiUrl = 'https://mykittycafeback.azurewebsites.net/api/appointments';
  constructor(private http: HttpClient) { }

  addAppointment(appointment: Appointment): Observable<any> {
    return this.http.post<any>(this.apiUrl, appointment);
  }

  getAllAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(this.apiUrl);
  }

  getAppointmentsByEmails(email: string): Observable<Appointment[]> {
    const body = { email };  // Creating the request body object with the email
    return this.http.post<Appointment[]>(this.apiUrl + "/email", body);
}
}
