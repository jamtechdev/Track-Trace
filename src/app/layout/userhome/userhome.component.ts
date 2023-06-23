import { RestService } from 'src/app/common-resources/servieces/rest.service';
import { apiUrls } from 'src/app/common-resources/api';
import { Component, OnInit } from '@angular/core';
import { UUID } from 'angular2-uuid';
import { LocalstoreService } from 'src/app/common-resources/servieces/localstore.service';

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
  loading: boolean = false;
  stepCounter: any;
  compArr: any = [];
  orderid: any;
  barcodeData = '';
  productUid: any;
  scan_count: any;

  constructor(
    private RestService: RestService,
    private LocalStore: LocalstoreService
  ) {}

  getDevice(e: boolean) {
    this.isDevice = e;
  }

  ngOnInit(): void {
    this.orderid = this.LocalStore.getItem('orderId');
    this.productUid = this.LocalStore.getItem('productUid');

    this.steps(); // console.log(Math.random().toString(16).slice(2));
    this.scan_count = this.LocalStore.getItem('scan_count');
    console.log(this.scan_count);

    let uuid = UUID.UUID();
    this.qrValue = uuid;
  }

  steps() {
    this.loading = true;
    let url = apiUrls?.scanningApi.steps;
    this.RestService.get(url).subscribe(
      (res: any) => {
        this.compArr = res?.data?.components;
        let index = this.compArr.findIndex(
          (x: any) => x.orderId == this.orderid
        );
        this.LocalStore.setItem(
          'scan_count',
          res?.data?.components[index]?.count
        );
        this.loading = false;
        console.log(res?.data?.components[index].count);
      },

      (err) => {
        this.loading = false;
      }
    );
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
    window.print();
    // var canvas: any = document.querySelector('canvas');
    // const a: any = document.createElement('a');
    // var img = canvas.toDataURL('image/png');
    // a.href = img;
    // // a.download = 'test';
    // document.body.appendChild(a);
    // a.style = 'display: none';
    // a.click();
    // a.remove();
  }

  formStepper() {
    // this.formStep = this.formStep + 1;
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
    this.steps();
  }

  // formStepperDown() {
  //   this.formStep = this.formStep - 1;
  //   this.formStep !== 1 && this.valuearr.pop();
  //   this.chechisStatus = 0;
  // }

  addItem(e: string) {
    // console.log(this.orderid);

    if (e !== '') {
      this.stepCounter = this.formStep;
      if (this.scannedValue !== e) {
        this.chechisStatus = 0;
      }
      if (this.chechisStatus !== 200 && this.chechisStatus !== 1) {
        console.log(this.scan_count);

        let data = {
          product_uid: this.productUid,
          chassis_number: e,
          count_scanning: this.scan_count,
          order_id: this.orderid,
        };

        let url =
          this.orderid == 1
            ? apiUrls?.scanningApi?.chechisScan
            : // '?product_uid' +
              // this.productUid +
              // '&chassis_number=' +
              // e +
              // '&count_scanning' +
              // this.scan_count
              apiUrls?.scanningApi?.RAW +
              '?chassis_number=' +
              this.valuearr[0] +
              '&raw_material_id=' +
              e +
              '&order_id=' +
              this.orderid;
        1;
        this.RestService.post(data, url).subscribe(
          (res: any) => {
            console.log(res);

            this.chechisStatus = res?.code;
            if (this.chechisStatus === 200) {
              this.status = 'valid';
              this.valuearr.push(e);
              this.scannedValue = e;
              if (this.barcodeData == '') {
                this.barcodeData = e;
              }
              // if (this.formStep === 1) {
              //   this.formStep =
              //     res?.data !== null && res?.data != 1 ? res?.data + 1 : 1;
              // }
            }
            if (this.stepCounter != this.formStep) {
              this.status = '';
              this.scannedValue = '';
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
