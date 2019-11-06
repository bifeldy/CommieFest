import { Component, OnInit } from '@angular/core';
import { Event } from '../_shared/_models/event';
import { EventService } from '../_shared/_services/event.service';
import { IonItemSliding, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
  loadedEvents: Event[];

  constructor(private eventService: EventService,
    private alertCtrl: AlertController) { }

  ngOnInit() {
    // this.loadedEvents = this.eventService.getAllEvents();
  }

  // async presentAlert(id: number, slidingEl: IonItemSliding) {
  //   const alert = await this.alertCtrl.create({
  //     header: 'Beneran Mau Hapus?',
  //     buttons: [
  //       {
  //         text: 'Batal',
  //         role: 'cancel'
  //       },
  //       {
  //         text: 'Serius',
  //         handler: () => {
  //           slidingEl.close();
  //           this.eventService.deleteMyEvent(id);
  //           this.loadedEvents = this.eventService.getAllEvents();
  //         }
  //       }]
  //   });
  //   await alert.present();
  // }

  // deleteNotif(id: number, slidingEl: IonItemSliding) {
  //   slidingEl.close();
  //   this.eventService.deleteMyEvent(id);
  //   this.loadedEvents = this.eventService.getAllEvents();
  // }
  // deleteNotif(id: number) {
  //   this.eventService.deleteMyEvent(id);
  //   this.loadedEvents = this.eventService.getAllEvents();
  // }



}
