import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'

import { AnswerService } from "../question";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formData: FormGroup;
  submitted = false;

  constructor(
    private builder: FormBuilder,
    private router: Router,
    private aService: AnswerService) {
  }

  // convenience getter for easy access to form fields
  get f() { return this.formData.controls; }

  ngOnInit() {
    this.formData = this.builder.group({
      userName: ["", Validators.compose([Validators.required,Validators.minLength(3)])], 
    });
  }

  doKeyUp(event) {
    if(event.keyCode == 13) {
      this.doStartQuestions();
    }
  }

  doStartQuestions() {

    this.submitted = true;

    // stop here if form is invalid
    if (this.formData.invalid) {
        return;
    }


    let user = this.f.userName.value;
    this.aService.setUser(user);

    //alert(this.aService.getUser())
    this.router.navigate(['/question']);
  }

}
