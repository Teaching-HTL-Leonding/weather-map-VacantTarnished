import { InjectionToken, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AIRTABLE_KEY, OPENWEATHER_KEY, GEOAPIFY_KEY } from './tokens';
import { AuthorizationInterceptor } from './authorization.interceptor';


export const GEOAPIFY_URL = new InjectionToken<string>('GeoapifyUrl');
export const GEOAPIFY_TOKEN = new InjectionToken<string>('GeoapifyToken');
export const OPENWEATHER_URL = new InjectionToken<string>('OpenweatherUrl');
export const OPENWEATHER_TOKEN = new InjectionToken<string>('OpenweatherToken');
export const AIRTABLE_URL = new InjectionToken<string>('AirtableUrl');
export const AIRTABLE_TOKEN = new InjectionToken<string>('AirtableToken');

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizationInterceptor, multi: true},
    { provide: GEOAPIFY_URL, useValue: 'https://api.geoapify.com/v1/geocode/search'},
    { provide: GEOAPIFY_TOKEN, useValue: GEOAPIFY_KEY},
    { provide: OPENWEATHER_URL, useValue: 'https://api.openweathermap.org/data/2.5/weather'},
    { provide: OPENWEATHER_TOKEN, useValue: OPENWEATHER_KEY},
    { provide: AIRTABLE_URL, useValue: 'https://api.airtable.com/v0/appV3GrMV8x5KaNNY/WeatherTracked'},
    { provide: AIRTABLE_TOKEN, useValue: AIRTABLE_KEY}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
