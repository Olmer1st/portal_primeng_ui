export interface IUser {
    uid:string;
    email:string;
    display:string;
    role:string;
    locked:string;
    modules:string[];
    token:string;
    password:string;
    error?:string;
}

export interface IModule {
    mid:string;
    name:string;
    title:string;
    error?:string;
}
