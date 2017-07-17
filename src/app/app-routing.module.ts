import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component'
import { BookComponent, BookListComponent, BookSearchComponent } from './book'

const routes: Routes = [
  { path: '', component: BookSearchComponent },
  //{ path: 'favorite', component: FavoriteBooksComponent },
  { path: ':etag', component: BookComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
