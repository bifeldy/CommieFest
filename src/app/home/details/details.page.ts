import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/_shared/_services/event.service';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { Event } from 'src/app/_shared/_models/event';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  event: Event = {
    id: 0,
    name: '',
    description: '',
    imageUrl: '',
    location: '',
    category: '',
    ticketPrice: 0,
    pricePool: 0,
    dateStart: {
      seconds: new
        Date().getTime(),
      nanoseconds: 0
    },
    dateEnd: {
      seconds: new
        Date().getTime(),
      nanoseconds: 0
    }
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
