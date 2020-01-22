
import { UsersService } from './users.service';
import { Component,ViewChild, AfterViewInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-github-users',
  templateUrl: './github-users.component.html',
  styleUrls: ['./github-users.component.css'],
})
export class GithubUsersComponent implements AfterViewInit {

  displayedColumns: string[] = ['id', 'avatar', 'login', 'repos'];
  exampleDatabase: ExampleHttpDatabase | null;
  data: any = [];
  resultsLength = 0;
  isLoadingResults = true;                  // when to hide/display spinner
  isRateLimitReached = false;
  repoNames=[];                             // contains the repositories name of a specific user
  UserName;



  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private _httpClient: HttpClient, private UsersService: UsersService) { }



  // searches for a user by his username using UserService
  async searchUsers(){
    let user= await this.UsersService.getUser(this.UserName).toPromise();
    console.log(user);
    alert("User found! Check his profile here - "+ user.items[0].html_url);


  }


// gets all repositories of a specific user
  async fetchRepos(link){
    this.repoNames=[];
    let repoDetails = await this.UsersService.getRepos(link).toPromise();
    console.log(repoDetails);
    repoDetails.forEach(element => {
      this.repoNames.push(element.name.toUpperCase());
    });
    console.log(this.repoNames);
    this.repoNames=[...this.repoNames]
  }

  ngAfterViewInit() {
    this.exampleDatabase = new ExampleHttpDatabase(this._httpClient);

    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.exampleDatabase!.getRepoIssues(
            this.sort.active, this.sort.direction, this.paginator.pageIndex);
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = 1000;

          return data;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          // Catch if the GitHub API has reached its rate limit. Return empty data.
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      ).subscribe(data => {this.data = data});
  }
}



/** An example database that the data source uses to retrieve data for the table. */
export class ExampleHttpDatabase {
  constructor(private _httpClient: HttpClient) {}

  getRepoIssues(sort: string, order: string, page: number): Observable<any> {
    const href = 'https://api.github.com/users';

    //Implementing pagination using "since" as required by Github api
    const requestUrl =
        `${href}?sort=${sort}&order=${order}&since=${page*46}`;
    return this._httpClient.get<any>(requestUrl);
  }
}


