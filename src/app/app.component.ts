import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { GoogleSiginService } from './google-sigin.service';

export interface searchResultInterface{
  access_token?: string;
  alt?: string;
  callback?: string;
  channelId?: string;
  channelType?: string;
  eventType?: string;
  fields?: string;
  forContentOwner?: boolean;
  forDeveloper?: boolean;
  forMine?: boolean;
  key?: string;
  location?: string;
  locationRadius?: string;
  maxResults?: number;
  oauth_token?: string;
  onBehalfOfContentOwner?: string;
  order?: string;
  pageToken?: string;
  part: string | string[];
  prettyPrint?: boolean;
  publishedAfter?: string;
  publishedBefore?: string;
  q?: string;
  quotaUser?: string;
  regionCode?: string;
  relatedToVideoId?: string;
  relevanceLanguage?: string;
  safeSearch?: string;
  topicId?: string;
  type?: string | string[];
  upload_protocol?: string;
  uploadType?: string;
  videoCaption?: string;
  videoCategoryId?: string;
  videoDefinition?: string;
  videoDimension?: string;
  videoDuration?: string;
  videoEmbeddable?: string;
  videoLicense?: string;
  videoSyndicated?: string;
  videoType?: string;
}

export type filterType = {filter: keyof searchResultInterface , value : string | string[] | number | boolean | undefined }

export interface searchResult extends gapi.client.youtube.SearchResult{
  channelThumbnail?: string
  viewCount?: string
  duration?: string
  subscriberCount?: string
  videoCount?: string
  firstPlaylistVideoTitle?: string
  firstPlaylistVideoDuration?: string
  secondPlaylistVideoTitle?: string
  secondPlaylistVideoDuration?: string
  noOfVideos?: number
}

const intervals = [
  { label: 'year', seconds: 31536000 },
  { label: 'month', seconds: 2592000 },
  { label: 'day', seconds: 86400 },
  { label: 'hour', seconds: 3600 },
  { label: 'minute', seconds: 60 },
  { label: 'second', seconds: 1 }
];

export function timeSince(date : Date) : string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  const interval = intervals.find(i => i.seconds < seconds);
  const count = Math.floor(seconds / interval!.seconds);
  return `${count} ${interval!.label}${count !== 1 ? 's' : ''} ago`;
}

export function viewsFormatter(num : number) {
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

export function converTime(d: string) {
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

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})



export class AppComponent  {
  title = 'youtube';

  

  constructor(){

  }


}
