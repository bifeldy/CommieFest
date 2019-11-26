import { Component, OnInit } from '@angular/core';
import { EventService } from '../../_shared/_services/event.service';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  event: Event = {
    name: '',
    description: '',
    imageUrl: '',
    location: '',
    category: '',
    ticketPrice: 0,
    pricePool: 0,
    dateStart: '',
    dateEnd: ''
  };
  constructor(
    private eventSvc: EventService,
    private route: ActivatedRoute,
    private loadCtrl: LoadingController,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.eventId = this.route.snapshot.params['id'];
    if (this.eventId) {
      this.loadEvent();
    }
  }

}
