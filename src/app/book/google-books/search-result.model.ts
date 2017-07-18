import { Book } from './book.model';

export class SearchResult{
	kind: string;
	totalItems: number;
	items: Book[];

	constructor(data: any = {}){
		this.kind = data.kind || undefined;
		this.totalItems = data.totalItems || undefined;
		this.items = data.items.map(item => new Book(item)) || undefined;
	}
}