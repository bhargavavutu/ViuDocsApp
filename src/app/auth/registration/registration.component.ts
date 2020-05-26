import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { DataserviceService } from "../../dataservice.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  loginInvalid = false;

  regform: FormGroup;
  constructor(
    private formbuilder: FormBuilder,
    private datasvc: DataserviceService
  ) { }

  ngOnInit(): void {
    this.regform = this.formbuilder.group({
      firstname: ['', Validators.compose([Validators.required])],
      lastname: ['', Validators.compose([Validators.required])],
      emailid: ['', Validators.compose([Validators.required])],
      phonenumber: ['', Validators.compose([Validators.required])],
      password: ['', Validators.required],
      cnfpassword: ['', Validators.required],
    });
  }
  regSubmit() {
    const signupData = {
      username: this.regform.controls.emailid.value,
      password: this.regform.controls.password.value,
    };
    console.log(signupData.username);
    this.datasvc.signup(signupData.username, signupData.password);
  }
}
