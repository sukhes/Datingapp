import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // users: any;
  registerMode = false;
  
  constructor() { }

  ngOnInit(): void {
    // this.getUsers();
  }

  toggleRegisterMode(){
    this.registerMode = !this.registerMode
  }

  // getUsers(){
  //   this.http.get('https://localhost:5001/API/Users').subscribe(users => this.users = users);
  // }
  
  cancelRegisterMode(event: boolean){
    this.registerMode = event;
  }
}
