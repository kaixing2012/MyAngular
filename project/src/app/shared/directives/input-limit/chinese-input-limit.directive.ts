/**
 * 中文輸入禁止 Directive
 */

import { Directive, ElementRef, HostListener } from '@angular/core';
import { BaseInputLimitDirective } from './base-input-limit.directive';

@Directive({
  selector: '[appChineseInputLimit]'
})
export class ChineseInputLimitDirective extends BaseInputLimitDirective {
  constructor(
    override readonly elRef: ElementRef
  ) {
    super(elRef);
  }

  @HostListener('compositionstart', ['$event']) onCompositionStart(event: CompositionEvent): void {}

  @HostListener('compositionupdate', ['$event']) onCompositionUpdate(event: CompositionEvent): void {}

  @HostListener('compositionend', ['$event']) onCompositionEnded(event: CompositionEvent): void {
    const currentVal = this.elRef.nativeElement.value.toString();

    this.regex = /[^\x00-\x7F]/g;

    if (currentVal.match(this.regex)) {
      this.elRef.nativeElement.value = currentVal.replace(this.regex, '');
    }
  }
}
