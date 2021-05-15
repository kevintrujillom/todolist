import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  repository = 'https://github.com/kevintrujillom/todolist'

  constructor() { }

  ngOnInit(): void {
  }

}
