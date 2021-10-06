/* eslint-disable @typescript-eslint/quotes */
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { NgxMaskModule, IConfig } from 'ngx-mask';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LancamentoPage } from './lancamento/lancamento.page';

import { LOCALE_ID } from '@angular/core';
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localePt);

const maskConfig: Partial<IConfig> = {
  validation: false,
};


@NgModule({
  declarations: [
    AppComponent
  ],
  entryComponents: [],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    //LancamentoPageModule
    NgxMaskModule.forRoot(maskConfig),
    BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: LOCALE_ID, useValue: "pt-BR" }
  ], bootstrap: [AppComponent],
})
export class AppModule { }
