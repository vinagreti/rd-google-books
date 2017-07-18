import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Params, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { JsonStorageService } from './../../json-storage/json-storage.service';
import { GoogleBooksService, Book, SearchResult } from './../google-books/';

interface SearchConfig{
    fastSearch: boolean;
}

@Component({
    selector: 'app-book-search',
    templateUrl: './book-search.component.html',
    styleUrls: ['./book-search.component.scss']
})
export class BookSearchComponent implements OnInit{
    books: Book[];
    searchConfig: SearchConfig;
    searchForm: FormGroup;
    searchingBooks: boolean;
    page: number;
    totalPages: number;
    totalItems: number;
    searchTerm: string;

    constructor(
        private activatedRoute: ActivatedRoute,
        private db: JsonStorageService,
        private formBuilder: FormBuilder,
        private gbService: GoogleBooksService,
        private router: Router
    ){}

    ngOnInit(){
        this.subscribeToQueryParam()
        .then(this.getSearchConfigFromMem)
        .then(this.startForm)
        .then(this.subscribeToSearchTerm)
        .then(this.subscribeToFastSearch);
    }

    private subscribeToQueryParam(){
        return new Promise<any>((resolve) => {
            this.activatedRoute.queryParams.subscribe((params) => {
                this.searchTerm = params['q'];
                this.page = params['page'] || 1;
                this.search();
            });
            resolve();
        });
    };

    private subscribeToSearchTerm = () => {
        this.searchForm.controls.searchTerm.valueChanges
        .debounceTime(500) //Wait for 300ms pause in events
        .map(val => {
            return val ? val.toLowerCase() : undefined;
        })
        .distinctUntilChanged()   //Ignore if next search searchTerm is same as previous
        .subscribe(searchTerm => {
            if(this.searchForm.controls.searchTerm.valid){
                let searchTerm = this.searchForm.controls.searchTerm.value;
                this.searchTerm = searchTerm;
                this.updateUrlParams();
            }
        });
    }

    private subscribeToFastSearch = () => {
        this.searchForm.controls.fastSearch.valueChanges.subscribe(fastSearch => {
            this.persistSearchConfigInMem({fastSearch: fastSearch});
        });
    }

    private startForm = () => {
        this.searchForm = this.formBuilder.group({
            searchTerm: [this.searchTerm, [Validators.minLength(3)]],
            fastSearch: [this.searchConfig.fastSearch, []]
        });
    }

    private getStartIndex(): number{
        return this.page * 10 - 10;
    }

    private updateUrlParams(){
        let navigationExtras: NavigationExtras = {
            queryParams: {}
        };

        if(this.searchTerm){
            navigationExtras.queryParams.q = this.searchTerm;
        } else {
            this.page = 1;
        }

        if(this.page > 1){
            navigationExtras.queryParams.page = this.page;
        }

        this.router.navigate(['/'], navigationExtras);
    }

    private persistSearchConfigInMem(config: SearchConfig){
        this.db.set('frontendConfig', config);
    }

    private getSearchConfigFromMem = () => {
        return this.db.get('frontendConfig')
        .then((config: SearchConfig) => {
            this.searchConfig = config;
        });
    }

    previous(){
        if(this.page > 1){
            this.page--;
            this.updateUrlParams();
        }
    }

    next(){
        this.page++;
        this.updateUrlParams();
    }

    search = (): void => {
        if(this.searchTerm){
            this.searchingBooks = true;
            this.gbService.find({
                q: this.searchTerm,
                startIndex: this.getStartIndex()
            })
            .then((res: SearchResult) => {
                this.books = res.items || [];
                this.totalItems = res.totalItems;
                this.searchingBooks = false;
            });
        } else {
            this.page = 1;
            this.books = undefined;
        }
    }
}
