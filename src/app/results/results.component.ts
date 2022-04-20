import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  open : boolean = false

  constructor() { }

  ngOnInit(): void {
  }

  toggleFilterDropdown(){
    this.open = !this.open
  }

}
