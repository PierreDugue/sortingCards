import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
    return this.http.get(USERS_URL + '?results=10');
  }

}
