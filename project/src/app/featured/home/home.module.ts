import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedComponentModule } from '@shared/components/shared-component.module';
import { SharedDirectiveModule } from '@shared/directives/shared-directive.module';
import { SharedPipeModule } from '@shared/pipes/shared-pipe.module';
import { PostPage } from './components/post/post.page';
import { HomeRoutingModule } from './home-routing.module';
import { HomePage } from './home.page';


@NgModule({
  declarations: [
    HomePage,
    PostPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HomeRoutingModule,
    SharedComponentModule,
    SharedDirectiveModule,
    SharedPipeModule
  ]
})
export class HomeModule { }
