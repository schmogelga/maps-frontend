import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WeatherClient {
  constructor(private http: HttpClient) {}

  getWeatherData(): Observable<any> {
    return this.http.get(environment.apiUrl + '/WeatherForecast');
  }

  createEvent(descricao: string, latitude: number, longitude: number): Observable<any> {
    const payload = {
      descricao: descricao,
      latitude: latitude,
      longitude: longitude,
      status: 'ANALISE'
    };
    return this.http.post(environment.apiUrl + '/eventos', payload);
  }

  getEvents(): Observable<any[]> {
    return this.http.get<any[]>(environment.apiUrl + '/eventos');
  }
}