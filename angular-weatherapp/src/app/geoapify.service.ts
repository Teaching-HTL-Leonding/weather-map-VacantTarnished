import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GEOAPIFY_TOKEN, GEOAPIFY_URL } from './app.module';

interface Root {
  results: Result[];
}

export interface Result {
  lat: number;
  lon: number;
}

  const url = 'https://api.geoapify.com/v1/geocode/search?text=Linz&format=json&apiKey=b589b2412c354846a8e5d283d04d5483';


@Injectable({
  providedIn: 'root'
})
export class GeoapifyService {

  constructor(@Inject(GEOAPIFY_URL) private url: String, private httpClient: HttpClient) {}


  getCoordinates(city: string): Observable<Root> {
    let lat = 0;
    let lon = 0;
    console.log(city);

    return this.httpClient.get<Root>(`${this.url}?text=${city}&format=json`);
  }
}
