import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/_shared/_services/event.service';
import { AuthService } from 'src/app/_shared/_services/auth.service';

import { Event } from 'src/app/_shared/_models/event';

@Component({
  selector: 'app-joined-events',
  templateUrl: './joined-events.page.html',
  styleUrls: ['./joined-events.page.scss'],
})
export class JoinedEventsPage implements OnInit {

  allEvent = [];
  joinedEvent = [];

  constructor(
    public authService: AuthService,
    public eventSvc: EventService
  ) { }

  ngOnInit() {
    this.eventSvc.getEvents().subscribe(res => { this.allEvent = res; });
    this.eventSvc.getFollowEvent().subscribe(res => {
      this.joinedEvent = res;
      for (let i = 0; i < this.joinedEvent.length; i++) {
        this.joinedEvent[i] = this.joinedEvent[i].event;
      }
    });
  }

  addFollowEvent(event) {
    this.eventSvc.addFollowEvent(event);
  }

  deleteFollowEvent(event) {
    this.eventSvc.removeFollowEvent(event.id);
  }

  findFollowing(event: Event) {
    return (this.joinedEvent.findIndex(fe => fe.id === event.id) < 0) ? true : false;
  }

}
