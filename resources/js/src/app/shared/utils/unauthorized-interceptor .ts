import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, tap} from "rxjs/operators";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {Overlay} from "@angular/cdk/overlay";
import { ComponentPortal } from '@angular/cdk/portal';
import { MatSpinner } from '@angular/material/progress-spinner';

@Injectable()
export class UnauthorizedInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private overlay: Overlay
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        const title = '認証エラー';
        const message = '接続が切れました。再度ログインしてください。';
        if (error.status === 401) {
          if (! this.toastr.findDuplicate(title, message, false, false)) {
            this.toastr.error(message, title);
          }
          this.router.navigate(['/login-page']);
        }
        return throwError(error);
      })
    );
  }
}
