import { RestService } from 'src/app/common-resources/servieces/rest.service';
import { apiUrls } from 'src/app/common-resources/api';
import { Component, OnInit } from '@angular/core';
import { UUID } from 'angular2-uuid';

@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.css'],
})
export class UserhomeComponent implements OnInit {
  valuearr: Array<any> = [];
  scannedValue: string = '';
  isDevice: boolean = false;
  chechisStatus: number = 0;
  formStep: number = 1;
  status: string = '';
  qrValue: string = '';
  public output!: any;
  success: string = '';
  error: string = '';
  issubmitted = false;

  compArr: any = [];

  constructor(private RestService: RestService) {}

  getDevice(e: boolean) {
    this.isDevice = e;
  }

  ngOnInit(): void {
    this.steps();
    let uuid = UUID.UUID();
    this.qrValue = uuid;
  }

  steps() {
    let url = apiUrls?.scanningApi.steps;
    this.RestService.get(url).subscribe((res: any) => {
      // this.compArr.push();
      this.compArr = res?.data?.components;
      this.compArr.unshift(res?.data?.product);

      console.log(res, this.compArr, 'products');
    });
  }

  submitPackage() {
    let url = apiUrls?.scanningApi.boxScanner;
    let data = {
      chassis_number: this.valuearr[0],
      packing_id: this.qrValue,
    };
    this.RestService.postToken(url, data).subscribe(
      (response) => {
        this.success = 'Submitted succesfully';
        this.issubmitted = true;
        setTimeout(() => {
          this.success = '';
        }, 5000);
      },
      (err) => {
        this.error = 'Something went wrong , please try again !!';
        setTimeout(() => {
          this.error = '';
        }, 3000);
      }
    );
  }

  print() {
    var canvas: any = document.querySelector('canvas');
    var img = canvas.toDataURL('image/png');
    const a: any = document.createElement('a');
    a.href = img;
    a.download = 'test';
    document.body.appendChild(a);
    a.style = 'display: none';
    a.click();
    a.remove();
  }

  formStepper() {
    this.formStep = this.formStep + 1;
    this.scannedValue != '' &&
      this.valuearr[0] !== this.scannedValue &&
      this.valuearr.push(this.scannedValue);
    this.status = '';
    this.scannedValue = '';
    this.chechisStatus = 1;
    if (this.formStep > 6) {
      let uuid = UUID.UUID();
      this.qrValue = uuid;
    }
  }
  formStepperDown() {
    this.formStep = this.formStep - 1;
    this.formStep !== 1 && this.valuearr.pop();
    this.chechisStatus = 0;
  }

  addItem(e: string) {
    // this.scannedValue = '';
    // this.status = '';
    console.log(e, 'ee');

    if (e !== '') {
      console.log(this.scannedValue, e, 'value', this.formStep);
      if (this.scannedValue !== e) {
        this.chechisStatus = 0;
      }

      if (this.chechisStatus !== 200 && this.chechisStatus !== 1) {
        let url =
          this.formStep === 1
            ? apiUrls?.scanningApi?.chechisScan + '?chassis_number=' + e
            : apiUrls?.scanningApi?.RAW +
              '?chassis_number=' +
              this.valuearr[0] +
              '&raw_material_id=' +
              e +
              '&order_id=' +
              (this.formStep - 1);
        1;
        this.RestService.get(url).subscribe(
          (res: any) => {
            this.chechisStatus = res?.code;
            if (this.chechisStatus === 200) {
              this.status = 'valid';
              this.valuearr.push(e);
              this.scannedValue = e;

              if (this.formStep === 1) {
                this.formStep =
                  res?.data !== null && res?.data != 1 ? res?.data + 1 : 1;
                // this.status = '';
                // this.scannedValue = '';
              }
            }
          },
          (err) => {
            // this.chechisStatus =;

            // (this.scannedValue = ''), (this.status = '');

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
