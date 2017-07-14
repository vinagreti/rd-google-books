import { Component } from '@angular/core';
import { GoogleBooksService } from './google-books';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  results: any[];
  errors: any[];
  resources: any;
  searchForm: FormGroup;

  private searchTerm = new Subject<string>();

  constructor(
    private gbService: GoogleBooksService,
    private formBuilder: FormBuilder
  ){
    this.startForm();
    this.subscribeToSearchQuery();
    this.observeSearchTerm();
    this.resources = this.gbService.RESOURCES;
  }

  private observeSearchTerm(){
      this.searchTerm
      .debounceTime(600) //Wait for 300ms pause in events
      .distinctUntilChanged()   //Ignore if next search term is same as previous
      .subscribe(term => {
        this.search(term);
      });
  }

  private subscribeToSearchQuery(){
    this.searchForm.controls.searchTerm.valueChanges.subscribe(searchTerm => {
      this.searchTerm.next(searchTerm);
    });
  }

  private startForm(){
    this.searchForm = this.formBuilder.group({
      searchTerm: ['']
    })
  }

  private search(term: string): void {
    this.gbService.find('volumes', {q: term})
    .then(res => {
      this.results = res.items;
    }).catch(err => {
      this.errors = err;
    });
  }


}
