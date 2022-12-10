import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router:Router){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      //return true -> caragmos la ruta
      //return false -> no cargamos la ruta
    let token = sessionStorage.getItem('token')
    if(token){
      return true
    }
    this.router.navigate(['login']) //si no tiene token mandamos a login
    return false;
  }
  
}
