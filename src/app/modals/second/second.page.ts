import { EventService } from './../../_shared/_services/event.service';
import { Component, OnInit, AfterViewInit,ElementRef, ViewChild } from '@angular/core';
import {ModalController} from '@ionic/angular';
import { Event } from '../../_shared/_models/event';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Marker, Point } from './interfaces';
import { MarkerManager } from '@agm/core';

declare var google;
@Component({
  selector: 'app-second',
  templateUrl: './second.page.html',
  styleUrls: ['./second.page.scss'],
})
export class SecondPage implements OnInit{
  
  @ViewChild('mapElement',{static: false}) mapNativeElement: ElementRef;

  //map: any;
  geocoder: any;
  markers: any;
  nearbyEvents: Event[] = [];
  selfLatitude;
  selfLongitude;
  adre='medang lestari';
  ido=0;
  placing:[];
  markerS: Marker[];
	origin: Point;
  zoom: number;
  lats: number;
  longs: number;
  constructor(
    private eventService: EventService,
    private modalController: ModalController,
    private nativeGeocoder: NativeGeocoder,
    private geolocation: Geolocation) { 
    this.geocoder = new google.maps.Geocoder;
    this.markers =[];
    this.lats=90.90;
    this.longs=100.100;
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
    this.eventService.lisiE().then(data => { 
      if(data){
        
        //this.nearbyEvents=res;
        
        var gSizeIns= new google.maps.Size(30, 20);
        data.map(e => {
          this.adre=e.payload.doc.data().location;
          this.geocoder.geocode( { 'address': this.adre}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
              if (status != google.maps.GeocoderStatus.ZERO_RESULTS) {
              //this.map.setCenter(results[0].geometry.location);
              console.log('The coordinates are latitude=' +results[0].geometry.location)
                var infowindow = new google.maps.InfoWindow(
                    { content: '<b>'+this.adre+'</b>',
                      size: new google.maps.Size(150,50)
                    });
                    
                let marker = new google.maps.Marker({
                    position: results[0].geometry.location,
                    map: this.map, 
                    title:this.adre
                }); 
                this.markers.push(marker);
                // google.maps.event.addListener(marker, 'click', function() {
                //     infowindow.open(this.map,marker);
                // });
    
              } else {
                alert("No results found");
              }
            } else {
              alert("Geocode was not successful for the following reason: " + status);
            }
          });
        
          // this.adre=(e.payload.doc.data().location).replace('NaN','');
          // console.log('The coordinates are latitude=' +this.adre)
          // this.nativeGeocoder.forwardGeocode(this.adre, options)
          // .then((result: NativeGeocoderResult[]) => {
          //   console.log('The coordinates are latitude=' + result[0].latitude + ' and longitude=' + result[0].longitude+e.payload.doc.res()['location'])
          //   this.selfLatitude=parseFloat(result[0].latitude);
          //   this.selfLongitude=parseFloat(result[0].longitude);
          // }).catch((error: any) => console.log(error));
          // let marker = new google.maps.Marker({
          //   position: {
          //             lat: this.selfLatitude,
          //             lng: this.selfLongitude
          //           },
          //   map: this.map,
          //   title:e.payload.doc.data()['name']
          // });
          // this.markers.push(marker);
          // // this.map.setCenter({ lat:this.selfLongitude,
          // //   lng:this.selfLongitude});

        });
      }
    });
  }

  

  ionViewDidEnter(){
    this.geolocation.getCurrentPosition().then((resp) => {
      this.selfLatitude= resp.coords.latitude;
      this.selfLongitude = resp.coords.longitude;
      console.log('INI'+this.longs);
      // resp.coords.longitude
      const map = new google.maps.Map(this.mapNativeElement.nativeElement, {
        center: { lat: this.selfLatitude, lng: this.selfLongitude },
        zoom: 17
      });
      const marker = new google.maps.Marker({
                        
        map: map,
        position: { lat: this.selfLatitude, lng: this.selfLongitude }, 
        title: 'You are here'
    });
     }).catch((error) => {
       console.log('Error getting location', error);
     });
     this.eventService.lisiE().then(data=>{
      if(data){
       var gSizeIns= new google.maps.Size(30, 20);
        data.map(e => {
          //e.payload.doc.data()['location'].then(resp=>{
          
          if (this.geocoder) {
              
              setTimeout( () => {  
              this.geocoder.geocode( { 'address': e.payload.doc.data()['location']}, function(results, status) {
                setTimeout( () => {  
                if (status == google.maps.GeocoderStatus.OK) {
                  if (status != google.maps.GeocoderStatus.ZERO_RESULTS) {
                  //this.map.setCenter(results[0].geometry.location);
                    console.log(e.payload.doc.data()['location']+' liat nih '+results[0].geometry.location);
                    const infowindow = new google.maps.InfoWindow(
                        { content: '<b>'+e.payload.doc.data()['location']+'</b>',
                          size: new google.maps.Size(150,50)
                        });
                        let markur = new google.maps.Marker({
                        
                          map: this.map,
                          position: results[0].geometry.location, 
                          title: 'You are here'
                      });     
                     
                    
                    //this.marker.setPosition(results[0].geometry.location);
                    markur.setVisible(true);
                    //this.markers.push(marker);
                    //infowindow.open(map, marker);
                    google.maps.event.addListener(markur, 'click', function() {
                      infowindow.open(this.map,this.markur);
                  });
        
                  } else {
                    alert("No results found");
                  }
                } else {
                  alert("Geocode was not successful for the following reason: " + status);
                }
               },10000);
              
              });
             },10000);
            }
          
          },(this.markers));
          // let marker = new google.maps.Marker({
          //   position: {
          //             lat: e.payload.doc.data()[''],
          //             lng:e.payload.doc.data()['lng']
          //           },
          //   map: this.map,
          //   title:e.payload.doc.data()['name'],
          //   icon:{url:e.payload.doc.data()['image'],scaledSize:gSizeIns}
          // });
          // this.markers.push(marker);
          // this.map.setCenter({ lat:this.selfLongitude,
          //   lng:this.selfLongitude});

        //});
      }
    });
    
   
  }

  getSelfLocationDetail(){
    this.geolocation.getCurrentPosition().then((resp) => {
      this.lats= resp.coords.latitude;
      this.longs = resp.coords.longitude;
      console.log('INI'+this.longs);
      // resp.coords.longitude
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

//   ngAfterViewInit(): void{
//     this.geolocation.getCurrentPosition().then((doto) => {
    
     
//     this.selfLatitude=doto.coords.latitude;
//     this.selfLongitude=doto.coords.longitude;
//     var latlng = new google.maps.LatLng(this.selfLatitude, this.selfLongitude);
//     this.zoom=16;
//     this.lats=this.selfLatitude;
//     this.longs=this.selfLongitude;
//     const map = new google.maps.Map(this.mapNativeElement.nativeElement, {
//       center: {lat: this.selfLatitude, lng: this.selfLongitude },
//       zoom: 17
//     });
  
  
//  // this.getListEvent();
//   this.eventService.lisiE().then(data => { 
//     if(data){
      
//       //this.nearbyEvents=res;
      

     
//       var gSizeIns= new google.maps.Size(30, 20);
//       data.map(e => {
//         this.placing=e.payload.doc.data().location;
        
//         setTimeout( () => {
//         this.geocoder.geocode( { 'address': this.placing}, function(results, status) {
//           if (status == google.maps.GeocoderStatus.OK) {
//             if (status != google.maps.GeocoderStatus.ZERO_RESULTS) {
//             //this.map.setCenter(results[0].geometry.location);
//             console.log('The coordinates are latitude='+results[0].formatted_address +results[0].geometry.location)
//             // infowindow.close();
//             // marker.setVisible(false);
//             this.markerS= Object['values'](results[0].geometry.location);
//             const infowindow = new google.maps.InfoWindow();
//             const infowindowContent = document.getElementById('infowindow-content');
//             infowindow.setContent(infowindowContent);
//             infowindow.close();
//             let marker = new google.maps.Marker({
//               map: map,
//               position: results[0].geometry.location,
//               anchorPoint: new google.maps.Point(0, -29),
//               draggable: true
//             });
//              //marker.setPosition(results[0].geometry.location);
//              marker.setVisible(true);
             
//              google.maps.event.addListener(marker, 'click', (function (marker) {
//               return function () {
//                   infowindow.setContent(results[0].geometry.location);
//                   infowindow.open(map, marker);
//               }
//           })(marker));
//             //  let address = '';
//             //  if (results[0].address_components) {
//             //   address = [
//             //     (results[0].address_components[0] && results[0].address_components[0].short_name || ''),
//             //     (results[0].address_components[1] && results[0].address_components[1].short_name || ''),
//             //     (results[0].address_components[2] && results[0].address_components[2].short_name || '')
//             //   ].join(' ');
//             // }
            
            
//             //  infowindowContent.children['place-name'].textContent = address;
           
//             //  infowindow.open(map, marker);
              
//              } else {
//                alert("No results found");
//              }
//            } else {
//              alert("Geocode was not successful for the following reason: " + status);
//            }
//       });
//        }, 2500*this.ido++);
      
      

//       });
    
//     }
//   });
//   });
//   }


}
