import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GoogleSiginService {


  private auth2 : gapi.auth2.GoogleAuth;
  private subject = new ReplaySubject<gapi.auth2.GoogleUser | null>(1)

  constructor() { 
    gapi.load("auth2", () => {
      this.auth2 = gapi.auth2.init({
        client_id: '900118353356-hc2rv9rnvedf54o5tp1bg1fdu1a0rots.apps.googleusercontent.com'
      })
    })
  }

  public signIn(){
    this.auth2.signIn({
      scope: "https://www.googleapis.com/auth/youtube.readonly"
    })
    .then( user => {
      this.subject.next(user)
      console.log(user)
    })
    .catch(() => {
      this.subject.next(null)
    })
  }

  public signOut(){
    this.auth2.signOut()
    .then(() => {
      this.subject.next(null)
    })
  }

  public observable() : Observable<gapi.auth2.GoogleUser | null>{
    return this.subject.asObservable()
  }

}
