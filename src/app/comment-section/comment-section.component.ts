import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-comment-section',
  templateUrl: './comment-section.component.html',
  styleUrls: ['./comment-section.component.scss']
})
export class CommentSectionComponent implements OnInit {

  comments = [
    {},{},{},{},{},{},{}
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
