import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
	selector: 'app-book-cover',
	templateUrl: './book-cover.component.html',
	styleUrls: ['./book-cover.component.scss']
})
export class BookCoverComponent implements OnInit {

	@Input() book: any;
	@Input() highlight: string;

	private regexSearchTerm: RegExp;

	constructor(
    	private sanitizer: DomSanitizer
	) { }

	ngOnInit() {
	}

	private addHighlightTags = (html: string): string => {
		return html.replace(this.highlight, '<b>$1</b>');
	}

	highlightWords = (html: string = ''): SafeHtml => {
		return this.sanitizer.bypassSecurityTrustHtml(this.addHighlightTags(html));
	}
}
