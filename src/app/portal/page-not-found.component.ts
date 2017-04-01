import { Component } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'ev-404',
    template: `
    <article class="content-center">
      <h2>Inconceivable!</h2>
      <h4>I do not think this page is where you think it is.</h4>
    </article>
  `})
export class PageNotFoundComponent { }
