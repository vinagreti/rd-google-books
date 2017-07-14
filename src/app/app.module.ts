import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from "@angular/http";
import { MaterialModule } from '@angular/material';

import { AppComponent } from './app.component';
import { GoogleBooksService } from './google-books';
import { BookComponent } from './book/book.component';
import { BookCoverComponent } from './book/book-cover/book-cover.component';
import 'hammerjs';
@NgModule({
  declarations: [
    AppComponent,
    BookComponent,
    BookCoverComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [GoogleBooksService],
  bootstrap: [AppComponent]
})
export class AppModule { }
