import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apptLimit } from './apptLimit';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApptLimitService {
  //public apiUrl = 'http://localhost:8080/api/limit'
  public apiUrl = environment.apiUrl + '/limit';
  constructor(private http: HttpClient, private authService: AuthService) { }

  addAppointmentLimit(apptLimit: apptLimit): Observable<any> {
    const token = this.authService.getToken();
    const headers = { 
      Authorization: `Bearer ${token}` // Attach the token
    };
    return this.http.post<any>(this.apiUrl, apptLimit, { headers });
  }

  getAppointmentLimits(): Observable<apptLimit[]>{
    return this.http.get<any>(this.apiUrl);
  }

  getApptLimitByDate(limitDate: string): Observable<apptLimit>{
    console.log(this.apiUrl + "/date/" + limitDate);
    return this.http.get<apptLimit>(this.apiUrl + "/date/" + limitDate);
  }

}
