import { Component } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
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
  searchForm: FormGroup;

  private searchTerm = new Subject<string>();
  private _searchTerm;

  constructor(
    private gbService: GoogleBooksService,
    private formBuilder: FormBuilder,
    private sanitizer: DomSanitizer
  ){
    this.startForm();
    this.subscribeToSearchQuery();
    this.observeSearchTerm();
  }

  private observeSearchTerm(){
      this.searchTerm
      .debounceTime(600) //Wait for 300ms pause in events
      .distinctUntilChanged()   //Ignore if next search term is same as previous
      .subscribe(term => {
        if(term){
          this._searchTerm = term;
          this.search();
        } else {
          this.results = undefined;
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
      searchTerm: ['', [Validators.minLength(3)]]
    })
  }

  private search(): void {
    this.gbService.find({q: this._searchTerm})
    .then(res => {
      this.results = res.items || [];
    }).catch(err => {
      this.errors = err;
    });
  }

  private _highlightWords = (html: string): string => { // bloco copiado d ainternet. Pode ser melhorado com uso mais inteligente de Regex
    let regExp = new RegExp(`(${this._searchTerm})`, 'i');
    let results = regExp.exec(html);

    if (results) {
      let before = html.substr(0, results.index);
      let after = html.substr(results.index + this._searchTerm.length);

      let indexOpenTag = before.lastIndexOf('<');
      let indexCloseTag = before.lastIndexOf('>');
      let indexOpenTagAfter = after.indexOf('<');
      let indexCloseTagAfter = after.indexOf('>');

      if (indexOpenTag <= indexCloseTag && indexOpenTagAfter <= indexCloseTagAfter) {
        return `${before}<b>${results[0]}</b>${this._highlightWords(after)}`;
      } else {
        return `${before}${results[0]}${this._highlightWords(after)}`;
      }
    } else {
      return html;
    }
  }

  highlightWords = (html: string): SafeHtml => {
    return this.sanitizer.bypassSecurityTrustHtml(this._highlightWords(html));
  }
}
