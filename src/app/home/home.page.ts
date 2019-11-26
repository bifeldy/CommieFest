import { Component, OnInit } from '@angular/core';
import { ScrollDetail } from '@ionic/core';
import { Router, ActivatedRoute } from '@angular/router';

import { EventService, Event } from '../_shared/_services/event.service';
import { AuthService } from '../_shared/_services/auth.service';

// import { Event } from '../_shared/_models/event';
import { Timestamp } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  // nearbyEvents: Event[] = [];
  events: Event[] = [];
  filterData = [];

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
  searchTerm: string = "";

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
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    // TODO: Remove This Dummy Data
    this.eventService.getEvents().subscribe(res => {
      this.events = res;
      this.filterData = this.events;
      this.setFilter();


      // const kalender: Timestamp = new Timestamp(res[0].dateStart.seconds, res[0].dateStart.nanoseconds);
      //console.log(kalender.to);
      // console.log(new Date(res[0].dateStart.seconds * 1000));
    });

    this.route.queryParams.subscribe(params => {
      this.searchQuery = params.q;
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

<<<<<<< HEAD
  setFilter() {
    this.filterData = this.events.filter((event) => {
      return event.name.toLowerCase().indexOf(this.searchQuery.toLowerCase()) > -1;
    });
  }

  setFilteredEvents() {
    this.router.navigateByUrl('/search');
    this.filterData = this.events.filter((event) => {
      return event.name.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
    });
  }

}
=======
}
>>>>>>> ade1800fbff8b336326492179bfaeb94880f8607
