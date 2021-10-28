import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, ValidatorFn } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../Services/auth.service';
import { DataService } from '../Services/data.service';
import { roival } from '../Shared/enum';
@Component({
  selector: 'app-loanapplication',
  templateUrl: './loanapplication.component.html',
  styleUrls: ['./loanapplication.component.css']
})
export class LoanapplicationComponent implements OnInit {
  loanform!: FormGroup;
  showeduloandetails = false;
  showhomeloandetails = false;
  myDate = new Date();
  RegId: string;

  constructor(private fb: FormBuilder, private router: Router,
    private dt: DataService, private _auth: AuthService, private _toastr: ToastrService,
    private route: ActivatedRoute,) {
  }

  Success() {
    this._toastr.success('Loan Application submitted successfully');
  }
  error() {
    this._toastr.error('Loan Application submission Failed ');
  }

  ngOnInit(): void {
    this.loanform = this.fb.group({
      RegId: [],
      loantype: [null, [Validators.required]],
      loanamt: [null, Validators.required],
      loanapplydate: [null, [Validators.required, this.dateRangeValidator]],
      loanissuedate: [null, Validators.required],
      roi: [{ value: null }, Validators.required],
      duration: [null, Validators.required],
      coursefees: [null],
      course: [null],
      fathername: [null],
      fatheroccupation: [''],
      fatherexp: [null],
      fexpcurrentcmpny: [null],
      rationcardno: [null],
      annualincome: [null, Validators.required],
      companyname: [null],
      designation: [null],
      totalexp: [null],
      expwithcurcmpny: [null]
    })
    console.log(this.loanform);
    this.route.paramMap.subscribe(params => {    
      if (params.get('uname')) {
        this.RegId = (params.get('uname').toString());
      }
    });

  }
  onloansubmit() {
    console.log("Entered onloansubmit");
    this.loanform.patchValue({
      RegId: this.RegId
    });
    console.log(this.loanform.value);
    this._auth.ApplyLoan(this.loanform.value)
      .subscribe(
        res => {
          this.Success();
          this.router.navigate(['/dashboard'])
          console.log(res)
        },
        err => {
          this.error();
          console.log(err)
        }
      )
  }
  private dateRangeValidator: ValidatorFn = (): {
    [key: string]: any;
  } | null => {
    let invalid = false;
    const _loanapplydate = this.loanform && this.loanform.get("loanapplydate")?.value;
    invalid = (new Date(_loanapplydate).valueOf()) > new Date(this.myDate).valueOf();   
    return invalid ? { invalidRange: { _loanapplydate } } : null;
  };

  onSelect(e: any) {
    console.log("Entered onselect");
    let loantype = this.loanform.controls['loantype'].value;   
    if (loantype == 'E') {
      this.showeduloandetails = true;
      this.showhomeloandetails = false;
      this.loanform.controls["coursefees"].setValidators([Validators.required]);
      this.loanform.controls["course"].setValidators([Validators.required]);
      this.loanform.controls["fathername"].setValidators([Validators.required, Validators.pattern("[a-zA-Z][a-zA-Z ]+[a-zA-Z]$")]);
      this.loanform.controls["fatheroccupation"].setValidators([Validators.required]);
      this.loanform.controls["fatherexp"].setValidators([Validators.required]);
      this.loanform.controls["fexpcurrentcmpny"].setValidators([Validators.required]);
      this.loanform.controls["rationcardno"].setValidators([Validators.required]);
      this.loanform.patchValue({
        roi: roival.Education
      });

    }
    else {
      this.showhomeloandetails = true;
      this.showeduloandetails = false;
      this.loanform.controls["companyname"].setValidators([Validators.required]);
      this.loanform.controls["designation"].setValidators([Validators.required]);
      this.loanform.controls["totalexp"].setValidators([Validators.required]);
      this.loanform.controls["expwithcurcmpny"].setValidators([Validators.required]);

      this.loanform.patchValue({
        roi: roival.Home
      });
    }
  }

  onReset() {   
    this.loanform.reset();
  }
}
