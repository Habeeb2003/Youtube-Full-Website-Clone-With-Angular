import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { GoogleSiginService } from './google-sigin.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'youtube';

  user : gapi.auth2.GoogleUser | null

  constructor(private signInService : GoogleSiginService, private ref : ChangeDetectorRef){

  }

  ngOnInit(): void {
    this.signInService.observable().subscribe( user => {
      this.user = user
      this.ref.detectChanges()
    })
  }

  signIn(){
    this.signInService.signIn()
  }

  signOut(){
    this.signInService.signOut()
  }

}
