import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';

import { BookComponent } from './book.component';
import { GoogleBooksService } from './google-books/google-books.service';
import { JsonStorageModule } from './../json-storage';

describe('BookComponent', () => {
  let component: BookComponent;
  let fixture: ComponentFixture<BookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookComponent ],
      imports: [
        HttpModule,
        JsonStorageModule,
        MaterialModule,
        RouterTestingModule
      ],
      providers: [
        GoogleBooksService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
