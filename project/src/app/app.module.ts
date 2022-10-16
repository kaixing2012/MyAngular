import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { SharedComponentModule } from '@shared/components/shared-component.module';
import { SharedDirectiveModule } from '@shared/directives/shared-directive.module';
import { SharedPipeModule } from '@shared/pipes/shared-pipe.module';
import { ApiService } from '@shared/services/api.service';
import { AppState } from '@store/app/app.state';
import { DataRoomEffect } from '@store/data-room/data-room.effect';
import { dataRoomReducer } from '@store/data-room/data-room.reducer';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

const reducers: ActionReducerMap<AppState> = {
  dataRoom: dataRoomReducer,
};

const effects = [
  DataRoomEffect
];

const animatConfig = {
  disableAnimations: false
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule.withConfig(animatConfig),
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument(),
    EffectsModule.forRoot(effects),
    SharedComponentModule,
    SharedDirectiveModule,
    SharedPipeModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
