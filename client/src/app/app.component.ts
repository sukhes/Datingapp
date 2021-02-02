import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from './_models/User';
import { AccountService } from './_service/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'The Dating App';
  users: any;

  constructor(private http: HttpClient, private acc_svc: AccountService){}
  ngOnInit() {
    this.setCurrentUser();
  }

  setCurrentUser(){
    const user: User = JSON.parse(localStorage.getItem('user'));
    this.acc_svc.setCurrentUser(user);  
  }

  // getUsers(){
  //   this.http.get('https://localhost:5001/API/Users').subscribe(response =>{
  //     this.users = response;
  //   }, 
  //   error=> {console.log(error)
  //   })
  // }

}
