import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Route, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/Services/auth.service';
import { UserStoreService } from 'src/app/Services/user-store.service';
import { AppComponent } from 'src/app/app.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  title: string = 'Grocery Management System';
  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';
  loginForm!: FormGroup;

  error:string="";

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toast: NgToastService,
    private userStore: UserStoreService,
    private app : AppComponent
  ) {

  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  hideShowPassword() {
    this.isText = !this.isText;
    this.isText ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
    this.isText ? (this.type = 'text') : (this.type = 'password');
  }

  onSubmit() {
    if (this.loginForm.valid) {

      this.auth.login(this.loginForm.value).subscribe({
        next: (res) => {
          console.log("Before",this.app.loggedin)
          this.app.loggedin=true;
          console.log("After",this.app.loggedin)
          this.auth.storeToken(res.token);
          const tokenPayload = this.auth.decodedToken();
          this.userStore.setNameForStore(tokenPayload.unique_name);
          this.userStore.setRoleForStore(tokenPayload.role);
          this.userStore.setEmailForStore(tokenPayload.email);
          this.toast.success({
            detail: 'SUCCESS',
            summary: res.message,
            duration: 2000,
          });
          if (res) this.router.navigate(['']);
        },
        error: (err) => {
          console.log(err);
          this.error=err.error.message;
          this.toast.error({
            detail: 'ERROR',
            summary: this.error,
            duration: 5000,
          });
        },
      });
    } else {
      this.validateAllFormFields(this.loginForm);
    }
  }

  private validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsDirty({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }
}
