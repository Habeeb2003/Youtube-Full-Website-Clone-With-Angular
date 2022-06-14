
import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { converTime, filterType, searchResult, searchResultInterface, timeSince, viewsFormatter } from '../app.component';
import { GoogleSiginService } from '../google-sigin.service';
import { SearchResultService } from '../search-result.service';
import { YoutubeService } from '../youtube.service';



/** @title Responsive sidenav */
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnDestroy, OnInit {

  user : gapi.auth2.GoogleUser | null

  userIsSignedIn: boolean = false;

  hasBackdrop: boolean = true;

  mobileQuery: MediaQueryList;

  fillerNav = Array.from({length: 50}, (_, i) => `Nav Item ${i + 1}`);

  filters: searchResultInterface

  fillerContent = Array.from(
    {length: 50},
    () =>
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
       labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
       laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
       voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
       cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
  );

  private _mobileQueryListener: () => void;

  result : searchResult[] | undefined

  resultSubscription : Subscription

  filterSubscription : Subscription

  constructor( private changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private youtubeService: YoutubeService, private resultService : SearchResultService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.resultSubscription = this.resultService.currentResult.subscribe(result => this.result = result)
    this.filterSubscription = this.resultService.currentFilter.subscribe(filters => this.filters = filters)
  }

  signIn(){
    // this.signInService.signIn()
  }

  signOut(){
    // this.signInService.signOut()
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  searchWithEnterKey(e: KeyboardEvent) : void{
    if(e.key == "Enter"){
      const query = (e.target as HTMLInputElement).value
      this.resultService.changeFilters([{filter : "q", value: query}])
    }
  }
  searchBtn(filter: filterType){
    this.resultService.changeFilters([filter])
  }

  // ytSearch(filter: filterType) : void{
  
  //   this.resultService.changeFilters(filter)
    
    
  //   this.youtubeService.searchByKeyword(this.filters).then(response => {
  //     // console.log(response);
  //     response.items!.map((item: searchResult) => {
  //       this.youtubeService.getChannelThumbnail(item.snippet?.channelId!).then(res => {
  //         item.channelThumbnail = res.items![0].snippet?.thumbnails?.high?.url
  //         // console.log("thumbnail",item);
          
  //       })
  //       if (item.id?.kind == "youtube#video") {
  //         this.youtubeService.getVideoStatistics(item.id.videoId!).then(res => {
            
  //           item.snippet!.publishedAt = timeSince(new Date(res.items![0].snippet?.publishedAt as unknown as string))
  //           item.viewCount = viewsFormatter(Number(res.items![0].statistics?.viewCount)).toString()
  //           item.duration = converTime(res.items![0].contentDetails!.duration!.toString())
  //           // console.log("vid", item);
            
  //         })
  //       }
  //     })
  //     this.resultService.updateResult(response.items)
  //   })
  // }

  /* optimise this function later */
  // changeFilters<K extends keyof searchResultInterface>(parameter: { filter: K, value: searchResultInterface[K] }){
  //   this.filters[parameter.filter] = parameter.value
  //   this.resultService.updateFilter(this.filters)
  // }

  inputFocus(e:any): void {
    // e.target.style.borderLeft = "none"
    e.target.previousSibling.style.visibility = "visible";
  }
  inputBlur(e:any): void{
    // e.target.style.borderLeft = "2px solid black"
    e.target.previousSibling.style.visibility = "hidden";
  }

  //shouldRun = /(^|.)(stackblitz|webcontainer).(io|com)$/.test(window.location.host);
}
