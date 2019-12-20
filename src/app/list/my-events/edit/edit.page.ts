import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ModalController } from '@ionic/angular';

import { Event } from 'src/app/_shared/_models/event';
import { LocationPickerComponent } from 'src/app/_shared/_components/_pickers/location-picker/location-picker.component';
import { environment } from 'src/environments/environment';
import { EventService } from 'src/app/_shared/_services/event.service';
import { CameraService } from 'src/app/_shared/_services/camera.service';
import { AuthService } from 'src/app/_shared/_services/auth.service';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  form: FormGroup;

  address = '';

  // private placeSub: Subscription;

  event: Event = {
    id: null,
    name: null,
    description: null,
    imageUrl: null,
    location: null,
    category: null,
    ticketPrice: null,
    pricePool: null,
    dateStart: null,
    dateEnd: null,
    createdBy: null
  };

  eventId = null;

  constructor(
    private eventSvc: EventService,
    private route: ActivatedRoute,
    private loadCtrl: LoadingController,
    private navCtrl: NavController,
    private cameraService: CameraService,
    private modalctrl: ModalController,
    private http: HttpClient,
    private authsvc: AuthService
  ) {

  }

  ngOnInit() {
    this.eventSvc.getAddress().subscribe(
      currAddress => {
        this.address = currAddress;
      }
    );

    this.eventId = this.route.snapshot.params.id;
    if (this.eventId) {
      this.loadEvent();
    }
    this.form = new FormGroup({
      name: new FormControl(this.event.name, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      description: new FormControl(this.event.description, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      image: new FormControl(this.event.imageUrl, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      location: new FormControl(this.event.location, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      category: new FormControl(this.event.category, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      ticketprice: new FormControl(this.event.ticketPrice, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      pricepool: new FormControl(this.event.pricePool, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      datestart: new FormControl(this.event.dateStart, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      dateend: new FormControl(this.event.dateEnd, {
        updateOn: 'blur',
        validators: [Validators.required]
      })
    });

    this.event.createdBy = this.authsvc.userData.uid;

    // this.form.get('location').patchValue(this.address);
    // this.form.get('name').patchValue(this.event.name);
    // this.form.get('description').patchValue(this.event.description);
    // this.form.get('ticketprice').patchValue(this.event.ticketPrice);
    // this.form.get('pricepool').patchValue(this.event.pricePool);
    // this.form.get('datestart').patchValue(this.event.dateStart);
    // this.form.get('dateend').patchValue(this.event.dateEnd);
    // this.form.get('image').patchValue(this.event.imageUrl);
  }

  async loadEvent() {
    const loading = await this.loadCtrl.create({
      message: 'Loading Event'
    });
    await loading.present();
    this.eventSvc.getEventById(this.eventId).subscribe(res => {
      loading.dismiss();
      this.event = res;
    });
  }

  async saveEvent() {
    const loading = await this.loadCtrl.create({
      message: 'Updating Event'
    });


    this.form.get('location').patchValue(this.address);

    delete this.event.id;
    await loading.present();
    this.eventSvc.updateEvent(this.event, this.eventId).then(() => {
      loading.dismiss();
      this.navCtrl.navigateBack('list/my-events');
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

  async onPickLocation() {
    const modal = await this.modalctrl.create({
      component: LocationPickerComponent
    });
    modal.onDidDismiss().then((modalData) => {
      console.log(modalData.data);
      this.getAddress(modalData.data.lat, modalData.data.lng).subscribe(
        (address) => {
          this.eventSvc.setAddress(address);
          console.log(address);
        }
      );
    });
    return await modal.present();
  }

  private getAddress(lat: number, lng: number) {
    return this.http.get<any>(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${environment.firebase.mapsAPIKey}`)
      .pipe(
        map(geoData => {
          if (!geoData || !geoData.results || !geoData.results.length) {
            return null;
          }
          return geoData.results[0].formatted_address;
        })
      );
  }

}
