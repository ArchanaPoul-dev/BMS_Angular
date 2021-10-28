import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanapplicationComponent } from './loanapplication.component';

import { HttpClientTestingModule } from '@angular/common/http/testing';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

describe('LoanapplicationComponent', () => {
  let component: LoanapplicationComponent;
  let fixture: ComponentFixture<LoanapplicationComponent>;

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
      declarations: [ LoanapplicationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanapplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Loan form should be invalid', async(() => {
    component.loanform.controls['loanamt'].setValue('');
    component.loanform.controls['loantype'].setValue('');
    expect(component.loanform.valid).toBeFalsy();

}));

});
