import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '@angular/material';
import { HttpModule } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';

import { BookCoverComponent } from './book-cover.component';
import { GoogleBooksService } from './../google-books/google-books.service';
import { JsonStorageModule } from './../../json-storage';

describe('BookCoverComponent', () => {
  let component: BookCoverComponent;
  let fixture: ComponentFixture<BookCoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookCoverComponent ],
      imports: [
        MaterialModule,
        HttpModule,
        RouterTestingModule,
        JsonStorageModule
      ],
      providers: [
        GoogleBooksService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookCoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
