import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedComponentModule } from '@shared/components/shared-component.module';
import { SharedDirectiveModule } from '@shared/directives/shared-directive.module';
import { MDBModule } from '@shared/modules/mdb.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomePage } from './home.page';

@NgModule({
  declarations: [
    HomePage
  ],
  imports: [
    HomeRoutingModule,
    MDBModule,
    FormsModule,
    ReactiveFormsModule,
    SharedComponentModule,
    SharedDirectiveModule,
  ],
})
export class HomeModule {}
