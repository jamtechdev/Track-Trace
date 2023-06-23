import { LocalstoreService } from '../localstore.service';
import { AuthService } from '../auth.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

@Injectable({ providedIn: 'root' })
export class authGuard implements CanActivate {
  constructor(
    private localStore: LocalstoreService,
    private authServiece: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.localStore.getItem('token')) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
