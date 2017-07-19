import { Component, Input } from '@angular/core';
import { Book } from './../google-books/book.model';

@Component({
    selector: 'app-book-list',
    templateUrl: './book-list.component.html',
    styleUrls: ['./book-list.component.scss']
})
export class BookListComponent {
    @Input() books: Book[];
    @Input() highlight: string;
    
    constructor(
    ){}
}
