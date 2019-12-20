import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/_shared/_services/event.service';
import { AuthService } from 'src/app/_shared/_services/auth.service';

@Component({
  selector: 'app-joined-events',
  templateUrl: './joined-events.page.html',
  styleUrls: ['./joined-events.page.scss'],
})
export class JoinedEventsPage implements OnInit {

  joinedEvent = [];

  constructor(
    private authService: AuthService,
    private eventSvc: EventService
  ) { }

  ngOnInit() {
    // this.eventSvc.getEventsWithQuery(
    //   'uid',
    //   this.authService.userData.uid).subscribe(
    //     res => { this.joinedEvent = res; })
    //   ;
  }

}
