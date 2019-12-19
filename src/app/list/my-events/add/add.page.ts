import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Event } from 'src/app/_shared/_models/event';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ModalController } from '@ionic/angular';
import { EventService } from 'src/app/_shared/_services/event.service';
import { CameraService } from 'src/app/_shared/_services/camera.service';
import { LocationPickerComponent } from 'src/app/_shared/_components/_pickers/location-picker/location-picker.component';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/_shared/_services/auth.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {
  // lat = 51.678418;
  // lng = 7.809007;

  form: FormGroup;

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
  address = '';

  constructor(
    private eventSvc: EventService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private loadCtrl: LoadingController,
    private navCtrl: NavController,
    private cameraService: CameraService,
    private modalctrl: ModalController,
    private authSvc: AuthService
  ) { }

  ngOnInit() {
    this.eventSvc.getAddress().subscribe(
      currAddress => {
        this.address = currAddress;
      }
    );

    this.form = new FormGroup({
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
    this.event.createdBy = this.authSvc.userData.uid;
  }

  async saveEvent() {
    const loading = await this.loadCtrl.create({
      message: 'Saving Event'
    });
    await loading.present();
    this.form.get('location').patchValue(this.address);
    console.log(this.form.value)
    this.eventSvc.addEvent(this.event).then(() => {
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
