import { RestService } from 'src/app/common-resources/servieces/rest.service';
import { apiUrls } from 'src/app/common-resources/api';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  success: boolean = false;
  loading: boolean = false;
  databsdismiss = '';
  error: string = '';
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private rest: RestService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.setValue();
  }

  signUpForm: FormGroup = new FormGroup({
    fullname: new FormControl(''),
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    acceptTerms: new FormControl(false),
  });

  setValue() {
    this.signUpForm = this.formBuilder.group({
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
      first_name: [
        '',
        [Validators.required, Validators.pattern("^[a-zA-Z -']+")],
      ],
      last_name: ['', [Validators.pattern("^[a-zA-Z -']+")]],
      password_confirmation: ['', [Validators.required]],
    });
  }

  get f() {
    return this.signUpForm.controls;
  }

  confirmPas(e: any) {
    if (e.target.value !== this.signUpForm?.value?.password) {
      this.f['password_confirmation'].setErrors({ match: true });
    }
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    let formData = new FormData();
    if (this.signUpForm.valid) {
      formData.append(
        'password_confirmation',
        this.signUpForm.value.password_confirmation
      );
      formData.append(
        'first_name',
        this.signUpForm.value.first_name?.replace(/\s+/g, ' ').trim()
      );
      formData.append(
        'last_name',
        this.signUpForm.value.last_name?.replace(/\s+/g, ' ').trim()
      );
      formData.append('password', this.signUpForm.value.password);
      formData.append('email', this.signUpForm.value.email);

      // API CALL WILL GO HERE
      this.rest.post(formData, apiUrls?.authApi?.signUp).subscribe(
        (res) => {
          this.loading = true;
          this.success = true;
          setTimeout(() => {
            this.success = false;
            this.router.navigate(['/login']);
          }, 3000);
        },
        (err) => {
          this.loading = true;

          if (err?.error?.code === 401 || err?.error?.code === 401) {
            this.error = err?.error?.message;
          } else {
            this.error = err?.error?.message;
          }
          setTimeout(() => {
            this.error = '';
          }, 5000);
        }
      );
    }
  }

  Login() {
    this.router.navigate(['/login']);
  }
}
