import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from "@angular/http";
import { MaterialModule } from '@angular/material';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { GoogleBooksService } from './google-books';
import { BookComponent } from './book/book.component';
import { BookCoverComponent } from './book/book-cover/book-cover.component';
import { JsonStorageModule } from './json-storage/json-storage.module';
import 'hammerjs';

@NgModule({
  declarations: [
    AppComponent,
    BookComponent,
    BookCoverComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpModule,
    JsonStorageModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule
  ],
  providers: [GoogleBooksService],
  bootstrap: [AppComponent]
})
export class AppModule { }
