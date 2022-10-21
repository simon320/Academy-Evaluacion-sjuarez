export interface User {
    data?()   : any;
    id        : string;
    name      : string;
    username  : string;
    photoUrl  : string;
    email     : string;
    birthday  : string;
    password? : string;
    city      : string;
    rol       : string;
    amountPost: number;
}