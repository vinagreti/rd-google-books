import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MdCardModule, MdButtonModule, MdIconModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { BookComponent } from './book.component';
import { BookCoverComponent } from './book-cover/book-cover.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookSearchComponent } from './book-search/book-search.component';
import { GoogleBooksService } from './google-books';

@NgModule({
  imports: [
    CommonModule,
    MdCardModule,
    MdButtonModule,
    MdIconModule,
    ReactiveFormsModule,
    RouterModule
  ],
  declarations: [
    BookComponent,
    BookCoverComponent,
    BookListComponent,
    BookSearchComponent
  ],
  providers: [GoogleBooksService],
})
export class BookModule { }
