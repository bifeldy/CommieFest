import { EventService } from './../../_shared/_services/event.service';
import { Component, OnInit, AfterViewInit,ElementRef, ViewChild } from '@angular/core';
import {ModalController} from '@ionic/angular';
import { Event } from '../../_shared/_models/event';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';

import { Geolocation } from '@ionic-native/geolocation/ngx';


declare var google;
@Component({
  selector: 'app-second',
  templateUrl: './second.page.html',
  styleUrls: ['./second.page.scss'],
})
export class SecondPage implements OnInit, AfterViewInit {
  
  @ViewChild('mapElement',{static: false}) mapNativeElement: ElementRef;

  map: any;
  geocoder: any;
  markers: any;
  nearbyEvents: Event[] = [];
  selfLatitude;
  selfLongitude;

  constructor(
    private eventService: EventService,
    private modalController: ModalController,
    private nativeGeocoder: NativeGeocoder,
    private geolocation: Geolocation) { 
    this.geocoder = new google.maps.Geocoder;
    this.markers =[];
  }

  ngOnInit() {
  }
  async closeModal(){
    await this.modalController.dismiss();

  }

  getListEvent(){
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };
    this.eventService.lisiE().then(res => { 
      if(res){
        
        this.nearbyEvents=res;
        
        var gSizeIns= new google.maps.Size(30, 20);
        res.map(e => {
          this.nativeGeocoder.forwardGeocode(e.payload.doc.res()['location'], options)
          .then((result: NativeGeocoderResult[]) => {
            console.log('The coordinates are latitude=' + result[0].latitude + ' and longitude=' + result[0].longitude+e.payload.doc.res()['location'])
            this.selfLatitude=result[0].latitude;
            this.selfLongitude=result[0].longitude;
          }).catch((error: any) => console.log(error));
          let marker = new google.maps.Marker({
            position: {
                      lat: this.selfLatitude,
                      lng: this.selfLongitude
                    },
            map: this.map,
            title:e.payload.doc.data()['name']
          });
          this.markers.push(marker);
          this.map.setCenter({ lat:this.selfLongitude,
            lng:this.selfLongitude});

        });
      }
    });
  }

  ngAfterViewInit(): void{
    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
     
    
    const map = new google.maps.Map(this.mapNativeElement.nativeElement, {
      center: {lat: data.coords.latitude, lng: data.coords.longitude },
      zoom: 17
    });
  });
  this.getListEvent();
  }

}
