import { RestService } from 'src/app/common-resources/servieces/rest.service';
import { apiUrls } from 'src/app/common-resources/api';
import { Component, OnInit } from '@angular/core';
import { UUID } from 'angular2-uuid';
import { NgToastService } from 'ng-angular-popup';

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
  rescan: boolean = true;
  chassisNumber: string = '';

  constructor(
    private toast: NgToastService,
    private RestService: RestService,
    private LocalStore: LocalstoreService
  ) {}

  getDevice(e: boolean) {
    this.isDevice = e;
  }

  ngOnInit(): void {
    setInterval(() => {
      // console.clear();
    }, 2000);

    this.orderid = this.LocalStore.getItem('orderId');
    this.productUid = this.LocalStore.getItem('productUid');

    this.steps();
    this.scan_count = this.LocalStore.getItem('scan_count');

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

        this.LocalStore.setItem(
          'product_name',
          res?.data?.components[index]?.name
        );

        this.loading = false;
      },

      (err) => {
        this.loading = false;
        if (err.status == 401) {
          this.toast.error({
            detail: 'Error',
            summary: err?.error?.message,
            sticky: false,
            duration: 3000,
          });
        }
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
    // this.scannedValue != '' &&
    //   this.valuearr[0] !== this.scannedValue &&
    //   this.valuearr.push(this.scannedValue);
    // this.status = '';
    // this.scannedValue = '';
    // this.chechisStatus = 1;
    // if (this.formStep > 6) {
    //   let uuid = UUID.UUID();
    //   this.qrValue = uuid;
    // }

    this.scannedValue !== ''
      ? this.SaveData()
      : this.toast.error({
          detail: 'Error',
          summary: 'Please scan QR !! ',
          sticky: true,
        });

    // this.steps();
  }

  SaveData() {
    const url =
      this.orderid == 1
        ? apiUrls?.scanningApi?.chechisScan
        : apiUrls?.scanningApi?.RAW;
    let body = {
      product_uid: this.LocalStore.getItem('productUid'),
      chassis_number:
        this.orderid == 1 ? this.scannedValue : this.chassisNumber,
      name: this.LocalStore.getItem('product_name'),
      order_id: this.orderid,
      count_scanning: this.scan_count,
      raw_material_id: this.orderid != 1 ? this.scannedValue : null,
    };

    this.RestService?.postToken(url, body).subscribe(
      (res: any) => {
        if (res?.code === 200) {
          this.scannedValue = '';
          this.toast.success({
            detail: 'SUCCESS',
            summary: 'Component added succesfully',
            duration: 3000,
          });
        }
      },
      (err) => {
        if (err?.error?.code === 401 || err?.error?.code === 403) {
          // LOGOUT WILL GO HERE
        } else {
          if (err?.error?.code === 422) {
            this.toast.error({
              detail: 'ERROR',
              summary: 'Component with this QR alreadyexists !! ',
              sticky: true,
            });
          }
        }
      }
    );
  }

  // formStepperDown() {
  //   this.formStep = this.formStep - 1;
  //   this.formStep !== 1 && this.valuearr.pop();
  //   this.chechisStatus = 0;
  // }

  addItem(e: string) {
    this.scannedValue = e;
    if (this.orderid != 1 && this.rescan == true && this.isDevice) {
      let param =
        '?product uid=' +
        this.LocalStore.getItem('productUid') +
        '&chassis_number=' +
        this.scannedValue;
      const url = apiUrls?.scanningApi?.validateChassis + param;

      this.RestService.get(url).subscribe(
        (res) => {
          this.rescan = false;
          this.chassisNumber = this.scannedValue;
          this.toast.success({
            detail: 'Success',
            summary: 'Chassis verified !!',
            sticky: false,
            duration: 3000,
          });
        },
        (err) => {
          // this.toast.warning({
          //   detail: 'Error',
          //   summary: 'Chassis not verified !!',
          //   sticky: true,
          // });
        }
      );
    }
  }
}
