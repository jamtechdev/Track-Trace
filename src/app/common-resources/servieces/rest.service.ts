import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { envoirnment } from 'src/envoirnment';
import { LocalstoreService } from './localstore.service';
import { environment } from 'src/envoirnment/env';
@Injectable({
  providedIn: 'root',
})
export class RestService {
  constructor(private http: HttpClient, public localStore: LocalstoreService) {}

  post(credentials: any, url: string) {
    return this.http.post(
      `${environment.Base_URL}${url}`,
      credentials,
      this.Hearder()
    );
  }

  Hearder() {
    let header = new HttpHeaders();
    return { headers: header };
  }

  Header1() {
    let header = new HttpHeaders();
    header = header.append(
      'Authorization',
      'Token ' + this.localStore.getItem('token')
    );
    return { headers: header };
  }
}
