import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apptLimit } from './apptLimit';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApptLimitService {
  //public apiUrl = 'http://localhost:8080/api/appointments'
  public apiUrl = 'https://mykittycafeback.azurewebsites.net/api/limits';
  constructor(private http: HttpClient) { }

  addAppointmentLimit(apptLimit: apptLimit): Observable<any> {
    return this.http.post<any>(this.apiUrl, apptLimit);
  }
}
