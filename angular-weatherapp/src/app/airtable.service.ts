import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SavedCityWeather } from './app.component';
import { AIRTABLE_TOKEN, AIRTABLE_URL } from './app.module';

interface Root {
  records: Record[];
}

interface Record {
  id: string;
  fields: Fields;
}

interface Fields {
  city: string;
  time: string;
  lon: number;
  lat: number;
  temp: number;
  weatherDesc: string;
  weatherIcon: string;
  system: string;
}

@Injectable({
  providedIn: 'root'
})
export class AirtableService {

  constructor(@Inject(AIRTABLE_URL) private url: string, private httpClient: HttpClient) { }

  getSavedWeatherLocations(): Observable<Root> {
    return this.httpClient.get<Root>(this.url);
  }

  deleteWeatherLocation(id: string) {
    this.httpClient.delete(`${this.url}/${id}`).subscribe();
  }

  addSavedWeatherLocation(newWeather: SavedCityWeather, lat: number, lon: number): Observable<any> {
    let fields = {
      city: newWeather.city,
      time: Date.now(),
      lon: lon,
      lat: lat,
      temp: newWeather.temperature,
      weatherDesc: newWeather.weatherDescription,
      weatherIcon: newWeather.weatherIcon,
      system: newWeather.system
    }

    return this.httpClient.post(this.url, { fields });
  }

  updateSavedWeatherLocation(newWeather: SavedCityWeather, id: string) {
    let fields = {
      city: newWeather.city,
      time: Date.now(),
      temp: newWeather.temperature,
      weatherDesc: newWeather.weatherDescription,
      weatherIcon: newWeather.weatherIcon,
      system: newWeather.system
    }

    this.httpClient.patch(`${this.url}/${id}`, { fields }).subscribe();
  }
}
