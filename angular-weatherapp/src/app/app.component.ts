import { Component, OnInit } from '@angular/core';
import { AirtableService } from './airtable.service';
import { GeoapifyService } from './geoapify.service';
import { OpenweatherService } from './openweather.service';

export interface SavedCityWeather {
  id?: string;
  city: string;
  weatherDescription: string;
  weatherIcon: string;
  temperature: number;
  system: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'angular-weatherapp';
  trackedWeathers: SavedCityWeather[] = [];
  cityToAdd = '';
  system = 'metric';


  constructor(private geoapifyService: GeoapifyService, private openWeatherService: OpenweatherService, private airtableService: AirtableService) {}

  ngOnInit() {
    this.airtableService.getSavedWeatherLocations().subscribe(result => {
      result.records.forEach(record => {
        if ((Date.now().valueOf() - Date.parse(record.fields.time))/1000/60 >= 30)  {
          this.openWeatherService.getWeather(record.fields.lat, record.fields.lon, record.fields.system)
            .subscribe(weather => {
              let newWeather: SavedCityWeather = {
                id: record.id,
                city: weather.name,
                weatherDescription: weather.weather[0].description,
                weatherIcon: `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`,
                temperature: weather.main.temp,
                system: record.fields.system
              };

              this.airtableService.updateSavedWeatherLocation(newWeather, record.id);
              this.trackedWeathers.push(newWeather);
            })
        } else {
          let newWeather = {
            id: record.id,
            city: record.fields.city,
            weatherDescription: record.fields.weatherDesc,
            weatherIcon: record.fields.weatherIcon,
            temperature: record.fields.temp,
            system: record.fields.system
          }
          this.trackedWeathers.push(newWeather);

        }
      })
    })
  }

  public addCity() {
    this.geoapifyService.getCoordinates(this.cityToAdd).subscribe(result => {
      this.openWeatherService.getWeather(result.results[0].lat, result.results[0].lon, this.system)
        .subscribe(weather => {
          let newWeather: SavedCityWeather = {
            city: weather.name,
            weatherDescription: weather.weather[0].description,
            weatherIcon: `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`,
            temperature: weather.main.temp,
            system: this.system
          }

          this.airtableService.addSavedWeatherLocation(newWeather, result.results[0].lat, result.results[0].lon)
            .subscribe(result => {
              newWeather.id = result.id;
              this.trackedWeathers.push(newWeather);
            });
        });
    });
    this.cityToAdd = '';
  }

  public deleteCity(city: number) {
    let id = this.trackedWeathers.splice(city, 1)[0].id!;
    this.airtableService.deleteWeatherLocation(id);
  }
}
