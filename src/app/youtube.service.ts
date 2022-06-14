import { Injectable } from '@angular/core';
import { searchResultInterface } from './app.component';

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
        part: ["snippet"],
        id: id,
        fields: "items(id,snippet(thumbnails))"
      }).then(res => resolve(res.result))
    })
  }

  public searchByKeyword(filters: searchResultInterface, ) : Promise<gapi.client.youtube.SearchListResponse>{
    return new Promise(resolve => {
      gapi.client.youtube.search.list({
        access_token: filters.access_token,
        alt: filters.alt,
        callback: filters.channelId,
        channelId: filters.channelId,
        channelType: filters.channelType,
        eventType: filters.eventType,
        fields: filters.fields,
        forContentOwner: filters.forContentOwner,
        forDeveloper: filters.forDeveloper,
        forMine: filters.forMine,
        key: filters.key,
        location: filters.location,
        locationRadius: filters.locationRadius,
        maxResults: filters.maxResults,
        oauth_token: filters.oauth_token,
        onBehalfOfContentOwner: filters.onBehalfOfContentOwner,
        order: filters.order,
        pageToken: filters.pageToken,
        part: filters.part,
        prettyPrint: filters.prettyPrint,
        publishedAfter: filters.publishedAfter,
        publishedBefore: filters.publishedBefore,
        q: filters.q,
        quotaUser: filters.quotaUser,
        regionCode: filters.regionCode,
        relatedToVideoId: filters.relatedToVideoId,
        relevanceLanguage: filters.relevanceLanguage,
        safeSearch: filters.safeSearch,
        topicId: filters.topicId,
        type: filters.type,
        upload_protocol: filters.upload_protocol,
        uploadType: filters.uploadType,
        videoCaption: filters.videoCaption,
        videoCategoryId: filters.videoCategoryId,
        videoDefinition: filters.videoDefinition,
        videoDimension: filters.videoDimension,
        videoDuration: filters.videoDuration,
        videoEmbeddable: filters.videoEmbeddable,
        videoLicense: filters.videoLicense,
        videoSyndicated: filters.videoSyndicated,
        videoType: filters.videoType
      }).then(res => resolve(res.result))
    })
  }

  public getVideoStatistics(id: string) : Promise<gapi.client.youtube.VideoListResponse>{
    return new Promise(resolve => {
      gapi.client.youtube.videos.list({
        part: ["snippet","statistics","contentDetails"],
        id: id,
        fields: "items(id,snippet(publishedAt),statistics(viewCount),contentDetails)",
        maxResults: 10
      }).then(res => resolve(res.result))
    })
  }

  public getChannelStatistics(id: string) : Promise<gapi.client.youtube.ChannelListResponse>{
    return new Promise(resolve => {
      gapi.client.youtube.channels.list({
        part: ["statistics"],
        id: id,
        fields: "items(statistics(subscriberCount),statistics(viewCount))",
        maxResults: 10
      }).then(res => resolve(res.result))
    })
  }

  // public listt() : Promise<gapi.client.youtube.Video>{
  //   return new Promise( resolve => {
  //     gapi.client.youtube.
  //   })
  // }
}
