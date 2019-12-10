import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Event } from 'src/app/_shared/_models/event';

import { EventService } from 'src/app/_shared/_services/event.service';
import { CameraService } from 'src/app/_shared/_services/camera.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  form: FormGroup;

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
    private cameraService: CameraService
  ) {

  }

  ngOnInit() {
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

}
