import { Component, OnInit } from '@angular/core';
import { ScrollDetail } from '@ionic/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Event } from '../_shared/_models/event';

import { EventService } from '../_shared/_services/event.service';
import { AuthService } from '../_shared/_services/auth.service';
import { GeolocationService } from '../_shared/_services/geolocation.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  currentLocation = 'Your Location ...';
  nearbyEvents: Event[] = [];
  followedEvents: Event[] = [];

  slidersConfig = {
    slidesPerView: 3,
    spaceBetween: 0,
    freeMode: true,
    grabCursor: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      576: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      992: {
        slidesPerView: 3,
      }
    }
  };
  scrollActive = false;
  isSearchBarOpened = false;
  showToolbar = false;
  searchQuery = '';
  searchTerm = '';

  bannerImgStyle = {
    height: '45%',
    background: 'url("/assets/season/fall.svg"), linear-gradient(to bottom, #0066cc 0%, #4c8dff 100%)',
    'background-position': 'bottom right',
    'background-repeat': 'no-repeat',
    'background-size': 'cover'
  };

  constructor(
    private router: Router,
    public authService: AuthService,
    private eventService: EventService,
    private geoService: GeolocationService
  ) { }

  ngOnInit() {
    this.geoService.getCurrentPosition().then(resp => {
      this.geoService.getAddress(resp.coords.latitude, resp.coords.longitude, 'poi').subscribe(
        geoData => {
          // https://docs.mapbox.com/api/search/#geocoding-response-object
          // country, region, postcode, district, place, locality, neighborhood, address, and poi
          this.currentLocation = geoData.features[0].place_name;
        }
      );
    });
    this.eventService.getEvents().subscribe(res => { this.nearbyEvents = res; });

    if (!this.authService.userData) { return; }
    this.eventService.getFollowEvent().subscribe(res => { this.followedEvents = res; });
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

  loadMoreData($event) { }

  addFollowEvent(event) {
    this.eventService.addFollowEvent(event);
  }

  deleteFollowEvent(event) {
    this.eventService.removeFollowEvent(event.id);
  }

  findFollowing(event: Event) {
    return (this.followedEvents.findIndex(fe => fe.id === event.id) < 0) ? true : false;
  }
}
