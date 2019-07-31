import { Injectable, Input } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpErrorHandler, HandleError } from './http-error-handler.service';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Message } from './models';
import { AuthService } from './auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private handleError: HandleError;
  private url = 'http://localhost:3000';
  private socket;
  public user: any;
  @Input() groupId: number;

  constructor(
    private http: HttpClient,
    public httpErrorHandler: HttpErrorHandler,
    private authService: AuthService) {
    this.handleError = httpErrorHandler.createHandleError('ChatService');
    this.user = authService.userProfile;
    this.socket = io(this.url);
    this.socket.connect();
  }

  // When socket connects, send user id to server to join group room
  public joinGroupChat(id: number) {
    this.socket.on('connect', () => {
      this.socket.emit('join-chat', id);
    });
  }

  // Send message to server
  public sendMessage(text: string, username: string, groupId: number) {
    this.socket.emit('new-message', {text, username, groupId});
  }

  // Get any messages that are sent in group chat via socket
  public getMessages = () => {
    return Observable.create((observer) => {
        this.socket.on('new-message', (message, user) => {
          observer.next(message);
        });
    });
  }

  // GET all messages for a group if user is a member
  public getGroupMessages(id: number): Observable<Message[]> {
    return this.http.get<Message[]>(`api/groups/${id}/messages`)
      .pipe(
        catchError(this.handleError('getGroupMessages', null))
      );
  }
}
