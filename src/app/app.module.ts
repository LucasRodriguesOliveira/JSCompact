import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { ResultTableComponent } from './result-table/result-table.component';
import { HomeComponent } from './home/home.component';
import { RequestFormComponent } from './request-form/request-form.component';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { HttpClientModule } from '@angular/common/http';
import { ToastMessageComponent } from './toast-message/toast-message.component';

registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    ResultTableComponent,
    HomeComponent,
    RequestFormComponent,
    ToastMessageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'pt-BR'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
