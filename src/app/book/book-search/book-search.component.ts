import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Params, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { JsonStorageService } from './../../json-storage/json-storage.service';
import { GoogleBooksService } from './../google-books/';

@Component({
    selector: 'app-book-search',
    templateUrl: './book-search.component.html',
    styleUrls: ['./book-search.component.scss']
})
export class BookSearchComponent implements OnInit{
    books: any[];
    searchForm: FormGroup;
    searchingBooks: boolean;
    page: number;
    totalPages: number;
    totalItems: number;

    private _searchTerm: string;

    constructor(
        private activatedRoute: ActivatedRoute,
        private db: JsonStorageService,
        private formBuilder: FormBuilder,
        private gbService: GoogleBooksService,
        private router: Router
        ){}

    ngOnInit(){
        this.subscribeToQueryParam();
    }

    private subscribeToQueryParam(){
        this.activatedRoute.queryParams.subscribe((params: Params) => {
            this._searchTerm = params['q'];
            this.page = params['page'] || 1;
            this.startForm();
        });
    };

    private subscribeToSearchTerm(){
        this.searchForm.controls.searchTerm.valueChanges
        .debounceTime(500) //Wait for 300ms pause in events
        .map(val => {
            return val ? val.toLowerCase() : undefined;
        })
        .distinctUntilChanged()   //Ignore if next search term is same as previous
        .subscribe(term => {
            if(this.searchForm.controls.searchTerm.valid){
                this._searchTerm = term;
                if(this.searchForm.controls.fastSearch.value){
                    if(term){
                        this.search();
                    } else {
                        this.books = undefined;
                        this.updateUrlParams();
                    }
                }
            }
        });
    }

    private subscribeToFastSearch(){
        this.searchForm.controls.fastSearch.valueChanges.subscribe(fastSearch => {
            this.persistSearchConfigInMem({fastSearch: fastSearch});
        });
    }

    private startForm(){
        this.getSearchConfigFromMem((config) => {
            this.searchForm = this.formBuilder.group({
                searchTerm: [this._searchTerm, [Validators.minLength(3)]],
                fastSearch: [config.fastSearch, []]
            });
            this.search();
            this.subscribeToSearchTerm();
            this.subscribeToFastSearch();
        });
    }

    private getStartIndex(): number{
        return this.page * 10 - 10;
    }

    private updateUrlParams(){
        let queryParams: any = {
            q: this._searchTerm
        }

        let navigationExtras: NavigationExtras = {
            queryParams: {
                q: this._searchTerm
            }
        };

        if(this.page > 1){
            navigationExtras.queryParams.page = this.page;
        }

        this.router.navigate(['/'], navigationExtras);
    }

    private calculateTotalPages(){
        this.totalPages = Math.round((this.totalItems + this.getStartIndex()) / 10);
    }

    private persistSearchConfigInMem(config){
        this.db.set('frontendConfig', config);
    }

    private getSearchConfigFromMem(cbk){
        this.db.get('frontendConfig')
        .then((config = {}) => {
           cbk(config);
        });
    }

    previous(){
        if(this.page > 1){
            this.page--;
            this.updateUrlParams();
            this.search();
        }
    }

    next(){
        this.page++;
        this.updateUrlParams();
        this.search();
    }

    search(): void {
        this.updateUrlParams();
        this.searchingBooks = true;
        this.gbService.find({
            q: this._searchTerm,
            startIndex: this.getStartIndex()
        })
        .then(res => {
            this.books = res.items || [];
            this.totalItems = res.totalItems;
            this.calculateTotalPages()
            this.searchingBooks = false;
        });
    }
}
