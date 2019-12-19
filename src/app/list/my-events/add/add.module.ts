import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { AgmCoreModule } from '@agm/core';
import { environment } from 'src/environments/environment';

import { AddPage } from './add.page';
import { SharedModule } from 'src/app/_shared/_module/shared/shared.module';
const routes: Routes = [
  {
    path: '',
    component: AddPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    AgmCoreModule.forRoot({
      apiKey: `${environment.firebase.mapsAPIKey}`
    })
  ],
  declarations: [AddPage]
})
export class AddPageModule { }
