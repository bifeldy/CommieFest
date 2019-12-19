import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Geolocation } from '@ionic-native/geolocation/ngx';

import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  constructor(
    private http: HttpClient,
    private geolocation: Geolocation
  ) { }

  getCurrentPosition() {
    return this.geolocation.getCurrentPosition();
  }

  watchPosition() {
    return this.geolocation.watchPosition();
  }

  getAddress(lat: number, lng: number, types: string) {
    return this.http.get<any>(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?types=${types}&access_token=${environment.mapbox.apiKey}`
    ).pipe(map(geoData => {
      return geoData;
    }));
  }
}
