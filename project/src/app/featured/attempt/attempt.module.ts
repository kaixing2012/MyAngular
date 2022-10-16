import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedComponentModule } from '@shared/components/shared-component.module';
import { SharedDirectiveModule } from '@shared/directives/shared-directive.module';
import { SharedPipeModule } from '@shared/pipes/shared-pipe.module';
import { AttemptRoutingModule } from './attempt-routing.module';
import { AttemptPage } from './attempt.page';

@NgModule({
  declarations: [AttemptPage],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AttemptRoutingModule,
    SharedComponentModule,
    SharedDirectiveModule,
    SharedPipeModule,
  ]
})
export class AttemptModule { }
