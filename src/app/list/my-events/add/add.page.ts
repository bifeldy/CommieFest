import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Event } from 'src/app/_shared/_models/event';

import { EventService } from 'src/app/_shared/_services/event.service';
import { CameraService } from 'src/app/_shared/_services/camera.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

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

  constructor(
    private eventSvc: EventService,
    private route: ActivatedRoute,
    private loadCtrl: LoadingController,
    private navCtrl: NavController,
    private cameraService: CameraService
  ) { }

  ngOnInit() {
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
