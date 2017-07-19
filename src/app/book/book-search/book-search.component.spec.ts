import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { BookSearchComponent } from './book-search.component';
import { BookListComponent } from './../book-list/book-list.component';
import { BookCoverComponent } from './../book-cover/book-cover.component';
import { GoogleBooksService } from './../google-books/google-books.service';
import { JsonStorageModule } from './../../json-storage';

describe('BookSearchComponent', () => {
  let component: BookSearchComponent;
  let fixture: ComponentFixture<BookSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        BookCoverComponent,
        BookListComponent,
        BookSearchComponent
      ],
      imports: [
        HttpModule,
        JsonStorageModule,
        MaterialModule,
        ReactiveFormsModule,
        RouterTestingModule
      ],
      providers: [
        GoogleBooksService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
