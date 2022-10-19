import { Comments } from './comments.interface';
export interface Post {
    title   : string;
    body    : string;
    author? : Author;
    date?   : Date;
    id?     : number;
    userId? : number;
    hide    : boolean;
    comments: Comments | null;
}

export interface Author {
    id?     : string;
    username: string;
    photoUrl: string;
}