import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private _auth: AuthService,
    private _router: Router
  ) { }

  canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot): boolean {

    if (!localStorage.getItem('AuthToken')) {
      console.log("Auth Token not found");
      this._router.navigate(['/login']);
      return false;
    }
    else{
      return true;
    }
  }

}
