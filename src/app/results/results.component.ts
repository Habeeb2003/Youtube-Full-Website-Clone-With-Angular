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
  }

  checkIfActive(e: MouseEvent) : boolean{
    // if (e.targ) {
      
    // }
    console.log((e.target as HTMLLinkElement).classList.contains('active'));
    return (e.target as HTMLLinkElement).classList.contains('active')
  }

  // changeFilters<K extends keyof searchResultInterface>(parameter: { filter: K, value: searchResultInterface[K] }){
  //   this.filters[parameter.filter] = parameter.value
  //   this.resultService.updateFilter(this.filters)
  // }

}
