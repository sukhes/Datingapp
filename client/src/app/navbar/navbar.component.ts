import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountService } from '../_service/account.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  model: any = {};
  
  constructor(public acc_svc: AccountService) { }

  ngOnInit(): void {
  }

  login() {
    console.log(this.model);
    this.acc_svc.login(this.model).subscribe(
         Response => {console.log(Response);},
         error => {console.log(error);}
      )
  }

  logout(){
    this.acc_svc.logout();
    this.model.username = "";
    this.model.password = "";
  }
}
