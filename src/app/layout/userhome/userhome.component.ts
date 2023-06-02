import { RestService } from 'src/app/common-resources/servieces/rest.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.css'],
})
export class UserhomeComponent {
  valuearr: Array<any> = [];
  scannedValue: string = '';
  formStep: number = 1;
  isDevice: boolean = false;
  chechisStatus: number = 0;
  status: string = '';
  public output!: any;

  constructor(private RestService: RestService) {}

  getDevice(e: boolean) {
    this.isDevice = e;
    console.log(e, 'ghu');
  }

  formStepper() {
    this.formStep = this.formStep + 1;
    this.scannedValue != '' && this.valuearr.push(this.scannedValue);
    this.status = '';
    this.scannedValue = '';
  }
  formStepperDown() {
    this.formStep = this.formStep - 1;
    this.formStep !== 1 && this.valuearr.pop();
  }

  addItem(e: string) {
    if (e !== '') {
      if (this.scannedValue !== e) {
        this.chechisStatus = 0;
      }
      if (
        this.formStep == 1 &&
        this.valuearr.length == 0 &&
        this.chechisStatus !== 200
      ) {
        this.RestService.postToken('scanner/product', {
          chassis_number: e,
        }).subscribe(
          (res: any) => {
            this.chechisStatus = res?.code;
            if (this.chechisStatus === 200) {
              this.status = 'valid';
              this.scannedValue = e;
            }
          },
          (err) => {
            console.log(err, 'error');
            // this.chechisStatus =;
            if (err?.error?.code === 404) {
              this.scannedValue = e;
              this.status = 'invalid';
            }
          }
        );
      }
    }
  }
}
