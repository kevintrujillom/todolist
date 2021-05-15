import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  createTask: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  readCreateTask(event: boolean){
    this.createTask = event;
    this.emitChanges();
  }

  emitChanges(){
    setTimeout(() => {
      this.createTask = false;
    },2000)
  }

}
