import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  constructor(
    private http: HttpClient
  ) { }

  getPosition(): Promise<any> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resp => {
          resolve({
            lng: resp.coords.longitude,
            lat: resp.coords.latitude
          });
        },
        err => {
          reject(err);
        });
    });
  }

  getAddress(lat: number, lng: number, types: string) {
    return this.http.get<any>(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?types=${types}&access_token=${environment.mapbox.apiKey}`
    ).pipe(map(geoData => {
      return geoData;
    }));
  }
}
