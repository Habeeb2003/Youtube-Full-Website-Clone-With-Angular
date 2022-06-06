import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChannelComponent } from './channel/channel.component';
import { HomeComponent } from './home/home.component';
import { ResultsComponent } from './results/results.component';
import { WatchComponent } from './watch/watch.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'watch', component: WatchComponent},
  {path: 'result', component: ResultsComponent},
  {path: 'c', component: ChannelComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
