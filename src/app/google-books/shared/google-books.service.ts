import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class GoogleBooksService {

	private GBendpoint = 'https://www.googleapis.com/books/v1/';

	constructor(
		private http: Http
	) {}

    private extractBody = (response) => {
        var body;
        if (response.text()) {
		    try {
		        body = response.json().results || response.json();
		    } catch (e) {
		        body = 'Invalid JSON';
		    }
        }
        return body || {};
    };

	private getEndpoint(query): string{
		let querystrings = this.getQueryStrings(query);
		return `${this.GBendpoint}volumes?${querystrings}`;
	}

	private getQueryStrings(query: any): string{
		let querystrings = '';
		Object.keys(query).forEach((param, index) => {
			querystrings += index > 0 ? '&' : '';
			querystrings += `${param}=${query[param]}`;
		});
		return querystrings;
	}

	find = (query) => {
		return this.http.get(this.getEndpoint(query))
		.toPromise()
		.then(this.extractBody); // To promise because it is a single call
	}

}
