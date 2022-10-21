import { User } from '../../user/interfaces/user.interface';
import { Author } from './post.interface';
export interface Comments {
    postId? : string;
    id?     : string;
    like    : Like[];
    title   : string;
    body    : string;
    date?   : any;
    author  : User | any;
    hide    : boolean;
}

export interface Like {
    id      : string;
    username: string;
}