import { LocalstoreService } from 'src/app/common-resources/servieces/localstore.service';
import { RestService } from 'src/app/common-resources/servieces/rest.service';
import { apiUrls } from 'src/app/common-resources/api';
import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { UUID } from 'angular2-uuid';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.css'],
})
export class UserhomeComponent implements OnInit {
  valuearr: Array<any> = [];
  isPrevScanned: Boolean = false;
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
  showHashedQR: any = false;
  range: any = '';
  assignedProductList: any = [];
  chassisValue: string = '';
  printQr: any = false;
  productSelected: boolean = false;
  modelNumberShow: boolean = false;
  printQrCode: boolean = false;
  autofocus: boolean = false;
  nextScan: boolean = false;
  skipable: boolean = false;
  is_skip_component: any;
  productList: any;
  isRework = 0;
  selectedProduct: any = '';
  operatorName = localStorage.getItem('name');
  operatorMail = localStorage.getItem('email');
  is_skip_load: boolean = false;
  compUid: any;
  productModel: any;
  modelNumbers: any;
  isRefresh: boolean= true;
  isLoading : boolean = false;
  isModalLoading : boolean  = false;
  constructor(
    private router: Router,
    private toast: NgToastService,
    private RestService: RestService,
    private LocalStore: LocalstoreService
  ) {
    setInterval(() => {
      const input = document.getElementById(
        'barcodeInput'
      ) as HTMLInputElement | null;
      input?.focus();
    }, 600);

    if(localStorage.getItem('refresh') == 'true'){
this.isRefresh = false;
this.getComponentLit(this.LocalStore.getItem('productUid'));
this.selectedProduct =localStorage.getItem('selectedProduct');
this.productSelected = true;
    }else{
      this.isRefresh = true
    }
  }

  getDevice(e: boolean) {
    this.isDevice = e;
  }

  changeScreen() {
    this.productSelected = false;
    this.modelNumberShow = false;
    window.location.reload();
  }

  ngOnInit(): void {
    this.orderid = this.LocalStore.getItem('orderId');
    this.productUid = this.LocalStore.getItem('productUid');
    this.range = this.LocalStore.getItem('modelNumber');
    this.printQr = localStorage.getItem('isprint');
    // this.steps();
    this.gtProductList();
  }

  getd() {
    console.log(new Date().toJSON('yyyy/MM/dd HH:mm'));
  }

  modalChange(e: any) {
    this.productSelected = true;
    if (e.target.value) {
      this.getComponentLit(e.target.value);
    }

    localStorage.setItem('refresh' , 'true')

    this.isRefresh = false;
    let arr = this.modelNumbers.filter((item: { uid: any }) => {
      return item.uid == e.target.value;
    });


    let month = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];
    let fullYear = new Date().getFullYear();
    let lastTwoDigitofYear = String(fullYear).slice(-2);

    let url = apiUrls?.getBarCode + arr[0].uid;

