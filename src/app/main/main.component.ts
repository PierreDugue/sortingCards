import { Component, OnInit } from '@angular/core';
import { CardsManagerService } from '../cards-manager.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public userList;
  public avalaibleList;

  constructor(private cardManagerService: CardsManagerService) { }

  ngOnInit() {

    this.cardManagerService.getUserList().subscribe(res => {
      this.userList = res;
      console.log('Res', res);
    }, error => {
      console.log('An error occured while retrieving the user list', error);
    });
    this.cardManagerService.getUserList().subscribe(res => {
      this.avalaibleList = res;
      console.log('Res', res);
    }, error => {
      console.log('An error occured while retrieving the user list', error);
    });
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
