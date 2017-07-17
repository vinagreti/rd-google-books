import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from "@angular/http";
import { MaterialModule } from '@angular/material';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { JsonStorageModule } from './json-storage/json-storage.module';
import { BookModule } from './book';

import 'hammerjs';

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    AppRoutingModule,
    BookModule,
    BrowserModule,
    HttpModule,
    JsonStorageModule,
    MaterialModule,
    RouterModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
