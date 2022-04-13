import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  videosData: any;

  constructor(private httpService: HttpService, private router: Router) { }

  ngOnInit(): void {
    //this.handleData()
  }

  handleData(){
    this.httpService.getVideos('/videos?&chart=mostPopular').subscribe((response) => {
      console.log(response)
    })
  }

  goToWatchPage(): void{
    this.router.navigateByUrl('/watch')
  }

}
