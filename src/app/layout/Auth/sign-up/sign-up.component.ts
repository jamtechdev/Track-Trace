import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { UserServicesService } from 'src/app/service/user-services.service';
// import { UserServicesService } from '../service/user-services.service';
import { OnChanges, OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RestService } from 'src/app/common-resources/servieces/rest.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  constructor(
    private rest : RestService,
    private router: Router,
    public service: UserServicesService,
    private formBuilder: FormBuilder
  ) { }

  databsdismiss = '';
  submitted = false;

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
      password_confirmation: [
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

    console.log(this.signUpForm, this.signUpForm.valid);
    let formData = new FormData();
if(this.signUpForm.valid){
  formData.append('password_confirmation',this.signUpForm.value.password_confirmation);
  formData.append('first_name', this.signUpForm.value.first_name);
  formData.append('last_name', this.signUpForm.value.last_name);
  formData.append('password', this.signUpForm.value.password);
  formData.append('email', this.signUpForm.value.email);

  this.rest.post('signIn' , formData).subscribe(() => {

  })
    // API CALL WILL GO HERE 
    }
  }

  Login() {
    this.router.navigate(['/login']);
  }
}
