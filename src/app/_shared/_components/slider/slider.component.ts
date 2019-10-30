import { Component, OnInit, Input } from '@angular/core';

import { Event } from '../../_models/event';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent implements OnInit {

  @Input() events: Event[];

  slidersConfig = {
    slidesPerView: 4,
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
        },
      1200: {
          slidesPerView: 4,
        }
    }
  };

  constructor() { }

  ngOnInit() {}

}
