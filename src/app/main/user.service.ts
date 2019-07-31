import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Observable, BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { User } from '../models';
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';
import { AuthService } from '../auth/services/auth.service';

// const httpOptions = {
//   headers: new HttpHeaders({
//     'Content-Type':  'application/json',
//     'Authorization': 'my-auth-token'
//   })
// };

@Injectable({
  providedIn: 'root'
 })
export class UserService {
  currentUser = new BehaviorSubject<any>(null);
  profile: any;
  user: User;
  usersUrl = '/api/users';  // URL to groups api
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    private httpErrorHandler: HttpErrorHandler,
    private auth: AuthService) {
    this.handleError = httpErrorHandler.createHandleError('UserService');
  }

  setUser(user: any) {
    this.currentUser.next(user);
  }
  getUser() {
    return this.currentUser.value;
  }

  // POST user info on login to main page and store in database
  async createUser(user: User): Promise<void> {
    await this.http.post<User>(this.usersUrl, user, {responseType: 'text' as 'json'}) // specifying response type to avoid error
      .toPromise()
        .then(result => {
          console.log('STORING PROFILE', result);
        })
        .catch(err => {
          console.error(err);
        });
  }

  storeProfile(user) {
    console.log('USER', user);
    this.createUser(user);
  }

  // POST user and groupid to server; add a user to a group
  async addUser(id: number, sub: string, pending: boolean): Promise<void> {
    const data = {id, sub, pending};
    console.log(data);
    await this.http.post<void>(this.usersUrl + '/join-group', data, {responseType: 'text' as 'json'}) // specifying response type to avoid error
      .toPromise()
        .then(result => {
          console.log('Add User to Group', result);
        })
        .catch(err => {
          console.error(err);
        });
  }

}
