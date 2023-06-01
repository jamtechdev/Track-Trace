import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { UserServicesService } from '../../../service/user-services.service';
import { LocalstoreService } from 'src/app/common-resources/servieces/localstore.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  submitted: boolean = false;
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  constructor(
    private router: Router,
    public service: UserServicesService,
    private formBuilder: FormBuilder,
    public localStore: LocalstoreService
  ) {}
  databsdismiss = '';

  get login() {
    return this.loginForm.controls;
  }
  ngOnInit(): void {
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
          Validators.pattern(
            '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}$'
          ),
        ],
      ],
    });
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.login);
    if (this.loginForm.status == 'VALID') {
      this.localStore.setItem('user', this.loginForm.value.email);
    }
    // this.service.setUser(this.loginForm.value).subscribe(res=>console.log(res)
    // );
    // this.router.navigate(['/home']);
  }

  gotoResetPassword(values: any) {
    if (values) {
      this.router.navigate(['/reset-password']);
    }
  }
}