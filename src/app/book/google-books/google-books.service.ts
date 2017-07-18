import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { JsonStorageService } from './../../json-storage/json-storage.service';
import { Book, SearchResult } from './../../book/';

@Injectable()
export class GoogleBooksService {

	private GBendpoint = 'https://www.googleapis.com/books/v1/';
	
	private favorites: any;
	private objects: any;
	private searchs: any;

	constructor(
		private http: Http,
    	private db: JsonStorageService,
	) {
		console.log('GoogleBooksService STARTED')
		this.initFavorites();
		this.initMem();
		this.subscribeToFavorites();
	}

	private initFavorites(){
		this.favorites = {};
	}

	private initMem(){
		this.searchs = {};
		this.objects = {};
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

	private addFavorite = (book: Book) => {
		this.favorites[book.id] = book;
		this.updateFavorites();
	}

	private removeFavorite = (book: Book) => {
		delete this.favorites[book.id];
		this.updateFavorites();
	}

	find = (query): Promise<SearchResult> => {
		if(this.searchs[query]){
			return new Promise<SearchResult>((resolve, reject) => {
				resolve(this.searchs[query]);
			});
		} else {
			return this.http.get(this.getEndpoint('query', query))
			.toPromise() // To promise because it is a single call
			.then(this.extractBody)
			.then((res) => {
				this.searchs[query] = new SearchResult(res);
				return res;
			});
		}
	}

	get = (book: Book) => {
		if(this.objects[book.id]){
			return new Promise<Book>((resolve, reject) => {
				resolve(this.objects[book.id]);
			});
		} else {
			return this.http.get(this.getEndpoint('object', book.id))
			.toPromise() // To promise because it is a single call
			.then(this.extractBody)
			.then((res) => {
				this.objects[book.id] = new Book(res);
				return res;
			});
		}
	}

	isFavorite = (book: Book): boolean => {
		return this.favorites[book.id] ? true : false;
	}

	toggleFavorite = (book) => {
		console.log('foi atualizado')
		if(this.isFavorite(book)){
			this.removeFavorite(book)
		} else {
			this.addFavorite(book)
		}
	}
}
