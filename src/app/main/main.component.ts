import { Component, OnInit, OnDestroy } from '@angular/core';
import { CardsManagerService } from '../cards-manager.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

import { takeUntil, tap, map, filter, switchMap } from 'rxjs/operators';
import { ReplaySubject, of, from } from 'rxjs';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  public avalaibleList;
  public userList;
  public posts;

  private form: FormGroup;
  private firstName = new FormControl('', Validators.required);

  constructor(
    private cardManagerService: CardsManagerService,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.cardManagerService.createPost().pipe(takeUntil(this.destroyed$)).subscribe(res => {
      this.userList = res;
    });
    this.cardManagerService.getUserList().pipe(takeUntil(this.destroyed$)).subscribe(res => {
      this.userList = res;
    });
    this.cardManagerService.getUserList().pipe(
      takeUntil(this.destroyed$),
      //Keep only females 
      // map(res => res.results.filter((x) => x.gender === 'female'))
    ).subscribe(res => {
      console.log(res);
      this.avalaibleList = res;
    });

    this.posts = this.cardManagerService.getPosts().pipe(
      // map(arr => arr.filter(x => x.id % 2 === 0))
    );

    this.initForm();

  }

  deletePost(id) {
    this.cardManagerService.deletePost(id).subscribe();
  }

  /**
   * Initialize form
   */
  initForm() {
    this.form = this.fb.group({
      firstName: this.firstName,
      password: ['', Validators.compose([
        Validators.required, Validators.minLength(6)])]
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
