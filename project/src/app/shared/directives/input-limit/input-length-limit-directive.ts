/**
 * Limit input element length Directive
 *
 * Created by Edward Family
 */

import { Directive, ElementRef, HostListener, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';
import { BaseInputLimitDirective } from './base-input-limit.directive';

@Directive({
  selector: '[appInputLengthLimit]'
})
export class InputLengthLimitDirective extends BaseInputLimitDirective implements OnChanges {

  @Input() maxLength?: number;
  @Input() isMaxLenIncludedDecimals?: boolean; // 限制長度條件是否包含小數位 預設包含
  @Input() decimalPlace?: number;

  constructor(
    private readonly renderer: Renderer2,
    private readonly el: ElementRef
  ) {
    super(el);
  }

  ngOnChanges(changes: SimpleChanges): void {
    Object.keys(changes)
      .forEach(propName => {
        if (changes.hasOwnProperty(propName)) {
          switch (propName) {
            case 'isMaxLenIncludedDecimals':
              // 如果沒有特別指定不包含小數位，則設定預設為 True
              this.isMaxLenIncludedDecimals = changes[propName].currentValue === false
                ? false
                : true;

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
      (!this.maxLength || !this.decimalPlace)
    ) {
      return;
    }

    let symbolCount = 0;
    let filterLength = 0;
    let splitDot = [];

    const isIncludedDot = this.el.nativeElement.value.includes('.');

    if (!this.isMaxLenIncludedDecimals && isIncludedDot) { // 限制位數不包含小數點 且 當前輸入值包含小數點時
      splitDot = this.el.nativeElement.value.split('.');

      // 取得千分位符號總數
      symbolCount = splitDot[0].replace(/[^,]/g, '').length;
      // 此為被限制的總位數＋加上符號數 + 小數點數 + 小數點
      filterLength = this.maxLength + symbolCount + this.decimalPlace + 1;

    } else { // 限制長度條件包含小數點
      // 取得千分位、小數點符號總數
      symbolCount = this.el.nativeElement.value.replace(/[^,.]/g, '').length;
      // 此為被限制的總位數＋加上符號數 讓前端顯示符合設定的位數
      filterLength = this.maxLength + symbolCount;
    }

    // 當輸入已達maxlenth 欲輸入小數點時 讓限制位數++ 此情景僅在限制位數不包含小數點時發生
    const currValLen = splitDot[0]?.length ?? this.el.nativeElement.value.replace(/[,]/g, '').length;
    if ((this.maxLength === currValLen) && !isIncludedDot && event.key === '.' && !this.isMaxLenIncludedDecimals) {
      filterLength ++;
    }

    // add Attribute maxlength to limit max length
    this.renderer.setAttribute(this.el.nativeElement, 'maxlength', filterLength.toString());
    
  }
}
