import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ChineseInputLimitDirective } from './input-limit/chinese-input-limit.directive';
import { DecimalPlaceInputLimitDirective } from './input-limit/decimal-place-input-limit.directive';
import { InputLengthLimitDirective } from './input-limit/input-length-limit-directive';
import { ThousandthsInputFormatDirective } from './input-limit/thousandths-input-format.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    ChineseInputLimitDirective,
    DecimalPlaceInputLimitDirective,
    InputLengthLimitDirective,
    ThousandthsInputFormatDirective
  ],
  declarations: [
    ChineseInputLimitDirective,
    DecimalPlaceInputLimitDirective,
    InputLengthLimitDirective,
    ThousandthsInputFormatDirective
  ]
})
export class SharedDirectiveModule { }
