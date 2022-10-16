import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ChineseInputLimitDirective } from './input-limit/chinese-input-limit.directive';
import { DecimalPlaceInputLimitDirective } from './input-limit/decimal-place-input-limit.directive';


@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    DecimalPlaceInputLimitDirective,
    ChineseInputLimitDirective
  ],
  declarations: [
    DecimalPlaceInputLimitDirective,
    ChineseInputLimitDirective
  ]
})
export class SharedDirectiveModule { }
