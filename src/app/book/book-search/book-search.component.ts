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
    searchTerm: string;

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
            this.searchTerm = params['q'];
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
        .distinctUntilChanged()   //Ignore if next search searchTerm is same as previous
        .subscribe(searchTerm => {
            if(this.searchForm.controls.searchTerm.valid){
                this.page = 1;
                if(this.searchForm.controls.fastSearch.value){
                    this.updateUrlParams(searchTerm);
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
                searchTerm: [this.searchTerm, [Validators.minLength(3)]],
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

    private updateUrlParams(searchTerm?){
        this.searchTerm = searchTerm

        let queryParams: any = {
            q: this.searchTerm
        }

        let navigationExtras: NavigationExtras = {
            queryParams: {
                q: this.searchTerm
            }
        };

        if(this.page > 1){
            navigationExtras.queryParams.page = this.page;
        }

        this.router.navigate(['/'], navigationExtras);
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
        }
    }

    next(){
        this.page++;
        this.updateUrlParams();
    }

    search(): void {
        this.searchTerm = this.searchForm.controls.searchTerm.value;
        if(this.searchTerm){
            this.searchingBooks = true;
            this.gbService.find({
                q: this.searchTerm,
                startIndex: this.getStartIndex()
            })
            .then(res => {
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
