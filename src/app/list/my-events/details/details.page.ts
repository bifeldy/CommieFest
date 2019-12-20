import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/_shared/_services/event.service';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';

import { Event } from 'src/app/_shared/_models/event';

import { AuthService } from 'src/app/_shared/_services/auth.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

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

  myEvents: Event[] = [];
  eventId = null;

  constructor(
    private eventSvc: EventService,
    private route: ActivatedRoute,
    private loadCtrl: LoadingController,
    private navCtrl: NavController,
    public authSrv: AuthService
  ) { }

  ngOnInit() {
    this.eventId = this.route.snapshot.params.id;
    if (this.eventId) {
      this.loadEvent();
    }
    this.eventSvc.getEventsWithQuery('createdBy', this.authSrv.userData.uid).subscribe(res => { this.myEvents = res; });
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

  checkCreator() {
    return (this.myEvents.findIndex(fe => fe.id === this.eventId) < 0) ? false : true;
  }

}
