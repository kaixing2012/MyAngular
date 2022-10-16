/**
 * 貨幣金額輸入匡 Component
 */

import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, Output, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';
// import { Device } from '@ionic-native/device/ngx';

@Component({
   selector: 'app-ccy-amt-input',
   templateUrl: './ccy-amt-input.component.html',
   styleUrls: ['./ccy-amt-input.component.scss'],
   providers: [
     {
       provide: NG_VALUE_ACCESSOR,
       multi: true,
       useExisting: CcyAmtInputComponent
     },
     {
       provide: NG_VALIDATORS,
       multi: true,
       useExisting: CcyAmtInputComponent
     }
   ]
 })
 export class CcyAmtInputComponent implements OnChanges, AfterViewInit, ControlValueAccessor, Validator {

   constructor(
    //  private readonly device: Device,
     private readonly renderer: Renderer2,
   ) { }

   @Input() value: any = '';
   @Input() decimalPlace = 0;
   @Input() placeholder = '';
   @Input() minAmt = 0;
   @Input() maxAmt: number;
   @Input() thousandths = ',';

   @Output() readonly blurFunction: EventEmitter<any> = new EventEmitter();

   @ViewChild('ccyAmtInput') ccyAmtInput: ElementRef;

   regex: RegExp;

   disabled = false;

   formCtrlVal: any;
   lastSuccessValue = '';

   doChange: any = () => {};
   doTouched: any = () => {};

   ngOnChanges(changes: SimpleChanges): void {
     Object.keys(changes)
       .forEach(propName => {
         if (changes.hasOwnProperty(propName)) {
           switch (propName) {
             case 'value':
               this.value = this.setValueFormat(changes[propName].currentValue.toString());
               break;

             case 'decimalPlace':
               this.decimalPlace = changes[propName].currentValue;
               break;

             case 'minAmt':
               this.minAmt = changes[propName].currentValue;
               break;

             case 'maxAmt':
               this.maxAmt = changes[propName].currentValue;
               break;

             default:
               break;
           }
         }
       });
   }

   ngAfterViewInit(): void {
    //  if (this.device.platform === 'iOS' && parseInt(this.device.version, 10) <= 12) {
    //    this.renderer.setAttribute(this.ccyAmtInput.nativeElement, 'inputmode', 'numeric');
    //  } else {
    //    this.renderer.setAttribute(this.ccyAmtInput.nativeElement, 'inputmode', 'decimal');
    //  }

    //  if (this.device.platform === 'Android') {
    //    this.renderer.setAttribute(this.ccyAmtInput.nativeElement, 'pattern', '\\d*');
    //  }
   }

   onBlur(): void {
     this.blurFunction.emit();
   }

   onKeyUp(event: any): void {
    let currentVal: string = this.ccyAmtInput.nativeElement.value;
    currentVal  = currentVal.replace(/[^.0-9]/g, '');
    this.value = this.setValueFormat(currentVal);
    this.formCtrlVal = currentVal;
    this.ccyAmtInput.nativeElement.value = this.value;
    this.doChange(this.formCtrlVal.length < 1 ? undefined : Number(this.formCtrlVal));
   }

    // 加入千分位
   addThousandths(numberString: string, thousandths: string): string {
    const strArr = numberString.split('')
    .reverse();
    const result = [];
    for (let i = 0; i < strArr.length; i += 3) {
      result.push(strArr.slice(i, i + 3)
      .reverse()
      .join(''));
    }

    return `${result.reverse()
        .join(thousandths)}`;
  }

  // 格式轉換
   stringChange(numberString: string): string {
      //  沒有小數點
      if (numberString.indexOf('.') === -1) {
        const intString = this.addThousandths(numberString, this.thousandths);

        return `${intString}`;
      } else {
        // 有小數點
        const[left, right] = numberString.split('.');
        const intString = this.addThousandths(left, this.thousandths);
        const floatString = right.substring(0, this.decimalPlace);

        return `${intString}.${floatString}`;
      }
  }

   writeValue(value: string): void {
     // Form 表單清空會是null
     if (value) {
       this.value = this.setValueFormat(value);
       this.formCtrlVal = value;
     } else {
       this.value = '';
     }
   }

   registerOnChange(fn: any): void {
     this.doChange = fn;
   }

   registerOnTouched(fn: any): void {
     this.doTouched = fn;
   }

   setDisabledState?(isDisabled: boolean): void {
     this.disabled = isDisabled;
   }

   // 動態調整 Value Format ex. 1,000,000.00
   setValueFormat(value: string): string {
    let currentVal: string = value;
    currentVal  = currentVal.replace(/[^.0-9]/g, '');
    // 如果是空白
    if (currentVal === '') {
        this.lastSuccessValue = currentVal;
        this.value = currentVal;

        return '';
        // 不是數字格式 則寫入為上次紀錄的值 並轉換
    } else if (isNaN(parseFloat(currentVal))) {
        // 秀轉換後的值
        this.value = this.stringChange(this.lastSuccessValue);

        return this.stringChange(this.lastSuccessValue);
        // 把轉換前的值告訴 component
    } else if (parseFloat(currentVal) === 0 && currentVal.indexOf('.') === -1) {
        // 如果只有 0 那顯示0
        this.lastSuccessValue  = '0';
        this.value = '0';

        return '0';

    } else if (this.lastSuccessValue === '0'  && currentVal.indexOf('.') === -1) {
      this.lastSuccessValue = currentVal.substring(1); // 去0

      return this.stringChange(this.lastSuccessValue);
    } else {
        // 是數字格式 則重新紀錄 並轉換
        this.lastSuccessValue = currentVal;

        // 秀轉換後的值
        return this.stringChange(this.lastSuccessValue);
        // 把轉換前的值告訴 component
    }
   }

   validate(control: AbstractControl): ValidationErrors | null {

     const amt = control.value;

     // 檢查輸入數值是否在範圍內
     if (this.maxAmt) {
       if (amt > this.maxAmt) {
         return {
           mustBeLess: {
             amt
           }
         };
       }
     }
     if (this.minAmt) {
       if (amt < this.minAmt) {
         return {
           mustBeGreater: {
             amt
           }
         };
       }
     }
   }
 }
