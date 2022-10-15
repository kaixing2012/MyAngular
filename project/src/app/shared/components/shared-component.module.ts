import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedDirectiveModule } from '@shared/directives/shared-directive.module';
import { CcyAmtInputComponent } from './ccy-amt-input/ccy-amt-input.component';

@NgModule({
  imports: [
    CommonModule,
    SharedDirectiveModule
  ],
  exports: [
    CcyAmtInputComponent,
  ],
  declarations: [
    CcyAmtInputComponent,
  ],

})
export class SharedComponentModule {}
