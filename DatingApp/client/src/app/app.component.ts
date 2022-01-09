import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AccountService } from './services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'The Dating App';
  users: any;

  constructor(private http: HttpClient, private accountService: AccountService){

  }
  ngOnInit(): void {
    this.getUsers();
  }

  setCurrentUser(){
    const userFormLS:any = localStorage.getItem('user');
    this.accountService
  }

  getUsers(){
    this.http.get('https://localhost:5001/api/users').subscribe( res => {
      this.users=res;
    },
    err=> {
      console.log(err)
    },
    () =>{
      console.log('Users Loaded');
    });
    
  }
}
