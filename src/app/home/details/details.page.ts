import { Component, OnInit } from '@angular/core';
import { EventService, Event } from 'src/app/_shared/_services/event.service';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
// import { Subscription } from 'rxjs';
// import { Event } from 'src/app/_shared/_models/event';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {


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
  }

  async loadEvent() {
    const loading = await this.loadCtrl.create({
      message: 'Loading Event'
    });
    await loading.present();

    this.eventSvc.getEvent(this.eventId).subscribe(res => {
      loading.dismiss();
      console.log("ini res", res);
      this.event = res;
    });
  }



}
