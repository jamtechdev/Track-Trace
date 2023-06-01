import { AfterViewInit, Component, ViewChild } from '@angular/core';
import {
  ScannerQRCodeConfig,
  ScannerQRCodeResult,
  NgxScannerQrcodeService,
  NgxScannerQrcodeComponent,
  ScannerQRCodeSelectedFiles,
  ScannerQRCodeDevice,
} from 'ngx-scanner-qrcode';
import { delay } from 'rxjs';

@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.css'],
})
export class UserhomeComponent {
  formStep: number = 1;
  public output!: any;
  startStatus: boolean = true;
  valuearr: Array<any> = [];

  @ViewChild('action') action: NgxScannerQrcodeComponent | undefined;

  formStepper() {
    this.formStep = this.formStep + 1;
    this.valuearr.push(this.action?.data?.value[0]?.value);
    console.log(this.valuearr, 'next ');
  }
  formStepperDown() {
    this.formStep = this.formStep - 1;
    this.valuearr.pop();
    console.log(this.valuearr, 'previous ');
  }

  public config: ScannerQRCodeConfig = {
    constraints: {
      video: {
        width: window.innerWidth, // https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
      },
    },
    // canvasStyles: {
    //   font: '17px serif',
    //   lineWidth: 1,
    //   fillStyle: '#ff001854',
    //   strokeStyle: '#ff0018c7',
    // } as any // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
  };

  public qrCodeResult: ScannerQRCodeSelectedFiles[] = [];
  public qrCodeResult2: ScannerQRCodeSelectedFiles[] = [];

  constructor(private qrcode: NgxScannerQrcodeService) {}

  ngAfterViewInit(): void {
    // this.action?.isPause?.valueOf()
    this.action?.isReady.pipe(delay(1000)).subscribe(() => {
      this.handle(this.action, 'start');
    });
  }

  public onEvent(e: ScannerQRCodeResult[], action?: any): void {
    e?.length && action && action.pause(); // Detect once and pause scan!
    console.log(e);
  }

  public handle(action: any, fn: string): void {
    const playDeviceFacingBack = (devices: ScannerQRCodeDevice[]) => {
      // front camera or back camera check here!
      const device = devices.find((f) =>
        /back|rear|environment/gi.test(f.label)
      ); // Default Back Facing Camera
      action.playDevice(device ? device.deviceId : devices[0].deviceId);
    };

    if (fn === 'start') {
      action[fn](playDeviceFacingBack).subscribe(
        (r: any) => console.log(fn, r),
        alert
      );
    } else {
      action[fn]().subscribe((r: any) => console.log(fn, r), alert);
    }
  }

  public onSelects(files: any): void {
    this.qrcode
      .loadFiles(files)
      .subscribe((res: ScannerQRCodeSelectedFiles[]) => {
        this.qrCodeResult = res;
      });
  }

  public onSelects2(files: any): void {
    this.qrcode
      .loadFilesToScan(files, this.config)
      .subscribe((res: ScannerQRCodeSelectedFiles[]) => {
        console.log(res);
        this.qrCodeResult2 = res;
      });
  }
}
