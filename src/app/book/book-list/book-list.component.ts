import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-book-list',
    templateUrl: './book-list.component.html',
    styleUrls: ['./book-list.component.scss']
})
export class BookListComponent {
    @Input() books: any[];
    @Input() highlight: string;
    
    constructor(
    ){}
}
