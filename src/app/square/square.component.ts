import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-square',
  template: `
    <button class="btn-three" nbButton *ngIf="!value">{{ value }}</button>
    <button class="btn-pressed" nbButton *ngIf="value == 'X'">{{ value }}</button>
    <button class="btn-pressed" nbButton *ngIf="value == 'O'">{{ value }}</button>
  `,
  styles: ['button { width: 100%; height: 100%; font-size: 5em !important; } @media (max-width: 640px) {button { width: 100%; height: 100%; font-size: 2em !important; }}']
  
})
export class SquareComponent  {

  @Input() value: 'X' | 'O';

}