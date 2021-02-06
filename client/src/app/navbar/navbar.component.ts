import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { error } from 'protractor';
import { Observable } from 'rxjs';
import { AccountService } from '../_service/account.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  model: any = {};
  
  constructor(public acc_svc: AccountService, private rtr: Router, private tsr: ToastrService) { }

  ngOnInit(): void {
  }

  login() {
    console.log(this.model);
    this.acc_svc.login(this.model).subscribe(
         Response => {this.rtr.navigateByUrl('/members');},
         err => {this.tsr.error(err.error);}
      )
  }

  logout(){
    this.acc_svc.logout();
    this.model.username = "";
    this.model.password = "";
    this.rtr.navigateByUrl('/');
  }
}
