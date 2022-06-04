import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  constructor() {
    
  }

  public list() : Promise<gapi.client.youtube.VideoListResponse>{
    return new Promise( resolve => {
      gapi.client.youtube.videos.list({
        part: "snippet,contentDetails,statistics",
        chart: "mostPopular",
        maxResults: 8
      }).then( response => {
        resolve(response.result)
      })
    })
  }

  public getChannelById(id: string | string[] | undefined){
    return new Promise( resolve => {
      gapi.client.youtube.channels.list({
        part: "snippet,contentDetails,statistics",
        id: id
      })
    })
  }

  getChannelThumbnail(id: string) : Promise<gapi.client.youtube.ChannelListResponse>{
    return new Promise( resolve => {
      gapi.client.youtube.channels.list({
        part: "snippet",
        id: id,
        fields: "items(id,snippet(thumbnails))"
      }).then(res => resolve(res.result))
    })
  }

  // public listt() : Promise<gapi.client.youtube.Video>{
  //   return new Promise( resolve => {
  //     gapi.client.youtube.
  //   })
  // }
}
