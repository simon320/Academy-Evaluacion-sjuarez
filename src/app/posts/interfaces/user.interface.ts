export interface User {
    id?        : string;
    name       : string;
    username   : string;
    photoUrl   : string;
    email      : string;
    birthday   : string;
    password?  : string;
    address    : Address;
    rol        : string;
    amountPost : number;
}

export interface Address {
    city : string;
    geo  : Geo;
}

export interface Geo {
    lat: string;
    lng: string;
}