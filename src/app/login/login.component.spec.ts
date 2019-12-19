import { async, ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { RouterTestingModule } from '@angular/router/testing';
import { FormBuilder, FormGroup, FormsModule, AbstractControl, ReactiveFormsModule } from "@angular/forms";
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";

import { LoginComponent } from './login.component';
import { AnswerService } from "../question";

//https://stackoverflow.com/questions/57457293/angular-unit-testing-form-validation

describe('LoginComponent', () => {
  let fixture: ComponentFixture<LoginComponent>;
  let component: LoginComponent;

  let injector: TestBed;
  let builder: FormBuilder;
  let aService: AnswerService;
  let httpMock: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule,
        MatButtonModule,
        RouterTestingModule.withRoutes([])
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();

      injector = getTestBed();
      builder = injector.get(FormBuilder);
      aService = injector.get(AnswerService);
      httpMock = injector.get(HttpTestingController);

      fixture = TestBed.createComponent(LoginComponent);
      component = fixture.debugElement.componentInstance;
  }));

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form should have value steve', () => {
    component.ngOnInit();

    // pass in the form dynamically
    let form:FormGroup = component.formData;
    let control:AbstractControl = form.controls['userName'];
    control.setValue('Steve');
    let value = control.value;

    expect(value).toEqual('Steve');
  });

  it('should have method startQuestions', () => {
    component.ngOnInit();

    let form:FormGroup = component.formData;
    let control:AbstractControl = form.controls['userName'];
    control.setValue('Steve');

    component.doStartQuestions()

    expect(aService.getUser()).toEqual('Steve');
  });
});
