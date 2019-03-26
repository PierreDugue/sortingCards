import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CardsManagerService {

  public list = [
    { title: 'Entry 1', style: 'Style 1' },
    { title: 'Entry 2', style: 'Style 2' },
    { title: 'Entry 3', style: 'Style 3' },
  ];

  constructor() { }

  getItemList() {
    return this.list;
  }
}
