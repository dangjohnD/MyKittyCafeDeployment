import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cat } from './cat';
import { AuthService } from './auth.service';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CatService {

  private blobBaseUrl = environment.blobBaseUrl;
  private sasToken = environment.sasToken;
  public apiUrl = environment.apiUrl +  '/cats'

  constructor(private http: HttpClient, private authService: AuthService) {}

  uploadFile(file: File, filename: string): Observable<any> {
    const fileUrl = `${this.blobBaseUrl}${filename}?${this.sasToken}`;
    const headers = new HttpHeaders({
      'x-ms-blob-type': 'BlockBlob',
      'Content-Type': file.type
    });

    return this.http.put(fileUrl, file, { headers });
  }

  addCat(cat: Cat): Observable<any>{
    const token = this.authService.getToken();
    const headers = { 
      Authorization: `Bearer ${token}` // Attach the token
    };
    return this.http.post<any>(this.apiUrl, cat, { headers });
  }

  deleteCatById(id: number): Observable<any> {
    const token = this.authService.getToken();
    const headers = { 
      Authorization: `Bearer ${token}` // Attach the token
    };
    return this.http.delete<any>(`${this.apiUrl}/${id}`, { headers });
  }

  updateCat(cat: Cat): Observable<any> {
    const token = this.authService.getToken();
    const headers = { 
      Authorization: `Bearer ${token}` // Attach the token
    };
  
    return this.http.put<any>(`${this.apiUrl}/${cat.id}`, cat, { headers });
  }

  getAllCats(): Observable<Cat[]>{
    return this.http.get<Cat[]>(this.apiUrl);
  }
  
}
