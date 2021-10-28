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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';

import { UpdateprofileComponent } from './updateprofile.component';

describe('UpdateprofileComponent', () => {
  let component: UpdateprofileComponent;
  let fixture: ComponentFixture<UpdateprofileComponent>;

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
      declarations: [ UpdateprofileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Form should have reset function', async() => {
    expect(component.onReset).toBeTruthy();
  });
  it('Form should have update function', async() => {
    expect(component.onUpdate).toBeTruthy();
  });

  it('Form should have DocID change function', async() => {
    expect(component.onSelectIDprooftype).toBeTruthy();
  });
  it('Form should have acount change function', async() => {
    expect(component.onaccTypeChange).toBeTruthy();
  });

  
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

   
  it('form should be valid', async() => {
    expect(component.registrationform).toBeTruthy();
    component.registrationform.patchValue({
      Id:"R123",
      name:"Test",
      username:"Test",
      gender:"F",
      password:"Test",    
          gaurdiantype: "S",
          gaurdianname: "Test",
          address: "Test",
          citizenship: "Test",
          country:"1",
          state:"1" ,
          emailaddress: "we@Test.com",
          maritalstatus: "M",
          contactno: "9999999999",
          dob: "20/12/1982",
          RegDate:"27/10/2021",
          accounttype: "S",
          citizenstatus: "S",
          InitialDepAmt: 1234,
          idprooftype: "A",
          IDdocno:"Test" ,
          RefAccholderName: "ASdf",
          RefAccholderNo: "Test",
          RefAccholderAddress: "Test"
    })
    expect(component.registrationform.valid).toBeTruthy();
  
  });

  it('name should be valid', async() => {
    component.registrationform.controls.name.setValue("!!");
    expect(component.registrationform.valid).toBeFalsy();
  });


  it('Contact no should be invalid for more than 10 numbers', async() => {
    component.registrationform.controls.name.setValue("99999999999");
    expect(component.registrationform.valid).toBeFalsy();
  });

  // fit('Contact no should be valid for 10 numbers', async() => {
  //   component.registrationform.controls.contactNo?.setValue("9890018871");
  //   expect(component.contactno.valid).toBeTruthy();
  // });

});
