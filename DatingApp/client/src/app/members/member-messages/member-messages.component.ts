import { Message } from './../../models/message';
import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css']
})
export class MemberMessagesComponent implements OnInit {

  @Input() username: string;
  messages: Message[];

  constructor(
    private messageService: MessageService
  ) { }


  ngOnInit() {
    this.loadMessages();
  }
  loadMessages() {
     this.messageService.getMessageThread(this.username).subscribe(
       x => {
         this.messages = x;
       });
  }

}
