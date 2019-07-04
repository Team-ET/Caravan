import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Message } from '../../../models/message';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  providers: [ ChatService ]
})
export class ChatComponent implements OnInit {
  @Input() tripId: number;
  text: string;
  message: Message;
  messages: Message[] = [];
  profile: any = {name: 'Erica'};
  socket: any;

  constructor(readonly route: ActivatedRoute, private chatService: ChatService) {
    // this.user = chatService.user;
  }

  ngOnInit() {
    // this.route.params.subscribe(params => {
    // this.groupId = params.groupId;
    // this.getDbMessages(this.groupId);
    // });
    this.chatService.joinGroupChat(this.tripId);
    if (this.tripId) {
      this.loadMessages(this.tripId);
    }
    this.chatService
      .getMessages()
      .subscribe((message: Message) => {
        console.log(message);
        this.messages.push(message);
      });
    // if (this.authService.userProfile) {
    //   this.profile = this.authService.userProfile;
    // } else {
    //   this.authService.getProfile((err, profile) => {
    //     this.profile = profile;
    //   });
    // }
  }

  // GET messages for group from DB if user is a group member
  loadMessages(id: number) {
    this.chatService.getGroupMessages(id).subscribe(result => {
      this.messages = result;
    });
  }

  // send a message via sockets
  sendMessage() {
    this.chatService.sendMessage(this.text, this.profile.name, this.tripId);
    this.text = '';
  }

}
