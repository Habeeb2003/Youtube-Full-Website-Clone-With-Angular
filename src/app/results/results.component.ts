import { searchResult, searchResultInterface, filterType } from './../app.component';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SearchResultService } from '../search-result.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  open : boolean = false

  results : searchResult[] | undefined
  rs = [
    {},{},{},{},{}
  ]
  subscription: Subscription;
  filterSubscription : Subscription

  filters: searchResultInterface

  forDurations: filterType[] = [
    {filter: 'type', value: 'video'},
    {filter: 'videoType', value: 'movie'}
  ]

  activeTimeFilter : 'hour' | 'today' | 'week' | 'month' | 'year' | undefined = undefined

  videoFilter: filterType = { filter : 'type', value: 'video'}

  constructor(private resultService: SearchResultService) { }

  ngOnInit(): void {
    this.subscription = this.resultService.currentResult.subscribe(results => {
      this.results = results
      console.log(results);
    })
    this.filterSubscription = this.resultService.currentFilter.subscribe(filters => {
      this.filters = filters
    })
    console.log(this.filters.order);
    this.resultService.getPlaylist().then(data => {
      console.log(data);
      this.resultService.playlistVideoDuration(data.items![0].contentDetails!.videoId!).then(res => {
        console.log(res);
        
      })
    })
  }

  toggleFilterDropdown(){
    this.open = !this.open
  }

  filterSearch(filter: filterType[]){
    console.log(filter);
    this.resultService.changeFilters(filter)
    this.open = false
  }

  checkIfActive(e: MouseEvent) : boolean{
    // if (e.targ) {
      
    // }
    console.log((e.target as HTMLLinkElement).classList.contains('active'));
    return (e.target as HTMLLinkElement).classList.contains('active')
  }

  getDateForFilter(param : 'Y' | 'M' | 'W' | 'H' | 'T' | undefined) : string{
    let timeFilter
    let date
    if (param == undefined) {
      this.filterSearch([{filter: "publishedAfter", value: undefined}])
    }
    switch (param) {
      case 'Y':
        timeFilter = 1000 * 60 * 60 * 24 * 365
        date = new Date(new Date().valueOf() - timeFilter)
        this.filterSearch([{filter: "publishedAfter", value: date.toISOString()}])
        this.activeTimeFilter = "year"
        break;
      case 'M':
        timeFilter = 1000 * 60 * 60 * 24 * 30
        date = new Date(new Date().valueOf() - timeFilter)
        this.filterSearch([{filter: "publishedAfter", value: date.toISOString()}])
        this.activeTimeFilter = "month"
        break;
      case 'W':
        timeFilter = 1000 * 60 * 60 * 24 * 7
        date = new Date(new Date().valueOf() - timeFilter)
        this.filterSearch([{filter: "publishedAfter", value: date.toISOString()}])
        this.activeTimeFilter = "week"
        break;
      case 'H':
        timeFilter = 1000 * 60 * 60
        date = new Date(new Date().valueOf() - timeFilter)
        this.filterSearch([{filter: "publishedAfter", value: date.toISOString()}])
        this.activeTimeFilter = "hour"
        break;
      case 'T':
        timeFilter = 1000 * 60 * 60 * 24
        date = new Date(new Date().valueOf() - timeFilter)
        this.filterSearch([{filter: "publishedAfter", value: date.toISOString()}])
        this.activeTimeFilter = "today"
        break;
      case undefined:
        this.activeTimeFilter = undefined
        break;
      default:
        break;
    }
    return "";
  }

  // changeFilters<K extends keyof searchResultInterface>(parameter: { filter: K, value: searchResultInterface[K] }){
  //   this.filters[parameter.filter] = parameter.value
  //   this.resultService.updateFilter(this.filters)
  // }

}
