import { Component, OnInit } from '@angular/core';
import { ScrollDetail } from '@ionic/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { EventService, Event } from '../_shared/_services/event.service';
import { AuthService } from '../_shared/_services/auth.service';
import { GeolocationService } from '../_shared/_services/geolocation.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  geoCoordinates = {
    lat: null,
    lng: null
  };
  currentLocation = 'Your Location ...';
  nearbyEvents: Event[] = [];

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
    private authService: AuthService,
    private eventService: EventService,
    private geoService: GeolocationService
  ) { }

  ngOnInit() {
    this.geoService.getPosition().then(res => {
      this.geoCoordinates = res;
      this.currentLocation = `lat: ${this.geoCoordinates.lat} -- lng: ${this.geoCoordinates.lng}`;
      this.geoService.getAddress(this.geoCoordinates.lat, this.geoCoordinates.lng).subscribe(
        geoData => {
          console.log(geoData);
          try {
            this.currentLocation = geoData.results[0].formatted_address;
          } catch (e) {
            this.currentLocation = 'Nyalain Billing Payment Oiy!';
          }
        }
      );
    }).catch(err => {
      this.currentLocation = err.message;
    });

    this.eventService.getEvents().subscribe(res => {
      this.nearbyEvents = res;
      // const kalender: Timestamp = new Timestamp(res[0].dateStart.seconds, res[0].dateStart.nanoseconds);
      // console.log(kalender.to);
      // console.log(new Date(res[0].dateStart.seconds * 1000));
    });
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
}
