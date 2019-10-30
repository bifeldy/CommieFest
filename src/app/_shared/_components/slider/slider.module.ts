import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { SliderComponent } from './slider.component';

@NgModule({
  declarations: [SliderComponent],
  imports: [
    CommonModule,
    RouterModule,
    IonicModule
  ],
  exports: [SliderComponent]
})
export class SliderModule { }
