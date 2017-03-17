export interface Genre {
    code: string;
    gdesc: string;
    edesc: string;
}


export interface Book {
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
}


export interface Author {
    key: string;
    display: string;
}
