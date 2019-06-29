import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { Message } from '../models';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  providers: [ ChatService ]
})
export class ChatComponent implements OnInit {
  message: string;
  messages: string[] = [];

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    this.chatService
      .getMessages()
      .subscribe((message: string) => {
        this.messages.push(message);
      });
  }

  sendMessage() {
    this.chatService.sendMessage(this.message);
    this.message = '';
  }

}
