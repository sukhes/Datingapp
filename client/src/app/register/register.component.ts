import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccountService } from '../_service/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  // @Input() usersFromHomeComponent: any;
  @Output() cancelRegister = new EventEmitter();

  model: any = {};
  constructor(private acc_svc: AccountService) { }

  ngOnInit(): void {
  }

  register() {
    this.acc_svc.register(this.model).subscribe( res => {
      console.log(res);
      this.cancel();
    }, err => {
       console.log(err);
    })
  }

  cancel() {
    this.cancelRegister.emit(false);
  }


}
