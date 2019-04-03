import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

const USERS_URL = 'https://randomuser.me/api/';

@Injectable({
  providedIn: 'root'
})
export class CardsManagerService {

  constructor(private http: HttpClient) { }

  /**
   * Get list of fake users
   */
  getUserList() {
    return this.http.get(USERS_URL + '?results=10').pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Error Handler
   * @param error
   */
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }

}
