import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { converTime, timeSince, viewsFormatter } from '../app.component';
import { HttpService } from '../http.service';
import { YoutubeService } from '../youtube.service';

interface videosCard extends gapi.client.youtube.Video{
  channelThumbnail?: string
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})



export class HomeComponent implements OnInit {


  

  videosData: any[] = [
    {
      id: 1
    },
    {
      id: 2
    },
    {
      id: 3
    },
    {
      id: 4
    },
    {
      id: 5
    },
    {
      id: 6
    },
    {
      id: 7
    },
    {
      id: 8
    },
    {
      id: 9
    },
    {
      id: 10
    }
  ];
  videos: videosCard[] | undefined;

  nextPageToken: string | undefined;

  constructor(private httpService: HttpService, private youtubeService: YoutubeService, private router: Router) {

  }

  ngOnInit(): void {
      this.youtubeService.list().then( response => {
        console.log(response);
        this.nextPageToken = response.nextPageToken

        response.items?.map((item: videosCard) => {
          item.snippet!.publishedAt = timeSince(new Date(item.snippet!.publishedAt as unknown as string))
          item.statistics!.viewCount = viewsFormatter(Number(item.statistics?.viewCount)).toString()
          item.contentDetails!.duration = converTime(item.contentDetails!.duration!.toString())
          this.getChanneltThumbnai(item.snippet!.channelId as unknown as string).then(res => {
            item.channelThumbnail = res
          })
          console.log(item);
        })


        this.videos = response.items
        console.log(response.items![0])
      })
  }

  handleData(){
    this.httpService.getVideos('/videos?&chart=mostPopular').subscribe((response) => {
      console.log(response)
    })
  }

  goToWatchPage(id: string): void{
    this.router.navigateByUrl('/watch')
  }

  async getChanneltThumbnai(channelId: string) : Promise<string | undefined>{

    const res = await this.youtubeService.getChannelThumbnail(channelId)
    const thumbnail = res.items![0].snippet?.thumbnails?.high?.url
    return thumbnail
    // this.youtubeService.getChannelThumbnail(channelId).then(res => {
    //   res.items?.map(item => {
    //     return item.snippet?.thumbnails?.high?.url
    //   }) 
    // })
  }

  

}
