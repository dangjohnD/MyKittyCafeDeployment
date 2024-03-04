import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Appointment } from './appointment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private apiUrl = 'http://localhost:8080/api/appointments';

  constructor(private http: HttpClient) { }

  addAppointment(appointment: Appointment): Observable<any> {
    return this.http.post<any>(this.apiUrl, appointment);
  }
}
