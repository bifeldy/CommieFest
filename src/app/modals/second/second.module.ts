import { AgmCoreModule } from '@agm/core';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
//import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';
import { IonicModule } from '@ionic/angular';

import { SecondPage } from './second.page';

const routes: Routes = [
  {
    path: '',
    component: SecondPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgmCoreModule, 
    RouterModule.forChild(routes)
  ],
  declarations: [SecondPage],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class SecondPageModule {}
