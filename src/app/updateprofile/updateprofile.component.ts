import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, ValidatorFn } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../Services/auth.service';
import { DataService } from '../Services/data.service';
import { age, initialdeposit } from '../Shared/enum';
import { Registration } from '../Shared/registration';

@Component({
  selector: 'app-updateprofile',
  templateUrl: './updateprofile.component.html',
  styleUrls: ['./updateprofile.component.css']
})
export class UpdateprofileComponent implements OnInit {
  registrationform!: FormGroup;
  selectedcountry: any = { Id: 0, name: '' };
  countries: any[];
  states: any[];
  panelOpenState = false;
  selcountryid?: number;
  editmode:boolean=false;
  constructor(private fb: FormBuilder, private dt: DataService, private router: Router,
    private _auth: AuthService, private route: ActivatedRoute,private _toastr: ToastrService) {

  }

  Success_update(message:string) {
    this._toastr.success(message);
  }
  error() {
    this._toastr.error('User Registration Failed ');
  }
  info() {
    this._toastr.info('Information');
  }


  ngOnInit(): void {   

    this.registrationform = this.fb.group({
      Id:[],
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

    console.log(this.registrationform);
    this.fillDropdowns();

    this.route.paramMap.subscribe(params => {
      console.log("params Check"+  params.get('uname'));
      if (params.get('uname')) {
        this.editregister(params.get('uname').toString());
      }
    });

  }

  editregister(uname: string) {
    console.log("editregister" + uname);
    this._auth.getregisterUser(uname).subscribe(
      res => {
        this.editRegisterUser(res)
      },
      err => console.log(err)
    );
  }
  editRegisterUser(_reg: Registration) {
    const currentUser=this._auth.loggedIn;
    console.log("Actual editRegisterUser"+currentUser);    
    var jsonObj = JSON.parse(JSON.stringify(_reg));
    this.editmode=true;   
    //For State DDL fill'
    this.dt.getallStates().subscribe(
      (data: any) => {
        console.log(data),
          this.states = data.filter((x: any) => x.countryid == jsonObj['country'])         
      })
    //
    this.registrationform.patchValue(
      {
        Id:jsonObj['id'],
        name: jsonObj['name'],
        username: jsonObj['userName'],
        password: jsonObj['password'],
        gender: jsonObj['gender'],
        gaurdiantype: jsonObj['gaurdianType'],
        gaurdianname: jsonObj['gaurdianName'],
        address: jsonObj['address'],
        citizenship: jsonObj['citizenship'],
        country: jsonObj['country'],
        state:jsonObj['state'] ,
        emailaddress: jsonObj['emailAddress'],
        maritalstatus: jsonObj['maritalStatus'],
        contactno: jsonObj['contactNo'],
        dob: jsonObj['dob'],
        RegDate:jsonObj['regDate'],
        accounttype: jsonObj['accountType'],
        citizenstatus: jsonObj['citizenStatus'],
        InitialDepAmt: jsonObj['initialDepAmt'],
        idprooftype: jsonObj['idProofType'],
        IDdocno:jsonObj['idDocNo'] ,
        RefAccholderName: jsonObj['refAccholderName'],
        RefAccholderNo: jsonObj['refAccholderNo'],
        RefAccholderAddress: jsonObj['refAccholderAddress'],
      }
    )

  }

  fillDropdowns() {

    this.dt.getall().subscribe(
      (data: any) => {
        this.countries = data          
      }
    )

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

  onSelectIDprooftype(e: any) {    
    let _idprooftype = this.registrationform.controls['idprooftype'].value;
    const _IDdocno = this.registrationform && this.registrationform.get("IDdocno")?.value;
    console.log(_idprooftype);
    if (_idprooftype == 'P') {
      this.registrationform.controls["IDdocno"].clearValidators();
      this.registrationform.controls["IDdocno"].setValue("");
      this.registrationform.controls["IDdocno"].setValidators([Validators.required, Validators.pattern("[A-Z]{5}[0-9]{4}[A-Z]{1}")]);

    } else {
      this.registrationform.controls["IDdocno"].clearValidators();
      this.registrationform.controls["IDdocno"].setValidators([Validators.required]);
    }

  }

  onSelect(e: any) {
    console.log("Entered onselect");
    let cntry = this.registrationform.controls['country'].value;    
    this.dt.getallStates().subscribe(
      (data: any) => {        
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

  onUpdate(){
    console.log("Entered onUpdate");
    console.log(this.registrationform.value);
    this._auth.updateregisterUser(this.registrationform.value)
      .subscribe(
        res => {         
          this.Success_update("Profile Updated Successfully"),
          console.log(res) ,  
          this.router.navigate(['/dashboard'])   
        },
        err => { 
          this.error();
          console.log(err) }
      )

  }


}

