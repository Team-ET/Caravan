import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Trip, Member } from '../../models';
import { HttpErrorHandler, HandleError } from '../../main/services/http-error-handler.service';
import { SuccessAlertComponent } from 'src/app/main/components/success-alert/success-alert.component';

// const httpOptions = {
//   headers: new HttpHeaders({
//     'Content-Type':  'application/json',
//     'Authorization': 'my-auth-token'
//   })
// };

@Injectable()
export class TripsService {
  // message: string;
  tripsURL = '/api/groups';  // URL to groups api
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('TripsService');
  }

  // GET group matches from server
  getTripMatches(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.tripsURL)
      .pipe(
        catchError(this.handleError('getTrips', []))
      );
  }

  // GET group details from server
  getTrip(id: number): Observable<Trip> {
    return this.http.get<Trip>(this.tripsURL + `/${id}`)
      .pipe(
        catchError(this.handleError('getTrip', null))
      );
  }

  // // GET a Member's trips
  //  getMemberGroups(email: string): Observable<Group> {
  //   return this.http.get<Group>(this.tripsURL + `/trips${email}`)
  //     .pipe(
  //       catchError(this.handleError('getTrips', null))
  //     );
  // }

  // GET a Member's trips
  getUserTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(`${this.tripsURL}/groups`)
      .pipe(
        catchError(this.handleError('getTrips', []))
      );
  }

  // GET a group's Members
  getTripMembers(id: number): Observable<Member[]> {
    return this.http.get<Member[]>(this.tripsURL + `/${id}/Members`)
      .pipe(
        catchError(this.handleError('getTripMembers', null))
      );
  }

  // POST info from create group form to server
  async createTrip(trips: Trip): Promise<void> {
    await this.http.post<void>(this.tripsURL + '/signup', trips, {responseType: 'text' as 'json'}) // specifying response type to avoid error
      .toPromise()
        .then(result => {
          console.log('Form Promise:', result);
        })
        .catch(err => {
          console.error(err);
        });
  }

}
