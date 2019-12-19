import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { SliderModule } from '../_shared/_components/slider/slider.module';
import {SecondPage} from "../modals/second/second.page";
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SliderModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  declarations: [HomePage, SecondPage],
  entryComponents: [SecondPage]
})
export class HomePageModule {}
