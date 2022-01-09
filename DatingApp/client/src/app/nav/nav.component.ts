import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../models/User';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  loggedIn : boolean =false;

  constructor(private accountService :AccountService) { }

  ngOnInit(): void {
    this.getCurrentUser();
  }

  logout(){
    this.accountService.logout();
    this.loggedIn =false;
  }

  login(){
    this.accountService.login(this.model)
   .subscribe(response =>{
     console.log(response);
     this.loggedIn = true;
   }, error =>{
     console.log('Failed to login',error)
   });
  }

  getCurrentUser(){
    this.accountService.currentUser$.subscribe((user: User | null)=> {
      this.loggedIn = !!user;
    });
  }

}
