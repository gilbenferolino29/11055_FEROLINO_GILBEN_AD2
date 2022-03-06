import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalConstants } from './shared/global-constants';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  
  reverseGeo = 'https://forward-reverse-geocoding.p.rapidapi.com/v1/reverse?';
  

  constructor(private http: HttpClient) { }

  async getLocation (latitude:number, longitude: number){
    var options = {
      params: {
        lat: latitude,
        lon: longitude,
      },
      headers: {
        'x-rapidapi-host': 'forward-reverse-geocoding.p.rapidapi.com',
        'x-rapidapi-key': 'efc31e3926mshb19b7fd81939113p15cf73jsn865c92696201'
      }


    }
    return this.http.get(this.reverseGeo, options);
  }

 
}
