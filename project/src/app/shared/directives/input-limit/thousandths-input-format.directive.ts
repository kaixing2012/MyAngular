import { Directive, ElementRef, HostListener, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseInputLimitDirective } from './base-input-limit.directive';
@Directive({
  selector: '[appThousandthsInputFormat]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: ThousandthsInputFormatDirective
    }
  ]
})
export class ThousandthsInputFormatDirective extends BaseInputLimitDirective implements OnChanges, OnInit {
  @Input() decimalPlace = 0;
  @Input() thousandths = ',';

  disabled = false;

  value: any = '';

  constructor(
    override readonly elRef: ElementRef
  ) {
    super(elRef);
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    Object.keys(changes)
      .forEach(propName => {
        if (changes.hasOwnProperty(propName)) {
          switch (propName) {
            case 'decimalPlace':
              this.decimalPlace = changes[propName].currentValue;
              break;

            case 'thousandths':
              this.thousandths = changes[propName].currentValue;
              break;

            default:
              break;
          }
        }
      });
  }

  ngOnInit(): void {
    this.setValue(this.elRef.nativeElement.value);
  }

  @HostListener('keydown', ['$event']) keyDownEvent(event: KeyboardEvent): void {
    if (
      (this.specialKeys.indexOf(event.key) !== -1) || // Allow special events
      (this.acvxKeys.indexOf(event.key) !== -1 && event.ctrlKey) || // Allow: Ctrl+?
      (this.acvxKeys.indexOf(event.key) !== -1 && event.metaKey) // Allow: Cmd+? (Mac)
    ) {
      return;
    }

    // Handle checking if given value is numeric or dot value
    if (isNaN(parseFloat(event.key)) && event.key !== '.') {
      event.preventDefault();
    } else if (this.decimalPlace < 1 && event.key === '.') {
      event.preventDefault();
    }

    // Handle decimals related logic
    const [_, decimals] = this.value
      .toString()
      .split('.');

    if (decimals && decimals.toString().length >= this.decimalPlace) {
      event.preventDefault();
    }

    // Handle char on first index to check if it is 0
    const getFirstChar = this.value
      .toString()
      .indexOf(0);

    if (getFirstChar.toString() === '0' && event.key.toString() === '0' && this.value.indexOf('.') === -1) {
      event.preventDefault();
    } else if (getFirstChar.toString() === '0' && !isNaN(parseFloat(event.key)) && this.value.indexOf('.') === -1) {
      this.elRef.nativeElement.value = '';
    }
  }

  @HostListener('keyup', ['$event']) keyUpEvent(event: KeyboardEvent): void {
    this.setValue(this.elRef.nativeElement.value);
  }

  setValue(val: any): void {
    this.value = this.formatValue(val);

    // 保留有千分位var
    this.elRef.nativeElement.value = this.value;
  }

  // 動態調整 Value Format ex. 1,000,000.00
  formatValue(value: string): string {
    let currentVal: string = value;
    currentVal = currentVal.replace(/[^.0-9]/g, '');

    // 如果是空白
    if (currentVal === '') {
      return '';
    } else {
      return this.stringChange(currentVal);
    }
  }

  // 格式轉換
  stringChange(numberString: string): string {
    // 沒有小數點
    if (numberString.indexOf('.') === -1) {
      const intString = this.addThousandths(numberString, this.thousandths);

      return `${intString}`;

    // 有小數點
    } else {
      const[left, right] = numberString.split('.');
      const intString = this.addThousandths(left, this.thousandths);
      const floatString = right;

      return `${intString}.${floatString}`;
    }
  }

  // 加入千分位
  addThousandths(numberString: string, thousandths: string): string {
    console.log(thousandths)
    
    const strArr = numberString
      .split('')
      .reverse();

    const result = Array<any>();

    strArr.forEach((v, i) => {
      if (i % 3 === 0 && i !== 0) {
        result.push(thousandths);
      }

      result.push(v);
    });

    return result
      .reverse()
      .join('');
  }
}
