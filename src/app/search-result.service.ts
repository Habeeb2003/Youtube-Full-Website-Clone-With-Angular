import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { converTime, filterType, searchResult, searchResultInterface, timeSince, viewsFormatter } from './app.component';
import { YoutubeService } from './youtube.service';

@Injectable({
  providedIn: 'root'
})
export class SearchResultService {

  resultSource = new BehaviorSubject<searchResult[] | undefined>([])
  filterSource = new BehaviorSubject<searchResultInterface>({
    access_token: undefined,
    alt: undefined,
    callback: undefined,
    channelId: undefined,
    channelType: undefined,
    eventType: undefined,
    fields: undefined,
    forContentOwner: undefined,
    forDeveloper: undefined,
    forMine: undefined,
    key: undefined,
    location: undefined,
    locationRadius: undefined,
    maxResults: 10,
    oauth_token: undefined,
    onBehalfOfContentOwner: undefined,
    order: undefined,
    pageToken: undefined,
    part: "id,snippet",
    prettyPrint: undefined,
    publishedAfter: undefined,
    publishedBefore: undefined,
    q: undefined,
    quotaUser: undefined,
    regionCode: undefined,
    relatedToVideoId: undefined,
    relevanceLanguage: undefined,
    safeSearch: undefined,
    topicId: undefined,
    type: undefined,
    upload_protocol: undefined,
    uploadType: undefined,
    videoCaption: undefined,
    videoCategoryId: undefined,
    videoDefinition: undefined,
    videoDimension: undefined,
    videoDuration: undefined,
    videoEmbeddable: undefined,
    videoLicense: undefined,
    videoSyndicated: undefined,
    videoType: undefined
  })
  currentResult = this.resultSource.asObservable()
  currentFilter = this.filterSource.asObservable()

  constructor(private youtubeService: YoutubeService) { }

  updateResult(result: searchResult[] | undefined){
    this.resultSource.next(result)
  }
  updateFilter(filter: searchResultInterface){
    this.filterSource.next(filter)
    console.log("filt", this.filterSource.getValue());
    this.ytSearch(this.filterSource.getValue())
  }

  ytSearch(filter: searchResultInterface) : void{
  
    // this.changeFilters(filter)
    
    
    this.youtubeService.searchByKeyword(this.filterSource.getValue()).then(response => {
      // console.log('resp',response.items);
      response.items!.map((item: searchResult) => {
        this.youtubeService.getChannelThumbnail(item.snippet?.channelId!).then(res => {
          item.channelThumbnail = res.items![0].snippet?.thumbnails?.high?.url
          // console.log("thumbnail",item);
          
        })
        if (item.id?.kind == "youtube#video") {
          this.youtubeService.getVideoStatistics(item.id.videoId!).then(res => {
            
            item.snippet!.publishedAt = timeSince(new Date(res.items![0].snippet?.publishedAt as unknown as string))
            item.viewCount = viewsFormatter(Number(res.items![0].statistics?.viewCount)).toString()
            item.duration = converTime(res.items![0].contentDetails!.duration!.toString())
            // console.log("vid", item);
            
          })
        }
        if (item.id?.kind == "youtube#channel") {
          this.youtubeService.getChannelStatistics(item.id.channelId!).then(res => {
            console.log('momo', res);
            
            console.log( 'subscri',res.items![0].statistics?.subscriberCount, 'videCoun', res.items![0].statistics?.videoCount
            )
            item.subscriberCount = viewsFormatter(Number(res.items![0].statistics?.subscriberCount)).toString()
            if (res.items![0].statistics?.videoCount) {
              item.videoCount = viewsFormatter(Number(res.items![0].statistics?.videoCount)).toString()
            }
            // console.log("vid", item);
            
          })
        }
        if (item.id?.kind == "youtube#playlist") {
          this.youtubeService.getPlaylist(item.id.playlistId!).then(res => {
            console.log("my",res);
            
            item.noOfVideos = res.pageInfo?.totalResults;
            item.firstPlaylistVideoTitle = res.items![0].snippet?.title
            item.secondPlaylistVideoTitle = res.items![1].snippet?.title
            this.youtubeService.getPlaylistVideoDuration(res.items![0].contentDetails?.videoId!).then(data => {
              console.log(data);
              
              item.firstPlaylistVideoDuration = converTime(data.items![0].contentDetails?.duration!)
            })
            this.youtubeService.getPlaylistVideoDuration(res.items![1].contentDetails?.videoId!).then(data => {
              item.secondPlaylistVideoDuration = converTime(data.items![0].contentDetails?.duration!)
            })
          })
        }
      })
      this.updateResult(response.items)
    })
  }

  changeFilters<K extends keyof searchResultInterface>(parameter: { filter: K, value: searchResultInterface[K] }[]){
    parameter.forEach(param => this.filterSource.getValue()[param.filter] = param.value)
    console.log('hi man');
    
    this.updateFilter(this.filterSource.getValue())
  }
  public getPlaylist() : Promise<gapi.client.youtube.PlaylistItemListResponse>{
    return new Promise(resolve => {
      gapi.client.youtube.playlistItems.list({
        part: ["id","snippet","contentDetails","status"],
        playlistId: "PLC3y8-rFHvwhBRAgFinJR8KHIrCdTkZcZ"
      }).then(res => resolve(res.result))
    })
  }
  public playlistVideoDuration(id: string) : Promise<gapi.client.youtube.Video>{
    return new Promise(resolve => {
      gapi.client.youtube.videos.list({
        part: ["contentDetails"],
        id: id,
        fields: "items(contentDetails(duration))"
      }).then(res => resolve(res.result))
    })
  }

}
