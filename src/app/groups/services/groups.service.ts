import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Group, User } from '../../models';
import { HttpErrorHandler, HandleError } from '../../http-error-handler.service';

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

  /** GET group matches from the server */
  getGroupMatches(): Observable<Group[]> {
    return this.http.get<Group[]>(this.groupsUrl)
      .pipe(
        catchError(this.handleError('getGroups', []))
      );
  }

   getGroup(id: number): Observable<Group> {
    return this.http.get<Group>(this.groupsUrl + `/${id}`)
      .pipe(
        catchError(this.handleError('getGroup', null))
      );
  }

  /* GET user's trips */
  getUserTrips(): Observable<Group[]> {
    return this.http.get<Group[]>(this.tripsUrl)
      .pipe(
        catchError(this.handleError('getTrips', []))
      );
  }

  // get a group's users
  getGroupUsers(id: number): Observable<User[]> {
    return this.http.get<User[]>(this.groupsUrl + `/${id}/users`)
      .pipe(
        catchError(this.handleError('getGroupUsers', null))
      );
  }

}
