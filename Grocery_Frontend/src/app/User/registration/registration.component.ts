import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router} from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { User } from 'src/app/Models/user.model';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  title: string = 'Grocery Management System';
  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';
  signupForm!: FormGroup;
  error:string=""
  NotConfirmPassword:boolean=false;

  addUserRequest: User = {
    Id: '',
    Name: '',
    Email: '',
    PhoneNumber: 0,
    Password: '',
    Token: '',
    Role: '',
  };

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      fullname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phonenumber: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{10}$')],
      ],
      password: ['', Validators.required],
      repassword: ['', Validators.required],
      role: ['', Validators.required],
    });
  }

  hideShowPassword() {
    this.isText = !this.isText;
    this.isText ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
    this.isText ? (this.type = 'text') : (this.type = 'password');
  }
  hideShowRePassword() {
    this.isText = !this.isText;
    this.isText ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
    this.isText ? (this.type = 'text') : (this.type = 'password');
  }

  onSubmit() {
    if (this.signupForm.valid) {
      this.NotConfirmPassword=false;
      if(this.signupForm.value.repassword!=this.signupForm.value.password){
        this.NotConfirmPassword=true;
      }
      if(this.NotConfirmPassword) return;
      this.auth.signUp(this.addUserRequest).subscribe({
        next: (res) => {
          this.signupForm.reset();
          this.toast.success({
            detail: 'SUCCESS',
            summary: 'Registered',
            duration: 2000,
          });
          if (res) this.router.navigate(['/login']);
        },
        error: (err) => {
          this.signupForm.reset();
          this.error=err.error.message
          this.toast.error({
            detail: 'ERROR',
            summary: this.error,
            duration: 2000,
          });
        },
      });

    } else {
      this.validateAllFormFields(this.signupForm);
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
