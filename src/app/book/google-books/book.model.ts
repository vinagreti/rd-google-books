class AccessInfo{
    webReaderLink: string;

    constructor(data: any = {}){
        this.webReaderLink = data.webReaderLink || undefined;
    }
}

class ImageLinks{
    smallThumbnail: string;
    thumbnail: string;
    small: string;
    medium: string;
    large: string;
    extraLarge: string;

    constructor(data: any = {}){
        this.smallThumbnail = data.smallThumbnail || undefined;
        this.thumbnail = data.thumbnail || undefined;
        this.small = data.small || undefined;
        this.medium = data.medium || undefined;
        this.large = data.large || undefined;
        this.extraLarge = data.extraLarge || undefined;
    }
}

class SearchInfo{
    textSnippet: string;

    constructor(data: any = {}){
        this.textSnippet = data.textSnippet || undefined;
    }
}

class VolumeInfo {
    title: string;
    subtitle: string;
    authors: string[];
    publisher: string;
    publishedDate: string;
    description: string;
    pageCount: number;
    printType: string;
    categories: string[];
    contentVersion: string;
    imageLinks: ImageLinks;
    language: string;

    constructor(data: any = {}){
        this.title = data.title || undefined;
        this.subtitle = data.subtitle || undefined;
        this.authors = data.authors || undefined;
        this.publisher = data.publisher || undefined;
        this.publishedDate = data.publishedDate || undefined;
        this.description = data.description || undefined;
        this.pageCount = data.pageCount || undefined;
        this.printType = data.printType || undefined;
        this.categories = data.categories || undefined;
        this.contentVersion = data.contentVersion || undefined;
        this.imageLinks = new ImageLinks(data.imageLinks) || undefined;
        this.language = data.language || undefined;
    }
};

export class Book {
    etag: string;
    id: string;
    kind: string;
    searchInfo: SearchInfo;
    selfLink: string;
    volumeInfo: VolumeInfo;
    accessInfo: AccessInfo;

    constructor(data: any = {}){
        this.etag = data.etag || undefined;
        this.id = data.id || undefined;
        this.kind = data.kind || undefined;
        this.searchInfo = new SearchInfo(data.searchInfo) || undefined;
        this.selfLink = data.selfLink || undefined;
        this.volumeInfo = new VolumeInfo(data.volumeInfo) || undefined;
        this.accessInfo = new AccessInfo(data.accessInfo) || undefined;
    }
}