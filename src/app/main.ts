///<reference path="../../node_modules/@types/node/index.d.ts" />
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { PortalModule } from './portal/portal.module';
import { enableProdMode } from '@angular/core';

enableProdMode();
const platform = platformBrowserDynamic();
platform.bootstrapModule(PortalModule);
