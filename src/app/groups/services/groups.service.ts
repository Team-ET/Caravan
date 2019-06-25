import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Group, User } from '../../models';
import { HttpErrorHandler, HandleError } from '../../http-error-handler.service';
import { SuccessAlertComponent } from 'src/app/success-alert/success-alert.component';

// const httpOptions = {
//   headers: new HttpHeaders({
//     'Content-Type':  'application/json',
//     'Authorization': 'my-auth-token'
//   })
// };

@Injectable()
export class GroupsService {
  groupsUrl = '/api/groups';  // URL to groups api
  tripsUrl = '/api/trips';  // URL to trips api
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('GroupsService');
  }

  // GET group matches from server
  getGroupMatches(): Observable<Group[]> {
    return this.http.get<Group[]>(this.groupsUrl)
      .pipe(
        catchError(this.handleError('getGroups', []))
      );
  }

  // GET group details from server
   getGroup(id: number): Observable<Group> {
    return this.http.get<Group>(this.groupsUrl + `/${id}`)
      .pipe(
        catchError(this.handleError('getGroup', null))
      );
  }

  // GET a user's trips
  getUserTrips(): Observable<Group[]> {
    return this.http.get<Group[]>(this.tripsUrl)
      .pipe(
        catchError(this.handleError('getTrips', []))
      );
  }

  // GET a group's users
  getGroupUsers(id: number): Observable<User[]> {
    return this.http.get<User[]>(this.groupsUrl + `/${id}/users`)
      .pipe(
        catchError(this.handleError('getGroupUsers', null))
      );
  }

  // POST info from create group form to server
  async createGroup(group: Group): Promise<void> {
    await this.http.post<void>(this.groupsUrl + '/signup', group, {responseType: 'text' as 'json'})// specifying response type to avoid error
      .toPromise()
        .then(result => {
          console.log('Form Promise:', result);
        })
        .catch(err => {
          console.error(err);
        });
  }

}
