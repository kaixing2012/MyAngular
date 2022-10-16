/**
 * 小數點位數輸入限制 Directive
 */

import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { BaseInputLimitDirective } from './base-input-limit.directive';

@Directive({
  selector: '[appDecimalPlaceInputLimit]'
})
export class DecimalPlaceInputLimitDirective extends BaseInputLimitDirective implements OnChanges {

  @Input() decimalPlace = 0;

  constructor(readonly elRef: ElementRef) {
    super(elRef);
  }

  ngOnChanges(changes: SimpleChanges): void {
    Object.keys(changes)
      .forEach(propName => {
        if (changes.hasOwnProperty(propName)) {
          switch (propName) {
            case 'decimalPlace':
              this.decimalPlace = changes[propName].currentValue;

              if (this.decimalPlace > 0) {
                this.regex =
                  new RegExp(`^\\d*\\.?\\d{0,${this.decimalPlace}}$`, 'g');
              } else {
                this.regex =
                  new RegExp(`^\\d*$`, 'g');
              }
              break;

            default:
              break;
          }
        }
      });
  }

  /**
   * KeyDown 事件
   * @param event 鍵盤事件
   */
  performKeyDown(event: KeyboardEvent): void {
    const currentVal = this.elRef.nativeElement.value
      .toString()
      .replace(/,/g, '');
    const position = this.elRef.nativeElement.selectionStart;

    const nextVal: string = [
      currentVal.slice(0, position),
      event.key,
      currentVal.slice(position)
    ].join('');

    // 是否 Match 需要的 Regex Pattern
    if (nextVal && !nextVal.match(this.regex)) {
      event.preventDefault();
    }
  }

  // 非實作 Methods
  performCompositionStart(event: CompositionEvent): void { }
  performCompositionUpdate(event: CompositionEvent): void { }
  performCompositionEnded(event: CompositionEvent): void { }
}
