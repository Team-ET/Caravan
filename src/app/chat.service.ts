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
  public profile: any = {name: 'Erica'};
  @Input() groupId: number;

  constructor(
    private http: HttpClient,
    public httpErrorHandler: HttpErrorHandler,
    private authService: AuthService) {
    this.handleError = httpErrorHandler.createHandleError('ChatService');
    this.user = authService.userProfile;
    // this.socket = io(this.url, {
    //   query: {
    //     user: this.profile.name,
    //     groupId: this.groupId
    //   }
    // });
    // this.socket.emit('');
    this.socket = io(this.url);
    this.socket.connect();

    // this.socket.on('connect', () => {
    //   // Connected, let's sign-up for to receive messages for this room
    //   console.log('trying to connect to room');
    //   this.socket.emit('room', this.groupId);
    // });
  }

  public joinGroupChat(id: number) {
    this.socket.on('connect', () => {
      // Connected, let's sign-up for to receive messages for this room
      console.log('trying to connect to room');
      this.socket.emit('join-chat', id);
    });
  }

  public sendMessage(text: string, user: any, groupId: number) {
    this.socket.emit('new-message', {text, user: user.name, groupId});
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
