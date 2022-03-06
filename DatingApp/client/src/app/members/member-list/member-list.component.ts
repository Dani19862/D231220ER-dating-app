import { AccountService } from './../../services/account.service';
import { UserParams } from './../../models/user-Params';
import { Observable, take } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/models/member';
import { MembersService } from 'src/app/services/members.service';
import { Pagination } from 'src/app/models/Pagination';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  members: Member[];
  pagination: Pagination;
  userParams: UserParams;
  user:User;
  genderList= [{
    value: 'male',
    display: 'Males'
  },{
    value: 'female',
    display: 'Females'
  }];



  constructor(private memberService: MembersService, private accountService: AccountService) {
    accountService.currentUser$
    .pipe(take(1))
    .subscribe((user : any) => {
      this.user = user;
      this.userParams = new UserParams(user);
    });
   }

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers() {
    this.memberService.getMembers(this.userParams)
      .subscribe(
        response => {
          this.members = response.result;
          this.pagination = response.pagination;
        }
      )
  }

  pageChanged({page}: any): void {
    this.userParams.pageNumber = page;
    this.loadMembers();
  }

  resetFilters() {
    this.userParams = new UserParams(this.user);
    this.loadMembers();

  }
}
