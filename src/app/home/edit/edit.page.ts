import { Component, OnInit } from '@angular/core';
import { EventService, Event } from 'src/app/_shared/_services/event.service';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
// import { Subscription } from 'rxjs';
// import { Event } from 'src/app/_shared/_models/event';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  form: FormGroup;

  // private placeSub: Subscription;

  event: Event = {
    name: '',
    description: '',
    imageUrl: '',
    location: '',
    category: '',
    ticketPrice: 0,
    pricePool: 0,
    dateStart: '',
    dateEnd: ''
  };

  eventId = null;

  constructor(
    private eventSvc: EventService,
    private route: ActivatedRoute,
    private loadCtrl: LoadingController,
    private navCtrl: NavController
  ) {

  }

  ngOnInit() {
    this.eventId = this.route.snapshot.params['id'];
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
    })
  }

  async loadEvent() {
    const loading = await this.loadCtrl.create({
      message: 'Loading Event'
    });
    await loading.present();

    this.eventSvc.getEvent(this.eventId).subscribe(res => {
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
      this.navCtrl.navigateBack('home');
    })
  }

}
