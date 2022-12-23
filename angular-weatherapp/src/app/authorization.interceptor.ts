import { Inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AIRTABLE_TOKEN, GEOAPIFY_TOKEN, OPENWEATHER_TOKEN } from './app.module';

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {

  constructor(@Inject(AIRTABLE_TOKEN) private airtable_token: string, @Inject(OPENWEATHER_TOKEN) private openweather_token: string, @Inject(GEOAPIFY_TOKEN) private geoapify_token: string) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.startsWith("https://api.geoapify.com/")) {
      const authUrl = request.url + `&apiKey=${this.geoapify_token}`;
      return next.handle(request.clone({
        url: authUrl
      }));
    } else if (request.url.startsWith("https://api.openweathermap.org/")) {
      const authUrl = request.url + `&appid=${this.openweather_token}`;
      return next.handle(request.clone({
        url: authUrl
      }));
    } else if (request.url.startsWith("https://api.airtable.com/")) {
      return next.handle(request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.airtable_token}`
        }
      }));
    }

    return next.handle(request);
  }
}
