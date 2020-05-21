import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from "@angular/forms";
import { DataserviceService } from "../../dataservice.service";
import { Router } from "@angular/router";
// import { EventEmitter } from "events";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  loginform: FormGroup;
  loginInvalid: false;
  loginusers: [];
  //validuser = false;
  //@Output ValidUser : EventEmitter<any> = new EventEmitter();
  // tslint:disable-next-line: no-inferrable-types
  validuser: boolean = true;
  constructor(
    private formbuilder: FormBuilder,
    private datasvc: DataserviceService,
    private router: Router
  ) { }
  getloginurl = "../../../assets/samplejson/login.json";
  ngOnInit(): void {
    this.loginform = this.formbuilder.group({
      username: ["", Validators.compose([Validators.required])],
      password: ["", Validators.required],
    });
  }
  onSubmit() {
    const loginData = {
      username: this.loginform.controls.username.value,
      password: this.loginform.controls.password.value,
    };
    this.datasvc.getData(this.getloginurl).subscribe((data) => {
      for (let i = 0; i < data.length; i++) {
        //console.log(data[i].username);
        if (
          data[i].username === loginData.username &&
          data[i].password === loginData.password
        ) {
          console.log(data[i].username);
          this.router.navigate(["/"]);
          //this.ValidUser.emit();
          this.datasvc.postloginData(this.validuser);
          break;
        }
      }
    });
    console.log(this.validuser);
    if (this.loginform.invalid) {
      return;
    }
  }
}
