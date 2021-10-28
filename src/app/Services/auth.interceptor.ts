import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  
  constructor(private _auth :AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log("Inside Interceptor");
    let authreq=request;
let currentuser=this._auth.loggedIn;
if (currentuser&& currentuser.token)
{
  authreq=request.clone({headers:request.headers.set('Authorization','Bearer '+currentuser.token)});
  console.log("Intercepted"+JSON.stringify(authreq));
}
    return next.handle(authreq);
  }
}
