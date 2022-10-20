import { Author } from './post.interface';
export interface Comments {
    postId? : string;
    id?     : string;
    like    : Like[];
    title   : string;
    body    : string;
    date?   : any;
    author  : Author;
    hide    : boolean;
}

export interface Like {
    id      : string;
    username: string;
}