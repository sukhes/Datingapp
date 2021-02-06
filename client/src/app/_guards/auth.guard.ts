import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AccountService } from '../_service/account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private acc_svc: AccountService, private tsr: ToastrService){};

  canActivate(): Observable<boolean> {
    return this.acc_svc.currentUser$.pipe(
      map(user => {
        if (user) return true;
        this.tsr.error("You shall not pass.")
      })
    )
   }
  
}
