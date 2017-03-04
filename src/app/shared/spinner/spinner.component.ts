'use strict';

import {Component, Input, OnDestroy} from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'spinner-section',
    templateUrl: 'spinner.component.html',
    styleUrls:['spinner.component.css']
})
export class SpinnerComponent implements OnDestroy {
    private currentTimeout: any;
    private isDelayedRunning: boolean = false;

    @Input()
    public delay: number = 300;

    @Input()
    set isRunning(value: boolean) {
        if (!value) {
            this.cancelTimeout();
            this.isDelayedRunning = false;
            return;
        }

        if (this.currentTimeout) {
            return;
        }

        this.currentTimeout = setTimeout(() => {
            this.isDelayedRunning = value;
            this.cancelTimeout();
        }, this.delay);
    }

    private cancelTimeout(): void {
        clearTimeout(this.currentTimeout);
        this.currentTimeout = null;
    }

    ngOnDestroy(): any {
        this.cancelTimeout();
    }
}
