import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { WeatherService } from './weather/weather.service';

@Injectable({
  providedIn: 'root'
})
export class ResolveLocationService implements Resolve<any>{

  constructor(private ws: WeatherService) { }
  resolve() {
    this.ws.getCurrent();
  }
}
