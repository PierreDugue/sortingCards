import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';

const USERS_URL = 'https://randomuser.me/api/';
const TODO_URL = 'https://jsonplaceholder.typicode.com';
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
   * Get a fake Posts
   */
  getPosts(): Observable<any> {
    return this.http.get(TODO_URL + '/posts').pipe(
      catchError(this.handleError)
    );
  }

  deletePost(id): Observable<any> {
    return this.http.delete(TODO_URL + '/posts/' + id);
  }

  createPost(): Observable<any> {
    return this.http.post(TODO_URL + '/posts', JSON.stringify({
      title: 'foo',
      body: 'bar',
      userId: 1
    })).pipe(
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
