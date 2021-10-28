import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, ValidatorFn } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../Services/auth.service';
import { DataService } from '../Services/data.service';
import { age, initialdeposit } from '../Shared/enum';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registrationform!: FormGroup; 
  countries: any[];
  states: any[];  
  editmode: boolean = false;

  constructor(private fb: FormBuilder, private dt: DataService, private router: Router,
    private _auth: AuthService, private route: ActivatedRoute, private _toastr: ToastrService) {

  }

  Success(regid: string) {
    this._toastr.success('User ' + regid + ' Registered Successfully ');
  } 
  error() {
    this._toastr.error('User Registration Failed ');
  }


  ngOnInit(): void {   

    this.registrationform = this.fb.group({
      Id: [],
      name: [null, [Validators.required,Validators.maxLength(50), Validators.pattern("[a-zA-Z][a-zA-Z ]+[a-zA-Z]$")]],
      username: [null, [Validators.required,Validators.maxLength(50), Validators.maxLength(10)]],
      password: [null, [Validators.required,Validators.maxLength(50), Validators.maxLength(10)]],
      gender: [null, Validators.required],
      gaurdiantype: [null, Validators.required],
      gaurdianname: [null, [Validators.required, Validators.pattern("[a-zA-Z][a-zA-Z ]+[a-zA-Z]$")]],
      address: [null, [Validators.required, Validators.maxLength(50)]],
      citizenship: [null, Validators.required],
      country: [null, Validators.required],
      state: [null, Validators.required],
      emailaddress: [null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      maritalstatus: [null, Validators.required],
      contactno: [null, [Validators.required,Validators.minLength(10), Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      dob: [null, [Validators.required, this.dateRangeValidator]],
      RegDate: [new Date(), [Validators.required]],
      accounttype: [null, Validators.required],
      citizenstatus: [{ value: null }, Validators.required],
      InitialDepAmt: [{ value: null }],
      idprooftype: [null, Validators.required],
      IDdocno: [null, Validators.required],
      RefAccholderName: [null, [Validators.required, Validators.pattern("[a-zA-Z][a-zA-Z ]+[a-zA-Z]$")]],
      RefAccholderNo: [null, Validators.required],
      RefAccholderAddress: [null, Validators.required]
    })

    console.log(this.registrationform.value);
    this.fillDropdowns();
  }

  fillDropdowns() {
    this.dt.getall().subscribe(
      (data: any) => {
        this.countries = data          
      })
  }

  private dateRangeValidator: ValidatorFn = (): {
    [key: string]: any;
  } | null => {
    console.log("dateRangeValidator");
    let invalid = false;
    const dob = this.registrationform && this.registrationform.get("dob")?.value;
    invalid = ((new Date(dob).valueOf() > new Date('2003/01/01').valueOf()) || (new Date(dob).valueOf() < new Date('1935/01/01').valueOf()));

    if (this.registrationform && !invalid) {
      const bdate = new Date(dob);
      const timeDiff = Math.abs(Date.now() - bdate.getTime());
      const _age = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365);
      console.log(_age);
      if (_age < age.Minorage) {
        this.registrationform.patchValue({
          citizenstatus: 'Minor'
        });
      } else if (_age >= age.Minorage && _age <= age.Normalage) {
        this.registrationform.patchValue({
          citizenstatus: 'Normal'
        });
      }
      else if (_age > age.Normalage) {
        this.registrationform.patchValue({
          citizenstatus: 'Senior'
        });
      }
      else {
        this.registrationform.patchValue({
          citizenstatus: null
        });
      }
    }

    return invalid ? { invalidRange: { dob } } : null;
  };

  onRegistration() {
    console.log("Entered onRegistration");
    console.log(this.registrationform.value);
    this._auth.registerUser(this.registrationform.value)
      .subscribe(
        res => {         
          var jsonObj = JSON.parse(JSON.stringify(res));   
          this.Success(jsonObj["id"]);
          console.log(jsonObj)
          this.router.navigate(['/login'])
        },
        err => {
          this.error();
          console.log(err)
        }
      )
  }

  onSelectIDprooftype(e: any) {    
    let _idprooftype = this.registrationform.controls['idprooftype'].value;    
   
    if (_idprooftype == 'P') {
      this.registrationform.controls["IDdocno"].clearValidators();
      this.registrationform.controls["IDdocno"].setValidators([Validators.required, Validators.pattern("[A-Z]{5}[0-9]{4}[A-Z]{1}")]);      
      this.registrationform.controls["IDdocno"].reset();
    } else {
      this.registrationform.controls["IDdocno"].clearValidators();
      this.registrationform.controls["IDdocno"].setValidators([Validators.required]);
      this.registrationform.controls["IDdocno"].reset();
    }

  }

  onSelect(e: any) {
    console.log("Entered onselect");
    let cntry = this.registrationform.controls['country'].value;
    this.dt.getallStates().subscribe(
      (data: any) => {
        console.log(data),
          this.states = data.filter((x: any) => x.countryid == cntry)          
      })
  }

  onaccTypeChange(e: any) {
    console.log("Entered onaccTypeChange");
    let _accounttype = this.registrationform.controls['accounttype'].value;

    if (_accounttype == 'S') {
      this.registrationform.patchValue({
        InitialDepAmt: initialdeposit.Saving
      });
    }
    else {
      this.registrationform.patchValue({
        InitialDepAmt: initialdeposit.Salary
      });

    }
  }

  onReset() {
    this.registrationform.reset();
  }

  onBackToLogin() {
    this.router.navigate(['/login'])
  }
}
