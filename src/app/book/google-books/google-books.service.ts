import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { JsonStorageService } from './../../json-storage/json-storage.service';
import { Book } from './../../book/';

@Injectable()
export class GoogleBooksService {

	private GBendpoint = 'https://www.googleapis.com/books/v1/';
	
	favorites: any;

	constructor(
		private http: Http,
    	private db: JsonStorageService,
	) {
		this.initFavorites();
		this.subscribeToFavorites();
	}

	private initFavorites(){
		this.favorites = {};
	}

	private subscribeToFavorites(){
		this.db.object('favorites').subscribe(favorites => {
			this.favorites = favorites || {};
		})
	}

	private updateFavorites(){
		this.db.set('favorites', this.favorites);
	}

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

	private getEndpoint(type, data): string{
		switch (type) {
			case "query":
				let querystrings = this.getQueryStrings(data);
				return `${this.GBendpoint}volumes?${querystrings}`;
			case "object":
				return `${this.GBendpoint}volumes/${data}`;
		}
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
		return this.http.get(this.getEndpoint('query', query))
		.toPromise()
		.then(this.extractBody); // To promise because it is a single call
	}

	get = (book: Book) => {
		return this.http.get(this.getEndpoint('object', book.id))
		.toPromise()
		.then(this.extractBody); // To promise because it is a single call
	}

	isFavorite = (book: Book): boolean => {
		return this.favorites[book.id] ? true : false;
	}

	addFavorite = (book: Book) => {
		this.favorites[book.id] = book;
		this.updateFavorites();
	}

	removeFavorite = (book: Book) => {
		delete this.favorites[book.id];
		this.updateFavorites();
	}
}
