import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public list = [
    {title: 'Entry 1', style: 'Style 1'},
    {title: 'Entry 2', style: 'Style 2'},
    {title: 'Entry 3', style: 'Style 3'},
  ];

  constructor() { }

  ngOnInit() {

  }

}
