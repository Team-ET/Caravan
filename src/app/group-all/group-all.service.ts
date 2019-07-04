import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Group, User } from 'src/app/models';
import { HttpErrorHandler, HandleError } from 'src/app/http-error-handler.service';
import { SuccessAlertComponent } from 'src/app/success-alert/success-alert.component';

// const httpOptions = {
//   headers: new HttpHeaders({
//     'Content-Type':  'application/json',
//     'Authorization': 'my-auth-token'
//   })
// };

@Injectable()
export class GroupAllService {
  // message: string;
  groupsUrl = '/api/groups/all';  // URL to groups api
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('GroupAllService');
  }

  // GET group matches from server
  // getGroupMatches(): Observable<Group[]> {
  //   return this.http.get<Group[]>(this.groupsUrl)
  //     .pipe(
  //       catchError(this.handleError('getGroups', []))
  //     );
  // }

  // GET group details from server
   getAllGroups(): Observable<Group> {
    return this.http.get<Group>(this.groupsUrl)
      .pipe(
        catchError(this.handleError('getGroup', null))
      );
  }


}
