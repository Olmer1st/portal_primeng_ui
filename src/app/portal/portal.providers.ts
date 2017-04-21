import {OpaqueToken} from '@angular/core';

export interface AppConfig {
    apiRootUrl: string;
    title: string;
    settings: any;
}
let hostname = location.hostname.replace("www.", "");
export const PORTAL_CONFIG: AppConfig = {
    apiRootUrl: (location.hostname === 'localhost') ? "http://localhost:5000/v1/" : `${location.protocol}//phpapi.${hostname}/v1/`,
    title: 'Dependency Injection',
    settings: {
        sessionId: "X-Auth-Token"
    }
};


export let APP_CONFIG = new OpaqueToken('app.config');
