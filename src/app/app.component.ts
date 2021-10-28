import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './Services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Bank Management System';
  uname: string;
  constructor(private _auth: AuthService, private router: Router) {  
    this._auth._RegId$.subscribe(
      message => {
        console.log(message);
        this.uname = message;
      }
    ); 
  }

  ngOnInit() {    
    console.log("entered ngOnInit");
   
  }

  onProfileRedirect() {
    this.router.navigate(['/updateprofile', this.uname])
  }

  onLoanRedirect() {
    this.router.navigate(['/loan', this.uname])
  }

  unameHandler(uname: string) {
    console.log("unameHandler" + uname);
  }

  loggedIn() {
    return localStorage.getItem('Token')==null?false:true;
  }

  onLogOut() {
    console.log("onLogOut");
    localStorage.clear();
    this.router.navigate(['/login'])
    
  }

}
