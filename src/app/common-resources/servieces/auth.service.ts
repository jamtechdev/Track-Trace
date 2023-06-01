import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { envoirnment } from 'src/envoirnment/env';
import { LocalstoreService } from './localstore.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  apiurl = envoirnment.Base_URL;
  authenticated = false;

  
  constructor(
    private localStore: LocalstoreService,
    private router: Router,
    private http: HttpClient,
    // private rest : RestService
  ) {
    this.checkAuth();
  }

  checkAuth() {
    this.authenticated = this.localStore.getItem('token') ? true : false;
  }


  
  Header() {
    let header = new HttpHeaders();
    header = header.append('Content-Type', 'application/json; charset=utf-8');
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
