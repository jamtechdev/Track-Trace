import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import { LocalstoreService } from '../localstore.service';
import { AuthService } from '../auth.service';

@Injectable({providedIn: 'root'})
export class logInGaurd implements CanActivate {

  
  constructor( private router: Router  , private  localStore : LocalstoreService , private authServiece : AuthService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
   if(!this.localStore.getItem('token') ){ 
 return true}else{
this.router.navigate(['/home'])
    return false}
  }
}
