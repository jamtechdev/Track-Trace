import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import {
  ScannerQRCodeConfig,
  ScannerQRCodeResult,
  NgxScannerQrcodeService,
  NgxScannerQrcodeComponent,
  ScannerQRCodeSelectedFiles,
  ScannerQRCodeDevice,
} from 'ngx-scanner-qrcode';
import { delay } from 'rxjs';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.css'],
})
export class ScannerComponent implements OnInit {
  @Output() newItemEvent = new EventEmitter<string>();

  @Output() devicealert = new EventEmitter<boolean>();

  @ViewChild('action') action: NgxScannerQrcodeComponent | undefined;

  height!:number
  width!:number
  constructor(private qrcode: NgxScannerQrcodeService) {}

  ngOnInit(): void {
    setInterval(() => {
      this.getscannerValue();
    }, 1000);
  }

  getscannerValue() {
    this.newItemEvent.emit(
      this.action?.data.value[0]?.value ? this.action?.data.value[0]?.value : ''
    );
  }

  public config: ScannerQRCodeConfig = {
    constraints: {
      video: {
        width: window.innerWidth, 
      },
    },
  };

  public qrCodeResult: ScannerQRCodeSelectedFiles[] = [];
  public qrCodeResult2: ScannerQRCodeSelectedFiles[] = [];

  ngAfterViewInit(): void {
    this.action?.isReady.pipe(delay(1000)).subscribe(() => {
      this.handle(this.action, 'start');
    });
  }

  public onEvent(e: ScannerQRCodeResult[], action?: any): void {
    e?.length && action && action.pause(); // Detect once and pause scan!
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
      action[fn](playDeviceFacingBack).subscribe((r: any) => {
        r.length > 0 && this.devicealert.emit(true);
      });
    } else {
      action[fn]().subscribe((r: any) => console.log(fn, r));
    }
  }
// // // 
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
        this.qrCodeResult2 = res;
      });
  }
}
