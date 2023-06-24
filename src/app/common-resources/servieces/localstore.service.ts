import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstoreService {

  constructor() { }
  public local = window.localStorage
  setItem(key:string , value : any){
    this.local.setItem(key , value)
  }

  getItem(key:string){
   return this.local.getItem(key)
  }

  checkAuth(){
   return this.getItem('token') ? true  : false
  }
}
