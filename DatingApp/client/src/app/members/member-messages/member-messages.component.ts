import { NgForm } from '@angular/forms';
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
  @Input()  messages: Message[];
  messageContent: string;

  constructor(private messgaeService: MessageService) { }


  ngOnInit() {

  }

  sendMessage(form:NgForm){
    this.messgaeService.sendMessage(this.username, this.messageContent)
    .subscribe((message) => {
      this.messages.push(message as Message);
      form.reset();
    })
  }
}



