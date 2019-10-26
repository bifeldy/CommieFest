import { Component } from '@angular/core';
import { ScrollDetail } from '@ionic/core';
import { UserService } from '../_shared/_services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  user = {};
  showToolbar = false;

  bannerImgStyle = {
    height: '45%',
    background: 'url("/assets/season/fall.svg"), linear-gradient(to bottom, #0066cc 0%, #4c8dff 100%)',
    'background-position': 'center',
    'background-repeat': 'no-repeat',
    'background-size': 'cover'
  };

  constructor(
    private userService: UserService
  ) {
    this.user = this.userService.getUser();
  }

  onScroll($event: CustomEvent<ScrollDetail>) {
    if ($event && $event.detail && $event.detail.scrollTop) {
    const scrollTop = $event.detail.scrollTop;
    this.showToolbar = scrollTop >= 225;
    }
  }

}
