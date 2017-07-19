import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';

import { BookListComponent } from './book-list.component';
import { BookCoverComponent } from './../book-cover/book-cover.component';

describe('BookListComponent', () => {
  let component: BookListComponent;
  let fixture: ComponentFixture<BookListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookListComponent, BookCoverComponent ],
      imports: [
        MaterialModule,
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
