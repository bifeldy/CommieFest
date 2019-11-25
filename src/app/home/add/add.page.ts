import { Component, OnInit } from '@angular/core';
import { EventService, Event } from 'src/app/_shared/_services/event.service';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {
  form: FormGroup;

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
  ) { }

  ngOnInit() {
    this.eventId = this.route.snapshot.params['id'];
    if (this.eventId) {
      this.loadEvent();
    }

    this.form = new FormGroup({
      nama: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      deskripsi: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      gambar: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      lokasi: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      kategori: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      hargatiket: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      hargadoorprize: new FormControl(null, {
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
      message: 'Saving Event'
    });
    await loading.present();

    if (this.eventId) {
      this.eventSvc.updateEvent(this.event, this.eventId).then(() => {
        loading.dismiss();
        this.navCtrl.navigateBack('home');
      })
    } else {
      this.eventSvc.addEvent(this.event).then(() => {
        loading.dismiss();
        this.navCtrl.navigateBack('home');
      });
    }
  }

}
