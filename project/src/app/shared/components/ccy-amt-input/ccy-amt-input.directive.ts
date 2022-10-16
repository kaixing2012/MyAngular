import { Directive, ElementRef, EventEmitter, HostListener, Input, OnChanges, Output } from '@angular/core';


@Directive({
  selector: '[appAmtCcyInput]',
  providers: []
})
export class CcyAmtInputDirective implements OnChanges {

  @Input() thousandths = ',';
  @Input() decimalPlace = 2;
  @Input() nowValue = '';
  @Output() readonly valueChange: EventEmitter<any> = new EventEmitter();
  lastSuccessValue = '';

  constructor(
    readonly elementRef: ElementRef,
  ) { }

  ngOnChanges(): void {
    let currentVal: string = this.nowValue;
    currentVal  = currentVal.replace(/[^.0-9]/g, '');
    // 如果是空白
    if (currentVal === '') {
        this.lastSuccessValue = currentVal;
        this.elementRef.nativeElement.value = currentVal;
        // 不是數字格式 則寫入為上次紀錄的值 並轉換
    } else if (isNaN(parseFloat(currentVal))) {
        // 秀轉換後的值
        this.elementRef.nativeElement.value = this.stringChange(this.lastSuccessValue);
        // 把轉換前的值告訴 component
        this.valueChange.emit(this.lastSuccessValue);
    } else {
        // 是數字格式 則重新紀錄 並轉換
        this.lastSuccessValue = currentVal;
        // 秀轉換後的值
        this.elementRef.nativeElement.value = this.stringChange(this.lastSuccessValue);
        // 把轉換前的值告訴 component
        this.valueChange.emit(this.lastSuccessValue);
    }
  }

  @HostListener('keyup', ['$event']) onKeyDown(event: KeyboardEvent): void {
      // 拿值
    let currentVal: string = this.elementRef.nativeElement.value;
    currentVal  = currentVal.replace(/[^.0-9]/g, '');
    // 如果是空白
    if (currentVal === '') {
        this.lastSuccessValue = currentVal;
        this.elementRef.nativeElement.value = currentVal;
        // 不是數字格式 則寫入為上次紀錄的值 並轉換
    } else if (isNaN(parseFloat(currentVal))) {
        // 秀轉換後的值
        this.elementRef.nativeElement.value = this.stringChange(this.lastSuccessValue);
        // 把轉換前的值告訴 component
        this.valueChange.emit(this.lastSuccessValue);
    } else {
        // 是數字格式 則重新紀錄 並轉換
        this.lastSuccessValue = currentVal;
        // 秀轉換後的值
        this.elementRef.nativeElement.value = this.stringChange(this.lastSuccessValue);
        // 把轉換前的值告訴 component
        this.valueChange.emit(this.lastSuccessValue);
    }
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

}
