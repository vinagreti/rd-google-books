import { TestBed, inject } from '@angular/core/testing';

import { GoogleBooksService } from './google-books.service';

describe('GoogleBooksService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [GoogleBooksService]
		});
	});

	it('should be created', inject([GoogleBooksService], (service: GoogleBooksService) => {
		expect(service).toBeTruthy();
	}));


	it('Should pesquisar um livro por palavra-chave e ver o resultado na mesma página', inject([GoogleBooksService], 
		(service: GoogleBooksService) => {

		})
	);

	it('Should conseguir fazer paginação do resultado da pesquisa', inject([GoogleBooksService], 
		(service: GoogleBooksService) => {

		})
	);

	it('Should marcar um livro como favorito', inject([GoogleBooksService], 
		(service: GoogleBooksService) => {

		})
	);

	it('Should clicar em um livro na listagem e ver uma página com mais informações do livro', inject([GoogleBooksService], 
		(service: GoogleBooksService) => {

		})
	);

	it('Should que a palavra-chave pesquisada fosse destacada no resultado da pesquisa', inject([GoogleBooksService], 
		(service: GoogleBooksService) => {

		})
	);


});
