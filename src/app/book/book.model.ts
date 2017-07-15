import { GoogleBooksService } from './../google-books';

class AccessInfo {
    country: string;
    viewability: string;
    embeddable: boolean;
    publicDomain: boolean;
    textToSpeechPermission: string;
    webReaderLink: string;
    accessViewStatus: string;
    quoteSharingAllowed: boolean;
}

class ImageLink{
    smallThumbnail: string;
    thumbnail: string
}

class SaleInfo {
    country: string;
    saleability: string;
    isEbook: boolean;
};

class SearchInfo{
    textSnippet: string;
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
    categories: any[];
    maturityRating: string;
    allowAnonLogging: boolean;
    contentVersion: string;
    imageLinks: ImageLink[];
    language: string;
    previewLink: string;
    infoLink: string;
    canonicalVolumeLink: string;
};

export class Book {
    accessInfo: AccessInfo;
    etag: string;
    id: string;
    kind: string;
    saleInfo: SaleInfo;
    searchInfo: SearchInfo;
    selfLink: string;
    volumeInfo: VolumeInfo;
}