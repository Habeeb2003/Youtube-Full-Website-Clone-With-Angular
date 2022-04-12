import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  apiKey = 'AIzaSyC8nhcuvQDfbipM6yK_bCclfnfyL_cwTno'

  headers = new HttpHeaders().set('TRN-Api-Key', this.apiKey)

  baseUrl : string = 'https://www.googleapis.com/youtube/v3'

  constructor(private http: HttpClient) { }

  getVideos(url: string):Observable<any>{
    return this.http.get(this.baseUrl+url, {headers: this.headers})
    .pipe(
      catchError(this.handleError)
    )
  }

  handleError(error: HttpErrorResponse){
    if(error.error instanceof ErrorEvent){
      // A client-side or network error occurred. Hande it accordingly
      console.error("An error occcured:", error.error.message);
    }
    else{
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong
      console.error(
        `Backend returned code ${error.status}, ` + 
        `body was: ${error.error}`
      );
    }
    // Return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.'
    );
  }
}
