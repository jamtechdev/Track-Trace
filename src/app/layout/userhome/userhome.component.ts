import {  Component } from '@angular/core';

@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.css'],
})
export class UserhomeComponent {
  // //
  valuearr: Array<any> = [];
  scannedValue: string = ''
  formStep: number = 1; isDevice : boolean = false
  public output!: any;

  getDevice(e:boolean){
this.isDevice = e
console.log(e , 'ghu');

  }

  formStepper() {
    this.formStep = this.formStep + 1;
    this.scannedValue != '' && this.valuearr.push(this.scannedValue);
  }
  formStepperDown() {
    this.formStep = this.formStep - 1;
    this.formStep !== 1 && this.valuearr.pop();
  }

  addItem(e: string) {
    if (e !== '') {
      this.scannedValue = e
    }
  }

  constructor() { }

  
}
