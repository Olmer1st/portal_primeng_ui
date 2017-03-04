import {OpaqueToken} from '@angular/core';

export interface AppConfig {
    apiRootUrl: string;
    title: string;
    settings: any;
};

export const PORTAL_CONFIG: AppConfig = {
    apiRootUrl: "http://localhost:5000/v1/",
    title: 'Dependency Injection',
    settings:{}
};

export let APP_CONFIG = new OpaqueToken('app.config');
