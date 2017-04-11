export interface User {
    uid:string;
    email:string;
    display:string;
    role:string;
    locked:boolean;
    modules:string[];
    token:string;
    password:string;
}

export interface Module {
    mid:string;
    name:string;
    title:string;
}
