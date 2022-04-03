import { MessageService } from 'src/app/services/messages.service';
import { Message } from './../../models/message';
import { Component, Directive, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';
import { Member } from 'src/app/models/member';
import { MembersService } from 'src/app/services/members.service';
import { Subscription } from 'rxjs';
import { ChangeDetectionStrategy } from '@angular/compiler';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})


export class MemberDetailComponent implements OnInit {
  member: Member;
  messages : Message[];
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  @ViewChild('memberTabs' , {static: true})  memberTabs: TabsetComponent;
  activaTab: TabDirective;
  subscription: Subscription;

  constructor(private memberService: MembersService, private route: ActivatedRoute, private messageService: MessageService) { }

  ngOndestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {

    this.route.data.subscribe(data => {
      this.member = data['member'];
    });

    this.galleryImages = this.getImages();

    this.subscription= this.route.queryParams.subscribe((params: Params) => {
     this.selectTab(params['tab'] || 0);

    });

    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false
      }];

  }

  getImages(): NgxGalleryImage[] {
    const imgUrls: NgxGalleryImage[] = [];
    for (const photo of this.member.photos) {
      imgUrls.push({
        small: photo.url,
        medium: photo.url,
        big: photo.url
      })
    }
    return imgUrls;
  }




  onTabActivated(data: TabDirective) {
    this.activaTab = data;
    if(this.activaTab.heading === "Messages" && this.messages.length === 0) {
      this.loadMessages();
    }
  }
  loadMessages() {
    this.messageService.getMessageThread(this.member.username).subscribe( x => {
      this.messages = x;
    });
  }

  selectTab(tabId: number) {
    this.memberTabs.tabs[tabId].active = true;
  }



}
