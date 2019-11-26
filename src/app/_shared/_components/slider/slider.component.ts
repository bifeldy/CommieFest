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
    slidesPerView: 4.5,
    slidesOffsetBefore: 25,
    slidesOffsetAfter: 25,
    spaceBetween: 25,
    freeMode: true,
    grabCursor: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      576: {
          slidesPerView: 1.5,
        },
      768: {
          slidesPerView: 2.5,
        },
      992: {
          slidesPerView: 3.5,
        },
      1200: {
          slidesPerView: 4.5,
        }
    }
  };

  constructor() { }

  ngOnInit() {}

}
