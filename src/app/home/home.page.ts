import { Component, OnInit } from '@angular/core';
import { ScrollDetail } from '@ionic/core';
import { UserService } from '../_shared/_services/user.service';
import { EventService } from '../_shared/_services/event.service';
import { Event } from '../_shared/_models/event';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  loadedEvents: Event[];

  user = {};
  showToolbar = false;

  bannerImgStyle = {
    height: '45%',
    background: 'url("/assets/season/fall.svg"), linear-gradient(to bottom, #0066cc 0%, #4c8dff 100%)',
    'background-position': 'center',
    'background-repeat': 'no-repeat',
    'background-size': 'cover'
  };

  constructor(
    private userService: UserService,
    private eventService: EventService
  ) {
    this.user = this.userService.getUser();
  }

  ngOnInit() {
    this.loadedEvents = this.eventService.getAllEvents();
  }

  getDummyDate() {
    return new Date();
  }

  onScroll($event: CustomEvent<ScrollDetail>) {
    if ($event && $event.detail && $event.detail.scrollTop) {
      const scrollTop = $event.detail.scrollTop;
      this.showToolbar = scrollTop >= 225;
    }
  }

}
