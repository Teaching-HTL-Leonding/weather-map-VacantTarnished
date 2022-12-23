import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OPENWEATHER_URL } from './app.module';

interface Root {
  weather: Weather[];
  main: Main;
  name: string;
}

interface Weather {
  description: string;
  icon: string;
}

interface Main {
  temp: number;
}

@Injectable({
  providedIn: 'root'
})
export class OpenweatherService {

  constructor(@Inject(OPENWEATHER_URL) private url: string, private httpClient: HttpClient) { }

  getWeather(lat: number, lon: number, system: string): Observable<Root> {
    console.log(system)
    return this.httpClient.get<Root>(`${this.url}?lat=${lat}&lon=${lon}&lang=de&units=${system}`);
  }
}
