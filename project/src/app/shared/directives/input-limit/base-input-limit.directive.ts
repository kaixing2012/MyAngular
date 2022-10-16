/** 簡略的欄位檢核，包含特殊按鍵'Backspace', 'Tab', 'End', 'Home'，複製貼上等等 */
import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({})
export abstract class BaseInputLimitDirective {
  // Accept numbers to be inputed with two digit decimal values
  protected regex: RegExp;
  // Allow key codes for special events
  protected readonly specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight', 'Del', 'Delete'];
  // Alloe key codes for a c v x
  protected readonly acvxKeys: Array<string> = ['a', 'c', 'v', 'x'];

  constructor(readonly elRef: ElementRef) { }

  @HostListener('paste', ['$event']) onPaste(event: ClipboardEvent): void {
    this.elRef.nativeElement.value = '';

    const clipboardData = event.clipboardData;
    const pastedText = clipboardData.getData('text');

    if (pastedText && !pastedText.match(this.regex)) {
      event.preventDefault();
    }
  }

  @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent): void {
    if (
      (this.specialKeys.indexOf(event.key) !== -1) || // Allow special events
      (this.acvxKeys.indexOf(event.key) !== -1 && event.ctrlKey) || // Allow: Ctrl+?
      (this.acvxKeys.indexOf(event.key) !== -1 && event.metaKey) // Allow: Cmd+? (Mac)
    ) {
      return;
    }

    this.performKeyDown(event);
  }

  @HostListener('compositionstart', ['$event']) onCompositionStart(event: CompositionEvent): void {
    this.performCompositionStart(event);
  }

  @HostListener('compositionupdate', ['$event']) onCompositionUpdate(event: CompositionEvent): void {
    this.performCompositionUpdate(event);
  }

  @HostListener('compositionend', ['$event']) onCompositionEnded(event: CompositionEvent): void {
    this.performCompositionEnded(event);
  }

  abstract performKeyDown(event: KeyboardEvent): void;
  abstract performCompositionStart(event: CompositionEvent): void;
  abstract performCompositionUpdate(event: CompositionEvent): void;
  abstract performCompositionEnded(event: CompositionEvent): void;
}
