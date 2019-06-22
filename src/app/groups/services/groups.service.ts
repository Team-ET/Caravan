import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

<<<<<<< HEAD:src/app/groups/groups.service.ts
import { Group } from '../group';
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';
=======
import { Group } from '../models/group';
import { HttpErrorHandler, HandleError } from '../../http-error-handler.service';
>>>>>>> b667013e6c7a9363d83b4f84bb2c4cbfc0317c11:src/app/groups/services/groups.service.ts

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

  /* GET user's trips */
  getUserTrips(): Observable<Group[]> {
    return this.http.get<Group[]>(this.tripsUrl)
      .pipe(
        catchError(this.handleError('getTrips', []))
      );
  }

}
