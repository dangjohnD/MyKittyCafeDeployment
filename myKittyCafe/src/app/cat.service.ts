import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cat } from './cat';

@Injectable({
  providedIn: 'root'
})
export class CatService {

  private blobBaseUrl = 'https://publicstoragemkc.blob.core.windows.net/demoblob/';
  private sasToken = 'sv=2022-11-02&ss=bfqt&srt=co&sp=rwdlacupiytfx&se=2025-05-01T08:51:18Z&st=2024-10-31T00:51:18Z&spr=https,http&sig=G%2F3EyjsnSrrNfKhFOAxnDEw7WGQ8J4EgWmFqK6PYjPk%3D';
  public apiUrl = 'https://mykittycafeback.azurewebsites.net/api/cats'

  constructor(private http: HttpClient) {}

  uploadFile(file: File, filename: string): Observable<any> {
    const fileUrl = `${this.blobBaseUrl}${filename}?${this.sasToken}`;
    const headers = new HttpHeaders({
      'x-ms-blob-type': 'BlockBlob',
      'Content-Type': file.type
    });

    return this.http.put(fileUrl, file, { headers });
  }

  addCat(cat: Cat): Observable<any>{
    return this.http.post<any>(this.apiUrl, cat);
  }

  getAllCats(): Observable<Cat[]>{
    return this.http.get<Cat[]>(this.apiUrl);
  }
}
