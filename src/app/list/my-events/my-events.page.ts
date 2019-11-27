import { Component, OnInit } from '@angular/core';
import { EventService, Event } from 'src/app/_shared/_services/event.service';

import { IonItemSliding } from '@ionic/angular';
@Component({
  selector: 'app-my-events',
  templateUrl: './my-events.page.html',
  styleUrls: ['./my-events.page.scss'],
})
export class MyEventsPage implements OnInit {

  constructor(private eventSvc: EventService) { }

  nearbyEvents: Event[] = [];

  ngOnInit() {
    this.eventSvc.getEvents().subscribe(res => { this.nearbyEvents = res; });
  }

  remove(e, slidingItem: IonItemSliding) {
    slidingItem.close();
    this.eventSvc.removeBike(e.id);
  }

}
