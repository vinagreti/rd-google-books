import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';

import { GoogleBooksService } from './google-books.service';
import { JsonStorageModule } from './../../json-storage';

describe('GoogleBooksService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				HttpModule,
				JsonStorageModule
			],
			providers: [GoogleBooksService]
		});
	});

	it('should be created', inject([GoogleBooksService], (service: GoogleBooksService) => {
		expect(service).toBeTruthy();
	}));

});