    this.RestService.get(url).subscribe((res: any) => {
      let number = res?.data?.barcodeSerialNo;
      let desiredWidth = 5;
      let formattedNumber = String(number).padStart(desiredWidth, '0');
      console.log(res, 'jkhgggh');
      this.qrValue =
        arr[0].modelNumber +
        res?.data.variant +
        lastTwoDigitofYear +
        month[new Date().getMonth()] +
        'F' +
        formattedNumber;
      this.productModel = e.target.value;
    });
  }

  productChange(e: any) {
    this.isModalLoading = true;
    let url = apiUrls?.getProductModel + e.target.value;
    this.RestService.get(url).subscribe(
      (res: any) => {
        this.isModalLoading = false;
        this.modelNumbers = res.data.product;
      },
      (err) => {
        console.log(err);
      }
    );
    this.selectedProduct = e.target.value;
    localStorage.setItem('selectedProduct', this.selectedProduct)
    this.modelNumberShow = true;
  }

  getComponentLit(e: any) {
    this.isLoading = true;
    let url = apiUrls.componentApi;
    let formData = new FormData();
    formData.append('product_uid', e);
    this.RestService.postToken(url, formData).subscribe((res: any) => {
      this.compArr = res.data;
      let arr = res?.data.filter((item: any) => {
        return item.is_active == true;
      });
      this.orderid = arr[0].order_id;
      this.LocalStore.setItem('orderId', arr[0].order_id);
      this.LocalStore.setItem('product_name', arr[0].name);
      this.productUid = e;
      this.LocalStore.setItem('productUid', e);
      this.range = arr[0].modelNumber;
      this.LocalStore.setItem('modelNumber', arr[0].modelNumber);
      this.printQr = arr[0].is_print;
      localStorage.setItem('isprint', arr[0].is_print);
      this.skipable = arr[0].is_skip;
      this.is_skip_component = arr[0].skip_component_id;
      this.LocalStore.setItem('scan_count', arr[0].count_scanning);
      this.loading = false;
      arr[0].is_rework ? (this.isRework = 1) : (this.isRework = 0);
      this.isLoading = false;
    });
  }

  gtProductList() {
    let url = apiUrls.productApi;
    this.compArr = [];
    this.RestService.get(url).subscribe((res: any) => {
      this.assignedProductList = res.data;
    });
  }

  steps() {
    this.loading = true;
    let url = apiUrls?.scanningApi.steps;
    if (!this.is_skip_load) {
      this.getComponentLit(this.LocalStore.getItem('productUid'));
    } else {
      this.skipStep('default');
    }
    // this.RestService.get(url).subscribe(
    //   (res: any) => {
    //     this.compArr = res?.data?.components;
    //     let index = this.compArr.findIndex(
    //       (x: any) => x.orderId == this.orderid
    //     );
    //     this.LocalStore.setItem(
    //       'scan_count',
    //       res?.data?.components[index]?.count
    //     );
    //     this.LocalStore.setItem(
    //       'product_name',
    //       res?.data?.components[index]?.name
    //     );
    //     this.productList = res?.data?.components;
    //     this.loading = false;
    //     let arr = res?.data?.components?.filter((item: any, index: any) => {
    //       return item.orderId == this.orderid;
    //     });
    //     this.skipable = arr[0].is_skipable;
    //     this.is_skip_component = arr[0].is_skip_component;
    //   },
    //   (err) => {
    //     this.loading = false;
    //     if (err.status == 401) {
    //       this.toast.error({
    //         detail: 'Error',
    //         summary: err?.error?.message,
    //         sticky: false,
    //         duration: 7000,
    //       });
    //       localStorage.clear();
    //       this.router.navigate(['/']);
    //     }
    //   }
    // );
  }

  skipStep(e: any) {
    this.scannedValue = '';
    this.chassisValue = '';
    let id = e == 'click' ? this.is_skip_component : this.compUid;
    let url =
      apiUrls?.scanningApi?.skipStep +
      '?' +
      'skip_component=' +
      id +
      '&product_uid=' +
      this.LocalStore.getItem('productUid');

    this.RestService.get(url).subscribe(
      (res: any) => {
        this.compArr = [];
        this.compArr = res.data;

        let arr = res?.data.filter((item: any) => {
          return item.is_active == true;
        });
        this.orderid = arr[0].order_id;
        this.LocalStore.setItem('orderId', arr[0].order_id);
        this.LocalStore.setItem('product_name', arr[0].name);
        this.range = arr[0].modelNumber;
        this.LocalStore.setItem('modelNumber', arr[0].modelNumber);
        this.printQr = arr[0].is_print;
        localStorage.setItem('isprint', arr[0].is_print);
        this.skipable = arr[0].is_skip;
        this.is_skip_component = arr[0].skip_component_id;
        this.compUid = arr[0].uid;
        this.LocalStore.setItem('scan_count', arr[0].count_scanning);
        this.is_skip_load = true;
        this.loading = false;
        arr[0].is_rework ? (this.isRework = 1) : (this.isRework = 0);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  submitPackage() {
    let url = apiUrls?.scanningApi.boxScanner;
    let data = {
      chassis_number:
        this.orderid == 1
          ? localStorage.getItem('scannedVal')
          : this.chassisNumber,
      packing_id: this.qrValue,
      product_uid: this.LocalStore.getItem('productUid'),
      component_name: this.LocalStore.getItem('name'),
    };
    this.RestService.postToken(url, data).subscribe(
      (response) => {
        this.success = 'Submitted succesfully';
        this.issubmitted = false;
        setTimeout(() => {
          this.success = '';
        }, 5000);
        this.toast.success({
          detail: 'SUCCESS',
          summary: 'Packaging added succesfully',
          duration: 10000,
        });
        this.showHashedQR = false;
        this.rescan = true;
        this.nextScan = false;
        this.scannedValue = '';
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
  }

  formStepper(event: any) {
    localStorage.setItem('scannedVal', this.scannedValue);
    var tName = this.range.split('-')[0];
    var firstRange: any = tName.match(/\d+/);
    let x = this.range.split('-')[1];
    let y = x.match(/\d+/);
    var lastrange: any = y && y['0'];
    let num: any = this.scannedValue?.match(/\d+/);

    if (num >= parseInt(firstRange) && num <= parseInt(lastrange)) {
      this.scannedValue !== ''
        ? this.SaveData()
        : this.toast.warning({
            detail: 'WARNING',
            summary: 'Please scan QR !! ',
            sticky: false,
            duration: 3000,
          });
    } else {
      if (this.scannedValue == '') {
        this.toast.warning({
          detail: 'warning',
          summary: 'Please scan QR !! ',
          sticky: false,
          duration: 3000,
        });
      } else {
        this.toast.warning({
          detail: 'warning',
          summary: 'Model range is not valid',
          sticky: false,
          duration: 3000,
        });
      }
    }
  }
  inputVal: string = '';
  test(e: any) {
    const scannedData = e.target.value.trim();
    this.scannedValue = e.target.value;
    this.inputVal = e.target.value;
    if (this.orderid != 1) {
      this.scan(scannedData);

      if (this.nextScan == true) {
        this.formStepper(this.scannedValue);
      }
    } else {
      this.formStepper(this.scannedValue);
    }
    setTimeout(() => {
      this.inputVal = '';
    }, 1000);
  }

  SaveData() {
    let uuid = UUID.UUID();
    var characters =
      '123456789010111213141516171819202123242526263784634ABCDEFGHIJKLMNOPQRSTUVWXTZ';

    //specify the length for the new string
    var lenString = 25;
    var randomstring = '';

    //loop to select a new character in each iteration
    for (var i = 0; i < lenString; i++) {
      var rnum = Math.floor(Math.random() * characters.length);
      randomstring += characters.substring(rnum, rnum + 1);
    }

    const url =
      this.orderid == 1
        ? apiUrls?.scanningApi?.chechisScan
        : this.isPrevScanned == true
        ? apiUrls?.scanningApi?.RAW
        : '';
    console.log(this.isPrevScanned, 'lllklkl');

    if (this.orderid != 1 && !this.isPrevScanned) {
      this.toast.warning({
        detail: 'warning',
        summary: 'Previous component not scanned yet',
        sticky: false,
        duration: 5000,
      });
    }
    let body = {
      product_uid: this.LocalStore.getItem('productUid'),
      chassis_number:
        this.orderid == 1 ? this.scannedValue : this.chassisNumber,
      name: this.LocalStore.getItem('product_name'),
      order_id: this.orderid,
      count_scanning: this.LocalStore.getItem('scan_count')
        ? this.LocalStore.getItem('scan_count')
        : 0,
      raw_material_id: this.orderid != 1 ? this.scannedValue : null,
      is_rework: this.isRework,
    };
    this.RestService?.postToken(url, body).subscribe(
      (res: any) => {
        if (res?.code === 200) {
          this.scannedValue = '';
          this.toast.success({
            detail: 'SUCCESS',
            summary: 'Component added succesfully',
            duration: 10000,
          });
        }
        localStorage.getItem('isprint') == 'true'
          ? (this.showHashedQR = true)
          : (this.showHashedQR = false);
        this.nextScan = false;
        this.rescan = true;
        this.scannedValue = '';
        this.status = '';
        this.chassisValue = '';
        this.steps();
        if (
          this.compArr.length == this.LocalStore.getItem('orderId') ||
          localStorage.getItem('isprint') == 'true'
        ) {
          this.showHashedQR = true;
        } else {
          this.showHashedQR = false;
        }
      },
      (err) => {
        if (err?.error?.code === 401 || err?.error?.code === 403) {
          // LOGOUT WILL GO HERE
          this.toast.warning({
            detail: 'WARNING',
            summary: 'Incorrect credentials ..',
            sticky: false,
            duration: 3000,
          });
        } else {
          if (err?.error?.code === 422) {
            this.toast.warning({
              detail: 'WARNING',
              summary: 'Component already added',
              sticky: false,
              duration: 3000,
            });
          }
          this.showHashedQR = false;
        }
      }
    );
  }

  scan(e: string) {
    this.scannedValue = e;
    // alert(this.scannedValue);
    if (this.orderid != 1 && this.rescan == true) {
      let param =
        '?product uid=' +
        this.LocalStore.getItem('productUid') +
        '&chassis_number=' +
        this.scannedValue;
      const url = apiUrls?.scanningApi?.validateChassis + param;
      this.RestService.get(url).subscribe(
        (res) => {
          let allComponentUrl = apiUrls?.isScannedComponent;
          let payload = {
            product_uid: localStorage.getItem('productUid'),
            chassis_id: this.scannedValue,
          };
          this.RestService.postToken(allComponentUrl, payload).subscribe(
            (res: any) => {
              this.compArr = res.data;
              let arr = res?.data?.filter((elemns: any) => {
                return elemns.order_id == this.orderid - 1;
              });

              console.log(arr, 'arrraa');
              this.isPrevScanned = arr[0].is_scanned;
            }
          );
          this.rescan = false;
          this.chassisNumber = this.scannedValue;
          this.chassisValue == ''
            ? (this.chassisValue = this.scannedValue)
            : '';
          this.nextScan = true;
          this.toast.success({
            detail: 'Success',
            summary: 'Chassis verified !!',
            sticky: false,
            duration: 10000,
          });

          this.status = 'valid';
        },
        (err) => {
          this.toast.warning({
            detail: 'WARNING',
            summary: 'Chassis not found !!',
            sticky: false,
            duration: 3000,
          });
        }
      );
    }
  }
}
