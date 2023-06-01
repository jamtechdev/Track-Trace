import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class UserServicesService {
  public user = new Subject<Observable<any>>();

  setUser(userData: any) {
    this.user.next(userData);
  }
  // getUser() {
  //   this.user.subscribe();
  // }
}
