import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {  MdButtonModule,
          MdCardModule,
          MdCheckboxModule,
          MdIconModule,
          MdInputModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { BookComponent } from './book.component';
import { BookCoverComponent } from './book-cover/book-cover.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookSearchComponent } from './book-search/book-search.component';
import { GoogleBooksModule } from './google-books/google-books.module';

@NgModule({
  imports: [
    GoogleBooksModule,
    CommonModule,
    MdCardModule,
    MdCheckboxModule,
    MdButtonModule,
    MdIconModule,
    MdInputModule,
    ReactiveFormsModule,
    RouterModule
  ],
  declarations: [
    BookComponent,
    BookCoverComponent,
    BookListComponent,
    BookSearchComponent,
  ],
})
export class BookModule { }
