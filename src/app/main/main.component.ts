import { Component, OnInit, OnDestroy } from '@angular/core';
import { CardsManagerService } from '../cards-manager.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

import { takeUntil } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  public avalaibleList;
  public userList;

  constructor(private cardManagerService: CardsManagerService) { }

  ngOnInit() {
    this.cardManagerService.getUserList().pipe(takeUntil(this.destroyed$)).subscribe(res => {
      this.userList = res;
      console.log('Res', res);
    }, error => {
      console.log('An error occured while retrieving the user list', error);
    });
    this.cardManagerService.getUserList().pipe(takeUntil(this.destroyed$)).subscribe(res => {
      this.avalaibleList = res;
      console.log('Res', res);
    }, error => {
      console.log('An error occured while retrieving the user list', error);
    });
  }

  /**
   * Manage the drop event
   * @param event
   */
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

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

}
