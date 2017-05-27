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

export interface IActiveUser {
    email:string;
    ip:string;
    title:string;
    error?:string;
}

export interface INewsFile {
    nid:string;
    module:string;
    title:string;
    shortdesc:string;
    fulldesc:string;
    picture:string;
    inserted:string;
    error?:string;
}
