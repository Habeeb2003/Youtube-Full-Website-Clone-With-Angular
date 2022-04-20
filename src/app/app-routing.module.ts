import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ResultsComponent } from './results/results.component';
import { WatchComponent } from './watch/watch.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'watch', component: WatchComponent},
  {path: 'result', component: ResultsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
