export interface Genre {
    code: string;
    gdesc: string;
    edesc: string;
    error?:string;
}


export interface Book {
    title: string;
    author: string;
    series: string;
    size: number;
    serno: number;
    lang: string;
    del: any;
    path: string;
    file: number;
    date: string;
    ext: string;
    genre: string;
    isDownloading?:boolean;
    error?:string;
}


export interface Author {
    key: string;
    display: string;
    error?:string;
}

export interface SearchQuery {
    bookTitle: string;
    operator: boolean;
    author: Author;
    genres: Genre[];
    serie: string;
    language:string;
}
