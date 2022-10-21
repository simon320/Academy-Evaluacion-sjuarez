import { Comments } from './comments.interface';
import { User } from '../../user/interfaces/user.interface';
export interface Post {
    data?        : any;
    title        : string;
    body         : string;
    author       : User | any;
    date         : any;
    id?          : string;
    userId?      : number;
    hide         : boolean;
    blockComments: boolean;
    comments     : Comments[] | [];
}

export interface Author {
    id     : string;
}