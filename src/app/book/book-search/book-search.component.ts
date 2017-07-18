import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Params, Router } from '@angular/router';
import { Subject } from 'rxjs';

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
    page: number = 1;

    private searchTerm = new Subject<string>();
    private _searchTerm: string;

    constructor(
        private activatedRoute: ActivatedRoute,
        private formBuilder: FormBuilder,
        private gbService: GoogleBooksService,
        private router: Router
        ){}

    ngOnInit(){
        this.startForm();
        this.subscribeToSearchQuery();
        this.observeSearchTerm();
        this.subscribeToQueryParam();
    }

    private subscribeToQueryParam(){
        this.activatedRoute.queryParams.subscribe((params: Params) => {
            let searhTerm = params['q'];
            let page = params['page'];
            this.searchForm.controls.searchTerm.setValue(searhTerm);
        });
    };

    private observeSearchTerm(){
        this.searchTerm
        .debounceTime(500) //Wait for 300ms pause in events
        .map(val => {
            return val ? val.toLowerCase() : undefined;
        })
        .distinctUntilChanged()   //Ignore if next search term is same as previous
        .subscribe(term => {
            this._searchTerm = term;
            if(term){
                this.updateUrlParams();
                this.search();
            } else {
                this.updateUrlParams();
                this.books = undefined;
            }
        });
    }

    private subscribeToSearchQuery(){
        this.searchForm.controls.searchTerm.valueChanges.subscribe(searchTerm => {
            if(this.searchForm.controls.searchTerm.valid){
                this.searchTerm.next(searchTerm);
            }
        });
    }

    private startForm(){
        this.searchForm = this.formBuilder.group({
            searchTerm: ['', [Validators.minLength(3)]],
            fastSearch: [true, []]
        })
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
        this.searchingBooks = true;
        this.gbService.find({
            q: this._searchTerm,
            startIndex: this.getStartIndex()
        })
        .then(res => {
            this.books = res.items || [];
            this.searchingBooks = false;
        });
    }
}
