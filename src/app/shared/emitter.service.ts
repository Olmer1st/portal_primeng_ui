import {Injectable, EventEmitter} from '@angular/core';

@Injectable()
export class EmitterService {
    private static _emitters: { [signature: string]: EventEmitter<any> } = {};

    static get<T>(signature: string): EventEmitter<T> {
        if (!this._emitters[signature]) {
            this._emitters[signature] = new EventEmitter<T>();
        }

        return this._emitters[signature];
    }
}
