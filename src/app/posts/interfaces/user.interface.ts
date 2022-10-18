export interface User {
    id?:       number;
    name:     string;
    username: string;
    photo: string;
    email:    string;
    birthday: string;
    password?: string;
    address:  Address;
    admin: boolean;
    amountPost: number;
}

export interface Address {
    city:    string;
    geo:     Geo;
}

export interface Geo {
    lat: string;
    lng: string;
}