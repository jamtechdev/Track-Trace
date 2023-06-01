import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent {
  constructor(private router: Router) {}
  values = '';
  show = false;

  onKey(text: any) {
    if (text) {
      this.values = 'Validating OTP........';
      setTimeout(() => {
        this.values = 'Validated';
        this.show = true;
      }, 2000);
    }
  }

  reset() {
    this.router.navigate(['']);
  }
}
