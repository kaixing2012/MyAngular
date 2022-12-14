import { Directive, ElementRef, HostListener, Input, OnChanges, OnInit, Renderer2, SimpleChanges } from '@angular/core';
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
export class ThousandthsInputFormatDirective extends BaseInputLimitDirective
  implements OnChanges, OnInit {

  constructor(
    private readonly elementRef: ElementRef
  ) {
    super(elementRef);
  }

  @Input() decimalPlace = 0;
  @Input() thousandths = ',';

  regex: RegExp;

  disabled = false;

  value: any = '';

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
    this.setValue(this.elementRef.nativeElement.value);
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

    if (getFirstChar.toString() === '0' && event.key.toString() === '0') {
      event.preventDefault();
    } else if (getFirstChar.toString() === '0' && event.key.toString() !== '0') {
      this.elRef.nativeElement.value = '';
    }
  }

  @HostListener('keyup', ['$event']) keyUpEvent(event: KeyboardEvent): void {
    this.setValue(this.elementRef.nativeElement.value);
  }

  setValue(val: any): void {
    this.value = this.formatValue(val);

    // ??????????????????var
    this.elementRef.nativeElement.value = this.value;
  }

  // ???????????? Value Format ex. 1,000,000.00
  formatValue(value: string): string {
    let currentVal: string = value;
    currentVal = currentVal.replace(/[^.0-9]/g, '');

    // ???????????????
    if (currentVal === '') {
      return '';
    } else {
      return this.stringChange(currentVal);
    }
  }

  // ????????????
  stringChange(numberString: string): string {
    // ???????????????
    if (numberString.indexOf('.') === -1) {
      const intString = this.addThousandths(numberString, this.thousandths);

      return `${intString}`;

    // ????????????
    } else {
      const[left, right] = numberString.split('.');
      const intString = this.addThousandths(left, this.thousandths);
      const floatString = right;

      return `${intString}.${floatString}`;
    }
  }

  // ???????????????
  addThousandths(numberString: string, thousandths: string): string {
    const strArr = numberString
      .split('')
      .reverse();

    const result = [];

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
