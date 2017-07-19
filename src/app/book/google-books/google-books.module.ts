import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleBooksService } from './google-books.service';

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
  	GoogleBooksService
  ],
})
export class GoogleBooksModule { }
