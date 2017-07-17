import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { GoogleBooksService } from './google-books/';
import { Book } from './';

@Component({
	selector: 'app-book',
	templateUrl: './book.component.html',
	styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {

	book: Book;

	constructor(
		private activatedRoute: ActivatedRoute,
		private gbService: GoogleBooksService,
	) {
		this.book = new Book();
	}

	ngOnInit() {
		this.subscribeToRouteparams();
	}

	private subscribeToRouteparams(){
		this.activatedRoute.params.subscribe(params => {
			if(params['id']){
				this.book.id = params['id'];
				this.loadBookData();
			}
		});
	}

	private loadBookData(){
		this.gbService.get(this.book)
		.then(book => this.book = book);
	}

}
