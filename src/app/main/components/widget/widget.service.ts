import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Photos } from 'src/app/models/photos';

import { SuccessAlertComponent } from 'src/app/success-alert/success-alert.component';
import { HandleError, HttpErrorHandler } from 'src/app/http-error-handler.service';

//test
@Injectable({
  providedIn: 'root'
})
export class WidgetService {
  photoUrl = '/api/photos';
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('PhotoService');
  }

  async savePhoto(photo: any): Promise<void> {
    return this.http.post<void>(this.photoUrl, photo, {responseType: 'text' as 'json'})// specifying response type to avoid error
      .toPromise();
  }

  getPhotos(): Observable<Photos[]> {
    return this.http.get<Photos[]>(this.photoUrl)
    .pipe(
      catchError(this.handleError('getPhotos', []))
    );
  }
  
}
