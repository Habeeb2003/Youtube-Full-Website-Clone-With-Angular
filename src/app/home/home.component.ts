import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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


  intervals = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 },
    { label: 'second', seconds: 1 }
  ];

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
          item.snippet!.publishedAt = this.timeSince(new Date(item.snippet!.publishedAt as unknown as string))
          item.statistics!.viewCount = this.viewsFormatter(Number(item.statistics?.viewCount)).toString()
          item.contentDetails!.duration = this.converTime(item.contentDetails!.duration!.toString())
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

  timeSince(date : Date) : string {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    const interval = this.intervals.find(i => i.seconds < seconds);
    const count = Math.floor(seconds / interval!.seconds);
    return `${count} ${interval!.label}${count !== 1 ? 's' : ''} ago`;
  }

  viewsFormatter(num : number) {
    if (num >= 1000000000) {
        return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'B';
    }
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    }
    if (num >= 10000) {
        return (num / 1000).toFixed().replace(/\.0$/, '') + 'K';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    }
    return num;
  }

  converTime(d: string) {
    //ignore the "PT" part
    d = d.search(/PT/i) > -1? d.slice(2) : d;
    let h, m, s;
    //indexes of the letters h, m, s in the duration
    let hIndex = d.search(/h/i),
        mIndex = d.search(/m/i),
        sIndex = d.search(/s/i);
    //is h, m, s inside the duration
    let dContainsH = hIndex > -1,
        dContainsM = mIndex > -1,
        dContainsS = sIndex > -1;
    //setting h, m, s
    h = dContainsH? d.slice(0, hIndex) + ":" : "";
    m = dContainsM? d.slice(dContainsH ? hIndex + 1 : 0, mIndex) : dContainsH? "0" : "0";
    s = dContainsS? d.slice(dContainsM ? mIndex + 1 : hIndex + 1, sIndex) : "0";
    //adding 0 before m or s
    s = (dContainsM || dContainsS) && Number(s) < 10? "0" + s: s;
    m = (dContainsH || dContainsM) && Number(m) < 10? "0" + m + ":" : m + ":";
    return d !== "0S" ? h + m + s : "LIVE"
  }

}
