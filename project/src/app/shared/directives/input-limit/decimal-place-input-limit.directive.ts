/**
 * 小數點位數輸入限制 Directive
 */

import { Directive, ElementRef, HostListener, Input, OnChanges, SimpleChanges } from '@angular/core';
import { BaseInputLimitDirective } from './base-input-limit.directive';

@Directive({
  selector: '[appDecimalPlaceInputLimit]'
})
export class DecimalPlaceInputLimitDirective extends BaseInputLimitDirective implements OnChanges {

  @Input() decimalPlace = 0;

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
  @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent): void {
    if (
      (this.specialKeys.indexOf(event.key) !== -1) || // Allow special events
      (this.acvxKeys.indexOf(event.key) !== -1 && event.ctrlKey) || // Allow: Ctrl+?
      (this.acvxKeys.indexOf(event.key) !== -1 && event.metaKey) || // Allow: Cmd+? (Mac)
      (!this.regex)
    ) {
      return;
    }

    // 取得當前值 且不包含千分位
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
}
