import { CommonModule, DecimalPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { CurrencyPipe } from './number/currency';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    CurrencyPipe
  ],
  declarations: [
    CurrencyPipe
  ],
  providers: [
    DecimalPipe
  ]
})
export class SharedPipeModule { }
