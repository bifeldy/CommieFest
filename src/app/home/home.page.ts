import { Component, OnInit } from '@angular/core';
import { ScrollDetail } from '@ionic/core';
import { NavController } from '@ionic/angular';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';

import { UserService } from '../_shared/_services/user.service';
import { EventService } from '../_shared/_services/event.service';
import { Event } from '../_shared/_models/event';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  user = {};

  nearbyEvents: Event[] = [];

  isSearchBarOpened = false;
  showToolbar = false;
  searchTerm = '';

  bannerImgStyle = {
    height: '45%',
    background: 'url("/assets/season/fall.svg"), linear-gradient(to bottom, #0066cc 0%, #4c8dff 100%)',
    'background-position': 'bottom right',
    'background-repeat': 'no-repeat',
    'background-size': 'cover'
  };

  constructor(
    public navCtrl: NavController,
    private router: Router,
    private userService: UserService,
    private eventService: EventService
  ) {
    this.user = this.userService.getUser();
  }

  ngOnInit() {

    // Test Isi Data Dummy
    setTimeout(() => {
      this.nearbyEvents = this.eventService.getAllEvents();
    }, 3000);

  }

  onScroll($event: CustomEvent<ScrollDetail>) {
    if ($event && $event.detail && $event.detail.scrollTop) {
      const scrollTop = $event.detail.scrollTop;
      this.showToolbar = scrollTop >= 225;
    }
  }

  search($event) {
    this.router.navigateByUrl('/search?q=' + $event.target.value);
  }

}
