import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/_shared/_services/event.service';
// import {  } from 'ionic-angular';
import { IonItemSliding, AlertController } from '@ionic/angular';

import { Event } from 'src/app/_shared/_models/event';

import { AuthService } from 'src/app/_shared/_services/auth.service';

@Component({
  selector: 'app-my-events',
  templateUrl: './my-events.page.html',
  styleUrls: ['./my-events.page.scss'],
})
export class MyEventsPage implements OnInit {

  constructor(
    private eventSvc: EventService,
    private alertCtrl: AlertController,
    private authService: AuthService
  ) { }

  myEvents: Event[] = [];

  ngOnInit() {
    this.eventSvc.getEventsWithQuery('createdBy', this.authService.userData.uid).subscribe(res => { this.myEvents = res; });
  }

  async remove(e, slidingItem: IonItemSliding) {
    const alert = await this.alertCtrl.create({
      header: 'Hapus Event',
      message: 'Yakin ingin hapus?',
      buttons: [
        {
          text: 'Batal',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Yakin',
          handler: () => {
            slidingItem.close();
            this.eventSvc.removeEvent(e.id);2
          }
        }
      ]
    });
    await alert.present();
  }

}
