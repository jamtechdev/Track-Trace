import { LocalstoreService } from 'src/app/common-resources/servieces/localstore.service';
import { RestService } from 'src/app/common-resources/servieces/rest.service';
import { apiUrls } from 'src/app/common-resources/api';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  submitted: boolean = false;
  error: string = '';
  databsdismiss = '';

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    public localStore: LocalstoreService,
    private restService: RestService
  ) {
    localStorage.clear();
  }

  get login() {
    return this.loginForm.controls;
  }

  ngOnInit(): void {
    localStorage.clear();
    this.loginForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          // Validators.pattern(
          //   '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}$'
          // ),
        ],
      ],
    });
  }

  onSubmit() {
    this.submitted = true;
    setTimeout(() => {
      this.submitted = false;
    }, 2000);
    if (this.loginForm.valid) {
      let formData = new FormData();
      formData.append('email', this.loginForm.value.email);
      formData.append('password', this.loginForm.value.password);
      this.restService.post(formData, apiUrls?.authApi?.login).subscribe(
        (res: any) => {
          this.localStore.setItem('token', res?.data?.token);
          this.localStore.setItem('name', res?.data?.fullName);
          this.localStore.setItem('email', res?.data?.email);
          this.localStore.setItem('uid', res?.data?.uid);
          this.localStore.setItem('orderId', res?.data?.orderId);
          this.localStore.setItem('productUid', res?.data?.productUid);
          this.localStore.setItem('modelNumber', res?.data?.modelNumber);
          this.submitted = false;
          if (res?.data?.token) {
            this.submitted = false;
            this.router.navigate(['/home']);
          } else {
            this.error = 'Something went wrong !!';
          }
          //
        },
        (err) => {
          this.error = err?.error?.message;
          this.submitted = false;
          setTimeout(() => {
            this.error = '';
          }, 3000);
        }
      );
    }
  }

  gotoResetPassword(values: any) {
    if (values) {
      this.router.navigate(['/reset-password']);
    }
  }

  type: string = 'password';
  showPass() {
    this.type == 'password' ? (this.type = 'text') : (this.type = 'password');
  }
}
