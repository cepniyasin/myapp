import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-square',
  template: `
    <button class="btn" nbButton *ngIf="!value">{{ value }}</button>
    <button nbButton *ngIf="value == 'X'">{{ value }}</button>
    <button nbButton *ngIf="value == 'O'">{{ value }}</button>
  `,
  styles: ['button { width: 100%; height: 100%; font-size: 5em !important; }']
})
export class SquareComponent  {

  @Input() value: 'X' | 'O';

}