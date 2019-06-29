import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpErrorHandler, HandleError } from './http-error-handler.service';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Message } from './models';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private handleError: HandleError;
  private url = 'http://localhost:3000';
  private socket;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('ChatService');
    this.socket = io(this.url);
  }

  public sendMessage(message, user, groupId) {
    this.socket.emit('new-message', {message, user: user.name, groupId});
  }

  public getMessages = () => {
    return Observable.create((observer) => {
        this.socket.on('new-message', (message, user) => {
          observer.next(message);
        });
    });
  }

  // GET messages for a group if user is a member
  public getGroupMessages(id: number): Observable<Message[]> {
    return this.http.get<Message[]>(`api/groups/${id}/messages`)
      .pipe(
        catchError(this.handleError('getGroupMessages', null))
      );
  }
}
