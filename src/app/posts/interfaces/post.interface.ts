export interface Post {
    title   : string;
    body    : string;
    author? : Author;
    date?   : Date;
    id?     : number;
    userId? : number;
}

export interface Author {
    username: string;
    photoUrl: string;
}