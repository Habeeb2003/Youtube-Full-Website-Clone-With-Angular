import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.scss']
})
export class WatchComponent implements OnInit {

  relatedVideos = [
    {},{},{},{},{},{},{},{},{},{}
  ] 

  constructor() { }

  ngOnInit(): void {
  }

}
