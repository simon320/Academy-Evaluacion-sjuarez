import { Comments } from './comments.interface';
export interface Post {
    data?        : any;
    title        : string;
    body         : string;
    author?      : Author;
    date?        : any;
    id?          : number;
    userId?      : number;
    hide         : boolean;
    blockComments: boolean;
    comments     : Comments[] | [];
}

export interface Author {
    id?     : string;
    username: string;
    photoUrl: string;
}