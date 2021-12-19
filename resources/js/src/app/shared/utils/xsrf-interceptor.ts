import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class XsrfInterceptor implements HttpInterceptor {

  static readonly XSRF_HEADER_NAME = 'X-XSRF-TOKEN';
  static readonly XSRF_COOKIE_NAME = 'XSRF-TOKEN';

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const xsrfToken = this.getCookie(XsrfInterceptor.XSRF_COOKIE_NAME);
    if (xsrfToken) {
      req = req.clone({headers: req.headers.set(XsrfInterceptor.XSRF_HEADER_NAME, xsrfToken)});
    }
    // Always withCredentials, so that 'set-cookie' is taken into account.
    req = req.clone({withCredentials: true});
    return next.handle(req);
  }

  /*
  * See https://stackoverflow.com/questions/10730362/get-cookie-by-name
  */
  getCookie(name): string {
    const value = '; ' + document.cookie;
    const parts = value.split('; ' + name + '=');
    if (parts.length === 2) { return parts.pop().split(';').shift(); }
  }
}
