import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedDirectiveModule } from '@shared/directives/shared-directive.module';
import { MDBModule } from '@shared/modules/mdb.module';
import { CcyAmtInputComponent } from './ccy-amt-input/ccy-amt-input.component';

@NgModule({
  imports: [
    CommonModule,
    SharedDirectiveModule,
    MDBModule,
  ],
  exports: [
    CcyAmtInputComponent,
  ],
  declarations: [
    CcyAmtInputComponent,
  ],

})
export class SharedComponentModule {}
