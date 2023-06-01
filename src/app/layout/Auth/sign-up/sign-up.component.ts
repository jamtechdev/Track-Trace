import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserServicesService } from 'src/app/service/user-services.service';
// import { UserServicesService } from '../service/user-services.service';
import { OnChanges , OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  constructor(private router: Router, public service: UserServicesService) {}
   
  databsdismiss = '';

  ngOnInit(): void {
    console.log(this.f , 'jsdjd');
    
  }

  signUpForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ]),
    password:new FormControl('', [
      Validators.required,
    ]),
    first_name : new FormControl('', [
      Validators.required,
    ]),
    last_name : new FormControl(''),
    password_confirmation:new FormControl('', [
      Validators.required,
    ]),
     
        

  } , );

  
  
 get f() {
    return this.signUpForm.controls;
  }

  onSubmit() {
    console.log(this.signUpForm);
    // this.service.setUser(this.signUpForm.value).subscribe(res=>console.log(res)
    // );
    this.router.navigate(['/home']);
  }

  gotoResetPassword(values: any) {
    if (values) {
      this.router.navigate(['/reset-password']);
    }
  }

}