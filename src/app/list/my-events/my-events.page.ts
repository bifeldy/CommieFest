import { Component, OnInit } from '@angular/core';
import { EventService, Event } from 'src/app/_shared/_services/event.service';
// import {  } from 'ionic-angular';
import { IonItemSliding, AlertController } from '@ionic/angular';
@Component({
  selector: 'app-my-events',
  templateUrl: './my-events.page.html',
  styleUrls: ['./my-events.page.scss'],
})
export class MyEventsPage implements OnInit {

  constructor(private eventSvc: EventService,
    private alertCtrl: AlertController) { }

  nearbyEvents: Event[] = [];

  ngOnInit() {
    this.eventSvc.getEvents().subscribe(res => { this.nearbyEvents = res; });
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
            this.eventSvc.removeBike(e.id);
          }
        }
      ]
    });
    await alert.present();
  }

}
