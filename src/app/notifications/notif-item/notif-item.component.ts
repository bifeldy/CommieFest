import { Component, OnInit, Input } from '@angular/core';
import { Events } from '@ionic/angular';

@Component({
  selector: 'app-notif-item',
  templateUrl: './notif-item.component.html',
  styleUrls: ['./notif-item.component.scss'],
})
export class NotifItemComponent implements OnInit {
  @Input() e: Events;

  constructor() { }

  ngOnInit() { }

  getDummyDate() {
    return new Date();
  }
}
