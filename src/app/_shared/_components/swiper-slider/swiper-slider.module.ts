import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SwiperSliderComponent } from './swiper-slider.component';

@NgModule({
  declarations: [SwiperSliderComponent],
  imports: [
    CommonModule
  ],
  exports: [SwiperSliderComponent]
})
export class SwiperSliderModule { }
