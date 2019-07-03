import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { User } from '../../../models';
import { HttpErrorHandler, HandleError } from '../../../http-error-handler.service';

// const httpOptions = {
//   headers: new HttpHeaders({
//     'Content-Type':  'application/json',
//     'Authorization': 'my-auth-token'
//   })
// };

@Injectable()
export class ProfileService {
  user: User;
  usersUrl = '/api/users';  // URL to groups api
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('GroupsService');
  }

  // POST info from create group form to server
  async createUser(user: User): Promise<any> {
    await this.http.post<User>(this.usersUrl, user, {responseType: 'text' as 'json'}) // specifying response type to avoid error
      .toPromise()
        .then(result => {
          this.user = result;
        })
        .catch(err => {
          console.error(err);
        });
  }

}
