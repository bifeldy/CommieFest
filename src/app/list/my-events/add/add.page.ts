import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

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
    private fb: FormBuilder
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
    const map = new google.maps.Map(this.mapNativeElement.nativeElement, {
      center: {lat: -33.8688, lng: 151.2195},
      zoom: 13
    });
    const infowindow = new google.maps.InfoWindow();
    const infowindowContent = document.getElementById('infowindow-content');
    infowindow.setContent(infowindowContent);
    const marker = new google.maps.Marker({
      map: map,
      anchorPoint: new google.maps.Point(0, -29)
    });
    const autocomplete = new google.maps.places.Autocomplete(this.inputNativeElement.nativeElement as HTMLInputElement);
    autocomplete.addListener('place_changed', () => {
      infowindow.close();
      marker.setVisible(false);
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

  }
}
