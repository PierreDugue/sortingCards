import { Component, OnInit } from '@angular/core';
import { CardsManagerService } from '../cards-manager.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public list;
  public list2 = [
    { title: 'Entry 4', style: 'Style 1' },
    { title: 'Entry 5', style: 'Style 2' },
    { title: 'Entry 6', style: 'Style 3' },
  ];

  constructor(private cardManagerService: CardsManagerService) { }

  ngOnInit() {
    this.list = this.cardManagerService.getItemList();
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

}
