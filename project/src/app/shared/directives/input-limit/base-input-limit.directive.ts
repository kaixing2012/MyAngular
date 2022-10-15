/** 簡略的欄位檢核，包含特殊按鍵'Backspace', 'Tab', 'End', 'Home'，複製貼上等等 */
import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({})
export abstract class BaseInputLimitDirective {
  // Accept numbers to be inputed with two digit decimal values
  protected regex?: RegExp;
  // Allow key codes for special events
  protected readonly specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight', 'Del', 'Delete'];
  // Allow key codes for a c v x
  protected readonly acvxKeys: Array<string> = ['a', 'c', 'v', 'x'];

  constructor(
    readonly elRef: ElementRef
  ) {}

  @HostListener('paste', ['$event']) onPaste(event: ClipboardEvent): void {
    if (!event.clipboardData || !this.regex) { 
      return;
    }

    this.elRef.nativeElement.value = '';

    const clipboardData = event.clipboardData;
    const pastedText = clipboardData.getData('text');

    if (pastedText && !pastedText.match(this.regex)) {
      event.preventDefault();
    }
  }
}
