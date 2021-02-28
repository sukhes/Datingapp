import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private rtr: Router, private tst: ToastrService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(error => {
        if (error) {
          switch (error.status) {
            case 400:
              if (error.error.errors) {
                const modalStateErrors = [];
                for (const key in error.error.errors) {
                  if (error.error.errors[key]) {
                    modalStateErrors.push(error.error.errors[key]);
                  }
                }
                throw modalStateErrors.flat();
              }
              else {
                this.tst.error(error.statusText, error.status);
              }
              break;
            case 401:
              this.tst.error(error.statusText, error.status);
              break;
            case 404:
              this.rtr.navigateByUrl('/not-found');
              break;
            case 500:
              const navextra: NavigationExtras = { state: { error: error.error } };
              this.rtr.navigateByUrl('/server-error', navextra);
              break;
            default:
              this.tst.error('Something unexpected happened.');
              console.log(error);
              break;
          }


        }
        return throwError(error);
      })
    );
  }
}
