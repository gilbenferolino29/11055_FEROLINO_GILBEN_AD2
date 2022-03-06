import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { WeatherService } from './weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {
  weather:any;
  search = new FormControl();
  pipe = new DatePipe('en-US');
  dateWithPipe: string | null | undefined;
  timeWithPipe: string | null | undefined;
  options = {headers: new HttpHeaders ({
    'x-rapidapi-host': 'yahoo-weather5.p.rapidapi.com',
    'x-rapidapi-key': 'efc31e3926mshb19b7fd81939113p15cf73jsn865c92696201'})}
  url = 'https://yahoo-weather5.p.rapidapi.com/weather?';
  constructor(private ws: WeatherService, private http: HttpClient) {
    
   }

  ngOnInit(){
    navigator.geolocation.getCurrentPosition(async (pos) => {
      try{
      var result = await this.ws.getLocation(pos.coords.latitude, pos.coords.longitude).then((data:any)=>
      {data.subscribe((res:any)=>{
        this.http.get(this.url + `location=${res.address.city}`, this.options).subscribe((res:any)=>{
          this.weather = res;
          let timezone = this.weather.location.timezone_id; 
          this.getTime(timezone);
          console.log(this.weather)})})})
    }catch(error){
      console.log(error)
    }})
    
  }

  fahrenheitToCelcius(fahrenheit: number): string {
    var fTemp = fahrenheit;
    var fToCel = ((fTemp - 32) * 5) / 9;
    return fToCel.toFixed(0) + ' \xB0C';
  }
  
  onSubmit(){
    console.log(this.search.value);
    this.http.get(this.url + `location=${this.search.value}`, this.options).subscribe((res:any)=>{
      this.weather = res;
      let timezone = this.weather.location.timezone_id; 
        this.getTime(timezone);
        console.log(this.weather);
    })
  }

  async getTime(timezone:any){
    const key = 'aNpPWEtDUzLuekiONmCs'
    const url = `https://timezoneapi.io/api/timezone/?${timezone}&token=${key}`;

    await this.http

      .get(url).subscribe((time:any)=>{
        console.log(time);

        let dateString = time.data.datetime.date_time_txt;
        let dateTime = new Date(dateString);

        this.dateWithPipe = this.pipe.transform(dateTime, 'EEEE, MMMM d, y');
        this.timeWithPipe = this.pipe.transform(dateTime, 'h:mm a ');
      })
  }

}
