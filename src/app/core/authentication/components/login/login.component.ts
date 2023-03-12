import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "../../services/login.service";
import {Router} from "@angular/router";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  insuranceForm!: FormGroup;

  constructor(private loginService : LoginService,private router: Router,
              private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.insuranceForm = new FormGroup({
      email: new FormControl('', [
        Validators.required
      ]),
      password: new FormControl('', [
        Validators.required
      ]),
    });
  }

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  openSnackBar() {
    this._snackBar.open('Wrong Credentials', 'Try Again', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: ['red-snackbar','login-snackbar']
    });
  }

  signIn() {
    // this.router.navigate(['/dashboard']);
    this.loginService.getFiles(this.insuranceForm.get('email')?.value).subscribe(res=>{
      if (res.data.user_password == this.insuranceForm.get('password')?.value){
        this.router.navigate(['/dashboard']);
        // this.cookieService.put('User', 'Admin');
        // this.cookieService.put('Arr', JSON.stringify(res.data));
      }else{
        this.openSnackBar();
      }
    })
  }



}
