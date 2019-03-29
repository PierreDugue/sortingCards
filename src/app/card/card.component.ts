import { Component, OnInit, Input } from '@angular/core';

/**
 * Individual card
 */

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() item;

  constructor() { }

  ngOnInit() {
  }

}
