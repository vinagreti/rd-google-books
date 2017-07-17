class ImageLink{
    smallThumbnail: string;
    thumbnail: string
}

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
    contentVersion: string;
    imageLinks: ImageLink[];
    language: string;
};

export class Book {
    etag: string;
    id: string;
    kind: string;
    searchInfo: SearchInfo;
    selfLink: string;
    volumeInfo: VolumeInfo;
}