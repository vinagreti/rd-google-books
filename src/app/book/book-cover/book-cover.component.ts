import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { GoogleBooksService } from './../google-books';
import { Book } from './../';

@Component({
	selector: 'app-book-cover',
	templateUrl: './book-cover.component.html',
	styleUrls: ['./book-cover.component.scss']
})
export class BookCoverComponent implements OnInit {

	@Input() book: Book;
	@Input() highlight: string;

	private regexSearchTerm: RegExp;

	constructor(
    	private sanitizer: DomSanitizer,
    	private gbService: GoogleBooksService,
	) {}

	private addHighlightTags = (html: string): string => {
		return html.replace(this.regexSearchTerm, '<b>$1</b>');
	}
	
	isFavorite = this.gbService.isFavorite;
	toggleFavorite = this.gbService.toggleFavorite;

	ngOnInit() {
		this.regexSearchTerm = new RegExp(`(${this.highlight})`, 'ig');
	}

	highlightWords = (html: string = ''): SafeHtml => {
		return this.sanitizer.bypassSecurityTrustHtml(this.addHighlightTags(html));
	}
}
