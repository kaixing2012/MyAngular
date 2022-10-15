import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';
import { ThousandthsInputFormatDirective } from '@shared/directives/input-limit/thousandths-input-format.directive';

@Component({
  selector: 'app-ccy-amt-input',
  templateUrl: './ccy-amt-input.component.html',
  styleUrls: ['./ccy-amt-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: CcyAmtInputComponent,
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: CcyAmtInputComponent,
    },
  ],
})
export class CcyAmtInputComponent implements OnChanges, AfterViewInit, ControlValueAccessor, Validator {
  @Input() id: any;
  @Input() class: any;
  @Input() style: any;

  @Input() value: any = '';
  @Input() decimalPlace = 0;
  @Input() placeholder = '';
  @Input() minAmt = 0;
  @Input() maxAmt?: number;
  @Input() thousandths = ',';
  @Input() maxLength?: number;
  @Input() isMaxLenIncludedDecimals?: boolean;
  @Input() outputFormat: 'string' | 'number' = 'number';

  @Output() readonly blur: EventEmitter<any> = new EventEmitter();

  @ViewChild('ccyAmtInput') ccyAmtInput?: ElementRef;
  @ViewChild(ThousandthsInputFormatDirective) appThousandthsInputFormat?: ThousandthsInputFormatDirective;

  regex?: RegExp;

  disabled = false;

  formCtrlVal: any;

  doChange: any = () => {};
  doTouched: any = () => {};

  ngOnChanges(changes: SimpleChanges): void {
    Object.keys(changes).forEach((propName) => {
      if (changes.hasOwnProperty(propName)) {
        switch (propName) {
          case 'outputFormat':
            this.outputFormat = changes[propName].currentValue;
            break;

          case 'decimalPlace':
            this.decimalPlace = changes[propName].currentValue;
            break;

          case 'thousandths':
            this.thousandths = changes[propName].currentValue;
            break;

          case 'maxLength':
            this.maxLength = changes[propName].currentValue;
            break;

          case 'isMaxLenIncludedDecimals':
            this.isMaxLenIncludedDecimals = changes[propName].currentValue;
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

  ngAfterViewInit(): void {}

  onBlur(): void {
    if (this.ccyAmtInput) {
      const currentVal: string = this.ccyAmtInput.nativeElement.value;

      // 保留無千分位var
      this.formCtrlVal = currentVal.replace(/[^.0-9]/g, '');
      // 保留有千分位var
      this.ccyAmtInput.nativeElement.value = currentVal;

      let outputVal: any;

      if (this.formCtrlVal.length > 0) {
        outputVal = this.outputFormat === 'string' ? this.formCtrlVal : Number(this.formCtrlVal);
      }

      this.doChange(outputVal);

      this.blur.emit();
    }
  }

  writeValue(value: any): void {
    if (isNaN(parseFloat(value))) {
      console.error(`CcyAmtInputComponent - Given setValue is NaN`);
    }

    let valToSet: string = parseFloat(value).toString();

    // Form 表單清空會是null
    if (valToSet) {
      // Format value as given  decimal place
      if (this.decimalPlace) {
        const [ints, decimals] = valToSet.split('.');

        if (decimals) {
          // The format logic
          const fitDecimal = decimals.substring(0, decimals.length - (decimals.length - this.decimalPlace));

          valToSet = `${ints}.${fitDecimal}`;
        }
      }
      
      if (this.appThousandthsInputFormat) {
        this.appThousandthsInputFormat.setValue(valToSet);
      } else {
        this.value = valToSet;
      }

      this.formCtrlVal = valToSet;
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

  validate(control: AbstractControl): ValidationErrors | null {
    const amt = control.value;

    // 檢查輸入數值是否在範圍內
    if (this.maxAmt) {
      if (amt > this.maxAmt) {
        return {
          mustBeLess: {
            amt,
          },
        };
      }
    }

    if (this.minAmt) {
      if (amt < this.minAmt) {
        return {
          mustBeGreater: {
            amt,
          },
        };
      }
    }

    return null;
  }
}
