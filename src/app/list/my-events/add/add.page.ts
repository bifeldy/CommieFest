import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { Geolocation } from '@ionic-native/geolocation/ngx';


import { Event } from 'src/app/_shared/_models/event';

import { EventService } from 'src/app/_shared/_services/event.service';
import { CameraService } from 'src/app/_shared/_services/camera.service';
declare var google;
@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit, AfterViewInit {

  @ViewChild('mapElement',{static: false}) mapNativeElement: ElementRef;
  @ViewChild('autoCompleteInput', {static: false}) inputNativeElement: any;

  form: FormGroup;
  directionForm: FormGroup;
  geocoder:any;
  markers:any;
  selfLatitude=22.572645;
  selfLongitude=88.363892;
  lats;
  lont;

  event: Event = {
    id: null,
    name: null,
    description: null,
    imageUrl: 'https://cnet4.cbsistatic.com/fly/bundles/cnetcss/images/placeholder/image_placeholder.png',
    location: null,
    category: null,
    ticketPrice: null,
    pricePool: null,
    dateStart: null,
    dateEnd: null,
    createdBy: null
  };

  constructor(
    private eventSvc: EventService,
    private route: ActivatedRoute,
    private loadCtrl: LoadingController,
    private navCtrl: NavController,
    private cameraService: CameraService,
    private fb: FormBuilder,
    private geolocation: Geolocation
  ) { this.createDirectionForm();}

  ngOnInit() {
    // this.form = new FormGroup({
    //   name: new FormControl(null, {
    //     updateOn: 'blur',
    //     validators: [Validators.required]
    //   }),
    //   description: new FormControl(null, {
    //     updateOn: 'blur',
    //     validators: [Validators.required]
    //   }),
    //   image: new FormControl(null, {
    //     updateOn: 'blur',
    //     validators: [Validators.required]
    //   }),
    //   location: new FormControl(null, {
    //     updateOn: 'blur',
    //     validators: [Validators.required]
    //   }),
    //   category: new FormControl(null, {
    //     updateOn: 'blur',
    //     validators: [Validators.required]
    //   }),
    //   ticketprice: new FormControl(null, {
    //     updateOn: 'blur',
    //     validators: [Validators.required]
    //   }),
    //   pricepool: new FormControl(null, {
    //     updateOn: 'blur',
    //     validators: [Validators.required]
    //   }),
    //   datestart: new FormControl(null, {
    //     updateOn: 'blur',
    //     validators: [Validators.required]
    //   }),
    //   dateend: new FormControl(null, {
    //     updateOn: 'blur',
    //     validators: [Validators.required]
    //   })
    // });
  }

  async saveEvent() {
    const loading = await this.loadCtrl.create({
      
      message: 'Saving Event'
    });
    await loading.present();
    this.eventSvc.addEvent(this.event).then(() => {
      loading.dismiss();
      this.navCtrl.navigateBack('list/my-events');
    });
  }

  getSelfLocationDetail(){
    this.geolocation.getCurrentPosition().then((resp) => {
      this.selfLatitude= resp.coords.latitude;
      this.selfLongitude = resp.coords.longitude;
      // resp.coords.longitude
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

  createDirectionForm() {
    this.form = this.fb.group({
      placeName: [''],
      name: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      description: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      image: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      location: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      category: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      ticketprice: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      pricepool: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      datestart: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      dateend: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      })
    });
  }

  openCamera() {
    this.cameraService.openCamera(360, 271).then((imageData) => {
      this.event.imageUrl = `data:image/jpeg;base64,${imageData}`;
    }, (err) => {
      console.log(err);
    });
  }

  openGallery() {
    this.cameraService.openGallery(360, 271).then((imageData) => {
      this.event.imageUrl = `data:image/jpeg;base64,${imageData}`;
    }, (err) => {
      console.log(err);
    });
  }


  ngAfterViewInit(): void {
    this.getSelfLocationDetail();
    //Set latitude and longitude of some place
    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
     
    
    const map = new google.maps.Map(this.mapNativeElement.nativeElement, {
      center: {lat: data.coords.latitude, lng: data.coords.longitude },
      zoom: 17
    });
    const infowindow = new google.maps.InfoWindow();
    const infowindowContent = document.getElementById('infowindow-content');
    infowindow.setContent(infowindowContent);
    const marker = new google.maps.Marker({
      map: map,
      anchorPoint: new google.maps.Point(0, -29),
      draggable: true
    });
    const autocomplete = new google.maps.places.Autocomplete(this.inputNativeElement.nativeElement as HTMLInputElement);
    autocomplete.addListener('place_changed', () => {
      infowindow.close();
      marker.setVisible(true);
      const place = autocomplete.getPlace();
      if (!place.geometry) {
        // User entered the name of a Place that was not suggested and
        // pressed the Enter key, or the Place Details request failed.
        window.alert('No details available for input: ' + place.name );
        return;
      }
      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
      } else {
        map.setCenter(place.geometry.location);
        map.setZoom(17);  // Why 17? Because it looks good.
      }
      marker.setPosition(place.geometry.location);
      marker.setVisible(true);
      // marker.addListener('dragend', function () {
      //   //this.inputLat.val(marker.getPosition().lat());
      //   //this.inputLng.val(marker.getPosition().lng());
      //   this.geocodePosition(marker.getPosition());
      //   this.map.setCenter(marker.getPosition());
      // })

      let address = '';
      if (place.address_components) {
        address = [
          (place.address_components[0] && place.address_components[0].short_name || ''),
          (place.address_components[1] && place.address_components[1].short_name || ''),
          (place.address_components[2] && place.address_components[2].short_name || '')
        ].join(' ');
      }
      infowindowContent.children['place-icon'].src = place.icon;
      infowindowContent.children['place-name'].textContent = place.name;
      infowindowContent.children['place-address'].textContent = address;
      infowindow.open(map, marker);
    });
  });

  }
}
