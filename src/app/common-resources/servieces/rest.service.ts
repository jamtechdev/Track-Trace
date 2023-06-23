// import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/envoirnment/env';
import { Observable } from 'rxjs';
import { LocalstoreService } from './localstore.service';

@Injectable({
  providedIn: 'root',
})
export class RestService {
  constructor(private http: HttpClient, public localStore: LocalstoreService) {}

  apiurl = environment?.Base_URL;
  public get<T>(url: string): Observable<T> {
    return this.http.get<T>(`${this.apiurl}${url}`, this.Header1());
  }

  public post<T>(data: any, url: string): Observable<T> {
    return this.http.post<T>(`${this.apiurl}${url}`, data, this.Header1());
  }

  public postToken<T>(url: string, data: any): Observable<T> {
    return this.http.post<T>(`${this.apiurl}${url}`, data, this.Header1());
  }

  //   public put<T>(url: string, data: any): Observable<T> {
  //   return this.http.put<T>(`${this.apiurl}${url}`, data, this.Header1());
  // }

  //  public delete<T>(url: string): Observable<T> {
  //   return this.http.delete<T>(`${this.apiurl}${url}`, this.Header1());
  // }

  Header() {
    let header = new HttpHeaders();
    // header = header.append('Content-Type', 'application/json; charset=utf-8');
    // header = header.append('Authorization', 'Token ' + this.authService.getUserToken());
    return { headers: header };
  }

  Header1() {
    let header = new HttpHeaders();
    header = header.append(
      'Authorization',
      'Bearer ' + this.localStore.getItem('token')
    );
    return { headers: header };
  }
}
