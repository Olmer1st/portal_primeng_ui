export interface User {
    uid:string;
    email:string;
    display:string;
    role:string;
    locked:boolean;
    modules:string[];
    token:string;
}
