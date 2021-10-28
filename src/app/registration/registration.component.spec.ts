import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';

import { RegistrationComponent } from './registration.component';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[
        ReactiveFormsModule,
        FormsModule,
       RouterTestingModule,
       HttpClientTestingModule,
       ToastrModule.forRoot(),
       MatSelectModule,
       MatRadioModule ,
       MatDatepickerModule ,
       MatNativeDateModule ,
       MatFormFieldModule ,
        MatInputModule ,
        MatButtonModule ,
        MatCardModule ,
        MatToolbarModule ,
        BrowserAnimationsModule 
      ],
      declarations: [ RegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Form should have reset function', async() => {
    expect(component.onReset).toBeTruthy();
  });
  it('Form should have IDProoftype change function', async() => {
    expect(component.onSelectIDprooftype).toBeTruthy();
  });
  
  it('Form should have Backtologin  function', async() => {
    expect(component.onBackToLogin).toBeTruthy();
  });


  it('Form should have account type change  function', async() => {
    expect(component.onaccTypeChange).toBeTruthy();
  });

  it('Submit button should be disabled', async(() => {
    component.registrationform.controls['name'].setValue('');
    component.registrationform.controls['username'].setValue('');
    expect(component.registrationform.valid).toBeFalsy();

}));

it('form should be invalid', async() => {
  component.registrationform.patchValue({
    name:"",
    username:"",
    gender:"",
    password:"",    
        gaurdiantype: "",
        gaurdianname: "",
        address: "",
        citizenship: "",
        country:"",
        state:"" ,
        emailaddress: "",
        maritalstatus: "",
        contactno: "",
        dob: "",
        RegDate:"",
        accounttype: "",
        citizenstatus: "",
        InitialDepAmt: "",
        idprooftype: "",
        IDdocno:"" ,
        RefAccholderName: "",
        RefAccholderNo: "",
        RefAccholderAddress: ""
  })
  expect(component.registrationform.valid).toBeFalsy();

});


});
