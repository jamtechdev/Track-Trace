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
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  submitted: boolean = false;
  error: string = '';
  databsdismiss = '';
  otp: string = '';
  passwordModal: boolean = false;
  isOtp: boolean = false;
  loading: boolean = false;
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  email: any;
  newpassword: any;
  passwordErr: any;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    public localStore: LocalstoreService,
    private restService: RestService,
    private toast: NgToastService
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
          this.localStore.setItem(
            'isprint',
            res?.data?.componentDetail?.is_print
          );
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

  password(e: any) {
    this.newpassword = e.target.value;
  }

  confPassword(e: any) {
    e.target.value != this.newpassword
      ? (this.passwordErr = "Password doesn't match")
      : (this.passwordErr = '');
  }

  onOtpChange(e: any) {
    console.log(e, 'oytp');
    this.otp = e;
  }

  submitOtp() {
    let formData = new FormData();
    formData.append('email', this.email);
    formData.append('otp', this.otp);
    formData.append('is_send_otp', '1');
    this.loading = true;
    this.restService.post(formData, apiUrls.authApi.sendOtp).subscribe(
      (res: any) => {
        this.loading = false;
        this.isOtp = true;
        this.passwordModal = true;
        this.toast.success({
          detail: 'SUCCESS',
          summary: res.message,
          duration: 10000,
        });
      },
      (err) => {
        this.toast.error({
          detail: 'ERROR',
          summary: 'Invalid otp',
          duration: 10000,
        });
        this.loading = false;
        console.log(err);
      }
    );
  }

  gotoResetPassword(values: any) {
    if (values != '') {
      let formData = new FormData();
      formData.append('email', values);
      formData.append('is_send_otp', '0');
      this.loading = true;
      this.restService.post(formData, apiUrls.authApi.sendOtp).subscribe(
        (res: any) => {
          this.loading = false;
          this.email = values;
          this.isOtp = true;
          this.toast.success({
            detail: 'SUCCESS',
            summary: res.message,
            duration: 10000,
          });
        },
        (err) => {
          this.loading = false;
          console.log(err);
        }
      );
      // this.router.navigate(['/reset-password']);
    } else {
      this.toast.error({
        detail: 'ERROR',
        summary: 'Please enter mail',
        duration: 10000,
      });
    }
  }

  submitPassword() {
    let formData = new FormData();
    formData.append('email', this.email);
    formData.append('password', this.newpassword);
    this.loading = true;
    this.restService.post(formData, apiUrls.authApi.changePassword).subscribe(
      (res: any) => {
        this.loading = false;
        this.isOtp = false;
        this.passwordModal = false;
        this.email = '';
        this.otp = '';
        this.toast.success({
          detail: 'SUCCESS',
          summary: res.message,
          duration: 10000,
        });
        location.reload();
      },
      (err) => {
        this.loading = false;
        console.log(err);
      }
    );
  }

  type: string = 'password';
  showPass() {
    this.type == 'password' ? (this.type = 'text') : (this.type = 'password');
  }
}
