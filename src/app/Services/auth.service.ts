import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, Subject, } from 'rxjs';
import { Loan } from '../Shared/loan';
import { Login } from '../Shared/login';
import { Registration } from '../Shared/registration';
import{map}from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  private httpOptions={
headers:new HttpHeaders({'Content-Type':'application/json'})
  }; 
  
  private RegId = new Subject<string>();
  _RegId$ = this.RegId.asObservable();

  constructor(private _http: HttpClient) {
    const currentUser = localStorage.getItem('Token');
    if (currentUser) {
      this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(currentUser));
      this.currentUser = this.currentUserSubject.asObservable();
    } else {
      this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(null));
      this.currentUser = this.currentUserSubject.asObservable();
    }

  }

  registerUser(_reg: any): Observable<Registration> {
    console.log("entered auth- registerUser ");
    console.log(_reg);
    return this._http.post<Registration>(`${environment.apiUrl}/registration/Add`, _reg)
  };

  sendmessage(message: string) {
    console.log("Registration Id : " + message);
    this.RegId.next(message);
  }

  getregisterUser(uname: string): Observable<any> {
    console.log("entered auth- getregisterUser " + uname);
    return this._http.get(`${environment.apiUrl}/registration/getbyId?Id=` + uname);
  }
  AuthenticateUser(_user: Login): Observable<any> {
    console.log("entered auth- AuthenticateUser ");
    return this._http.post(`${environment.apiUrl}/Registration/GetbyUserName`, _user,this.httpOptions)
    .pipe(map(user=>
      {
        localStorage.setItem('Token',JSON.stringify(user));       
        var jsonObj = JSON.parse(localStorage.getItem('Token'));
        localStorage.setItem('AuthToken',jsonObj['token']);
        this.currentUserSubject.next(user);
        this.RegId.next(jsonObj['id']);
        console.log('Auth- Aft login '+ user);
        return user;
      }));
    }

    
  updateregisterUser(_reg: Registration): Observable<any> {
    console.log("entered auth- updateregisterUser ");
    console.log(_reg);
    return this._http.put<any>(`${environment.apiUrl}/Registration/Update`, _reg)
  };

  ApplyLoan(_loan: Loan): Observable<any> {
    console.log("entered auth- ApplyLoan ");
    return this._http.post<any>(`${environment.apiUrl}/Loan/Add`, _loan);
  };

  public get loggedIn() {
    return this.currentUserSubject.value;
  }
}
