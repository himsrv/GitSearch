import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http"
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http:HttpClient) { }

  //calls the api link to get the repositories of a particular user

   getRepos(link): Observable<any> {
    let url = link
    return this.http.get(url);
  }

  //call the api to search for a user by his username

  getUser(userName): Observable<any> {
    let url = 'https://api.github.com/search/users?q='+ userName;
    return this.http.get(url);
  }
}
