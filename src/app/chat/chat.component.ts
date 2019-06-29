import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Message } from '../models';
import { ChatService } from '../chat.service';
import { GroupsService } from '../groups/services/groups.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  providers: [ ChatService ]
})
export class ChatComponent implements OnInit {
  message: Message;
  messages: Message[] = [];
  profile: any = {name: 'Erica'};
  groupId: number = 1;

  constructor(readonly route:ActivatedRoute, private chatService: ChatService, private groupsService: GroupsService) { }

  ngOnInit() {
    // this.route.params.subscribe(params => {
    // this.groupId = params.groupId;
    // this.getDbMessages(this.groupId);
    // });
    this.getDbMessages(this.groupId);
    this.chatService
      .getMessages()
      .subscribe((message: Message) => {
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
  getDbMessages(id: number) {
    this.groupsService.getGroupMessages(id).subscribe(result => {
      this.messages = result;
    });
  }

  // send a message via sockets
  sendMessage() {
    this.chatService.sendMessage(this.message, this.profile, this.groupId);
    this.message.text = '';
  }

}
